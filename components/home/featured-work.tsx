"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ProjectPreview } from "@/components/home/project-preview";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="featured-work-title" className="section border-t border-border bg-background-secondary">
      <div className="page-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">Proof of thought</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,7.4vw,7rem)] font-medium leading-[0.84] tracking-[-0.075em] text-text-primary" id="featured-work-title">SELECTED WORK</h2>
        </motion.div>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-32 lg:space-y-40">
          {projects.map((project, index) => (
            <motion.article
              className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-24"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              key={project.slug}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.14 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link aria-label={`View ${project.name}`} className={cn("project-preview-link group", index % 2 === 1 && "lg:order-2")} href={project.href}>
                <ProjectPreview name={project.name} visual={project.visual} />
                <span className="project-preview-overlay" />
                <span className="project-preview-arrow"><ArrowUpRight size={21} strokeWidth={1.5} /></span>
              </Link>
              <div className={cn("lg:max-w-md", index % 2 === 1 && "lg:order-1 lg:justify-self-end")}>
                <p className="eyebrow">{project.category}</p>
                <h3 className="mt-5 font-display text-4xl font-medium uppercase leading-[0.9] tracking-[-0.065em] text-text-primary sm:text-5xl xl:text-6xl">{project.name}</h3>
                <p className="mt-6 max-w-sm text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">{project.description}</p>
                <Link className="project-link mt-8" href={project.href}>View project <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} /></Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-8 sm:mt-28 sm:pt-10">
          <Link className="project-link text-base" href="/work">View all work <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} /></Link>
        </div>
      </div>
    </section>
  );
}
