export type ProjectVisual = "dashboard" | "editorial" | "commerce" | "system";

/** A real screenshot, stored in /public. Use a 16:10 desktop capture (e.g. 1440x900). */
export type ProjectImage = {
  src: string;
  alt: string;
};

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
  /** Screenshot shown on cards and the case study page. */
  image?: ProjectImage;
  /** Generated placeholder artwork, only used while a project has no `image`. */
  visual?: ProjectVisual;
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
 * To add a project:
 *   1. Save a 1440x900 screenshot to /public/images/work/<slug>.png and point `image` at it.
 *   2. Set `liveUrl` to the live site and pick one or more `filters`.
 *   3. Optionally list `services` and `technologies` (only what's true).
 *   4. When ready, add `caseStudy.sections` — each renders as an editorial block on /work/[slug].
 *
 * The filter bar on /work only shows categories that have at least one project.
 */
export const projects: Project[] = [
  {
    slug: "royalty-hall-schools",
    name: "Royalty Hall Schools",
    category: "Education / School website",
    description:
      "A website for a Christian school, presenting its academics, facilities and leadership, with online admissions registration.",
    href: "/work/royalty-hall-schools",
    image: {
      src: "/images/work/royalty-hall-schools.png",
      alt: "Royalty Hall Schools website homepage",
    },
    filters: ["Websites", "Education"],
    liveUrl: "https://royaltyhallschools.vercel.app",
  },
  {
    slug: "siwes-defense",
    name: "SIWES Defense",
    category: "Engineering / Report site",
    description:
      "A presentation site for a 12-week SIWES technical report, with a featured IoT project, a training gallery and downloadable report and slides.",
    href: "/work/siwes-defense",
    image: {
      src: "/images/work/siwes-defense.png",
      alt: "SIWES Defense website homepage",
    },
    filters: ["Websites", "Education"],
    liveUrl: "https://aratoluwada-siwes.vercel.app",
  },
  {
    slug: "aratoluwada-cv",
    name: "Aratoluwada",
    category: "Portfolio / Personal site",
    description:
      "A personal portfolio for a front-end developer and mechatronics engineering student who builds software, hardware and IoT systems.",
    href: "/work/aratoluwada-cv",
    image: {
      src: "/images/work/aratoluwada-cv.png",
      alt: "Aratoluwada personal portfolio homepage",
    },
    filters: ["Websites"],
    liveUrl: "https://aratoluwada.cv",
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
