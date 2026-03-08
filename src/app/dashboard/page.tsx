"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  email: "thomas@clutch.ca",
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
      className={`rounded-full bg-clutch-plum flex items-center justify-center font-display font-bold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
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
          className={`relative h-72 md:h-80 rounded-2xl overflow-hidden transition-all duration-300
            group-hover:scale-[1.03] group-hover:shadow-[0_0_40px_rgba(255,70,76,0.25)]
            ${isCompleted ? "opacity-70" : ""}`}
        >
          {/* Background gradient (placeholder for hero images) */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${section.accentColor}33 0%, #1A0A14 70%)`,
            }}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-clutch-dark via-clutch-dark/60 to-transparent" />

          {/* Large faded section number */}
          <div className="absolute top-3 right-4 font-display font-900 text-[6rem] leading-none text-white/[0.06] select-none">
            {section.order}
          </div>

          {/* Points badge */}
          <div className="absolute top-4 left-4 bg-clutch-red/90 backdrop-blur-sm text-white font-display font-bold text-xs px-3 py-1 rounded-full">
            {section.points} pts
          </div>

          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-display font-800 text-xl md:text-2xl text-white mb-1.5 tracking-tight">
              {section.title}
            </h3>
            <p className="font-body text-sm text-clutch-lavender/70 leading-relaxed line-clamp-2">
              {section.description}
            </p>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-clutch-red/50 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Leaderboard User Card
   ────────────────────────────────────────────── */

