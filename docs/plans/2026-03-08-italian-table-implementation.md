# "The Italian Table" Visual Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign all pages of the OG training portal to feel like full restaurant immersion — dark wood textures, OG brand photography, cream place-card content areas, and a meal/course metaphor.

**Architecture:** Modify existing pages in-place. Add wood texture as global background via CSS. Update each page component (login, dashboard, learn, leaderboard) to use cream card surfaces, OG photography, and decorative script elements. Update sections data to reference extracted brand photos.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, existing Playfair Display + Crimson Pro fonts

**Design doc:** `docs/plans/2026-03-08-italian-table-design.md`

---

## Task 1: Global Design System — Wood Background + Card Utilities

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Add wood texture background and card utilities to globals.css**

Add after the existing `body` styles in `globals.css`:

```css
/* ──────────────────────────────────────────────
   Wood Table Background
   ────────────────────────────────────────────── */

.wood-bg {
  background-image: url('/images/og-extracted/page4-img4.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* Vignette overlay for depth */
.wood-vignette::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(28, 14, 5, 0.6) 100%);
}

/* ──────────────────────────────────────────────
   Cream Place Card
   ────────────────────────────────────────────── */

.cream-card {
  background-color: var(--og-cream);
  color: var(--og-dark);
  border-radius: 12px;
  border: 1px solid rgba(84, 48, 26, 0.15);
  box-shadow: 0 4px 20px rgba(28, 14, 5, 0.3);
}

/* ──────────────────────────────────────────────
   Photo Strip — full-width image divider
   ────────────────────────────────────────────── */

.photo-strip {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.photo-strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.photo-strip::before,
.photo-strip::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 2;
  pointer-events: none;
}

.photo-strip::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(28, 14, 5, 0.8), transparent);
}

.photo-strip::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(28, 14, 5, 0.8), transparent);
}

/* ──────────────────────────────────────────────
   Olive Branch Divider
   ────────────────────────────────────────────── */

.olive-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px 0;
}

.olive-divider::before,
.olive-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(84, 48, 26, 0.3), transparent);
}

/* ──────────────────────────────────────────────
   Script Heading — italic display for OG feel
   ────────────────────────────────────────────── */

.script-heading {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  line-height: 1.2;
}

/* ──────────────────────────────────────────────
   Quote Block — wood background with script text
   ────────────────────────────────────────────── */

.wood-quote {
  position: relative;
  background-image: url('/images/og-extracted/page4-img4.jpg');
  background-size: cover;
  background-position: center;
  padding: 3rem 2rem;
  text-align: center;
  overflow: hidden;
}

.wood-quote::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(28, 14, 5, 0.5);
}

.wood-quote p {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  color: var(--og-cream);
  font-size: 1.5rem;
  line-height: 1.4;
}
```

**Step 2: Update layout.tsx to add wood background**

In `src/app/layout.tsx`, update the body wrapper div:

```tsx
<div className="grain-overlay wood-bg wood-vignette min-h-screen">
  {children}
</div>
```

**Step 3: Verify the wood background renders**

