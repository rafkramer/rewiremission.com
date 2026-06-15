import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const appStoreUrl = 'https://apps.apple.com/us/app/rewire-mind-engineering/id6761954999';
const site = 'https://rewiremission.com';
const date = '2026-06-15';
const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2313223F'/%3E%3Ccircle cx='32' cy='32' r='14' fill='%232A1E5C'/%3E%3Ccircle cx='32' cy='32' r='14' fill='none' stroke='%2386D8DF' stroke-opacity='0.6' stroke-width='1.5'/%3E%3C/svg%3E";

const clusters = [
  { id: 'sleep-phone', name: 'Sleep & Phone Loops' },
  { id: 'work', name: 'Work Stress' },
  { id: 'social', name: 'Texting & Dating Loops' },
  { id: 'performance', name: 'Performance Pressure' },
  { id: 'habits', name: 'Habit Impulses' }
];

const existingArticles = [
  {
    slug: 'stop-replaying-conversations',
    title: 'How to Stop Replaying Conversations in Your Head',
    cardTitle: 'How to stop replaying conversations in your head',
    topic: 'Rumination',
    cluster: 'social',
    description: 'A practical reset for post-conversation overthinking, social anxiety loops, and arguments your brain keeps reopening.',
    generated: false
  },
  {
    slug: 'leave-work-at-work',
    title: 'How to Leave Work at Work When Your Mind Keeps Working',
    cardTitle: 'How to leave work at work when your mind keeps working',
    topic: 'Work stress',
    cluster: 'work',
    description: 'A shutdown ritual for unfinished tasks, after-hours checking, Sunday dread, and the mental noise that follows you home.',
    generated: false
  }
];

