"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ProjectPreview } from "@/components/home/project-preview";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

export function FeaturedWork() {
  const reduceMotion = useReducedMotion();

  return (
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
                  <ProjectPreview image={project.image} name={project.name} visual={project.visual} />
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
      </div>
    </section>
  );
}