Run: `npm run dev`
Expected: All pages show dark wood texture background with vignette edges and grain overlay.

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "style: add wood texture background and cream card design system"
```

---

## Task 2: Update Section Data — Brand Photography

**Files:**
- Modify: `src/lib/sections.ts`

**Step 1: Update heroImage references to use extracted OG brand photos**

Replace the `SECTIONS` array's `heroImage` values:

```typescript
export const SECTIONS: Section[] = [
  {
    id: "welcome",
    title: "Welcome",
    slug: "why-this-matters",
    order: 1,
    points: 100,
    description: "Olive Garden's AI vision and why Claude Code matters",
    heroImage: "og-extracted/page7-img5.jpg",
    accentColor: "#A8AD00",
  },
  {
    id: "what-is-claude-code",
    title: "What is Claude Code?",
    slug: "what-is-claude-code",
    order: 2,
    points: 100,
    description: "Overview, capabilities, and what sets it apart",
    heroImage: "og-extracted/page5-img1.jpg",
    accentColor: "#28939D",
  },
  {
    id: "claude-at-clutch",
    title: "Claude @ Olive Garden",
    slug: "claude-at-clutch",
    order: 3,
    points: 150,
    description: "How every role at Olive Garden — from leaders to engineers — uses Claude",
    heroImage: "og-extracted/page6-img1.jpg",
    accentColor: "#CA7C30",
  },
  {
    id: "the-rules",
    title: "The Rules",
    slug: "the-rules",
    order: 4,
    points: 150,
    description: "Responsible AI: Claude represents you, data safety, and guardrails",
    heroImage: "og-extracted/page5-img5.jpg",
    accentColor: "#A2402A",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    slug: "getting-started",
    order: 5,
    points: 100,
    description: "Setup, resources, and your first steps with Claude Code",
    heroImage: "og-extracted/page5-img4.jpg",
    accentColor: "#A8AD00",
  },
  {
    id: "whats-next",
    title: "What's Next",
    slug: "whats-next",
    order: 6,
    points: 100,
    description: "Preview of your facilitated session and how to come prepared",
    heroImage: "og-extracted/page7-img4.jpg",
    accentColor: "#28939D",
  },
];
```

**Step 2: Commit**

```bash
git add src/lib/sections.ts
git commit -m "data: update section hero images to OG brand photography"
```

---

## Task 3: Login Page Redesign

**Files:**
- Modify: `src/app/login/page.tsx`

**Step 1: Rewrite the login page**

Replace entire file with the "Italian Table" login design:
- Full-screen wood background (inherited from layout)
- OG logo with tagline image (`page1-img1.jpg`) centered at top
- Cream sign-in card centered below
- Script heading "Welcome to the Table"
- Ambient food photography on sides (desktop only) with heavy dark overlay
- Script quote watermark at bottom

Key implementation details:
- Remove the left/right split layout, replace with centered single-column
- Logo: `<Image src="/images/og-extracted/page1-img1.jpg" />` as a wide banner, max-width ~500px
- Card: `cream-card` class with padding, containing form elements
- Google button: OG brown background (`bg-og-brown text-og-cream`), olive green hover
- Guest link: subtle, below the button
- Side images (desktop): absolute positioned, opacity 20%, blur(2px), with dark gradient overlay
- Bottom quote: `page3-img2.jpg` as a faint (opacity 15%) decorative element

**Step 2: Verify login page renders correctly**

Run: `npm run dev`, navigate to `/login`
Expected: Centered card on wood background, OG logo above, warm cream card with sign-in form.

**Step 3: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "feat: redesign login page with Italian Table aesthetic"
```

---

## Task 4: Dashboard Page Redesign

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Step 1: Redesign the nav bar**

Replace the existing nav with:
- Wood-toned brown background (`bg-og-brown/90 backdrop-blur-sm`)
- OG logo image (small, `page1-img2.jpg`) left-aligned, max-height ~40px
- Nav links: "Dashboard" (active, cream), "Leaderboard" (warm gray)
- User info + avatar right-aligned
- Olive green accent line at bottom: `border-b-2 border-og-green`

**Step 2: Redesign the hero section as "Welcome" cream banner**

Replace the dark hero with:
- A `cream-card` banner at the top (below nav)
- Script heading: "Welcome back, [Name]"
- Circular progress ring (SVG) styled as a "plate" — olive green arc on warm gray circle, points in center
- Text: "2 of 6 courses completed"
- Remove the old large heading/progress bar, replace with this warmer card approach

**Step 3: Add the breadstick photo strip below hero**

After the welcome card:
- Full-width `photo-strip` using `page5-img5.jpg` (breadsticks + salad)
- Warm gradient fades top and bottom blending into wood

**Step 4: Redesign section cards as cream "place cards"**

Replace the existing `SectionCard` component:
- `cream-card` base with overflow-hidden
- Top: food/people photo banner (`heroImage` from section data), height ~160px, object-cover
- Below photo: padding with section title (Playfair bold, `text-og-dark`), description (Crimson Pro, `text-og-dark/70`)
- Points badge: olive green pill, positioned top-right over photo
- Completed: olive green left border (4px), warm checkmark badge
- Locked/upcoming: slight opacity reduction
- Hover: `translateY(-4px)` + shadow deepens
- Grid heading: script heading "Your Menu" in cream text above grid

**Step 5: Redesign leaderboard preview**

Replace with a cream card:
- Script heading: "Family Standings"
- Simple list of top 3 with rank, avatar, name, points
- Teal "View Full Leaderboard" link
- Family dining photo strip (`page7-img5.jpg`) above the card

**Step 6: Verify dashboard renders correctly**

Run: `npm run dev`, navigate to `/dashboard`
Expected: Wood background, cream nav, welcome card with progress plate, breadstick photo strip, cream section cards with OG photos, leaderboard preview.

