export type ProjectVisual = "dashboard" | "editorial" | "commerce" | "system";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  href: string;
  visual: ProjectVisual;
};

/** Temporary project content. Replace entries here when case studies are ready. */
export const projects: Project[] = [
  {
    slug: "academiq-cloud",
    name: "Academiq Cloud",
    category: "Education / SaaS",
    description: "A cloud-based school management platform built for modern education.",
    href: "/work",
    visual: "dashboard",
  },
  {
    slug: "northline-journal",
    name: "Northline Journal",
    category: "Culture / Editorial",
    description: "A refined publishing platform for ideas, stories, and a growing creative community.",
    href: "/work",
    visual: "editorial",
  },
  {
    slug: "form-and-field",
    name: "Form & Field",
    category: "Commerce / Brand",
    description: "A considered digital storefront that makes a distinctive independent brand feel tactile online.",
    href: "/work",
    visual: "commerce",
  },
  {
    slug: "civic-assembly",
    name: "Civic Assembly",
    category: "Community / Platform",
    description: "A member platform designed to turn shared purpose into visible participation.",
    href: "/work",
    visual: "system",
  },
];
