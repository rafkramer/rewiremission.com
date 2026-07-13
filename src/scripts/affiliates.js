/* ============================================================
   REWIRE AFFILIATES - sample data engine
   Deterministic, seeded per affiliate code, so the affiliate
   dashboard and the admin view always agree. Labelled "Verified
   by AppStack" in the UI; swap for the real AppStack API later.
   ============================================================ */

const NET_PER_SUB = 43.4; // blended net revenue per paid subscription, after store fees
const REFUND_ADJ = 0.965; // verified revenue after refund window
const VERIFY_LAG_DAYS = 5; // AppStack confirms revenue after this many days
const TRIAL_CONV = 0.34; // share of open trials expected to convert
const HISTORY_DAYS = 120;

const AFFILIATES = [
  { code: 'NEURO7', name: 'Neuroplasticity', person: 'Cristina', handle: 'neuroplasticity_7', platform: 'Instagram', share: 0.70, size: 1.00, joined: '2026-03-14', avatarUrl: '/neuroplasticity_7/flower.jpg' },
  { code: 'MIA',    name: 'Mindset Mia',      person: 'Mia',      handle: 'mindsetmia',        platform: 'TikTok',    share: 0.30, size: 0.62, joined: '2026-04-02' },
  { code: 'CALM',   name: 'Calm Collective',  person: 'Sofia',    handle: 'calmcollective',    platform: 'YouTube',   share: 0.35, size: 0.48, joined: '2026-04-11' },
  { code: 'LENA',   name: 'Dr. Lena Hart',    person: 'Lena',     handle: 'drlenahart',        platform: 'Instagram', share: 0.30, size: 0.35, joined: '2026-04-28' },
  { code: 'BEN',    name: 'Breathwork Ben',   person: 'Ben',      handle: 'breathworkben',     platform: 'TikTok',    share: 0.25, size: 0.30, joined: '2026-05-06' },
  { code: 'SLEEP',  name: 'The Sleep Coach',  person: 'Marie',    handle: 'thesleepcoach',     platform: 'YouTube',   share: 0.30, size: 0.22, joined: '2026-05-19' },
  { code: 'INNER',  name: 'Inner Work Daily', person: 'Noah',     handle: 'innerworkdaily',    platform: 'Instagram', share: 0.25, size: 0.15, joined: '2026-06-01' },
  { code: 'HAUS',   name: 'Hypno Haus',       person: 'Theo',     handle: 'hypnohaus',         platform: 'X',         share: 0.25, size: 0.10, joined: '2026-06-20' }
];

/* ---------- seeded rng ---------- */
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- dates ---------- */
function dayKey(d) {
  const m = d.getMonth() + 1, day = d.getDate();
  return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
}
function daysAgo(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

/* ---------- daily series, seeded per affiliate ---------- */
const seriesCache = {};
function series(code) {
  const a = byCode(code);
  if (!a) return [];
  // key includes joined/size so edits to a partner invalidate their sample series
  const cacheKey = a.code + ':' + a.joined + ':' + a.size + ':' + dayKey(new Date());
  if (seriesCache[cacheKey]) return seriesCache[cacheKey];
  const rand = mulberry32(xmur3('rewire:' + a.code)());
  const joined = new Date(a.joined + 'T00:00:00');
  const out = [];
  let spike = 0;
  for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
    const d = daysAgo(i);
    // consume rng every day so the curve is stable regardless of join date
    const r1 = rand(), r2 = rand(), r3 = rand(), r4 = rand(), r5 = rand(), r6 = rand();
    const row = { date: d, key: dayKey(d), views: 0, clicks: 0, installs: 0, trials: 0, paid: 0, revenue: 0 };
    if (d >= joined) {
      // a post lands every week or two and traffic surges, then settles
      if (r5 < 0.085) spike = 1.6 + r6 * 3.4;
      const weekend = (d.getDay() === 0 || d.getDay() === 6) ? 1.18 : 1;
      const ramp = Math.min(1, (d - joined) / (86400000 * 10) + 0.35);
      const views = a.size * 150 * (0.55 + r1 * 0.9) * (1 + spike) * weekend * ramp;
      spike *= 0.45 + r6 * 0.15;
      if (spike < 0.05) spike = 0;
      row.views = Math.round(views);
      row.clicks = Math.round(row.views * (0.48 + r2 * 0.16));
      row.installs = Math.round(row.clicks * (0.33 + r3 * 0.09));
      row.trials = Math.round(row.installs * (0.38 + r4 * 0.1));
      row.paid = Math.round(row.trials * (0.30 + r6 * 0.08));
      row.revenue = +(row.paid * NET_PER_SUB).toFixed(2);
    }
    out.push(row);
  }
  seriesCache[cacheKey] = out;
  return out;
}

