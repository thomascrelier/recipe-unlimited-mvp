# "The Italian Table" — Full Visual Overhaul Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign all pages of the Olive Garden training portal to feel like full restaurant immersion — every page feels like you're sitting at the OG table.

**Architecture:** Dark wood textures as the persistent page surface, cream "place card" content areas, OG food and people photography woven throughout, decorative script typography for headings, and a meal/course metaphor for the 6 lessons.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Google Fonts (Playfair Display, Crimson Pro)

---

## Design Concept

"The Italian Table" — the entire app feels like you're sitting at a long family table at Olive Garden, working through a meal. Each course is a lesson. Dark wood texture is the ever-present surface. Food and people photography bleed edge-to-edge as full-bleed section dividers.

## Brand Assets (Extracted from OG Style Guide)

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary Brown | Pantone 476 C | `#54301A` | UI chrome, nav, card borders |
| Olive Green | Pantone 383 C | `#A8AD00` | CTAs, progress bars, active states, points |
| Cream | — | `#FFF8F0` | Content card backgrounds |
| Light Warm Gray | Pantone Warm Gray 1 C | `#D7D2CB` | Subtle striping, muted elements |
| Orange | Pantone 7571 C | `#CA7C30` | Badges, 1st place glow, warm accents |
| Red | Pantone 7593 C | `#A2402A` | Alerts, special callouts |
| Purple | Pantone 5115 C | `#532943` | Spare accent |
| Blue | Pantone 541 C | `#00407A` | Spare accent |
| Teal | Pantone 2235 C | `#28939D` | Links, interactive hover states |
| Dark | — | `#1C0E05` | Text on light surfaces |

### Typography

- **Display/Script headings:** Playfair Display Italic — warm, inviting, matches OG decorative quote style
- **Section headings:** Playfair Display Bold — serif, cream-colored on dark, dark on light
- **Body text:** Crimson Pro — serif, readable, warm character
- **Accent text:** Olive Green for highlights, links, scores

### Photography Assets (in `public/images/og-extracted/`)

| File | Content | Suggested Usage |
|------|---------|-----------------|
| `page1-img1.jpg` | OG logo on dark wood + tagline | Login page hero |
| `page1-img2.jpg` | OG logo on dark wood (no tagline) | Nav bar logo, favicons |
| `page3-img1.jpg` | "Have seconds of food and family" script on wood | Leaderboard watermark |
| `page3-img2.jpg` | "Good things come to those who create" script on wood | Login bottom watermark |
| `page3-img4.jpg` | "May your life be as full as your plate" with food | Completion celebration |
| `page4-img1.jpg` | Light wood texture | Alternate texture |
| `page4-img4.jpg` | Dark brown wood texture | **Primary page background** |
| `page4-img5.jpg` | Dark vignette wood texture | Darker section backgrounds |
| `page5-img1.jpg` | Pasta close-up with fork | Section 2 card: "What is Claude Code?" |
| `page5-img4.jpg` | Lasagna close-up | Section 5 card: "Getting Started" |
| `page5-img5.jpg` | Breadsticks + salad | Section 4 card: "The Rules" / Leaderboard accent |
| `page6-img1.jpg` | Woman dining at OG | Section 3 card: "Claude @ Olive Garden" |
| `page6-img3.jpg` | Child with breadstick, smiling | People accent |
| `page7-img4.jpg` | Father and son laughing | Section 6 card: "What's Next" |
| `page7-img5.jpg` | Family at long table | Section 1 card: "Why This Matters" / Leaderboard |

### Texture & Effects

- Dark wood (`page4-img4.jpg`) as CSS background on `<body>` or page wrapper
- Subtle CSS grain overlay (existing in globals.css)
- Soft vignette on page edges (radial gradient overlay)
- Warm shadows on all elevated elements: `0 4px 20px rgba(28, 14, 5, 0.3)`

---

## Page Designs

### 1. Global Design System

**Background:** Dark wood texture (`page4-img4.jpg`) covers every page as the base surface. Subtle grain overlay + soft vignette darken edges.

**Card treatment:** All content on slightly elevated cream (`#FFF8F0`) cards with:
- Warm shadow: `0 4px 20px rgba(28, 14, 5, 0.3)`
- Thin brown border: `1px solid rgba(84, 48, 26, 0.2)`
- Rounded corners: `12px`
- Subtle paper texture feel

**Navigation bar:** Top bar, warm brown (`#54301A`) background:
- OG logo (small) left-aligned
- Nav links in cream, olive green on hover/active
- User avatar + name right-aligned
- Olive green accent line underneath

**Decorative elements:**
- Olive branch SVG dividers between sections
- Decorative script flourishes on quotes
- Food photography strips as full-width section dividers with warm gradient fades

---

### 2. Login Page

