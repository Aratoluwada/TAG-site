
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesSection } from "@/components/home/services-section";
import { StatsSection } from "@/components/home/stats-section";
import { DifferenceSection } from "@/components/home/difference-section";
import { WhoWeBuildFor } from "@/components/home/who-we-build-for";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <main>
      <StatsSection />
      <ServicesSection />
      <FeaturedWork />
      <DifferenceSection />
      <WhoWeBuildFor />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCta />
    </main>
  );
}
