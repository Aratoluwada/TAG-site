"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/data/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        hasScrolled ? "border-b border-border bg-background/90 backdrop-blur-[6px]" : "border-b border-transparent bg-transparent",
      )}
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
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
          Let&apos;s build <span aria-hidden="true">↗</span>
        </Link>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="inline-flex size-10 items-center justify-center rounded-control border border-border text-text-primary transition-colors hover:border-text-secondary hover:text-brand md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </div>
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-x-0 top-full z-50 border-b border-border bg-background transition-[max-height,opacity] duration-300 ease-out md:hidden",
          // Tall enough for the bigger links, and scrolls instead of clipping on short phones.
          isOpen
            ? "max-h-[calc(100svh-5rem)] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden border-transparent opacity-0",
        )}
        id="mobile-navigation"
      >
        <div className="page-shell flex flex-col py-4">
          {navigation.map((item) => (
            <Link
              className="border-b border-border py-4 font-display text-[1.875rem] font-bold uppercase leading-none tracking-[-0.02em] text-text-primary transition-colors duration-200 active:text-brand"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className={cn(buttonVariants({ variant: "primary" }), "mt-6 w-full")} href="/contact" onClick={() => setIsOpen(false)}>
            Let&apos;s build <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
