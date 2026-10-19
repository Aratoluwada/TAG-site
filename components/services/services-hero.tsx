"use client";

import { motion, useReducedMotion } from "framer-motion";

import { serviceSections } from "@/data/services";

const transition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] } as const;

export function ServicesHero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby="services-hero-title" className="relative isolate flex min-h-[calc(78svh-5rem)] overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute -z-10" />
      <div aria-hidden="true" className="hero-word pointer-events-none absolute -z-10 select-none" />

      <div className="page-shell flex w-full flex-col justify-end pb-12 pt-28 sm:pb-16 lg:pb-20 lg:pt-36">
        <motion.p className="eyebrow mb-8" {...reveal(0.08)}>Services</motion.p>

        <h1
          className="font-display text-[clamp(3.4rem,18vw,6rem)] font-bold uppercase leading-[0.8] tracking-[-0.03em] text-text-primary sm:text-[clamp(3.2rem,13vw,11.5rem)]"
          id="services-hero-title"
        >
          <motion.span className="block" {...reveal(0.16)}>WHAT WE</motion.span>
          <motion.span className="block" {...reveal(0.24)}>BUILD.</motion.span>
        </h1>

        <motion.p
          className="mt-10 max-w-[36rem] text-base leading-7 text-text-secondary sm:mt-12 sm:text-lg sm:leading-8 lg:mt-14"
          {...reveal(0.38)}
        >
          Websites, platforms, experiences and brand systems for businesses, schools, churches and organizations. Here is what each one
          is, what goes into it, and who it is for.
        </motion.p>

        <motion.nav
          aria-label="Jump to a service"
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border sm:mt-16 md:grid-cols-4"
          {...reveal(0.5)}
        >
          {serviceSections.map((service) => (
            <a
              className="group flex items-baseline gap-3 py-4 text-text-secondary transition-colors duration-200 hover:text-text-primary sm:py-5"
              href={`#${service.id}`}
              key={service.id}
            >
              <span className="font-display text-xs tracking-[0.14em]">{service.number}</span>
              <span className="font-display text-base font-semibold tracking-[-0.01em] text-text-primary sm:text-lg">{service.title}</span>
              <span aria-hidden="true" className="ml-auto text-sm text-brand opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
                ↓
              </span>
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