const newArticles = [
  {
    slug: 'stop-doomscrolling-in-bed',
    title: 'How to Stop Doomscrolling in Bed When You Are Exhausted',
    cardTitle: 'How to stop doomscrolling in bed',
    topic: 'Phone in bed',
    cluster: 'sleep-phone',
    description: 'A practical reset to stop doomscrolling in bed: break the phone loop, calm the nervous system, and make sleep feel easier than scrolling.',
    dek: 'You are tired enough to sleep, but your thumb keeps moving. The problem is not that you lack discipline. It is that your brain is using the phone as a tiny source of control, novelty, and avoidance right when the day finally gets quiet.',
    readTime: '7 minute read',
    quickReset: 'Put the phone across the room, name the emotional job scrolling is doing, give your mind one replacement cue, and let the body downshift before you negotiate with yourself.',
    why: [
      'Doomscrolling in bed usually starts as relief. The day is over, nobody needs you for a second, and the phone offers an endless stream of something other than your own thoughts.',
      'The loop becomes sticky because it combines novelty, threat, and low effort. Bad news, social feeds, messages, and short videos all create just enough activation to keep the mind alert while the body gets more tired.',
      'That is why telling yourself to "just stop" rarely works. The phone is not only entertainment. It is acting as a buffer between you and the quiet.'
    ],
    steps: [
      ['Name the real need', 'Ask what the scroll is doing for you tonight: avoiding tomorrow, calming loneliness, delaying sleep, escaping work, or chasing one more hit of novelty. A named need is easier to meet without the feed.'],
      ['Move the phone before you feel ready', 'Do not wait until you feel done. Put the phone on a charger across the room, behind a book, or outside the bedroom. Physical distance beats bedtime willpower.'],
      ['Create a smaller landing strip', 'Choose one low-stimulation action that still gives the mind something to hold: dim light reading, stretching, a shower, breathing, or a Rewire session. The replacement should be easy enough to start while tired.'],
      ['Use a closing phrase', 'Try: "I am not looking for more information. I am looking for a way down." Repeat it when the urge to check returns.'],
      ['Make morning the reward', 'Leave one thing you actually want near the bed: water, clothes for a walk, or a notebook. You are training the brain that sleep creates a better next hour, not just a lost scrolling session.']
    ],
    rewire: [
      'Rewire fits here because doomscrolling is often automatic. You already know the rational argument. What you need is a practiced state change.',
      'A guided session can help your mind rehearse the feeling of putting the day down, letting the nervous system settle, and choosing sleep without turning it into a debate.'
    ],
    ctaHeading: 'Use Rewire when the feed keeps winning',
    ctaCopy: 'Try a calming session as the first replacement after the phone moves across the room. The goal is to make "downshift" feel familiar before the next scroll starts.',
    faq: [
      ['Why do I doomscroll even when I am tired?', 'Because scrolling can feel like control, avoidance, or comfort. The tired brain reaches for the easiest source of stimulation, even when that stimulation keeps sleep away.'],
      ['What should I do instead of doomscrolling?', 'Choose a replacement that requires less friction than sleep but less stimulation than the feed: breathing, stretching, dim reading, journaling one line, or a guided audio reset.'],
      ['Can Rewire help me stop doomscrolling?', 'Rewire can help you rehearse the switch from stimulation to calm. It is not a blocker app; it is a way to train the internal transition that makes the blocker less necessary.']
    ],
    related: ['revenge-bedtime-procrastination', 'stop-checking-work-email-at-night']
  },
  {
    slug: 'revenge-bedtime-procrastination',
    title: 'How to Stop Revenge Bedtime Procrastination Without Making Nights Miserable',
    cardTitle: 'How to stop revenge bedtime procrastination',
    topic: 'Bedtime delay',
    cluster: 'sleep-phone',
    description: 'A practical way to stop revenge bedtime procrastination by giving your mind real evening control before it steals sleep to get it.',
    dek: 'Revenge bedtime procrastination is what happens when the night becomes the only part of the day that feels like yours. Sleep loses to freedom, even when tomorrow pays the bill.',
    readTime: '8 minute read',
    quickReset: 'Give yourself a small, protected "mine" window earlier in the evening, then build a bedtime handoff that does not feel like punishment.',
    why: [
      'The loop is not laziness. It is often a protest. If the day was packed with obligations, bedtime can feel like surrendering the only unscheduled time you had.',
      'The mind resists sleep because sleep means the day is officially over. If the day did not contain enough autonomy, pleasure, or quiet, your brain tries to take it back late at night.',
      'The fix is not a harsher bedtime. The fix is to stop making sleep compete with freedom.'
    ],
    steps: [
      ['Schedule a protected pocket', 'Choose 20 to 40 minutes earlier in the evening that is not productive, not optimized, and not owed to anyone. This is the freedom your brain keeps stealing from sleep.'],
      ['Pick a real ending, not an ideal one', 'A bedtime that requires a perfect evening will fail. Choose a shutdown time you can hit on a messy day, then make that the training target.'],
      ['Separate pleasure from stimulation', 'Keep the pleasure. Lower the voltage. Music, a bath, light reading, or a slow walk can feel like yours without turning into a two-hour scroll.'],
      ['Use the handoff sentence', 'Try: "I had my time. Now sleep protects tomorrow." This tells the mind it is not being robbed.'],
      ['Make the first morning move automatic', 'Set clothes, water, or the first task before bed. Mornings become less threatening when the first step has already been chosen.']
    ],
    rewire: [
      'Rewire helps by practicing a different association: bedtime is not the loss of freedom; it is the move that protects your future self.',
      'Audio is useful at night because you do not need another screen, checklist, or argument. You need a guided path out of negotiation.'
    ],
    ctaHeading: 'Train bedtime to feel like relief',
    ctaCopy: 'Use Rewire at the moment you normally start bargaining for "just one more thing." The session becomes a cleaner handoff from control to rest.',
    faq: [
      ['Why do I avoid sleep even when I want sleep?', 'Because part of you may be protecting autonomy, pleasure, or quiet. The urge is not always about the activity; it is about finally feeling off-duty.'],
      ['How do I stop revenge bedtime procrastination?', 'Give yourself real evening ownership before bedtime, lower stimulation near the end of the night, and use the same shutdown cue until it becomes familiar.'],
      ['Is Rewire a sleep app?', 'Rewire includes sessions that can support calm, sleep, and habit change, but it is broader than sleep. It helps train mental patterns around the moments that keep repeating.']
    ],
    related: ['stop-doomscrolling-in-bed', 'sunday-scaries-before-work']
  },
  {
    slug: 'sunday-scaries-before-work',
    title: 'How to Stop the Sunday Scaries Before Work Takes Over Your Evening',
    cardTitle: 'How to stop the Sunday scaries before work',
    topic: 'Sunday dread',
    cluster: 'work',
    description: 'A Sunday scaries reset for work anxiety: contain Monday planning, calm anticipatory stress, and keep Sunday evening from becoming unpaid work.',
    dek: 'The Sunday scaries are not really about Sunday. They are your nervous system previewing Monday before Monday has arrived.',
    readTime: '8 minute read',
    quickReset: 'Give Monday a 15-minute plan, define the first action, close the preview, and do something physical that proves Sunday is still yours.',
    why: [
      'Sunday dread usually grows in the space between uncertainty and responsibility. Your brain knows work is coming, but it does not know exactly what will happen, so it rehearses everything.',
      'That rehearsal can feel responsible. In reality, it often turns Sunday into an emotional pre-shift.',
      'The goal is not to ignore Monday. The goal is to contain Monday so it stops expanding into the whole evening.'
    ],
    steps: [
      ['Open one controlled planning window', 'Set a timer for 15 minutes. Look at the calendar, choose the first priority, and write the first visible action for Monday morning. Stop when the timer ends.'],
      ['Choose the pressure point', 'Name the one thing most likely to create stress. Then write the response you want to practice: ask for clarity, start small, block focus time, or send the uncomfortable message.'],
      ['Close with a proof sentence', 'Try: "Monday has a place. It is not the rest of Sunday." The sentence works best when paired with closing the laptop or putting the notebook away.'],
      ['Move your body out of work mode', 'Take a walk, shower, stretch, cook, or leave the room. Anticipatory stress needs a physical transition, not just a better thought.'],
      ['Do not keep checking', 'Every extra calendar or email check teaches your brain that Sunday anxiety requires more work scanning. One window is the ritual.']
    ],
    rewire: [
      'Rewire can help you practice the emotional skill Sunday requires: seeing tomorrow clearly without living it early.',
      'A guided session gives your mind a repeatable path from dread to readiness, so the week can be planned without consuming the evening before it starts.'
    ],
    ctaHeading: 'Use Rewire before Sunday becomes Monday',
    ctaCopy: 'Run a session after your 15-minute planning window. Let the plan exist, then train your mind to come back to the evening you are actually in.',
    faq: [
      ['Why do I get anxious on Sunday night?', 'Your brain is anticipating responsibility, uncertainty, and possible pressure before you can act on it. Without a boundary, that preview can take over the evening.'],
      ['How do I stop Sunday scaries fast?', 'Contain planning to a short window, decide Monday’s first action, close work tools, and do a physical transition that marks Sunday as protected time.'],
      ['Can Rewire help with Sunday dread?', 'Rewire can support the transition from anticipatory stress to a calmer, rehearsed response. If dread is severe or constant, professional support is also worth considering.']
    ],
    related: ['leave-work-at-work', 'job-interview-anxiety-night-before']
  },
  {
    slug: 'anxiety-after-sending-a-text',
    title: 'How to Stop Anxiety After Sending a Text',
    cardTitle: 'How to stop anxiety after sending a text',
    topic: 'Text regret',
    cluster: 'social',
    description: 'A practical reset for anxiety after sending a text: stop rereading, reduce mind-reading, and get out of the reply-waiting loop.',
    dek: 'You sent the text. Now your brain is reading it like evidence. The punctuation feels suspicious, the timing feels loaded, and the silence starts writing its own story.',
    readTime: '7 minute read',
    quickReset: 'Stop rereading after one review, separate the text from the story, choose the next allowed check time, and return your attention to something physical.',
    why: [
      'Texting anxiety is powerful because the message leaves your control before the meaning feels settled. Your brain tries to regain control by rereading, editing history, and predicting the reply.',
      'The absence of a response becomes a blank screen where insecurity can project anything.',
      'The way out is to stop treating the sent text as an active problem. It is now data in the world, not a draft in your hands.'
    ],
    steps: [
      ['Read it once for reality', 'If you need to check for an actual typo or missing information, do it once. Then stop. Repeated rereading changes your state more than it improves your understanding.'],
      ['Write the story separately', 'Name the fear: "They think I am needy," "I was too much," or "They will not respond." Seeing the story as a story weakens its authority.'],
      ['Set a check window', 'Choose the next time you are allowed to look. Ten minutes, thirty minutes, or after dinner. The point is to stop letting the phone decide your nervous system.'],
      ['Use your hands', 'Wash a dish, fold laundry, walk, stretch, or make tea. Text anxiety lives in waiting; physical action breaks the waiting posture.'],
      ['Practice the close', 'Try: "I sent it honestly. I do not have to manage the silence." Repeat it when the urge to reread returns.']
    ],
    rewire: [
      'Rewire helps because the loop is rarely about the text alone. It is about approval, uncertainty, rejection, and the old habit of monitoring someone else’s reaction to feel safe.',
      'A session can help you rehearse self-trust before the next message, so sending becomes an ending rather than the beginning of a spiral.'
    ],
    ctaHeading: 'Train the moment after you hit send',
    ctaCopy: 'Use Rewire when the phone starts pulling your attention back. The goal is to practice calm after expression, not control after expression.',
    faq: [
      ['Why do I panic after sending a text?', 'The message is out of your control, and your brain may be trying to protect you from rejection or misunderstanding by replaying it.'],
      ['Should I send another text to fix the anxiety?', 'Usually not immediately. If there is a real correction, make it clearly once. If the urge is reassurance-seeking, pause first.'],
      ['Can Rewire help with texting anxiety?', 'Rewire can help you rehearse a calmer response to uncertainty and approval-seeking loops. It is not a replacement for care if anxiety is overwhelming.']
    ],
    related: ['stop-checking-if-they-replied', 'overthinking-after-first-date']
  },
  {
    slug: 'stop-checking-if-they-replied',
    title: 'How to Stop Checking If They Replied',
    cardTitle: 'How to stop checking if they replied',
    topic: 'Reply checking',
    cluster: 'social',
    description: 'A practical way to stop checking for a reply: break the phone-checking loop, calm uncertainty, and stop outsourcing your state to a notification.',
    dek: 'Checking once is information. Checking every minute is a loop. At some point the phone stops being a tool and starts becoming a nervous-system remote control.',
    readTime: '7 minute read',
    quickReset: 'Pick a reply-checking schedule, remove visual triggers, give the urge a sentence, and do one task that cannot be done while checking.',
    why: [
      'Reply checking is not only curiosity. It is often a tiny attempt to regulate uncertainty. A notification would answer the question, so the brain keeps asking the phone.',
      'The trouble is that checking without a reply does not create closure. It creates a new micro-hit of disappointment, then another need to check.',
      'To break the loop, you need to stop making the phone the authority on whether you are okay.'
    ],
    steps: [
      ['Choose the next check time', 'Do not promise "I will never check." Choose a specific time. This gives the mind structure without surrendering to the compulsion.'],
      ['Hide the trigger', 'Turn the phone face down, move it to another room, or put the conversation out of view. The cue is often stronger than the decision.'],
      ['Label the urge accurately', 'Say: "This is a checking urge, not an emergency." That distinction matters. Urges feel urgent because they are loud, not because they are true.'],
      ['Do an incompatible action', 'Shower, drive, cook, walk, or exercise. Pick something where checking is inconvenient. Friction gives your nervous system time to settle.'],
      ['Let silence be neutral', 'Practice: "No reply yet is not a verdict." You are training the brain to stop turning silence into identity math.']
    ],
    rewire: [
      'Rewire helps with the deeper pattern under reply checking: seeking certainty from outside before you feel settled inside.',
      'The guided audio gives you a repeatable way to practice self-trust while the reply is unknown.'
    ],
    ctaHeading: 'Use Rewire between checks',
    ctaCopy: 'Start a session when you set the next check time. Let that gap become practice instead of punishment.',
    faq: [
      ['Why do I keep checking if someone replied?', 'Because your brain is trying to resolve uncertainty and get reassurance. The check promises relief, but repeated checking usually keeps the loop alive.'],
      ['How long should I wait before checking?', 'Pick a window you can actually keep: ten minutes, thirty minutes, or one hour. The exact time matters less than training that you can wait.'],
      ['Can Rewire help me stop checking my phone?', 'Rewire can support the internal part of the pattern by helping you practice calm while uncertainty is still present.']
    ],
    related: ['anxiety-after-sending-a-text', 'urge-to-text-your-ex-at-night']
  },
  {
    slug: 'overthinking-after-first-date',
    title: 'How to Stop Overthinking After a First Date',
    cardTitle: 'How to stop overthinking after a first date',
    topic: 'Dating anxiety',
    cluster: 'social',
    description: 'A grounded reset for overthinking after a first date: stop replaying signals, reduce anxious attachment loops, and let the date be data.',
    dek: 'A first date can be fun for two hours and then become a mental courtroom for the next two days. Every pause, joke, glance, and text delay suddenly feels like evidence.',
    readTime: '8 minute read',
    quickReset: 'Write what actually happened, separate attraction from uncertainty, decide one honest next action, and stop asking the date to answer your whole self-worth.',
    why: [
      'First-date overthinking grows because the situation is both personal and ambiguous. You want to know if there is potential, but the data is incomplete.',
      'The anxious brain hates incomplete data. It fills gaps with signal-reading: did they laugh enough, text fast enough, ask enough, look away too often?',
      'The reset is to let a first date be what it is: one imperfect data point, not a final verdict on your desirability.'
    ],
    steps: [
      ['Write three facts', 'Keep them plain: where you went, what felt easy, what felt uncertain. Do not include imagined motives in the fact list.'],
      ['Name the self-worth hook', 'Ask what you want the outcome to prove. "I am attractive," "I am chosen," or "I am not behind." That hook is what makes the replay intense.'],
      ['Choose one next action', 'If you want to see them again, send a simple message. If you are unsure, wait. If you are not interested, be kind and clear. One action beats fifty interpretations.'],
      ['Stop polling friends repeatedly', 'One perspective can help. Repeated analysis turns the date into a group project and keeps your nervous system activated.'],
      ['Use the closing line', 'Try: "The date can unfold without me solving it tonight." Then move into something that belongs to your life, not the outcome.']
    ],
    rewire: [
      'Rewire can help train the pattern under dating anxiety: staying connected to yourself while another person’s response is unknown.',
      'A session can support self-worth, rejection resilience, and the ability to let attraction unfold without turning uncertainty into obsession.'
    ],
    ctaHeading: 'Practice calm after the date',
    ctaCopy: 'Use Rewire before you reread the messages again. The session helps your mind return to self-trust while the story is still open.',
    faq: [
      ['Why do I overthink after a first date?', 'Because dating mixes hope, uncertainty, and self-worth. Your brain tries to predict the outcome before enough information exists.'],
      ['Should I text first after a date?', 'If you want to and it feels honest, yes. Keep it simple. The goal is clear expression, not a perfect strategy to control the outcome.'],
      ['Can Rewire help with dating anxiety?', 'Rewire can help you practice confidence, self-worth, and calm around uncertainty. It supports the pattern; it does not guarantee another person’s response.']
    ],
    related: ['anxiety-after-sending-a-text', 'stop-replaying-conversations']
  },
  {
    slug: 'post-meeting-anxiety',
    title: 'How to Stop Post-Meeting Anxiety After You Spoke Up',
    cardTitle: 'How to stop post-meeting anxiety after speaking up',
    topic: 'Meeting replay',
    cluster: 'work',
    description: 'A practical reset for post-meeting anxiety: stop replaying what you said, save the lesson, and build confidence after speaking up at work.',
    dek: 'You finally said the thing in the meeting. Then the meeting ended, and your brain started reviewing your tone, wording, timing, and everyone’s faces like a performance report.',
    readTime: '8 minute read',
    quickReset: 'Capture the actual outcome, save one improvement, refuse the imaginary audience, and reinforce the identity of someone who speaks up.',
    why: [
      'Post-meeting anxiety often appears after visibility. Speaking up exposes you to evaluation, even if nobody is actually evaluating you as harshly as your mind is.',
      'If you have learned to stay safe by being precise, agreeable, or invisible, one normal comment can feel like a social risk.',
      'The aim is not to become careless. The aim is to teach your brain that visibility is survivable.'
    ],
    steps: [
      ['Write the real outcome', 'Did anyone object? Did work continue? Did the meeting end normally? Start with observable evidence before interpretation.'],
      ['Choose one craft note', 'If there is a useful improvement, make it specific: "lead with the recommendation," "pause before answering," or "ask for data." One note is growth. Ten notes is punishment.'],
      ['Refuse the imaginary audience', 'Say: "I do not know what everyone thought, and I do not need to audition after the meeting is over."'],
      ['Send a follow-up only if it serves the work', 'Clarify if needed. Do not send a message just to neutralize anxiety. That teaches anxiety to manage your communication.'],
      ['Reward the identity', 'Tell yourself: "I am someone who contributes." The brain needs to connect speaking up with safety, not only scrutiny.']
    ],
    rewire: [
      'Rewire helps with the identity layer of post-meeting anxiety. You can know logically that speaking up matters and still feel a body-level threat afterward.',
      'A guided session can help rehearse steadiness, confidence, and recovery after visibility so your nervous system stops treating every comment as exposure.'
    ],
    ctaHeading: 'Use Rewire after visibility',
    ctaCopy: 'Run a confidence or hard-conversation session after meetings that spike replay. Train your mind to recover, not retreat.',
    faq: [
      ['Why do I feel anxious after speaking in a meeting?', 'Visibility can trigger fear of judgment, rejection, or making a mistake. The anxiety often arrives after the meeting because the mind finally has room to replay.'],
      ['Should I apologize after a meeting if I feel awkward?', 'Only apologize if you caused real harm or confusion. Do not apologize just because your nervous system feels exposed.'],
      ['Can Rewire help me speak up at work?', 'Rewire can help you practice confidence, steadiness, and recovery after speaking. It supports repetition of a new internal response.']
    ],
    related: ['stop-replaying-conversations', 'leave-work-at-work']
  },
  {
    slug: 'stop-checking-work-email-at-night',
    title: 'How to Stop Checking Work Email at Night',
    cardTitle: 'How to stop checking work email at night',
    topic: 'After-hours checking',
    cluster: 'work',
    description: 'A practical reset to stop checking work email at night: define urgency, add friction, close open loops, and train your brain to stand down.',
    dek: 'One quick email check rarely stays quick. It reopens the work identity, restarts the threat scan, and tells your brain that nighttime anxiety should be solved by looking at work again.',
    readTime: '7 minute read',
    quickReset: 'Define the true emergency channel, move email off the path of least resistance, and give your brain a trusted parking lot for tomorrow.',
    why: [
      'Night email checking is often a safety behavior. It feels like responsibility, but it can become a way to neutralize anxiety.',
      'The problem is that every check teaches the nervous system that rest is conditional. You are allowed to relax only after confirming there is no threat.',
      'The reset is to make urgency explicit and make non-urgent checking inconvenient.'
    ],
    steps: [
      ['Define the emergency rule', 'Write what actually requires nighttime attention. If everything is an emergency, nothing is a boundary.'],
      ['Separate channels', 'Let true emergencies come through one channel, like a call or specific text. Email should not be the emergency room unless your role truly requires it.'],
      ['Remove the visual cue', 'Take email off the home screen, disable badges, or use Focus mode. The cue often creates the urge before a conscious decision happens.'],
      ['Capture tomorrow’s first action', 'If a work thought appears, write the next action on paper. Do not reopen the inbox to store it.'],
      ['Close the loop out loud', 'Try: "If it matters tonight, it has a channel. If it is email, it is tomorrow."']
    ],
    rewire: [
      'Rewire can help train the felt sense that you can be responsible without being constantly available.',
      'Use a session after setting the boundary so the mind rehearses calm instead of scanning for the next exception.'
    ],
    ctaHeading: 'Train your brain to stand down',
    ctaCopy: 'Use Rewire after your work shutdown ritual. The goal is to make rest feel allowed, not earned by another inbox check.',
    faq: [
      ['Why do I check work email at night?', 'It may feel like control, responsibility, or prevention. But repeated checking can train your brain to treat rest as unsafe.'],
      ['How do I stop checking email after work?', 'Define true urgency, remove email cues, capture work thoughts elsewhere, and practice the same shutdown sentence each night.'],
      ['Can Rewire help with work boundaries?', 'Rewire can support the internal boundary by helping you rehearse calm, trust, and follow-through after work ends.']
    ],
    related: ['leave-work-at-work', 'sunday-scaries-before-work']
  },
  {
    slug: 'public-speaking-shaky-voice',
    title: 'How to Stop a Shaky Voice During Public Speaking',
    cardTitle: 'How to stop a shaky voice during public speaking',
    topic: 'Speaking nerves',
    cluster: 'performance',
    description: 'A practical reset for a shaky voice during public speaking: calm the body, slow the first sentence, and train steadier presentation confidence.',
    dek: 'A shaky voice can feel like your body announcing fear before you get a chance to speak. The trick is not to hide every sign of nerves. It is to give the body a steadier opening sequence.',
    readTime: '8 minute read',
    quickReset: 'Exhale longer than you inhale, slow the first sentence, plant your feet, and give your voice one warm-up line before the real point.',
    why: [
      'Your voice shakes when the body is in threat mode. Breathing gets higher, muscles tighten, and the voice has to pass through a system preparing for danger.',
      'Most people try to solve this by thinking harder. But a shaky voice is often a body state first, not a logic problem.',
      'The reset is to control the first 20 seconds: breath, pace, posture, and attention.'
    ],
    steps: [
      ['Extend the exhale before speaking', 'Use two or three breaths where the exhale is longer than the inhale. This signals the body that it does not need to sprint.'],
      ['Start 20 percent slower', 'The first sentence sets the tempo. Nervous speakers often rush the opening, then chase themselves. Slow the first line on purpose.'],
      ['Give the voice a runway', 'Begin with a simple orienting sentence: "I want to start with the problem." It lets your voice enter before the highest-stakes idea.'],
      ['Plant attention outside yourself', 'Look at one friendly face or one object. The more you monitor your voice, the more unstable it can feel.'],
      ['Practice recovery, not perfection', 'If your voice shakes, pause and continue. The real confidence signal is not never shaking; it is not abandoning yourself when it happens.']
    ],
    rewire: [
      'Rewire helps by rehearsing the state beneath the performance: steadiness, safety in visibility, and the identity of someone who can be heard.',
      'Use it before practice sessions, not only before the big moment. Your nervous system trusts what it has repeated.'
    ],
    ctaHeading: 'Rehearse steadiness before the room',
    ctaCopy: 'Try a Rewire session for public speaking, confidence, or pressure before your next presentation. Train the opening state before you need it.',
    faq: [
      ['Why does my voice shake when public speaking?', 'A shaky voice usually comes from nervous-system activation: tighter breathing, muscle tension, and fear of being evaluated.'],
      ['How do I stop my voice from shaking fast?', 'Lengthen the exhale, slow the first sentence, plant your feet, and pause instead of rushing through the shake.'],
      ['Can Rewire help with public speaking nerves?', 'Rewire can help you practice steadiness and confidence before speaking. It supports training; it does not replace medical care for severe anxiety.']
    ],
    related: ['job-interview-anxiety-night-before', 'salary-negotiation-nerves']
  },
  {
    slug: 'job-interview-anxiety-night-before',
    title: 'How to Calm Job Interview Anxiety the Night Before',
    cardTitle: 'How to calm job interview anxiety the night before',
    topic: 'Interview nerves',
    cluster: 'performance',
    description: 'A night-before job interview anxiety reset: prepare enough, stop rehearsing everything, sleep better, and walk in with a steadier mind.',
    dek: 'The night before an interview, preparation can quietly turn into panic rehearsal. You are no longer getting sharper. You are teaching your body that tomorrow is a threat.',
    readTime: '8 minute read',
    quickReset: 'Prepare three stories, choose tomorrow’s logistics, close the rehearsal window, and use sleep as part of the performance plan.',
    why: [
      'Interview anxiety spikes because the outcome matters and the evaluation feels personal. Your brain wants certainty before an uncertain event.',
      'Over-preparing can become a way to chase that certainty. After a point, each extra rehearsal produces more activation than readiness.',
      'The night-before goal is not to know everything. It is to trust enough, sleep enough, and arrive regulated enough to use what you know.'
    ],
    steps: [
      ['Pick three proof stories', 'Choose one story for solving a problem, one for working with people, and one for learning fast. These can flex across many questions.'],
      ['Decide the logistics once', 'Clothes, route, time, documents, links, and first alarm. Remove tomorrow’s avoidable decisions before bed.'],
      ['Set a rehearsal cutoff', 'Choose the last time you will practice. After that, only light review is allowed. Your brain needs a finish line.'],
      ['Write the fear and the response', 'Example: "I will blank." Response: "I can pause, breathe, and answer the question in parts." Prepare recovery, not perfection.'],
      ['Use a downshift ritual', 'Dim light, phone away, longer exhales, and one calming audio session. Sleep is part of interview prep.']
    ],
    rewire: [
      'Rewire can help you rehearse confidence and recovery before the interview, especially the moment where nerves show up and you keep going anyway.',
      'It is useful the night before because you need a guided off-ramp from preparation into rest.'
    ],
    ctaHeading: 'Practice confidence before the interview',
    ctaCopy: 'Use Rewire after your final prep window. Let your mind rehearse steadiness instead of rehearsing every possible question.',
    faq: [
      ['How do I calm interview anxiety the night before?', 'Limit preparation to flexible proof stories and logistics, set a rehearsal cutoff, and downshift your body before bed.'],
      ['Should I keep practicing interview answers late at night?', 'Usually no. Past a certain point, late practice can increase activation and reduce sleep. Practice recovery and calm instead.'],
      ['Can Rewire help before an interview?', 'Rewire can support confidence, calm, and mental rehearsal. It helps you practice the state you want to bring into the room.']
    ],
    related: ['public-speaking-shaky-voice', 'salary-negotiation-nerves']
  },
  {
    slug: 'salary-negotiation-nerves',
    title: 'How to Calm Salary Negotiation Nerves Before Asking for More',
    cardTitle: 'How to calm salary negotiation nerves',
    topic: 'Negotiation',
    cluster: 'performance',
    description: 'A practical reset for salary negotiation nerves: steady your voice, stop apologizing, and ask for more without spiraling before the conversation.',
    dek: 'Salary negotiation nerves are not just about money. They are about being seen wanting something, risking a no, and staying steady while another person evaluates the ask.',
    readTime: '8 minute read',
    quickReset: 'Write the number, write the reason, rehearse the pause after the ask, and train your body not to apologize for wanting fair value.',
    why: [
      'Negotiation can trigger old patterns: people-pleasing, fear of conflict, fear of rejection, or the belief that asking makes you difficult.',
      'The nervous system may push you to soften, over-explain, fill silence, or accept too quickly just to end the discomfort.',
      'The skill is not aggression. It is calm clarity held through a few uncomfortable seconds.'
    ],
    steps: [
      ['Write the ask in one sentence', 'Example: "Based on the scope and market range, I am looking for X." The sentence should be clear enough that nerves cannot rewrite it mid-call.'],
      ['Prepare three reasons, not ten', 'Use scope, outcomes, market data, responsibility, or competing expectations. Too many reasons can sound like pleading and make you feel less anchored.'],
      ['Rehearse the pause', 'After the ask, stop talking. Silence may feel dangerous, but filling it often weakens the ask. Practice the pause before the meeting.'],
      ['Plan the first response to no', 'Try: "Can you help me understand what would need to be true to get there?" Curiosity keeps you steady.'],
      ['Remove apology language', 'Do not start with "Sorry" or "I know this is awkward." You can be warm without shrinking the request.']
    ],
    rewire: [
      'Rewire helps with the internal permission layer: the ability to ask, hold silence, and stay regulated when a no is possible.',
      'A session before negotiation can train the body to associate asking with steadiness rather than danger.'
    ],
    ctaHeading: 'Rehearse the ask before you make it',
    ctaCopy: 'Use Rewire before salary conversations, raises, freelance pricing, or any moment where you need to ask without abandoning yourself.',
    faq: [
      ['Why do I get nervous negotiating salary?', 'Negotiation combines money, evaluation, and possible rejection. If you learned to stay safe by pleasing people, asking directly can feel threatening.'],
      ['How do I stop apologizing during negotiation?', 'Write your ask in advance, remove apology language, and practice pausing after the sentence instead of filling silence.'],
      ['Can Rewire help with negotiation confidence?', 'Rewire can help you rehearse confidence, self-worth, and calm under pressure before the conversation.']
    ],
    related: ['public-speaking-shaky-voice', 'job-interview-anxiety-night-before']
  },
  {
    slug: 'stop-late-night-stress-snacking',
    title: 'How to Stop Late-Night Stress Snacking After a Hard Day',
    cardTitle: 'How to stop late-night stress snacking',
    topic: 'Stress eating',
    cluster: 'habits',
    description: 'A practical reset for late-night stress snacking: identify the emotional cue, reduce friction, and build a calmer after-dinner routine.',
    dek: 'Late-night stress snacking is often less about hunger and more about changing state. Food becomes the fastest available transition from tense, depleted, or lonely into briefly soothed.',
    readTime: '8 minute read',
    quickReset: 'Pause for one minute, name the state you want food to change, choose a non-food downshift first, and make the next snack intentional rather than automatic.',
    why: [
      'After a hard day, the brain wants relief that is immediate and reliable. Snacks are easy, sensory, and familiar, so they become a default self-soothing route.',
      'The goal is not shame or restriction. Shame tends to intensify the loop. The goal is to add a moment of choice before the automatic pattern completes.',
      'If you are hungry, eat. If you are stressed, give stress a direct pathway too.'
    ],
    steps: [
      ['Ask what state you are trying to change', 'Are you tense, lonely, bored, overstimulated, angry, or under-rewarded? The answer tells you what the snack is doing emotionally.'],
      ['Add a 90-second buffer', 'Drink water, breathe with a longer exhale, or step outside. You are not forbidding the snack. You are interrupting autopilot.'],
      ['Choose a direct soothe first', 'If you need comfort, use warmth. If you need reward, use music. If you need decompression, use quiet. Give the real need a route.'],
      ['Make eating intentional if you still want it', 'Put the snack in a bowl, sit down, and eat it without scrolling. This turns the pattern from trance into choice.'],
      ['Design tomorrow’s friction', 'Keep high-trigger foods out of the easiest path and put a better default in view. Environment beats nightly negotiation.']
    ],
    rewire: [
      'Rewire helps with the habit loop underneath the snack: cue, state change, reward, repeat.',
      'A session can help rehearse a new after-dinner identity where comfort is available without sliding straight into autopilot.'
    ],
    ctaHeading: 'Train the pause before the pantry',
    ctaCopy: 'Use Rewire during the 90-second buffer or after dinner. The aim is not self-punishment; it is giving your mind a different route to relief.',
    faq: [
      ['Why do I snack late at night after stress?', 'Your brain may be using food as a fast state change after tension, depletion, boredom, or loneliness.'],
      ['How do I stop stress snacking without shame?', 'Name the emotional cue, add a short pause, meet the real need directly, and make any snack intentional rather than automatic.'],
      ['When should I get extra help?', 'If eating feels out of control, tied to intense shame, or affects your health, consider support from a qualified professional. Rewire can support habit practice but is not medical treatment.']
    ],
    related: ['revenge-bedtime-procrastination', 'stop-doomscrolling-in-bed']
  },
  {
    slug: 'urge-to-text-your-ex-at-night',
    title: 'How to Stop the Urge to Text Your Ex at Night',
    cardTitle: 'How to stop the urge to text your ex at night',
    topic: 'Breakup loop',
    cluster: 'social',
    description: 'A night-time reset for the urge to text your ex: ride out the wave, save your dignity, and stop using one message to reopen the wound.',
    dek: 'The urge to text your ex often arrives when the day gets quiet. It can feel like love, closure, anger, loneliness, or one last attempt to make the ache mean something different.',
    readTime: '8 minute read',
    quickReset: 'Delay the text by 24 hours, write the message somewhere private, name the emotional need underneath it, and do one action that protects tomorrow-you.',
    why: [
      'Night makes old attachment loops louder. You are tired, less defended, and more likely to confuse intensity with truth.',
      'The text promises relief: an answer, a reaction, a repair, a hit of connection. But it can also reset the healing clock.',
      'The aim is not to deny the feeling. The aim is to stop making your future depend on sending one message from a vulnerable state.'
    ],
    steps: [
      ['Use the 24-hour rule', 'You can write anything. You cannot send it tonight. If it still feels wise tomorrow, you can decide from a steadier place.'],
      ['Write the unsent version', 'Put every sentence in notes or on paper. Let the emotion move without handing it to the other person.'],
      ['Name the real ask', 'Are you asking for comfort, proof you mattered, punishment, closure, or a way out of loneliness? That need deserves care even if the text is not the answer.'],
      ['Protect tomorrow-you', 'Move the chat out of sight, give your phone to another room, shower, walk, or start a guided session. Make not-sending an active choice.'],
      ['Close with dignity', 'Try: "I can miss them without reopening myself tonight." Repeat it until the wave lowers.']
    ],
    rewire: [
      'Rewire can help with letting go, rejection, self-worth, and the body-level habit of reaching for contact when pain spikes.',
      'A guided session gives the urge somewhere to go that is not the message thread.'
    ],
    ctaHeading: 'Use Rewire before you reopen the thread',
    ctaCopy: 'Start a session during the 24-hour delay. Let the feeling move through without making your phone the exit.',
    faq: [
      ['Why do I want to text my ex at night?', 'Night can amplify loneliness, attachment, regret, and the desire for closure. The urge may be real, but that does not mean sending is wise tonight.'],
      ['Should I text my ex for closure?', 'Sometimes a clear conversation helps, but late-night urgency is not the best decision-maker. Wait until you can choose from steadiness, not pain.'],
      ['Can Rewire help after a breakup?', 'Rewire can support letting go, self-worth, and emotional regulation during breakup loops. It is support for practice, not a guarantee about the relationship.']
    ],
    related: ['stop-checking-if-they-replied', 'overthinking-after-first-date']
  }
];

