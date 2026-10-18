import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/home/final-cta";
import { CaseStudy } from "@/components/work/case-study";
import { getNextProject, getProject, projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main>
      <CaseStudy next={getNextProject(project.slug)} project={project} />
      <FinalCta />
    </main>
  );
}
