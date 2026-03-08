"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { createBrowserClient } from "@/lib/supabase";

const handleLogin = async () => {
  const supabase = createBrowserClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

// Stagger orchestration
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const heroFade = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: easeOutExpo },
  },
};

const floatLoop = {
  y: [-6, 6, -6],
  rotate: [-1.5, 1.5, -1.5],
  transition: {
    duration: 6,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row overflow-hidden">
      {/* ───────── LEFT: Hero Image Panel (60%) ───────── */}
      <motion.div
        className="relative w-full lg:w-[60%] min-h-[45vh] lg:min-h-screen"
        variants={heroFade}
        initial="hidden"
        animate="show"
      >
        {/* Full-bleed hero image */}
        <Image
          src="/images/hero-sunset-truck.jpg"
          alt="Clutch — sunset truck hero"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-clutch-dark/60 via-clutch-dark/30 to-clutch-dark/80 lg:bg-gradient-to-r lg:from-clutch-dark/50 lg:via-clutch-dark/20 lg:to-clutch-dark/90" />

        {/* Floating 3D "C" logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={floatLoop}
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 drop-shadow-[0_20px_60px_rgba(255,70,76,0.35)]">
            <Image
              src="/images/logo-3d-c.png"
              alt="Clutch logo"
              fill
              className="object-contain"
              sizes="200px"
            />
          </div>
        </motion.div>

        {/* Bottom-left brand whisper (desktop) */}
        <div className="hidden lg:block absolute bottom-8 left-8">
          <p className="font-[family-name:var(--font-body)] text-sm text-white/40 tracking-widest uppercase">
            Clutch Training Portal
          </p>
        </div>
      </motion.div>

      {/* ───────── RIGHT: Login Content (40%) ───────── */}
      <div className="relative flex w-full lg:w-[40%] min-h-[55vh] lg:min-h-screen items-center justify-center bg-clutch-dark px-6 py-16 sm:px-12 lg:px-16">
        {/* Subtle radial accent behind content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-clutch-plum/20 blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-clutch-red/8 blur-[100px]" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-md w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Kicker label */}
          <motion.div variants={fadeInUp}>
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-clutch-plum/40 bg-clutch-plum/10 text-clutch-red text-xs font-[family-name:var(--font-display)] font-semibold tracking-[0.15em] uppercase">
              Employee Training
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-[-0.03em]"
            variants={fadeInUp}
          >
            Master{" "}
            <span className="text-gradient">
              Claude Code
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-5 font-[family-name:var(--font-body)] text-lg sm:text-xl text-clutch-lavender/80 leading-relaxed max-w-sm"
            variants={fadeInUp}
          >
            Pre-work for your facilitated training session
          </motion.p>

          {/* Divider accent */}
          <motion.div
            className="mt-8 mb-8 w-12 h-[2px] rounded-full bg-gradient-to-r from-clutch-red to-clutch-plum"
            variants={scaleIn}
          />

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleLogin}
            variants={scaleIn}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 32px rgba(255, 70, 76, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-clutch-red text-white font-[family-name:var(--font-display)] font-semibold text-base tracking-wide shadow-lg shadow-clutch-red/20 transition-colors duration-300 hover:bg-clutch-red/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clutch-red focus-visible:ring-offset-2 focus-visible:ring-offset-clutch-dark"
          >
            {/* Google "G" icon */}
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#fff"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#fff"
                opacity="0.85"
              />
              <path
                d="M5.84 14.1a6.9 6.9 0 0 1 0-4.24V7.02H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.53z"
                fill="#fff"
                opacity="0.7"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97.96 12 .96 7.7.96 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"
                fill="#fff"
                opacity="0.55"
              />
            </svg>
            Sign in with Google
            {/* Shimmer sweep */}
            <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </span>
          </motion.button>

          {/* Dev bypass */}
          <motion.a
            href="/dashboard"
            className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border border-white/10 text-white/60 font-[family-name:var(--font-display)] font-medium text-sm tracking-wide transition-all duration-300 hover:border-clutch-red/40 hover:text-white/90 hover:bg-white/5"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue as Guest
          </motion.a>

          {/* Restricted access note */}
          <motion.p
            className="mt-6 text-sm text-white/30 font-[family-name:var(--font-body)]"
            variants={fadeInUp}
          >
            Restricted to{" "}
            <span className="text-clutch-lavender/50 font-medium">
              @clutch.ca
            </span>{" "}
            accounts
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
