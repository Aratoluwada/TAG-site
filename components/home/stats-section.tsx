"use client";

import { motion, useReducedMotion } from "framer-motion";

import { stats } from "@/data/home";
import { cn } from "@/lib/utils";

export function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="TAG by the numbers" className="panel overflow-clip">
      <div className="page-shell grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
        {stats.map((stat, index) => (
          <motion.div
            className={cn("py-8 sm:py-10 lg:py-12", index % 2 === 0 ? "pr-5 sm:pr-8" : "pl-5 sm:pl-8", index >= 2 && "pt-8 md:pt-12")}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            key={stat.label}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-display text-4xl font-bold tracking-[-0.03em] text-text-primary sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
