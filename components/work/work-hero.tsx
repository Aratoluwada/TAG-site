"use client";

import { motion, useReducedMotion } from "framer-motion";

const transition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] } as const;

export function WorkHero({ projectCount }: { projectCount: number }) {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby="work-title" className="relative isolate flex min-h-[calc(78svh-5rem)] overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute -z-10" />
      <div aria-hidden="true" className="hero-word pointer-events-none absolute -z-10 select-none" />

      <div className="page-shell flex w-full flex-col justify-end pb-14 pt-28 sm:pb-18 lg:pb-22 lg:pt-36">
        <motion.p className="eyebrow mb-8" {...reveal(0.08)}>Selected work</motion.p>

        <h1
          className="font-display text-[clamp(3.4rem,18vw,6rem)] sm:text-[clamp(3.2rem,13vw,11.5rem)] font-bold uppercase leading-[0.8] tracking-[-0.03em] text-text-primary"
          id="work-title"
        >
          <motion.span className="block" {...reveal(0.16)}>WORK THAT</motion.span>
          <motion.span className="block" {...reveal(0.24)}>SPEAKS.</motion.span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-8 sm:mt-12 md:flex-row md:items-end md:justify-between lg:mt-14"
          {...reveal(0.38)}
        >
          <p className="max-w-[34rem] text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            TAG builds digital experiences for ambitious people and organizations. Websites, platforms and products,
            each shaped around what it needs to say and do.
          </p>

          <div className="flex items-center gap-4 text-text-secondary">
            <span className="font-display text-4xl font-bold tracking-[-0.025em] text-text-primary">
              {String(projectCount).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="eyebrow">Projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
