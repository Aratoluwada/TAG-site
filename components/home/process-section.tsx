"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We start by understanding your idea, your audience, and what success actually looks like for you.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "We turn the strategy into a clear visual direction, shaping the experience before we write the code.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Design becomes a real digital experience using modern technology, thoughtful interactions, and clean engineering.",
  },
  {
    number: "04",
    title: "LAUNCH",
    description:
      "We test, refine, deploy, and make sure everything is ready for the people you're building it for.",
  },
]

export function ProcessSection() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-purple-400">
              How we work
            </p>

            <h2 className="max-w-3xl text-5xl font-bold tracking-[-0.015em] text-white sm:text-6xl lg:text-7xl">
              FROM IDEA
              <br />
              <span className="text-white/35">TO IMPACT.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45 lg:ml-auto lg:pt-10">
            Great digital work isn&apos;t accidental. Our process keeps strategy,
            creativity, and technology moving in the same direction.
          </p>
        </div>

        <div className="grid border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="group relative border-b border-white/10 p-7 md:border-r md:p-8 lg:min-h-[330px] lg:border-b-0 lg:last:border-r-0"
            >
              <div className="mb-20 flex items-center justify-between">
                <span className="font-mono text-xs text-white/30">
                  {step.number}
                </span>

                <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400" />
              </div>

              <h3 className="mb-5 text-2xl font-bold tracking-[-0.015em] text-white">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-white/40">
                {step.description}
              </p>

              <div className="absolute bottom-0 left-0 h-px w-0 bg-purple-400 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}