/* ---------- aggregation ---------- */
// days = trailing window (0 = all time). offset shifts the window back
// (offset=days gives the previous period, for deltas).
function totals(code, days, offset) {
  const s = series(code);
  const end = s.length - (offset || 0);
  const start = days ? Math.max(0, end - days) : 0;
  const t = { views: 0, clicks: 0, installs: 0, trials: 0, paid: 0, estRevenue: 0, verifiedRevenue: 0, earnings: 0, uniques: 0 };
  if (end <= 0) return t;
  const a = byCode(code);
  const verifyCutoff = s.length - VERIFY_LAG_DAYS;
  const openTrialsFrom = s.length - 7;
  let openTrials = 0;
  for (let i = start; i < end; i++) {
    const r = s[i];
    t.views += r.views; t.clicks += r.clicks; t.installs += r.installs;
    t.trials += r.trials; t.paid += r.paid;
    const rev = r.paid * NET_PER_SUB;
    t.estRevenue += rev;
    if (i < verifyCutoff) t.verifiedRevenue += rev * REFUND_ADJ;
    if (i >= openTrialsFrom) openTrials += r.trials;
  }
  t.estRevenue += openTrials * TRIAL_CONV * NET_PER_SUB;
  t.uniques = Math.round(t.views * 0.84);
  t.earnings = t.verifiedRevenue * a.share;
  return t;
}

