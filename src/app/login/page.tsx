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

// ─── Animation variants ──────────────────────────────
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const heroFade = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};

// ─── Olive leaf SVG for divider ──────────────────────
function OliveLeaf() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-og-brown/40"
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3 2-6.5 2-10S13.5 2 12 2z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10c-1.5-3-2-6.5-2-10S10.5 2 12 2z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="relative z-2 flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* ─── Ambient side images (desktop only) ─── */}
      <div className="pointer-events-none hidden lg:block">
        {/* Left: breadsticks */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 w-[340px] h-[500px] opacity-[0.15] blur-[2px]">
          <Image
            src="/images/og-extracted/page5-img5.jpg"
            alt=""
            fill
            className="object-cover rounded-r-3xl"
            sizes="340px"
          />
        </div>
        {/* Right: family dining */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 w-[340px] h-[500px] opacity-[0.15] blur-[2px]">
          <Image
            src="/images/og-extracted/page7-img5.jpg"
            alt=""
            fill
            className="object-cover rounded-l-3xl"
            sizes="340px"
          />
        </div>
      </div>

      {/* ─── Centered content column ─── */}
      <motion.div
        className="relative z-10 flex w-full max-w-lg flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ─── Hero: OG Logo with tagline ─── */}
        <motion.div className="mb-8 w-full max-w-[500px]" variants={heroFade}>
          <Image
            src="/images/og-extracted/page1-img1.jpg"
            alt="Olive Garden — We're all family here"
            width={1200}
            height={675}
            priority
            className="w-full h-auto rounded-xl shadow-2xl"
            sizes="(max-width: 640px) 90vw, 500px"
          />
        </motion.div>

        {/* ─── Sign-in card ─── */}
        <motion.div
          className="cream-card w-full max-w-md p-8 sm:p-10"
          variants={scaleIn}
        >
          <motion.div
            className="flex flex-col items-center text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Script heading */}
            <motion.h1
              className="script-heading text-3xl sm:text-4xl text-og-dark"
              variants={fadeInUp}
            >
              Welcome to the Table
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="mt-2 font-body text-base text-og-dark/60"
              variants={fadeInUp}
            >
              Your AI training journey starts here
            </motion.p>

            {/* Olive branch divider */}
            <motion.div
              className="olive-divider my-6 w-full"
              variants={fadeInUp}
            >
              <OliveLeaf />
            </motion.div>

            {/* Google Sign-In button */}
            <motion.button
              onClick={handleLogin}
              variants={scaleIn}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(84, 48, 26, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-og-brown px-6 py-4 font-display font-bold text-og-cream shadow-lg transition-colors duration-300 hover:bg-og-brown-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-og-brown focus-visible:ring-offset-2 focus-visible:ring-offset-og-cream"
            >
              {/* Google "G" icon */}
              <svg
                className="h-5 w-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#FFF8F0"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#FFF8F0"
                  opacity="0.85"
                />
                <path
                  d="M5.84 14.1a6.9 6.9 0 0 1 0-4.24V7.02H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.53z"
                  fill="#FFF8F0"
                  opacity="0.7"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97.96 12 .96 7.7.96 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"
                  fill="#FFF8F0"
                  opacity="0.55"
                />
              </svg>
              Sign in with Google
            </motion.button>

            {/* Continue as Guest */}
            <motion.a
              href="/dashboard"
              className="mt-4 text-sm text-og-dark/40 transition-colors duration-300 hover:text-og-dark/70 font-body"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue as Guest
            </motion.a>

            {/* Restricted access note */}
            <motion.p
              className="mt-5 text-xs text-og-dark/30 font-body"
              variants={fadeInUp}
            >
              Restricted to{" "}
              <span className="font-medium text-og-dark/40">
                @olivegarden.com
              </span>{" "}
              accounts
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ─── Bottom watermark: script quote ─── */}
        <motion.div
          className="mt-10 w-full max-w-[400px] opacity-[0.12]"
          variants={fadeInUp}
        >
          <Image
            src="/images/og-extracted/page3-img2.jpg"
            alt=""
            width={800}
            height={400}
            className="w-full h-auto"
            sizes="400px"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
