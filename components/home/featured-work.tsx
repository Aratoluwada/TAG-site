"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ProjectPreview } from "@/components/home/project-preview";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

<<<<<<< HEAD
const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

=======
>>>>>>> origin/main
export function FeaturedWork() {
  const reduceMotion = useReducedMotion();

  return (
<<<<<<< HEAD
    <section aria-labelledby="featured-work-title" className="section overflow-hidden border-t border-border bg-background-secondary">
      <div className="page-shell">
        <motion.div
          className="max-w-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          transition={revealTransition}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">Selected work</p>
          <h2
            className="mt-5 max-w-3xl font-display text-[clamp(3.6rem,9vw,8.5rem)] font-medium uppercase leading-[0.79] tracking-[-0.085em] text-text-primary"
            id="featured-work-title"
          >
            WORK THAT
            <br />
            SPEAKS.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-7 text-text-secondary sm:mt-10 sm:text-lg sm:leading-8">
            Digital experiences built for businesses, organizations, and people with something meaningful to put into the world.
          </p>
        </motion.div>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-36 lg:mt-36 lg:space-y-44">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;

            return (
              <motion.article
                className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:items-center lg:gap-16 xl:gap-24"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                key={project.slug}
                transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.04 }}
                viewport={{ once: true, amount: 0.16 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link
                  aria-label={`View ${project.name}`}
                  className={cn("project-preview-link group", reversed && "lg:order-2")}
                  href={project.href}
                >
                  <ProjectPreview name={project.name} visual={project.visual} />
                  <span className="project-preview-overlay" />
                  <span aria-hidden="true" className="project-preview-arrow">
                    <ArrowUpRight size={21} strokeWidth={1.5} />
                  </span>
                </Link>

                <div className={cn("lg:max-w-md", reversed && "lg:order-1 lg:justify-self-end")}> 
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xs tracking-[0.14em] text-text-secondary">0{index + 1}</span>
                    <span className="h-px w-8 bg-border" />
                    <p className="eyebrow">{project.category}</p>
                  </div>

                  <h3 className="mt-6 font-display text-[clamp(2.6rem,5vw,5rem)] font-medium uppercase leading-[0.84] tracking-[-0.075em] text-text-primary">
                    {project.name}
                  </h3>

                  <p className="mt-6 max-w-sm text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.1em] text-text-secondary/80" aria-label={`${project.name} technologies`}>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  )}

                  <Link className="project-link mt-8" href={project.href}>
                    View project
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-24 border-t border-border pt-8 sm:mt-32 sm:pt-10"
          initial={reduceMotion ? false : { opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1 }}
        >
          <Link className="group inline-flex items-center gap-3 font-display text-base font-medium uppercase tracking-[-0.02em] text-text-primary transition-colors duration-200 hover:text-brand" href="/work">
            View all work
            <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} />
            </span>
          </Link>
        </motion.div>
=======
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
>>>>>>> origin/main
      </div>
    </section>
  );
}
