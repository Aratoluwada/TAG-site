import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.7fr_0.7fr] lg:gap-20">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <BrandLogo />
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              Digital experiences for people and organizations with something
              meaningful to build.
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              Let's work together
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Explore
            </p>

            <nav className="flex flex-col items-start gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Connect
            </p>

            <nav className="flex flex-col items-start gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TAG. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Built with intent.</span>
            <span className="hidden sm:inline">Lagos, Nigeria.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}