/* ---------- monthly payout ledger ---------- */
// Months before the last closed month default to "paid". The most recent
// closed month is "due" (payout run in progress) until admin marks it paid.
// The current month is always "accruing".
const PAID_LS_KEY = 'rw_paid_months';
function paidOverrides() {
  try { return JSON.parse(localStorage.getItem(PAID_LS_KEY) || '{}'); }
  catch { return {}; }
}
function months(code) {
  const s = series(code);
  const a = byCode(code);
  const now = new Date();
  const curKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const buckets = {};
  const order = [];
  const verifyCutoff = s.length - VERIFY_LAG_DAYS;
  s.forEach(function (r, i) {
    const mk = r.key.slice(0, 7);
    if (!buckets[mk]) { buckets[mk] = { key: mk, verifiedRevenue: 0 }; order.push(mk); }
    const rev = r.paid * NET_PER_SUB * REFUND_ADJ;
    buckets[mk].verifiedRevenue += (mk === curKey && i >= verifyCutoff) ? 0 : rev;
  });
  const overrides = paidOverrides()[code] || [];
  const closed = order.filter(function (k) { return k < curKey; });
  const lastClosed = closed[closed.length - 1];
  return order.map(function (k) {
    const b = buckets[k];
    let status;
    if (k === curKey) status = 'accruing';
    else if (k === lastClosed) status = overrides.indexOf(k) >= 0 ? 'paid' : 'due';
    else status = 'paid';
    const earnings = b.verifiedRevenue * a.share;
    if (earnings < 0.5 && k !== curKey) status = 'paid';
    return { key: k, label: monthLabel(k), verifiedRevenue: b.verifiedRevenue, earnings: earnings, status: status };
  }).filter(function (m) { return m.verifiedRevenue > 0 || m.status === 'accruing'; });
}
function monthLabel(k) {
  const parts = k.split('-');
  const d = new Date(+parts[0], +parts[1] - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
function payoutSummary(code) {
  const ms = months(code);
  let paid = 0, due = 0, accruing = 0;
  ms.forEach(function (m) {
    if (m.status === 'paid') paid += m.earnings;
    else if (m.status === 'due') due += m.earnings;
    else accruing += m.earnings;
  });
  const next = new Date();
  next.setMonth(next.getMonth() + 1, 1);
  return { paidToDate: paid, due: due, accruing: accruing, pending: due + accruing, months: ms, nextPayout: next };
}
function markPaid(code) {
  const o = paidOverrides();
  const list = o[code] || (o[code] = []);
  months(code).forEach(function (m) {
    if (m.status === 'due' && list.indexOf(m.key) < 0) list.push(m.key);
  });
  localStorage.setItem(PAID_LS_KEY, JSON.stringify(o));
}
function resetPayouts() { localStorage.removeItem(PAID_LS_KEY); }

/* ---------- affiliate store ----------
   Seeded partners live in AFFILIATES above. Admin-created partners and edits
   to seeded ones are stored in the browser (preview build). "Copy config" in
   the admin turns a browser-stored partner into a permanent code entry. */
const CUSTOM_KEY = 'rw_custom_affiliates';
const OVERRIDE_KEY = 'rw_affiliate_overrides';

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function customAffiliates() { return readJson(CUSTOM_KEY, []); }
function affiliateOverrides() { return readJson(OVERRIDE_KEY, {}); }
function withOverride(profile) {
  const o = affiliateOverrides()[profile.code];
  return o ? Object.assign({}, profile, o) : profile;
}
function all() {
  return AFFILIATES.map(withOverride).concat(customAffiliates().map(withOverride));
}
function isSeeded(code) { return AFFILIATES.some(function (a) { return a.code === code; }); }
function isCustom(code) { return customAffiliates().some(function (a) { return a.code === code; }); }

function saveAffiliate(profile) {
  if (isSeeded(profile.code)) {
    // seeded partners keep their identity; store the editable bits as an override
    const o = affiliateOverrides();
    o[profile.code] = {
      name: profile.name,
      person: profile.person,
      handle: profile.handle,
      platform: profile.platform,
      share: profile.share,
      avatar: profile.avatar || undefined
    };
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(o));
    return;
  }
  const list = customAffiliates();
  const i = list.findIndex(function (a) { return a.code === profile.code; });
  if (i >= 0) list[i] = profile; else list.push(profile);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}
function removeAffiliate(code) {
  localStorage.setItem(
    CUSTOM_KEY,
    JSON.stringify(customAffiliates().filter(function (a) { return a.code !== code; }))
  );
}

/* ---------- AppStack integration ----------
   Wire-up point for live reporting. When access is enabled, replace the
   sample series with reported numbers per partner:

     GET https://api.appstack.tech/v1/reports/aggregate
         ?app_id=<rewire-app-id>&group_by=campaign&granularity=day
     Authorization: Bearer <api key>

   Campaigns are named "@<handle> Affiliate" (set by the landing page CTA),
   so each report row maps back to a partner by handle. */
const APPSTACK_KEY = 'rw_appstack_key';

function appstackKey() {
  try { return localStorage.getItem(APPSTACK_KEY) || ''; }
  catch { return ''; }
}
function setAppstackKey(key) {
  try {
    if (key) localStorage.setItem(APPSTACK_KEY, key);
    else localStorage.removeItem(APPSTACK_KEY);
  } catch { /* storage unavailable */ }
}
async function appstackSync() {
  const key = appstackKey();
  if (!key) {
    return { ok: false, message: 'No API key saved yet.' };
  }
  // Reporting API access is not enabled for this account yet; once it is,
  // fetch the aggregate report here and swap the sample series per partner.
  return {
    ok: false,
    message: 'Key saved. Live sync activates once AppStack enables reporting access for this key - sample data stays on until then.'
  };
}

/* ---------- helpers ---------- */
function byCode(code) {
  code = String(code || '').trim().toUpperCase();
  return all().find(function (a) { return a.code === code; }) || null;
}
const moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const moneyFmtCents = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const numFmt = new Intl.NumberFormat('en-US');
function money(v) { return v >= 1000 ? moneyFmt.format(v) : moneyFmtCents.format(v); }
function num(v) { return numFmt.format(Math.round(v)); }
function pct(part, whole) { return whole > 0 ? Math.round((part / whole) * 100) + '%' : '-'; }

export const RW = {
  affiliates: AFFILIATES,
  all: all,
  byCode: byCode,
  saveAffiliate: saveAffiliate,
  removeAffiliate: removeAffiliate,
  isCustom: isCustom,
  isSeeded: isSeeded,
  appstackKey: appstackKey,
  setAppstackKey: setAppstackKey,
  appstackSync: appstackSync,
  series: series,
  totals: totals,
  months: months,
  payoutSummary: payoutSummary,
  markPaid: markPaid,
  resetPayouts: resetPayouts,
  money: money,
  num: num,
  pct: pct,
  pageUrlFor: function (a) { return 'https://rewiremission.com/affiliate?a=' + a.handle; },
  localPageUrlFor: function (a) {
    const sameSite = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === 'rewiremission.com';
    return sameSite ? '/affiliate/?a=' + a.handle : 'https://rewiremission.com/affiliate?a=' + a.handle;
  }
};
