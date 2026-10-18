"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ProjectPreview } from "@/components/home/project-preview";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Reusable case study layout. It renders whatever the project's data provides:
 * add `services`, `liveUrl` and `caseStudy.sections` in data/projects.ts and they appear here.
 */
export function CaseStudy({ project, next }: { project: Project; next?: Project }) {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, ease, delay: reduceMotion ? 0 : delay },
  });

  const scrollReveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease },
  } as const;

  const sections = project.caseStudy?.sections ?? [];

  const details = [
    { label: "Category", value: project.category },
    project.services?.length ? { label: "Services", value: project.services.join(", ") } : null,
    project.technologies?.length ? { label: "Built with", value: project.technologies.join(", ") } : null,
  ].filter((detail): detail is { label: string; value: string } => detail !== null);

  return (
    <>
      <section aria-labelledby="case-study-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
        <div aria-hidden="true" className="hero-glow absolute -z-10" />

        <div className="page-shell pb-14 pt-28 sm:pb-20 lg:pb-24 lg:pt-36">
          <motion.div {...reveal(0.04)}>
            <Link className="project-link text-text-secondary" href="/work">
              <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
              All work
            </Link>
          </motion.div>

          <motion.p className="eyebrow mt-12 sm:mt-16" {...reveal(0.1)}>{project.category}</motion.p>

          <motion.h1
            className="mt-6 font-display text-[clamp(3rem,11vw,10rem)] font-medium uppercase leading-[0.8] tracking-[-0.085em] text-text-primary"
            id="case-study-title"
            {...reveal(0.18)}
          >
            {project.name}
          </motion.h1>

          <motion.p className="mt-10 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8" {...reveal(0.3)}>
            {project.description}
          </motion.p>
        </div>
      </section>

      <section aria-label={`${project.name} preview`} className="border-t border-border bg-background-secondary">
        <div className="page-shell py-12 sm:py-16 lg:py-20">
          <motion.div className="project-preview-link" {...reveal(0.4)}>
            <ProjectPreview image={project.image} name={project.name} visual={project.visual} />
          </motion.div>

          <dl className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {details.map((detail) => (
              <motion.div key={detail.label} {...scrollReveal}>
                <dt className="eyebrow">{detail.label}</dt>
                <dd className="mt-3 text-base leading-7 text-text-primary">{detail.value}</dd>
              </motion.div>
            ))}

            {project.liveUrl && (
              <motion.div {...scrollReveal}>
                <dt className="eyebrow">Live site</dt>
                <dd className="mt-3">
                  <a className="project-link" href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                    Visit site
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </a>
                </dd>
              </motion.div>
            )}
          </dl>
        </div>
      </section>

      <section aria-label="Case study" className="border-t border-border">
        <div className="page-shell section-sm">
          {sections.length > 0 ? (
            <div className="space-y-20 sm:space-y-28 lg:space-y-36">
              {sections.map((section, index) => (
                <motion.article className="grid gap-6 lg:grid-cols-12 lg:gap-12" key={section.label} {...scrollReveal}>
                  <div className="flex items-start gap-4 lg:col-span-3">
                    <span className="font-display text-xs tracking-[0.14em] text-text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-[0.45rem] h-px w-8 bg-border" />
                    <p className="eyebrow">{section.label}</p>
                  </div>

                  <div className="lg:col-span-8 lg:col-start-5">
                    <h2 className="font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.06em] text-text-primary">
                      {section.heading}
                    </h2>
                    <p className="mt-8 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">{section.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div className="card grid gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16" {...scrollReveal}>
              <div className="lg:col-span-7">
                <p className="eyebrow">Case study</p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.06em] text-text-primary">
                  The full story is on its way.
                </h2>
                <p className="mt-8 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                  We&apos;re putting together the full story behind {project.name}: the problem, the thinking and the result. Want to
                  hear how we&apos;d approach something similar for you?
                </p>
              </div>

              <div className="flex items-end lg:col-span-5 lg:justify-end">
                <Link className={buttonVariants({ variant: "primary" })} href="/contact">
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {next && (
        <section aria-label="Next project" className="border-t border-border bg-background-secondary">
          <div className="page-shell py-16 sm:py-24 lg:py-32">
            <motion.div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20" {...scrollReveal}>
              <div>
                <p className="eyebrow">Next project</p>
                <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium uppercase leading-[0.84] tracking-[-0.075em] text-text-primary">
                  {next.name}
                </h2>
                <p className="mt-6 max-w-sm text-base leading-7 text-text-secondary">{next.description}</p>
                <Link className="project-link mt-8" href={next.href}>
                  View case study
                  <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                </Link>
              </div>

              <Link aria-label={`View ${next.name} case study`} className="project-preview-link group" href={next.href}>
                <ProjectPreview image={next.image} name={next.name} visual={next.visual} />
                <span className="project-preview-overlay" />
                <span aria-hidden="true" className="project-preview-arrow">
                  <ArrowUpRight size={21} strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