**Layout:** Full-screen, centered vertically and horizontally on dark wood.

**Hero:** OG logo with tagline (`page1-img1.jpg`) large and centered at top.

**Sign-in card (cream, centered below logo):**
- Script heading: "Welcome to the Table"
- Subtext: "Your AI training journey starts here"
- Google Sign-In button in OG brown, olive green hover
- "Continue as Guest" subtle text link below
- Olive branch SVG divider between elements

**Atmosphere:** On wider screens, soft-focus food photography on either side of card (breadsticks left, family dining right) with heavy dark overlay — ambient, not distracting. Mobile: just wood texture.

**Bottom accent:** Script quote "Good things come to those who create" (`page3-img2.jpg`) as faint watermark at page bottom.

---

### 3. Dashboard Page

**Welcome hero (cream banner card at top):**
- Script heading: "Welcome back, [Name]"
- Circular progress ring (plate metaphor): olive green fill on warm gray track, showing 250/700 points
- "2 of 6 courses completed" in Crimson Pro
- Full-bleed breadsticks + salad photo (`page5-img5.jpg`) strip below hero, edge-to-edge with warm gradient fade into wood

**Section cards — "Your Menu" (2-col grid desktop, 1-col mobile):**

Each cream "place card" on wood:
- Food/people photo thumbnail banner at top of card
- Section title in Playfair Display Bold
- Brief description in Crimson Pro
- Points badge: olive green pill "100 pts"
- Completed: warm checkmark + olive green left border
- Locked/upcoming: slightly dimmed with brown overlay
- Hover: translateY(-4px) + shadow deepens

**Photo mapping:**
1. "Why This Matters" → `page7-img5.jpg` (family at long table)
2. "What is Claude Code?" → `page5-img1.jpg` (pasta close-up)
3. "Claude @ Olive Garden" → `page6-img1.jpg` (woman dining)
4. "The Rules" → `page5-img5.jpg` (breadsticks + salad)
5. "Getting Started" → `page5-img4.jpg` (lasagna close-up)
6. "What's Next" → `page7-img4.jpg` (father and son)

**Leaderboard preview (cream card below grid):**
- Script heading: "Family Standings"
- Top 3 names with points
- "View Full Leaderboard" link in teal
- Family dining photo (`page7-img5.jpg`) decorative strip above

---

### 4. Lesson Pages (`/learn/[slug]`)

**Layout:** Centered single column on wood background. Max-width ~680px for comfortable reading.

**Lesson header (cream banner):**
- Section's assigned photo as wide banner at top
- Script heading: lesson title
- Subtitle in Crimson Pro italic
- Points badge: olive green pill
- Olive branch divider below

**Content blocks by type:**
- **Text:** Crimson Pro on cream. Line-height 1.8, generous spacing.
- **Quote:** Full-width breakout — dark wood background strip with cream script text, decorative flourishes. Matches OG style guide quote cards.
- **Callout:** Cream card, colored left border (orange for tips, teal for info). Playfair Display bold title, Crimson Pro bullets.
- **Video:** Cream card with brown border, Playfair Display title.
- **Link:** Cream card, olive green left border, teal link title.
- **Glossary:** Expandable accordion on cream card. Playfair bold term, Crimson Pro definition. Olive green chevron.

**Section dividers:** Every 2-3 blocks, a thin food photography strip — different cropped food image edge-to-edge with warm gradient fades. Atmospheric, not competing with text.

**Completion footer (cream card):**
- "Mark as Complete" button: large, olive green bg, cream text, warm shadow
- On complete: confetti animation in OG brand colors (green, orange, brown particles)
- Points earned confirmation
- "Next Course" arrow in brown

**Scroll progress:** Thin olive green progress bar fixed at top of page.

---

### 5. Leaderboard Page

**Page header (cream banner):**
- Script heading: "Family Standings"
- Subtext: "See how your team is progressing"
- "Have seconds of food and family" (`page3-img1.jpg`) as faint watermark behind header

**Top 3 podium (2nd-1st-3rd layout):**
- Three cream cards, center tallest
- Each: avatar circle (brown border, hash-based OG color bg), name in Playfair Bold, points in olive green large
- Sections completed as breadstick icons (filled = done, outlined = remaining)
- 1st place: golden glow (`#CA7C30` shadow), slightly larger card
- Family table photo strip (`page7-img5.jpg`) below podium

**Full rankings list (cream card):**
- Ranked rows: number, avatar, name, points (olive green), sections count
- Current user row: olive green left border + tinted background
- Subtle warm gray alternating row striping
- Hover: gentle lift + warm shadow

**Empty state:** Script text: "Every great meal starts with the first bite" + CTA to dashboard.

**Bottom decoration:** Breadsticks photo (`page5-img5.jpg`) tucked in bottom corner, partially faded into wood.
