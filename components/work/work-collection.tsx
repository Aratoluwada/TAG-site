"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectEntry } from "@/components/work/project-entry";
import { projectFilters, projects, type ProjectFilter } from "@/data/projects";
import { cn } from "@/lib/utils";

type ActiveFilter = ProjectFilter | "All";

export function WorkCollection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ActiveFilter>("All");

  // Only offer categories that actually have projects, so a filter never leads to an empty page.
  const options = useMemo(
    () => [
      { label: "All" as const, count: projects.length },
      ...projectFilters
        .map((filter) => ({ label: filter, count: projects.filter((project) => project.filters.includes(filter)).length }))
        .filter((option) => option.count > 0),
    ],
    [],
  );

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.filters.includes(active))),
    [active],
  );

  return (
    <section aria-label="Project collection" className="border-t border-border bg-background-secondary">
      <div className="sticky top-20 z-40 border-b border-border bg-background/90 backdrop-blur-[6px]">
        <div className="page-shell">
          <div
            aria-label="Filter projects by category"
            className="-mx-2 flex overflow-x-auto [scrollbar-width:none] sm:-mx-5 [&::-webkit-scrollbar]:hidden"
            role="group"
          >
            {options.map((option) => {
              const isActive = option.label === active;

              return (
                <button
                  aria-pressed={isActive}
                  className={cn(
                    "relative inline-flex min-h-14 shrink-0 items-center gap-2 px-3 font-display text-sm font-medium uppercase tracking-[-0.01em] transition-colors duration-200 sm:px-5",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
                  )}
                  key={option.label}
                  onClick={() => setActive(option.label)}
                  type="button"
                >
                  {option.label}
                  <span className="text-[0.6875rem] tracking-[0.1em] text-text-secondary/70">
                    {String(option.count).padStart(2, "0")}
                  </span>
                  {isActive && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-px bg-brand sm:inset-x-5"
                      layoutId="work-filter-indicator"
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-shell py-16 sm:py-24 lg:py-32">
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {active === "All" ? "" : ` in ${active}`}
        </p>

        <div className="relative space-y-24 sm:space-y-32 lg:space-y-44">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, index) => (
              <ProjectEntry index={index} key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
