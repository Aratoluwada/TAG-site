"use client";

import { motion, useReducedMotion } from "framer-motion";

const transition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] } as const;

export function ContactHero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby="contact-hero-title" className="relative isolate flex min-h-[calc(70svh-5rem)] overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute -z-10" />
      <div aria-hidden="true" className="hero-word pointer-events-none absolute -z-10 select-none" />

      <div className="page-shell flex w-full flex-col justify-end pb-12 pt-28 sm:pb-16 lg:pb-20 lg:pt-36">
        <motion.p className="eyebrow mb-8" {...reveal(0.08)}>Contact</motion.p>

        <h1
          className="font-display text-[clamp(3.2rem,17vw,6rem)] font-bold uppercase leading-[0.8] tracking-[-0.03em] text-text-primary sm:text-[clamp(3.2rem,13vw,11.5rem)]"
          id="contact-hero-title"
        >
          <motion.span className="block" {...reveal(0.16)}>START A</motion.span>
          <motion.span className="block" {...reveal(0.24)}>PROJECT.</motion.span>
        </h1>

        <motion.p
          className="mt-10 max-w-[36rem] text-base leading-7 text-text-secondary sm:mt-12 sm:text-lg sm:leading-8 lg:mt-14"
          {...reveal(0.38)}
        >
          Tell us what you&apos;re building. Send the details through the form, or skip it and reach us directly on WhatsApp, email or
          LinkedIn.
        </motion.p>
      </div>
    </section>
  );
}
