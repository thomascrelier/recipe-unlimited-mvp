"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { SECTIONS, TOTAL_POINTS } from "@/lib/sections";
import type { LeaderboardEntry } from "@/lib/types";

/* ──────────────────────────────────────────────
   Mock Data
   ────────────────────────────────────────────── */

const MOCK_USER = {
  full_name: "Thomas Crelier",
  avatar_url: "",
  total_points: 250,
  email: "thomas@olivegarden.com",
};

const MOCK_PROGRESS = ["why-this-matters", "what-is-claude-code"];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "1", full_name: "Sarah Chen", avatar_url: "", total_points: 700, sections_completed: 6 },
  { id: "2", full_name: "James Wilson", avatar_url: "", total_points: 550, sections_completed: 5 },
  { id: "3", full_name: "Priya Patel", avatar_url: "", total_points: 400, sections_completed: 4 },
  { id: "4", full_name: "Marcus Lee", avatar_url: "", total_points: 250, sections_completed: 2 },
  { id: "5", full_name: "Alex Rivera", avatar_url: "", total_points: 100, sections_completed: 1 },
];

/* ──────────────────────────────────────────────
   Animated Counter Hook
   ────────────────────────────────────────────── */

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [value, setValue] = useState(0);

  useEffect(() => {
    spring.set(target);
    const unsubscribe = display.on("change", (v) => setValue(v));
    return unsubscribe;
  }, [target, spring, display]);

  return <span>{value}</span>;
}

/* ──────────────────────────────────────────────
   Avatar Component
   ────────────────────────────────────────────── */

