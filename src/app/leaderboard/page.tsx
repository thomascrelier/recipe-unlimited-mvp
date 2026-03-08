'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/* ──────────────────────────────────────────────
   Mock Data
   ────────────────────────────────────────────── */

const MOCK_RANKINGS = [
  { id: '1', full_name: 'Sarah Chen', avatar_url: '', total_points: 700, sections_completed: 6 },
  { id: '2', full_name: 'James Wilson', avatar_url: '', total_points: 550, sections_completed: 5 },
  { id: '3', full_name: 'Priya Patel', avatar_url: '', total_points: 500, sections_completed: 4 },
  { id: '4', full_name: 'Marcus Lee', avatar_url: '', total_points: 450, sections_completed: 4 },
  { id: '5', full_name: 'Alex Rivera', avatar_url: '', total_points: 400, sections_completed: 3 },
  { id: '6', full_name: 'Thomas Crelier', avatar_url: '', total_points: 250, sections_completed: 2 },
  { id: '7', full_name: 'Nina Kozlov', avatar_url: '', total_points: 200, sections_completed: 2 },
  { id: '8', full_name: 'David Park', avatar_url: '', total_points: 150, sections_completed: 1 },
  { id: '9', full_name: 'Emma Thompson', avatar_url: '', total_points: 100, sections_completed: 1 },
  { id: '10', full_name: 'Jordan Hayes', avatar_url: '', total_points: 100, sections_completed: 1 },
  { id: '11', full_name: 'Aisha Mohammed', avatar_url: '', total_points: 0, sections_completed: 0 },
  { id: '12', full_name: 'Chris Dunbar', avatar_url: '', total_points: 0, sections_completed: 0 },
]

const CURRENT_USER_ID = '6'
const TOTAL_SECTIONS = 6

/* ──────────────────────────────────────────────
   Utilities
   ────────────────────────────────────────────── */

const AVATAR_COLORS = [
  '#FF464C', // clutch-red
  '#550E30', // plum
  '#7A1E4E', // plum-light
  '#FF6B70', // red-muted
  '#3A0820', // plum-deep
  '#8B2252', // rose
  '#C73E5A', // coral-plum
  '#9B3A6E', // mauve
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return Math.abs(hash)
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[hashString(name) % AVATAR_COLORS.length]
}

/* ──────────────────────────────────────────────
   Avatar Component
   ────────────────────────────────────────────── */

