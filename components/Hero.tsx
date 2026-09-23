"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(50rem_30rem_at_50%_-5rem,rgba(255,176,32,0.12),transparent)]" />
      <div className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item}>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Web design & development agency
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            We build websites & apps that{" "}
            <span className="accent-text">get you more customers.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted sm:text-xl"
          >
            Premium, lightning-fast sites with real, interactive live previews —
            so you can see exactly what you&apos;re getting. No jargon, no
            guesswork.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/contact" className="btn-primary w-full sm:w-auto">
              Start a project
            </Link>
            <Link href="/work" className="btn-ghost w-full sm:w-auto">
              See live work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-base-border bg-base-border sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-base-soft/60 px-4 py-6 text-center">
                <dt className="order-2 mt-1 text-xs text-ink-faint">{s.label}</dt>
                <dd className="order-1 font-display text-2xl font-bold accent-text sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
