import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { navigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="page-shell grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <BrandLogo size="footer" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-text-secondary">
            TAG is a digital development studio creating considered web experiences.
          </p>
        </div>
        <div className="flex flex-col items-start gap-7 lg:items-end">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
            {navigation.map((item) => (
              <Link className="link" href={item.href} key={item.href}>{item.label}</Link>
            ))}
            <Link className="link" href="/contact">Contact</Link>
          </nav>
          <Link className={buttonVariants({ variant: "secondary" })} href="/work">Explore our work</Link>
        </div>
      </div>
      <div className="page-shell border-t border-border py-5 text-xs text-text-secondary">
        © {new Date().getFullYear()} TAG. All rights reserved.
      </div>
    </footer>
  );
}
