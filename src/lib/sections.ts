export type Section = {
  id: string;
  title: string;
  slug: string;
  order: number;
  points: number;
  description: string;
  heroImage: string;
  accentColor: string;
};

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
    description:
      "How every role at Olive Garden — from leaders to engineers — uses Claude",
    heroImage: "og-extracted/page6-img1.jpg",
    accentColor: "#CA7C30",
  },
  {
    id: "the-rules",
    title: "The Rules",
    slug: "the-rules",
    order: 4,
    points: 150,
    description:
      "Responsible AI: Claude represents you, data safety, and guardrails",
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
    description:
      "Preview of your facilitated session and how to come prepared",
    heroImage: "og-extracted/page7-img4.jpg",
    accentColor: "#28939D",
  },
];

export const TOTAL_POINTS = 700;