function Avatar({
  name,
  url,
  size = 40,
  className = "",
}: {
  name: string;
  url: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-og-brown flex items-center justify-center font-display font-bold text-og-cream ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Progress Ring Component
   ────────────────────────────────────────────── */

function ProgressRing({
  points,
  total,
  size = 120,
}: {
  points: number;
  total: number;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = points / total;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D7D2CB"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#A8AD00"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      {/* Center text overlay */}
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-display font-bold text-2xl text-og-dark leading-none">
          <AnimatedCounter target={points} />
        </span>
        <span className="font-display text-xs text-og-dark/40 leading-none mt-0.5">/{total}</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Section Card
   ────────────────────────────────────────────── */

function SectionCard({
  section,
  index,
  isCompleted,
}: {
  section: (typeof SECTIONS)[number];
  index: number;
  isCompleted: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
    >
      <Link href={`/learn/${section.slug}`} className="group block">
        <div
          className={`cream-card overflow-hidden transition-all duration-300
            group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(28,14,5,0.4)]
            ${isCompleted ? "border-l-4 border-og-green" : ""}`}
        >
          {/* Photo banner */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={`/images/${section.heroImage}`}
              alt={section.title}
              fill
              className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
            />
            {/* Points badge — top right */}
            <div className="absolute top-3 right-3 bg-og-green text-og-dark font-display font-bold text-xs px-3 py-1 rounded-full z-10">
              {section.points} pts
            </div>
            {/* Completed checkmark — top left */}
            {isCompleted && (
              <div className="absolute top-3 left-3 w-7 h-7 bg-og-green rounded-full flex items-center justify-center z-10">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-bold text-lg text-og-dark">
              {section.title}
            </h3>
            <p className="font-body text-sm text-og-dark/60 mt-1 line-clamp-2 leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Dashboard Page
   ────────────────────────────────────────────── */

export default function DashboardPage() {
  const completedCount = MOCK_PROGRESS.length;
  const totalSections = SECTIONS.length;
  const firstName = MOCK_USER.full_name.split(" ")[0];

  return (
    <div className="relative z-2 min-h-screen">
      {/* ═══════════════════════════════════════════
          NAV BAR
          ═══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-og-brown/95 backdrop-blur-sm border-b border-og-brown-light/30 border-b-2 border-b-og-green/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Left: Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              src="/images/og-extracted/page1-img2.jpg"
              alt="Olive Garden"
              width={80}
              height={40}
              className="rounded-md h-10 w-auto object-contain"
            />
          </Link>

          {/* Center: Nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-display text-sm text-og-cream font-bold transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="font-display text-sm text-og-warm-gray/60 hover:text-og-cream transition-colors"
            >
              Leaderboard
            </Link>
          </div>

          {/* Right: User info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="font-display font-bold text-og-cream text-sm leading-tight">
                {MOCK_USER.full_name}
              </p>
            </div>
            <Avatar name={MOCK_USER.full_name} url={MOCK_USER.avatar_url} size={36} />
            <div className="bg-og-green/15 border border-og-green/30 text-og-green font-display font-bold text-xs px-3 py-1 rounded-full">
              {MOCK_USER.total_points} pts
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          WELCOME HERO — Cream Banner Card
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="cream-card p-8 md:p-12 max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
            {/* Left side: Text */}
            <div className="text-center md:text-left">
              <h1 className="script-heading text-3xl md:text-4xl text-og-dark">
                Welcome back, {firstName}
              </h1>
              <p className="font-body text-og-dark/60 mt-3 text-base md:text-lg">
                Complete all courses to earn your place at the table
              </p>
            </div>

            {/* Right side: Progress ring */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="relative">
                <ProgressRing
                  points={MOCK_USER.total_points}
                  total={TOTAL_POINTS}
                  size={120}
                />
              </div>
              <p className="font-body text-sm text-og-dark/50 mt-3">
                {completedCount} of {totalSections} courses completed
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          BREADSTICK PHOTO STRIP
          ═══════════════════════════════════════════ */}
      <div className="relative z-2 mt-10">
        <div className="photo-strip">
          <img
            src="/images/og-extracted/page5-img5.jpg"
            alt="Breadsticks and salad"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION CARDS GRID — "Your Menu"
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="script-heading text-3xl md:text-4xl text-og-cream mb-8 md:mb-10 text-center md:text-left"
          >
            Your Menu
          </motion.h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTIONS.map((section, i) => (
              <SectionCard
                key={section.id}
                section={section}
                index={i}
                isCompleted={MOCK_PROGRESS.includes(section.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LEADERBOARD PREVIEW
          ═══════════════════════════════════════════ */}

      {/* Photo strip above leaderboard */}
      <div className="relative z-2">
        <div className="photo-strip">
          <img
            src="/images/og-extracted/page7-img5.jpg"
            alt="Family at the table"
          />
        </div>
      </div>

      <section className="relative z-2 px-4 md:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cream-card p-8 md:p-10 max-w-5xl mx-auto"
        >
          <h2 className="script-heading text-2xl md:text-3xl text-og-dark mb-6">
            Family Standings
          </h2>

          {/* Top 3 list */}
          <div className="space-y-4">
            {MOCK_LEADERBOARD.slice(0, 3).map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 py-3 border-b border-og-brown/10 last:border-b-0"
              >
                {/* Rank */}
                <span className="font-display font-bold text-lg text-og-brown w-8 text-center">
                  {i + 1}
                </span>

                {/* Avatar */}
                <Avatar name={entry.full_name} url={entry.avatar_url} size={40} />

                {/* Name */}
                <span className="font-display font-bold text-og-dark flex-1">
                  {entry.full_name}
                </span>

                {/* Points */}
                <span className="font-display font-bold text-og-green text-sm">
                  {entry.total_points} pts
                </span>
              </div>
            ))}
          </div>

          {/* View Full Leaderboard link */}
          <div className="mt-6 text-center">
            <Link
              href="/leaderboard"
              className="font-display font-bold text-sm text-og-teal hover:text-og-teal/80 transition-colors inline-flex items-center gap-1.5"
            >
              View Full Leaderboard
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-2 py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-og-cream/40">
            <span className="font-display font-bold text-sm">Olive Garden</span>
            <span className="text-og-cream/20">x</span>
            <span className="font-display text-sm">Claude Code</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://slack.com/app_redirect?channel=appliedai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm text-og-cream/40 hover:text-og-green transition-colors"
            >
              #appliedai on Slack
            </a>
            <span className="text-og-cream/20 font-body text-xs">
              &copy; {new Date().getFullYear()} Olive Garden
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