const articles = [...existingArticles, ...newArticles];
const articleBySlug = new Map(articles.map(article => [article.slug, article]));

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const json = value => JSON.stringify(value, null, 2).replaceAll('</script', '<\\/script');

const appleIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702"/></svg>';

function renderHead({ title, description, slug, type = 'article', schema }) {
  const url = `${site}/guides/${slug ? `${slug}/` : ''}`;
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${escapeHtml(title)} - Rewire</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#13223F">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="${type}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="${favicon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/guides/styles.css">
  <script type="application/ld+json">
${json(schema).split('\n').map(line => `    ${line}`).join('\n')}
  </script>`;
}

function articleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `${site}/guides/${article.slug}/`,
        datePublished: date,
        dateModified: date,
        author: { '@type': 'Organization', name: 'Rewire' },
        publisher: { '@type': 'Organization', name: 'Kramer Ventures GmbH' },
        mainEntityOfPage: `${site}/guides/${article.slug}/`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${site}/guides/` },
          { '@type': 'ListItem', position: 3, name: article.cardTitle, item: `${site}/guides/${article.slug}/` }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }
    ]
  };
}

function renderArticle(article) {
  const related = article.related
    .map(slug => articleBySlug.get(slug))
    .filter(Boolean)
    .map(item => `<li><a href="/guides/${item.slug}/">${escapeHtml(item.cardTitle)}</a></li>`)
    .join('\n          ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${renderHead({ title: article.title, description: article.description, slug: article.slug, schema: articleSchema(article) })}
</head>
<body>

  <a class="corner brand" href="/">Rewire</a>
  <a class="corner contact" href="mailto:team@rewiremission.com">Contact</a>

  <main class="page">
    <header>
      <p class="eyebrow">${escapeHtml(article.topic)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="dek">${escapeHtml(article.dek)}</p>
      <p class="meta">Updated June 15, 2026 | Rewire Team | ${escapeHtml(article.readTime)}</p>
    </header>

    <article>
      <div class="callout">
        <p><strong>Fast reset:</strong> ${escapeHtml(article.quickReset)}</p>
      </div>

      <h2>Why this loop happens</h2>
${article.why.map(paragraph => `      <p>${escapeHtml(paragraph)}</p>`).join('\n')}

      <h2>A practical reset</h2>
      <ol class="steps">
${article.steps.map(([heading, text]) => `        <li><strong>${escapeHtml(heading)}.</strong> ${escapeHtml(text)}</li>`).join('\n')}
      </ol>

      <h2>Where Rewire fits</h2>
${article.rewire.map(paragraph => `      <p>${escapeHtml(paragraph)}</p>`).join('\n')}

      <div class="cta-box">
        <h2>${escapeHtml(article.ctaHeading)}</h2>
        <p>${escapeHtml(article.ctaCopy)}</p>
        <a class="store" href="${appStoreUrl}" rel="noopener">
          ${appleIcon}
          Get Rewire on iPhone
        </a>
      </div>

      <h2>When to get extra support</h2>
      <p>If this pattern feels compulsive, is tied to panic, trauma, depression, self-harm thoughts, disordered eating, or makes daily life hard to function in, consider support from a qualified professional. Rewire can support reflection and practice, but it is not emergency care or a replacement for medical treatment.</p>

      <h2>FAQ</h2>
${article.faq.map(([question, answer]) => `      <h3>${escapeHtml(question)}</h3>\n      <p>${escapeHtml(answer)}</p>`).join('\n\n')}

      <div class="related">
        <h2>Related guides</h2>
        <ul>
          ${related}
        </ul>
      </div>
    </article>

    <footer>
      <a href="/">Home</a><span class="sep">·</span><a href="/guides/">Guides</a><span class="sep">·</span><a href="/privacy">Privacy</a><span class="sep">·</span><a href="/terms">Terms</a><br>
      &copy; 2026 Kramer Ventures GmbH<br>Based in Zurich, Switzerland
    </footer>
  </main>

</body>
</html>
`;
}

function renderIndex() {
  const itemList = articles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${site}/guides/${article.slug}/`,
    name: article.title
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Rewire Guides',
    url: `${site}/guides/`,
    description: 'Specific Rewire guides for mental loops, work stress, phone habits, dating anxiety, performance pressure, and nighttime overthinking.',
    mainEntity: { '@type': 'ItemList', itemListElement: itemList }
  };

  const nav = clusters.map(cluster => `<a href="#${cluster.id}">${cluster.name}</a>`).join('\n      ');

  const sections = clusters.map(cluster => {
    const cards = articles
      .filter(article => article.cluster === cluster.id)
      .map(article => `        <a class="guide-card" href="/guides/${article.slug}/">
          <span class="topic">${escapeHtml(article.topic)}</span>
          <div>
            <h3>${escapeHtml(article.cardTitle)}</h3>
            <p>${escapeHtml(article.description)}</p>
          </div>
        </a>`)
      .join('\n');

    return `    <section class="cluster" id="${cluster.id}">
      <h2>${cluster.name}</h2>
      <div class="guide-grid">
${cards}
      </div>
    </section>`;
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${renderHead({
  title: 'Niche Guides for Mental Loops, Work Stress, Phone Habits, and Confidence',
  description: 'Specific Rewire guides for loops people search for at night: doomscrolling, Sunday scaries, texting anxiety, work email, speaking nerves, and more.',
  slug: '',
  type: 'website',
  schema
})}
</head>
<body>

  <a class="corner brand" href="/">Rewire</a>
  <a class="corner contact" href="mailto:team@rewiremission.com">Contact</a>

  <main class="page hub">
    <p class="eyebrow">Guides</p>
    <h1>Specific tools for specific loops.</h1>
    <p class="dek">Rewire is built for the exact moments people quietly search for help: the phone in bed, the message with no reply, the Sunday dread, the meeting replay, the shaky voice, and the habit that keeps repeating.</p>
    <nav class="cluster-nav" aria-label="Guide categories">
      ${nav}
    </nav>

${sections}

    <footer>
      <a href="/">Home</a><span class="sep">·</span><a href="/privacy">Privacy</a><span class="sep">·</span><a href="/terms">Terms</a><br>
      &copy; 2026 Kramer Ventures GmbH<br>Based in Zurich, Switzerland
    </footer>
  </main>

</body>
</html>
`;
}

function renderSitemap() {
  const urls = [
    { loc: `${site}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${site}/guides/`, priority: '0.9', changefreq: 'weekly' },
    ...articles.map(article => ({
      loc: `${site}/guides/${article.slug}/`,
      priority: '0.85',
      changefreq: 'monthly'
    })),
    { loc: `${site}/contact/`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${site}/privacy/`, priority: '0.2', changefreq: 'yearly' },
    { loc: `${site}/terms/`, priority: '0.2', changefreq: 'yearly' }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

for (const article of newArticles) {
  const dir = join(root, 'guides', article.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderArticle(article));
}

writeFileSync(join(root, 'guides', 'index.html'), renderIndex());
writeFileSync(join(root, 'sitemap.xml'), renderSitemap());

console.log(`Generated ${newArticles.length} guide pages, guides/index.html, and sitemap.xml.`);
