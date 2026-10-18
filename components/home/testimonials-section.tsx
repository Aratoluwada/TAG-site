"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "TAG understood what we were trying to communicate and turned it into something that felt far more professional than we imagined.",
    name: "Client Name",
    role: "Founder, Company",
  },
  {
    quote:
      "The process was straightforward from beginning to end. We finally have a digital presence that represents who we are.",
    name: "Client Name",
    role: "Director, Organization",
  },
  {
    quote:
      "What stood out was the attention to detail. Everything felt intentional, from the design to the smallest interactions.",
    name: "Client Name",
    role: "Creative Lead",
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-purple-400">
            Client words
          </p>

          <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            MADE WITH
            <br />
            <span className="text-white/35">PEOPLE IN MIND.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group bg-[#080808] p-7 sm:p-9 lg:min-h-[360px] lg:p-10"
            >
              <Quote className="mb-12 h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" />

              <blockquote className="text-lg leading-8 tracking-[-0.015em] text-white/75 sm:text-xl">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-12">
                <p className="text-sm font-medium text-white">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {testimonial.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/25">
          * Placeholder testimonials — replace with real client feedback before launch.
        </p>
      </div>
    </section>
  )
}