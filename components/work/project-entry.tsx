"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ProjectPreview } from "@/components/home/project-preview";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type ProjectEntryProps = {
  project: Project;
  /** Position within the currently visible list, used for the 01, 02… numbering. */
  index: number;
};

/**
 * One large, editorial portfolio entry: a wide preview that staggers left and right,
 * with the name, story and details set beneath it.
 */
export function ProjectEntry({ project, index }: ProjectEntryProps) {
  const reduceMotion = useReducedMotion();
  const offset = index % 2 === 1;

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby={`project-${project.slug}`}
      className="grid grid-cols-12"
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      layout={reduceMotion ? false : "position"}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
    >
      <div className={cn("col-span-12 lg:col-span-10", offset && "lg:col-start-3")}>
        <Link aria-label={`View ${project.name} case study`} className="project-preview-link group" href={project.href}>
          <ProjectPreview image={project.image} name={project.name} visual={project.visual} />
          <span className="project-preview-overlay" />
          <span aria-hidden="true" className="project-preview-arrow">
            <ArrowUpRight size={21} strokeWidth={1.5} />
          </span>
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 lg:mt-10">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-display text-xs tracking-[0.14em] text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-border" />
              <p className="eyebrow">{project.category}</p>
            </div>

            <h2
              className="mt-6 font-display text-[clamp(2.6rem,6.4vw,6.25rem)] font-medium uppercase leading-[0.84] tracking-[-0.075em] text-text-primary"
              id={`project-${project.slug}`}
            >
              {project.name}
            </h2>
          </div>

          <div className="md:pt-9">
            <p className="max-w-md text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">{project.description}</p>

            <ul aria-label={`${project.name} categories`} className="mt-6 flex flex-wrap gap-2">
              {project.filters.map((filter) => (
                <li className="border border-border px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-text-secondary" key={filter}>
                  {filter}
                </li>
              ))}
            </ul>

            {project.technologies && (
              <ul
                aria-label={`${project.name} technologies`}
                className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.1em] text-text-secondary/80"
              >
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            )}

            <Link className="project-link mt-8" href={project.href}>
              View case study
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
