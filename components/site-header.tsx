"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/data/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative border-b border-border bg-background">
      <div className="page-shell flex h-20 items-center justify-between">
        <BrandLogo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm text-text-secondary md:flex">
          {navigation.map((item) => (
            <Link className="transition-colors hover:text-text-primary" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden md:inline-flex")} href="/contact">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="inline-flex size-10 items-center justify-center border border-border text-text-primary transition-colors hover:border-text-secondary hover:text-brand md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </div>
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-x-0 top-full z-50 overflow-hidden border-b border-border bg-background transition-[max-height,opacity] duration-300 ease-out md:hidden",
          isOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
        id="mobile-navigation"
      >
        <div className="page-shell flex flex-col py-4">
          {navigation.map((item) => (
            <Link className="border-b border-border py-4 text-lg tracking-[-0.03em] text-text-primary" href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className={cn(buttonVariants({ variant: "primary" }), "mt-6 w-full")} href="/contact" onClick={() => setIsOpen(false)}>
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
