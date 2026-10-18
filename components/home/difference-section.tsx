"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Blocks,
  Compass,
  Sparkles,
} from "lucide-react"

const differences = [
  {
    number: "01",
    icon: Compass,
    title: "BUILT WITH INTENT",
    description:
      "Every project starts with a purpose. We design around the problem, the people, and the outcome—not a template.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "DESIGN THAT WORKS",
    description:
      "We care about the details, but never at the expense of usability. Every interaction has a reason to exist.",
  },
  {
    number: "03",
    icon: Blocks,
    title: "TECH WITHOUT THE NOISE",
    description:
      "Modern technology should make a digital experience better—not make it harder to understand.",
  },
]

export function DifferenceSection() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-purple-400">
              The TAG Difference
            </p>

            <h2 className="max-w-xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              NOT JUST
              <br />
              ANOTHER
              <br />
              <span className="text-white/35">WEBSITE.</span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-7 text-white/55">
              We combine strategy, design, and technology to create digital
              experiences that actually move things forward.
            </p>

            <a
              href="/about"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-medium text-white"
            >
              More about TAG
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-purple-400 group-hover:bg-purple-500/10">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          <div className="border-t border-white/10">
            {differences.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group grid grid-cols-[48px_1fr] gap-6 border-b border-white/10 py-9 sm:grid-cols-[64px_1fr_40px] sm:gap-8"
                >
                  <span className="pt-1 font-mono text-xs text-white/30">
                    {item.number}
                  </span>

                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <Icon className="h-4 w-4 text-purple-400 transition-transform duration-300 group-hover:scale-110" />

                      <h3 className="text-sm font-semibold tracking-[0.08em] text-white">
                        {item.title}
                      </h3>
                    </div>

                    <p className="max-w-lg text-sm leading-7 text-white/45">
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight className="hidden h-5 w-5 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400 sm:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}