"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ServiceSection as ServiceSectionData } from "@/data/services";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One service, told as a short story: what it is, what we can build, who it's for and why it
 * matters. On large screens the title stays in view while the details scroll past.
 * Even-numbered services sit on an inset rounded panel to give the page its rhythm.
 */
export function ServiceSection({ service, index }: { service: ServiceSectionData; index: number }) {
  const reduceMotion = useReducedMotion();
  const titleId = `${service.id}-title`;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      aria-labelledby={titleId}
      className={cn("scroll-mt-20", index % 2 === 1 && "panel")}
      id={service.id}
    >
      <div className="page-shell grid gap-12 py-20 sm:gap-16 sm:py-28 lg:grid-cols-12 lg:gap-12 lg:py-36">
        <motion.div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start" {...reveal()}>
          <div className="flex items-center gap-4">
            <span className="font-display text-xs tracking-[0.14em] text-text-secondary">{service.number}</span>
            <span className="h-px w-8 bg-border" />
            <p className="eyebrow">Service</p>
          </div>

          <h2
            className="mt-6 font-display text-[clamp(2.2rem,11.5vw,3.4rem)] font-bold uppercase leading-[0.84] tracking-[-0.03em] text-text-primary lg:text-[clamp(2.4rem,3.9vw,4rem)]"
            id={titleId}
          >
            {service.title}
          </h2>

          <p className="mt-6 max-w-sm font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-text-primary/90 sm:text-2xl">
            {service.tagline}
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-14 lg:col-span-6 lg:col-start-7">
          <motion.div {...reveal(0.05)}>
            <p className="eyebrow">What it is</p>
            <p className="mt-4 text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">{service.what}</p>
          </motion.div>

          <motion.div className="border-t border-border pt-8" {...reveal()}>
            <p className="eyebrow">What we can build</p>
            <ul aria-label={`${service.title}: what we can build`} className="mt-5 flex flex-wrap gap-2.5">
              {service.offerings.map((offering) => (
                <li
                  className="rounded-full border border-border px-4 py-2 text-sm text-text-primary/90 transition-colors duration-200 hover:border-brand/60"
                  key={offering}
                >
                  {offering}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="border-t border-border pt-8" {...reveal()}>
            <p className="eyebrow">Who it&apos;s for</p>
            <ul className="mt-5 space-y-4">
              {service.who.map((line) => (
                <li className="flex gap-4 text-base leading-7 text-text-secondary sm:text-lg sm:leading-8" key={line}>
                  <span aria-hidden="true" className="mt-[0.85rem] h-px w-5 shrink-0 bg-brand sm:mt-4" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="border-t border-border pt-8" {...reveal()}>
            <p className="eyebrow">Why it matters</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">{service.why}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
