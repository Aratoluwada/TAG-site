import type { Metadata } from "next";

import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with TAG. Send us the details, or reach us directly on WhatsApp, email or LinkedIn.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section aria-label="Get in touch" className="panel">
        <div className="page-shell grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <div className="lg:col-span-5">
            <ContactChannels />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
