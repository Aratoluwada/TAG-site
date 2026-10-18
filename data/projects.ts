export type ProjectVisual = "dashboard" | "editorial" | "commerce" | "system";

/** Portfolio filter categories. A project can belong to more than one. */
export const projectFilters = ["Websites", "Web Applications", "Education", "Business", "Organizations"] as const;

export type ProjectFilter = (typeof projectFilters)[number];

/** One editorial block on a case study page. Add as many as the story needs. */
export type CaseStudySection = {
  label: string;
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  /** Where the project card links to. Defaults to the case study page. */
  href: string;
  visual: ProjectVisual;
  filters: ProjectFilter[];
  technologies?: string[];
  /** What TAG delivered, shown on the case study page. */
  services?: string[];
  /** Real, live site. When set, the case study page shows a "Visit live site" link. */
  liveUrl?: string;
  /** Longer story. Leave undefined until the case study is written. */
  caseStudy?: {
    sections: CaseStudySection[];
  };
};

/**
 * Temporary project content. Replace entries here when case studies are ready.
 *
 * To publish a real project:
 *   1. Set `liveUrl` to the live site.
 *   2. List `services` TAG delivered.
 *   3. Add `caseStudy.sections` — each one renders as an editorial block on /work/[slug].
 */
export const projects: Project[] = [
  {
    slug: "academiq-cloud",
    name: "Academiq Cloud",
    category: "Education / SaaS",
    description: "A cloud-based school management platform built for modern education.",
    href: "/work/academiq-cloud",
    visual: "dashboard",
    filters: ["Web Applications", "Education"],
    technologies: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    slug: "northline-journal",
    name: "Northline Journal",
    category: "Culture / Editorial",
    description: "A refined publishing platform for ideas, stories, and a growing creative community.",
    href: "/work/northline-journal",
    visual: "editorial",
    filters: ["Websites", "Organizations"],
    technologies: ["Next.js", "CMS", "Motion"],
  },
  {
    slug: "form-and-field",
    name: "Form & Field",
    category: "Commerce / Brand",
    description: "A considered digital storefront that makes a distinctive independent brand feel tactile online.",
    href: "/work/form-and-field",
    visual: "commerce",
    filters: ["Websites", "Business"],
    technologies: ["Next.js", "Shopify", "Stripe"],
  },
  {
    slug: "civic-assembly",
    name: "Civic Assembly",
    category: "Community / Platform",
    description: "A member platform designed to turn shared purpose into visible participation.",
    href: "/work/civic-assembly",
    visual: "system",
    filters: ["Web Applications", "Organizations"],
    technologies: ["React", "TypeScript", "Postgres"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** The project after `slug`, wrapping back to the first. Used for "Next project" navigation. */
export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