function Avatar({
  name,
  avatarUrl,
  size,
  className = '',
}: {
  name: string
  avatarUrl: string
  size: number
  className?: string
}) {
  const initials = getInitials(name)
  const bgColor = getAvatarColor(name)

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-display font-bold text-white select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Progress Bar
   ────────────────────────────────────────────── */

function SectionProgress({ completed }: { completed: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i < completed
              ? 'bg-clutch-red w-5'
              : 'bg-white/10 w-3'
          }`}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Podium — Top 3
   ────────────────────────────────────────────── */

const podiumVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: 0.15 + i * 0.15,
    },
  }),
}

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px 4px rgba(255,70,76,0.3), 0 0 60px 8px rgba(255,70,76,0.1)',
      '0 0 30px 8px rgba(255,70,76,0.5), 0 0 80px 16px rgba(255,70,76,0.2)',
      '0 0 20px 4px rgba(255,70,76,0.3), 0 0 60px 8px rgba(255,70,76,0.1)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
}

function PodiumCard({
  user,
  rank,
  index,
}: {
  user: (typeof MOCK_RANKINGS)[0]
  rank: number
  index: number
}) {
  const isFirst = rank === 1
  const isSecond = rank === 2
  const avatarSize = isFirst ? 96 : 72
  const accentColor = isFirst ? '#FFD700' : isSecond ? '#C0C0C0' : '#CD7F32'
  const label = isFirst ? '1st' : isSecond ? '2nd' : '3rd'

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${isFirst ? 'order-2 -mt-6' : isSecond ? 'order-1 mt-4' : 'order-3 mt-4'}`}
      variants={podiumVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* Rank badge */}
      <motion.span
        className="font-display font-800 text-xs tracking-wider uppercase px-3 py-1 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
          color: accentColor,
          border: `1px solid ${accentColor}50`,
        }}
      >
        {label}
      </motion.span>

      {/* Avatar ring */}
      <div className="relative">
        {isFirst && (
          <motion.div
            className="absolute -inset-2 rounded-full"
            {...glowPulse}
            style={{ borderRadius: '9999px' }}
          />
        )}
        <div
          className="rounded-full p-[3px]"
          style={{
            background: isFirst
              ? 'linear-gradient(135deg, #FFD700, #FF464C, #FFD700)'
              : `linear-gradient(135deg, ${accentColor}80, ${accentColor}40)`,
          }}
        >
          <Avatar
            name={user.full_name}
            avatarUrl={user.avatar_url}
            size={avatarSize}
            className="border-2 border-clutch-dark"
          />
        </div>
        {isFirst && (
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl"
            initial={{ opacity: 0, y: 10, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' as const, stiffness: 300 }}
          >
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <path
                d="M14 0L17.5 8L26 4L22 14H6L2 4L10.5 8L14 0Z"
                fill="#FFD700"
              />
              <rect x="6" y="14" width="16" height="4" rx="1" fill="#FFD700" />
              <circle cx="10" cy="10" r="1.5" fill="#FF464C" />
              <circle cx="14" cy="6" r="1.5" fill="#FF464C" />
              <circle cx="18" cy="10" r="1.5" fill="#FF464C" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Name + points */}
      <div className="text-center">
        <p className="font-display font-700 text-white text-sm leading-tight">
          {user.full_name}
        </p>
        <p
          className={`font-display font-800 text-lg ${isFirst ? 'text-clutch-red' : 'text-clutch-cream/70'}`}
        >
          {user.total_points.toLocaleString()}
          <span className="text-xs font-600 ml-1 opacity-60">pts</span>
        </p>
      </div>

      {/* Podium block */}
      <motion.div
        className="w-24 rounded-t-lg flex items-end justify-center"
        style={{
          background: `linear-gradient(180deg, ${accentColor}30, ${accentColor}08)`,
          borderTop: `2px solid ${accentColor}60`,
        }}
        initial={{ height: 0 }}
        animate={{ height: isFirst ? 80 : isSecond ? 56 : 40 }}
        transition={{ delay: 0.5 + index * 0.12, duration: 0.6, ease: 'easeOut' as const }}
      >
        <span
          className="font-display font-900 text-3xl opacity-20 mb-2"
          style={{ color: accentColor }}
        >
          {rank}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Ranking Row
   ────────────────────────────────────────────── */

function RankingRow({
  user,
  rank,
  index,
  isCurrentUser,
}: {
  user: (typeof MOCK_RANKINGS)[0]
  rank: number
  index: number
  isCurrentUser: boolean
}) {
  const isComplete = user.sections_completed === TOTAL_SECTIONS
  const completionPct = Math.round((user.sections_completed / TOTAL_SECTIONS) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.06, duration: 0.4, ease: 'easeOut' as const }}
      className={`
        group relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200
        ${isCurrentUser
          ? 'bg-clutch-red/10 border border-clutch-red/30 shadow-[0_0_20px_rgba(255,70,76,0.08)]'
          : index % 2 === 0
            ? 'bg-white/[0.03]'
            : 'bg-transparent'
        }
        hover:bg-white/[0.06]
      `}
    >
      {/* Current-user indicator line */}
      {isCurrentUser && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-clutch-red rounded-r-full"
          layoutId="current-user-indicator"
        />
      )}

      {/* Rank */}
      <span className="font-display font-800 text-lg w-8 text-center text-white/40">
        {rank}
      </span>

      {/* Avatar */}
      <Avatar
        name={user.full_name}
        avatarUrl={user.avatar_url}
        size={40}
      />

      {/* Name + Tag */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-display font-600 text-white text-sm truncate">
            {user.full_name}
          </p>
          {isCurrentUser && (
            <span className="text-[10px] font-display font-700 uppercase tracking-widest text-clutch-red bg-clutch-red/15 px-2 py-0.5 rounded-full">
              You
            </span>
          )}
          {isComplete && (
            <span className="text-[10px] font-display font-700 uppercase tracking-widest text-emerald-400 bg-emerald-400/15 px-2 py-0.5 rounded-full">
              Complete
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <SectionProgress completed={user.sections_completed} />
          <span className="text-[11px] text-white/30 font-display">
            {user.sections_completed}/{TOTAL_SECTIONS}
          </span>
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <p className="font-display font-800 text-white text-base">
          {user.total_points.toLocaleString()}
        </p>
        <p className="text-[11px] text-white/30 font-display">{completionPct}%</p>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Stats Bar
   ────────────────────────────────────────────── */

function StatsBar() {
  const totalParticipants = MOCK_RANKINGS.length
  const totalSectionsCompleted = MOCK_RANKINGS.reduce((sum, u) => sum + u.sections_completed, 0)
  const avgCompletion = Math.round(
    (MOCK_RANKINGS.reduce((sum, u) => sum + u.sections_completed, 0) /
      (MOCK_RANKINGS.length * TOTAL_SECTIONS)) *
      100
  )

  const stats = [
    { label: 'Participants', value: totalParticipants },
    { label: 'Avg. Completion', value: `${avgCompletion}%` },
    { label: 'Sections Cleared', value: totalSectionsCompleted },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="mt-8 mx-auto max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5"
    >
      <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center px-4">
            <p className="font-display font-900 text-xl text-clutch-red">{stat.value}</p>
            <p className="text-[11px] text-white/40 font-display uppercase tracking-widest mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Back Arrow Icon
   ────────────────────────────────────────────── */

function ArrowLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 10H5M5 10L10 5M5 10L10 15" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */

export default function LeaderboardPage() {
  const top3 = MOCK_RANKINGS.slice(0, 3)
  const rest = MOCK_RANKINGS.slice(3)

  // Podium display order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]]

  return (
    <div className="min-h-screen bg-gradient-to-b from-clutch-plum to-clutch-dark">
      {/* ── Navigation ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            <ArrowLeftIcon />
          </span>
          <span className="text-sm font-display font-600 hidden sm:inline">Dashboard</span>
        </Link>

        <h1 className="font-display font-800 text-white text-xl tracking-tight">
          Leaderboard
        </h1>

        <span className="text-sm font-display text-white/40">
          {MOCK_RANKINGS.length} racers
        </span>
      </motion.nav>

      {/* ── Decorative line ── */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-clutch-red/30 to-transparent" />
      </div>

      {/* ── Podium ── */}
      <section className="max-w-md mx-auto px-6 pt-10 pb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/30 text-xs font-display uppercase tracking-[0.25em] mb-8"
        >
          Race Standings
        </motion.p>

        <div className="flex items-end justify-center gap-4">
          {podiumOrder.map((user, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3
            return (
              <PodiumCard key={user.id} user={user} rank={rank} index={i} />
            )
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-[10px] font-display uppercase tracking-[0.3em] text-white/20">
            Full Rankings
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>
      </div>

      {/* ── Rankings List ── */}
      <section className="max-w-2xl mx-auto px-6 pb-6">
        <div className="flex flex-col gap-1.5">
          {rest.map((user, i) => (
            <RankingRow
              key={user.id}
              user={user}
              rank={i + 4}
              index={i}
              isCurrentUser={user.id === CURRENT_USER_ID}
            />
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-12">
        <StatsBar />
      </section>
    </div>
  )
}
