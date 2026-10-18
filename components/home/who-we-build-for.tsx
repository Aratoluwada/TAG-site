"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const audiences = [
  "Businesses",
  "Schools",
  "Churches",
  "NGOs",
  "Startups",
  "Organizations",
  "Individuals",
]

export function WhoWeBuildFor() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-purple-400">
              Who we build for
            </p>

            <h2 className="max-w-3xl text-5xl font-bold tracking-[-0.015em] text-white sm:text-6xl lg:text-7xl">
              YOUR WORLD.
              <br />
              <span className="text-white/35">DIGITALLY BUILT.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45 lg:pb-2">
            From ambitious individuals to growing organizations, we build
            digital products for people with something worth putting online.
          </p>
        </div>

        <div className="border-t border-white/10">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex items-center justify-between border-b border-white/10 py-7 sm:py-9"
            >
              <div className="flex items-center gap-5 sm:gap-8">
                <span className="font-mono text-xs text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-2xl font-bold tracking-[-0.015em] text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {audience}
                </h3>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/25 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-purple-500/10 group-hover:text-purple-400">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}