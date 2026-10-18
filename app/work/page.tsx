import type { Metadata } from "next";

import { FinalCta } from "@/components/home/final-cta";
import { WorkCollection } from "@/components/work/work-collection";
import { WorkHero } from "@/components/work/work-hero";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from TAG: websites, platforms and digital experiences built for ambitious people and organizations.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkHero projectCount={projects.length} />
      <WorkCollection />
      <FinalCta />
    </main>
  );
}
