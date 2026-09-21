# BDAY 2026

A beautiful, interactive birthday wish web app built with Next.js, Tailwind CSS, and Framer Motion.

## How It Works

The app unfolds in three phases:

### Phase 1: The Anticipation (Countdown)
A deep ambient background (dark purples and indigo) with a centered frosted-glass panel. Inside the panel, a minimalist countdown timer ticks down the hours, minutes, and seconds to the target time.

- **Target Time:** 3:00 AM Hong Kong Time (UTC+8) on September 21, 2026
- **Early Arrival:** If opened before the target time, the live countdown displays
- **Late/On-Time Arrival:** If opened at or after the target time, the timer is bypassed — a 3–4 second ambient breathing delay plays before the letter begins
- When the timer hits `00:00:00`, the numbers dissolve into the glass, followed by a 3-second breathing delay

### Phase 2: The Unfolding (Letter & Wish)
The background softly lightens to pastel pink and soft red hues. Inside the glass panel, the letter materializes line-by-line using a gentle fade-in effect with Framer Motion's `staggerChildren`. The final line is the grand "Happy Birthday" wish with a subtle glowing emphasis. A "Next" button gently fades in after the letter completes.

### Phase 3: The Digital Scrapbook ("how i see u")
When she clicks "Next," the letter gracefully melts away. The phrase *"how i see u"* fades into the center briefly, then dissolves to reveal a frameless image carousel with 3 symbolic images. As she navigates between photos, the ambient background colors shift smoothly to match the vibe of each picture.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Letter Content
Edit the `letterLines` array in `components/LetterPhase.tsx` to personalize the message.

### Scrapbook Images
Edit the `slides` array in `components/ScrapbookPhase.tsx` to change the symbolic images, captions, and gradients.

### Target Time
Edit the `TARGET_ISO_UTC` constant in `app/page.tsx` to change the unlock time.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Framer Motion 11**
- **TypeScript**