function LeaderboardCard({
  entry,
  rank,
  index,
}: {
  entry: LeaderboardEntry;
  rank: number;
  index: number;
}) {
  const isFirst = rank === 1;
  const avatarSize = isFirst ? 72 : 52;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`flex flex-col items-center gap-2 min-w-[120px] ${isFirst ? "min-w-[160px]" : ""}`}
    >
      {/* Avatar with ring */}
      <div className="relative">
        {isFirst && (
          <div
            className="absolute -inset-2 rounded-full animate-pulse"
            style={{
              background:
                "conic-gradient(from 0deg, #FF464C, #FFD700, #FF464C, #FFD700, #FF464C)",
              filter: "blur(6px)",
              opacity: 0.6,
            }}
          />
        )}
        <div
          className={`relative rounded-full p-[2px] ${
            isFirst
              ? "bg-gradient-to-br from-yellow-400 via-clutch-red to-yellow-400"
              : rank <= 3
                ? "bg-clutch-red/60"
                : "bg-white/20"
          }`}
        >
          <Avatar name={entry.full_name} url={entry.avatar_url} size={avatarSize} />
        </div>
        {/* Rank badge */}
        <div
          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center font-display font-bold text-[11px] ${
            isFirst
              ? "bg-yellow-400 text-clutch-dark"
              : rank === 2
                ? "bg-gray-300 text-clutch-dark"
                : rank === 3
                  ? "bg-amber-600 text-white"
                  : "bg-clutch-dark text-white border border-white/20"
          }`}
        >
          {rank}
        </div>
      </div>

      {/* Name & Points */}
      <p className="font-display font-bold text-white text-sm text-center leading-tight mt-1">
        {entry.full_name.split(" ")[0]}
      </p>
      <p className="font-display text-clutch-red text-xs font-bold">{entry.total_points} pts</p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Dashboard Page
   ────────────────────────────────────────────── */

export default function DashboardPage() {
  const completedCount = MOCK_PROGRESS.length;
  const totalSections = SECTIONS.length;
  const progressPercent = (MOCK_USER.total_points / TOTAL_POINTS) * 100;

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════
          ZONE 1 — HERO
          ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] bg-clutch-dark overflow-hidden">
        {/* Subtle radial light */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(85,14,48,0.4) 0%, transparent 70%)",
          }}
        />

        {/* ─── Top Nav ─── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
        >
          {/* Logo */}
          <Link href="/dashboard" className="flex items-baseline gap-0">
            <span className="font-display font-[800] text-2xl text-white tracking-tighter">
              clutch
            </span>
            <span className="text-clutch-red text-2xl leading-none font-bold">.</span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="font-display font-bold text-white text-sm leading-tight">
                {MOCK_USER.full_name}
              </p>
              <p className="font-body text-clutch-lavender/60 text-xs">{MOCK_USER.email}</p>
            </div>
            <Avatar name={MOCK_USER.full_name} url={MOCK_USER.avatar_url} size={38} />
            <div className="bg-clutch-red/15 border border-clutch-red/30 text-clutch-red font-display font-bold text-xs px-3 py-1 rounded-full">
              {MOCK_USER.total_points} pts
            </div>
          </div>
        </motion.nav>

        {/* ─── Hero Content ─── */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display font-bold text-clutch-red text-sm uppercase tracking-[0.25em] mb-6"
          >
            Claude Code Training Portal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display font-[800] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-[0.95] tracking-tighter max-w-4xl mb-6"
          >
            Your Claude Code
            <br />
            Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="font-body text-clutch-lavender/80 text-lg md:text-xl text-center max-w-xl mb-14 italic"
          >
            Complete all sections. Climb the board. Own the session.
          </motion.p>

          {/* ─── Progress Bar ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="w-full max-w-lg"
          >
            {/* Points counter */}
            <div className="flex items-baseline justify-between mb-3">
              <div className="font-display font-[800] text-3xl text-white">
                <AnimatedCounter target={MOCK_USER.total_points} />
                <span className="text-white/30 font-bold text-lg">/{TOTAL_POINTS}</span>
              </div>
              <p className="font-display text-sm text-clutch-lavender/50 font-bold">points</p>
            </div>

            {/* Bar track */}
            <div className="relative h-3 bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={heroInView ? { width: `${progressPercent}%` } : {}}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF464C 0%, #FF6B70 100%)",
                  boxShadow: "0 0 20px rgba(255,70,76,0.4)",
                }}
              />
            </div>

            {/* Sections progress */}
            <p className="font-display text-sm text-clutch-lavender/40 mt-3 text-center">
              <span className="text-white font-bold">{completedCount}</span>
              <span className="mx-1">/</span>
              <span>{totalSections} sections complete</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-clutch-plum to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════
          ZONE 2 — LEADERBOARD STRIP
          ═══════════════════════════════════════════ */}
      <section className="relative bg-clutch-plum py-14 md:py-20 overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,70,76,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(241,237,248,0.1) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="font-display font-bold text-clutch-red text-xs uppercase tracking-[0.25em] mb-2">
                Top Performers
              </p>
              <h2 className="font-display font-[800] text-3xl md:text-4xl text-white tracking-tight">
                Leaderboard
              </h2>
            </div>
            <Link
              href="/leaderboard"
              className="font-display font-bold text-sm text-clutch-red hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
            >
              View full leaderboard
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
          </motion.div>

          {/* Leaderboard cards — horizontal scroll on mobile, centered on desktop */}
          <div className="flex items-end justify-center gap-6 md:gap-10 overflow-x-auto pb-4 scrollbar-thin">
            {MOCK_LEADERBOARD.map((entry, i) => (
              <LeaderboardCard key={entry.id} entry={entry} rank={i + 1} index={i} />
            ))}
          </div>

          {/* Mobile link */}
          <Link
            href="/leaderboard"
            className="font-display font-bold text-sm text-clutch-red hover:text-white transition-colors flex items-center justify-center gap-1.5 mt-8 sm:hidden"
          >
            View full leaderboard
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
      </section>

      {/* ═══════════════════════════════════════════
          ZONE 3 — SECTION CARDS GRID
          ═══════════════════════════════════════════ */}
      <section className="relative bg-clutch-dark py-20 md:py-28">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clutch-red/30 to-transparent" />

        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-display font-bold text-clutch-red text-xs uppercase tracking-[0.25em] mb-2">
              Curriculum
            </p>
            <h2 className="font-display font-[800] text-3xl md:text-4xl text-white tracking-tight">
              Your Sections
            </h2>
            <p className="font-body text-clutch-lavender/50 mt-3 max-w-md">
              Work through each section at your own pace. Earn points and unlock your readiness for
              the live session.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
          ZONE 4 — FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative bg-clutch-dark border-t border-white/[0.06]">
        <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-[800] text-white text-lg tracking-tighter">
              clutch
            </span>
            <span className="text-clutch-red text-lg font-bold">.</span>
            <span className="text-white/20 mx-2">x</span>
            <span className="font-display font-bold text-white/60 text-sm">Claude Code</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://slack.com/app_redirect?channel=appliedai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm text-clutch-lavender/40 hover:text-clutch-red transition-colors"
            >
              #appliedai on Slack
            </a>
            <span className="text-white/10 font-body text-xs">
              &copy; {new Date().getFullYear()} Clutch
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
