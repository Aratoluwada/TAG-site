"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { contact, emailHref, whatsappHref } from "@/data/contact";

const channels = [
  { label: "WhatsApp", value: contact.whatsapp.display, href: whatsappHref, external: true },
  { label: "Email", value: contact.email, href: emailHref, external: false },
  { label: "LinkedIn", value: "Aratoluwada Toluwade", href: contact.linkedin, external: true },
] as const;

/** On very narrow screens an email address should wrap after the "@", not in the middle of the domain. */
function withBreakAfterAt(value: string) {
  const [local, domain] = value.split("@");
  return domain === undefined ? value : (
    <>
      {local}@<wbr />
      {domain}
    </>
  );
}

export function ContactChannels() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="eyebrow">Prefer to talk?</p>
        <h2 className="mt-5 max-w-sm font-display text-[clamp(2rem,9vw,2.75rem)] font-bold leading-[0.95] tracking-[-0.025em] text-text-primary sm:text-4xl lg:text-5xl">
          Message us directly.
        </h2>
        <p className="mt-6 max-w-sm text-base leading-7 text-text-secondary">
          Quick question or already know what you need? Reach out on whichever is easiest for you.
        </p>
      </motion.div>

      <ul className="mt-10 border-b border-border sm:mt-12">
        {channels.map((channel, index) => (
          <motion.li
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            key={channel.label}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : index * 0.07 }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <a
              className="group flex items-center justify-between gap-4 border-t border-border py-6 transition-colors duration-300 hover:border-brand/60"
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="min-w-0">
                <span className="eyebrow block">{channel.label}</span>
                <span className="mt-2 block font-display text-base font-semibold tracking-[-0.01em] text-text-primary [overflow-wrap:break-word] transition-transform duration-300 ease-out group-hover:translate-x-1 min-[420px]:text-lg sm:text-xl lg:text-2xl">
                  {withBreakAfterAt(channel.value)}
                </span>
                {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
              </span>
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-control border border-border text-text-secondary transition-[background-color,border-color,color] duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-text-primary"
              >
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
