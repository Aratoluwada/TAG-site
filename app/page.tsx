import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesSection } from "@/components/home/services-section";
import { StatsSection } from "@/components/home/stats-section";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <FeaturedWork />
    </main>
  );
}
