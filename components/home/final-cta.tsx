"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 lg:py-52">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-purple-400">
            Start something
          </p>

          <h2 className="text-[clamp(2.4rem,14vw,3.75rem)] font-bold leading-[0.9] tracking-[-0.025em] text-white sm:text-7xl lg:text-[9rem]">
            HAVE SOMETHING
            <br />
            <span className="text-white/35">TO BUILD?</span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base leading-7 text-white/45">
              Tell us what you&apos;re working on. Whether it&apos;s an idea, a business,
              or something entirely new, let&apos;s turn it into something people
              remember.
            </p>

            <a
              href="/contact"
              className="group inline-flex w-fit items-center gap-4 rounded-control border border-white/15 px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10"
            >
              Start a project

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}