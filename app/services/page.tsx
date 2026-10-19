import type { Metadata } from "next";

import { FinalCta } from "@/components/home/final-cta";
import { ServiceSection } from "@/components/services/service-section";
import { ServicesHero } from "@/components/services/services-hero";
import { serviceSections } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What TAG builds: websites, web platforms, digital experiences and brand systems for businesses, schools, churches and organizations.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      {serviceSections.map((service, index) => (
        <ServiceSection index={index} key={service.id} service={service} />
      ))}
      <FinalCta title={["HAVE SOMETHING", "WORTH BUILDING?"]} />
    </main>
  );
}
