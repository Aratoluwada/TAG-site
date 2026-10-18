"use client";

import { motion, useReducedMotion } from "framer-motion";

import { services } from "@/data/home";

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="services-title" className="section overflow-hidden">
      <div className="page-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">What we do</p>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7.4vw,7rem)] font-medium leading-[0.84] tracking-[-0.075em] text-text-primary" id="services-title">
            WE BUILD DIGITAL THINGS.
          </h2>
        </motion.div>

        <div className="mt-16 border-b border-border sm:mt-24">
          {services.map((service, index) => (
            <motion.article
              className="service-row group relative grid gap-7 overflow-hidden border-t border-border py-8 transition-colors duration-300 ease-out hover:border-brand/60 hover:bg-surface/60 active:bg-surface sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8 sm:px-6 sm:py-11 lg:grid-cols-[7rem_minmax(14rem,0.9fr)_minmax(0,1.1fr)_minmax(18rem,1fr)] lg:items-start lg:px-8"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              key={service.number}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.18 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div aria-hidden="true" className="service-glow absolute inset-y-0 left-0 -z-10 w-2/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-display text-sm tracking-[-0.03em] text-text-secondary">{service.number}</p>
              <h3 className="font-display text-4xl font-medium uppercase leading-none tracking-[-0.065em] text-text-primary transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-5xl lg:text-6xl">
                {service.title}
              </h3>
              <div className="lg:pt-1">
                <p className="max-w-sm text-sm leading-6 text-text-secondary sm:text-base">{service.description}</p>
                <ul className="mt-6 flex max-w-lg flex-wrap gap-x-4 gap-y-2 text-sm text-text-primary/80" aria-label={`${service.title} services`}>
                  {service.offerings.map((offering) => <li key={offering}>{offering}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
