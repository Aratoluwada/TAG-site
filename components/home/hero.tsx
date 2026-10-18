"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";

const transition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] } as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { ...transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby="hero-title" className="hero relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute -z-10" />
      <div aria-hidden="true" className="hero-word pointer-events-none absolute -z-10 select-none" />

      <div className="page-shell flex w-full flex-col justify-end pb-14 pt-28 sm:pb-18 lg:pb-22 lg:pt-36">
        <motion.p className="eyebrow mb-8" {...reveal(0.08)}>Digital development studio</motion.p>
        <h1 className="font-display text-[clamp(3rem,18vw,5.5rem)] sm:text-[clamp(3.5rem,11vw,10rem)] font-bold leading-[0.8] tracking-[-0.03em] text-text-primary">
          <motion.span className="block" {...reveal(0.16)}>WE BUILD WHAT</motion.span>
          <motion.span className="block" {...reveal(0.24)}>SHOULD EXIST.</motion.span>
        </h1>
        <motion.div className="mt-10 flex max-w-xl flex-col gap-7 lg:mt-14" {...reveal(0.38)}>
          <p className="max-w-[34rem] text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            TAG is a digital development studio creating high-performance websites and digital experiences for businesses, organizations and people with something to say.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={buttonVariants({ variant: "primary" })} href="/contact">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <Link className={buttonVariants({ variant: "secondary" })} href="/work">Explore our work</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