**Step 7: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: redesign dashboard with Italian Table aesthetic"
```

---

## Task 5: Lesson Page Redesign

**Files:**
- Modify: `src/app/learn/[slug]/page.tsx`

**Step 1: Add the nav bar (same as dashboard)**

Add the same wood-toned nav from Task 4 at the top.

**Step 2: Redesign lesson header**

Replace current header with:
- `cream-card` banner, max-width ~780px, centered
- Section photo as wide banner at top of card (from `heroImage`)
- Script heading: lesson title
- Crimson Pro italic subtitle: section description
- Olive green points badge pill
- Olive branch divider below

**Step 3: Restyle content blocks**

Update each block type renderer:
- **Text:** Crimson Pro on cream card surface, line-height 1.8, max-width ~680px
- **Quote:** Full-width breakout `wood-quote` class — dark wood background strip with cream script text
- **Callout:** `cream-card` with colored left border (orange `#CA7C30` for tips, teal `#28939D` for info)
- **Video:** `cream-card` with brown border, Playfair title
- **Link:** `cream-card` with olive green left border, teal link text
- **Glossary:** `cream-card` with expandable accordion, Playfair bold terms, olive green chevrons

**Step 4: Add food photo strip dividers**

Every 2-3 blocks, insert a `photo-strip` with a different OG food image. Use images from extracted set: `page5-img1.jpg`, `page5-img4.jpg`, `page5-img5.jpg` etc., cycling through them.

**Step 5: Add scroll progress bar**

Fixed at top of viewport: thin (3px) olive green bar showing scroll progress. Use Framer Motion `useScroll` + `useTransform`.

**Step 6: Redesign completion footer**

- `cream-card` at bottom with "Mark as Complete" button
- Button: large, `bg-og-green text-og-dark`, Playfair bold, warm shadow
- Hover: scale 1.02, deeper shadow
- After completion: confetti particles in OG colors (green, orange, brown) using Framer Motion
- "Next Course" link with brown arrow

**Step 7: Verify lesson page renders correctly**

Run: `npm run dev`, navigate to `/learn/why-this-matters`
Expected: Wood background, cream content cards, wood-textured quote blocks, photo strip dividers, scroll progress bar.

**Step 8: Commit**

```bash
git add src/app/learn/[slug]/page.tsx
git commit -m "feat: redesign lesson pages with Italian Table aesthetic"
```

---

## Task 6: Leaderboard Page Redesign

**Files:**
- Modify: `src/app/leaderboard/page.tsx`

**Step 1: Add the nav bar (same as dashboard)**

Same wood-toned nav component.

**Step 2: Redesign page header**

- `cream-card` banner with script heading "Family Standings"
- Subtext: "See how your team is progressing"
- Faint watermark: `page3-img1.jpg` ("Have seconds of food and family") at ~10% opacity behind text

**Step 3: Redesign the podium**

- Three `cream-card` items in 2nd-1st-3rd layout (CSS grid: center item taller)
- Each: avatar circle with brown border, name (Playfair bold, `text-og-dark`), points (olive green, large)
- 1st place: golden glow shadow (`box-shadow: 0 0 30px rgba(202, 124, 48, 0.4)`), slightly larger
- Breadstick icons for sections completed (filled = done, outlined = remaining) — SVG breadstick shapes

**Step 4: Add family photo strip below podium**

`photo-strip` using `page7-img5.jpg` (family at long table).

**Step 5: Redesign full rankings list**

- Single `cream-card` containing rows
- Each row: rank (Playfair), avatar circle, name, points (olive green), sections count
- Current user: olive green left border + light green tinted background
- Alternating row striping: `bg-og-warm-gray/10` on even rows
- Hover: gentle shadow lift

**Step 6: Verify leaderboard renders correctly**

Run: `npm run dev`, navigate to `/leaderboard`
Expected: Wood background, cream header card, podium with golden 1st place, family photo strip, cream rankings list.

**Step 7: Commit**

```bash
git add src/app/leaderboard/page.tsx
git commit -m "feat: redesign leaderboard page with Italian Table aesthetic"
```

---

## Task 7: Final Polish and Responsive Check

**Files:**
- Modify: `src/app/globals.css` (if needed)
- Modify: any page files (if needed)

**Step 1: Test all pages at mobile, tablet, desktop widths**

Check each page at 375px, 768px, 1280px wide.

**Step 2: Verify wood background scales well**

The `background-size: cover` + `background-attachment: fixed` may need adjustment on mobile (iOS doesn't support fixed backgrounds well). Add a mobile fallback:

```css
@media (max-width: 768px) {
  .wood-bg {
    background-attachment: scroll;
  }
}
```

**Step 3: Check image loading performance**

Ensure all `<Image>` components use proper `sizes` and `priority` attributes. The wood background (CSS) should be optimized — consider generating a smaller version (~1200px wide) for faster load.

**Step 4: Verify cream card readability**

All text on cream cards should be `text-og-dark` or `text-og-dark/70` for sufficient contrast.

**Step 5: Commit final polish**

```bash
git add -A
git commit -m "polish: responsive fixes and performance tuning for Italian Table design"
```
