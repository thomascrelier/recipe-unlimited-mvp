"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Mock Data
   ────────────────────────────────────────────── */

const MOCK_USER = {
  full_name: "Thomas Crelier",
  avatar_url: "",
  total_points: 250,
  email: "thomas@olivegarden.com",
};

const MOCK_RANKINGS = [
  { id: "1", full_name: "Sarah Chen", avatar_url: "", total_points: 700, sections_completed: 6 },
  { id: "2", full_name: "James Wilson", avatar_url: "", total_points: 550, sections_completed: 5 },
  { id: "3", full_name: "Priya Patel", avatar_url: "", total_points: 500, sections_completed: 4 },
  { id: "4", full_name: "Marcus Lee", avatar_url: "", total_points: 450, sections_completed: 4 },
  { id: "5", full_name: "Alex Rivera", avatar_url: "", total_points: 400, sections_completed: 3 },
  { id: "6", full_name: "Thomas Crelier", avatar_url: "", total_points: 250, sections_completed: 2 },
  { id: "7", full_name: "Nina Kozlov", avatar_url: "", total_points: 200, sections_completed: 2 },
  { id: "8", full_name: "David Park", avatar_url: "", total_points: 150, sections_completed: 1 },
  { id: "9", full_name: "Emma Thompson", avatar_url: "", total_points: 100, sections_completed: 1 },
  { id: "10", full_name: "Jordan Hayes", avatar_url: "", total_points: 100, sections_completed: 1 },
  { id: "11", full_name: "Aisha Mohammed", avatar_url: "", total_points: 0, sections_completed: 0 },
  { id: "12", full_name: "Chris Dunbar", avatar_url: "", total_points: 0, sections_completed: 0 },
];

const CURRENT_USER_ID = "4";
const TOTAL_SECTIONS = 6;

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
   Podium Card
   ────────────────────────────────────────────── */

function PodiumCard({
  user,
  rank,
}: {
  user: (typeof MOCK_RANKINGS)[0];
  rank: number;
}) {
  const isFirst = rank === 1;
  const avatarSize = isFirst ? 80 : 64;

  const rankBadgeColor = isFirst
    ? "bg-og-orange text-white"
    : rank === 2
      ? "bg-gray-300 text-og-dark"
      : "bg-amber-600 text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + rank * 0.1, duration: 0.5 }}
      className={`cream-card p-6 text-center flex flex-col items-center gap-3 ${
        isFirst ? "shadow-[0_0_30px_rgba(202,124,48,0.4)]" : ""
      }`}
    >
      {/* Rank badge */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${rankBadgeColor}`}
      >
        {rank}
      </div>

      {/* Avatar */}
      <Avatar
        name={user.full_name}
        url={user.avatar_url}
        size={avatarSize}
        className="border-2 border-og-brown"
      />

      {/* Name */}
      <p className="font-display font-bold text-og-dark text-sm leading-tight">
        {user.full_name}
      </p>

      {/* Points */}
      <p className="font-display font-bold text-og-green text-xl">
        {user.total_points.toLocaleString()}
        <span className="text-xs font-normal text-og-dark/40 ml-1">pts</span>
      </p>

      {/* Sections completed */}
      <p className="font-body text-og-dark/50 text-sm">
        {user.sections_completed}/{TOTAL_SECTIONS} sections
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export default function LeaderboardPage() {
  const top3 = MOCK_RANKINGS.slice(0, 3);

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
              className="font-display text-sm text-og-warm-gray/60 hover:text-og-cream transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="font-display text-sm text-og-cream font-bold transition-colors"
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
          PAGE HEADER — Cream Banner Card
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="cream-card p-8 md:p-10 max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Watermark image */}
          <Image
            src="/images/og-extracted/page3-img1.jpg"
            alt=""
            width={500}
            height={300}
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] max-w-[500px] pointer-events-none select-none"
          />

          <div className="relative z-10">
            <h1 className="script-heading text-3xl md:text-4xl text-og-dark">
              Family Standings
            </h1>
            <p className="font-body text-og-dark/60 mt-2 text-base md:text-lg">
              See how your team is progressing
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          TOP 3 PODIUM
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 mt-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-6 items-end">
            {/* 2nd place */}
            <div className="pt-8">
              <PodiumCard user={top3[1]} rank={2} />
            </div>

            {/* 1st place — taller */}
            <div>
              <PodiumCard user={top3[0]} rank={1} />
            </div>

            {/* 3rd place */}
            <div className="pt-8">
              <PodiumCard user={top3[2]} rank={3} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO STRIP
          ═══════════════════════════════════════════ */}
      <div className="relative z-2 mt-10">
        <div className="photo-strip">
          <img
            src="/images/og-extracted/page7-img5.jpg"
            alt="Family at the table"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FULL RANKINGS LIST
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cream-card p-6 md:p-8 max-w-5xl mx-auto"
        >
          <h2 className="script-heading text-2xl md:text-3xl text-og-dark mb-6">
            Full Rankings
          </h2>

          <div className="divide-y divide-og-brown/10">
            {MOCK_RANKINGS.map((user, i) => {
              const isCurrentUser = user.id === CURRENT_USER_ID;
              const rank = i + 1;

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={`flex items-center gap-4 py-4 px-3 md:px-4 rounded-lg transition-shadow hover:shadow-md ${
                    isCurrentUser
                      ? "border-l-4 border-og-green bg-og-green/5"
                      : i % 2 === 1
                        ? "bg-og-warm-gray/10"
                        : ""
                  }`}
                >
                  {/* Rank */}
                  <span className="font-display font-bold text-lg text-og-brown w-8 text-center flex-shrink-0">
                    {rank}
                  </span>

                  {/* Avatar */}
                  <Avatar
                    name={user.full_name}
                    url={user.avatar_url}
                    size={40}
                  />

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <span className="font-display font-bold text-og-dark truncate block">
                      {user.full_name}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-og-green">
                        You
                      </span>
                    )}
                  </div>

                  {/* Sections count */}
                  <span className="font-body text-og-dark/50 text-sm hidden sm:block flex-shrink-0">
                    {user.sections_completed}/{TOTAL_SECTIONS} sections
                  </span>

                  {/* Points */}
                  <span className="font-display font-bold text-og-green text-base flex-shrink-0">
                    {user.total_points.toLocaleString()} pts
                  </span>
                </motion.div>
              );
            })}
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
