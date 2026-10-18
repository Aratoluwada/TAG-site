import Image from "next/image";

import type { ProjectImage, ProjectVisual } from "@/data/projects";

type ProjectPreviewProps = {
  name: string;
  /** A real screenshot. Takes priority over `visual`. */
  image?: ProjectImage;
  /** Generated placeholder artwork, used when a project has no screenshot yet. */
  visual?: ProjectVisual;
};

export function ProjectPreview({ name, image, visual }: ProjectPreviewProps) {
  if (image) {
    return (
      <div className="project-preview bg-[#0b0b0e]">
        <Image
          alt={image.alt}
          className="object-cover object-top"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          src={image.src}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`project-preview ${visual ? `project-preview-${visual}` : "bg-surface"}`}>
      {visual === "dashboard" && <DashboardPreview />}
      {visual === "editorial" && <EditorialPreview />}
      {visual === "commerce" && <CommercePreview />}
      {visual === "system" && <SystemPreview />}
      <span className="project-preview-name">{name}</span>
    </div>
  );
}

function DashboardPreview() {
  return <div className="project-dashboard"><div className="project-dashboard-rail" /><div className="project-dashboard-main"><div className="project-dashboard-top"><span /><span /><span /></div><div className="project-dashboard-metrics"><i /><i /><i /></div><div className="project-dashboard-chart"><b /><b /><b /><b /><b /><b /><b /></div></div></div>;
}

function EditorialPreview() {
  return <div className="project-editorial"><p>THE NORTHLINE</p><strong>FOR<br />THOSE<br />WHO<br />NOTICE.</strong><span>Vol. 07</span></div>;
}

function CommercePreview() {
  return <div className="project-commerce"><div className="project-commerce-orb" /><p>FORM<br />&amp; FIELD</p><span>Objects for living</span><i /></div>;
}

function SystemPreview() {
  return <div className="project-system"><div className="project-system-grid"><span>01</span><span>02</span><span>03</span><span>04</span></div><p>ASSEMBLE<br />THE<br />COMMON.</p></div>;
}
