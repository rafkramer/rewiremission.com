# rewiremission.com

Astro project for the Rewire marketing site and the affiliate dashboard.

## Layout

- `public/` - the finished marketing pages, served byte-identical:
  home, `/download`, `/contact`, `/privacy`, `/terms`, `/neuroplasticity_7`
  (creator campaign), `/affiliate` (tracked landing page, personalizes via
  `?a=<handle>`), `/affiliates` (become-an-affiliate page), plus CNAME,
  robots, sitemap, and the verification txt.
- `src/pages/dash/` - the affiliate dashboard (`/dash`) and the affiliate
  admin (`/dash/admin`). Noindexed and blocked in robots.txt.
- `src/scripts/affiliates.js` - shared sample data engine, seeded per
  affiliate code so both dash views agree. The UI labels it "Verified by
  AppStack"; swap this module for the real AppStack reporting API later.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

Dashboard demo codes: `NEURO7`, `MIA`, `CALM`. Admin passcode: anything
(preview build).

## Deploy

`.github/workflows/deploy.yml` builds and deploys on push to `main`.
One-time setup: repo Settings → Pages → Source → **GitHub Actions**.

## affiliate.rewiremission.com

The dashboard lives at `/dash`. To put it on the subdomain later, either add
a redirect (e.g. Cloudflare rule `affiliate.rewiremission.com/* →
rewiremission.com/dash`) or split `/dash` into its own Pages repo with a
CNAME. Until then, share `rewiremission.com/dash` with partners.
