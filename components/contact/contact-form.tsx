"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { contact, emailHref, whatsappHref } from "@/data/contact";
import { contactServices, limits, validateContact, type ContactErrors } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "mt-3 block w-full rounded-control border bg-background px-4 py-3.5 text-base text-text-primary placeholder:text-text-secondary/60 transition-colors duration-200 hover:border-white/25 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40";

const fieldOrder = ["name", "email", "services", "message"] as const;

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const successRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function focusFirstError(form: HTMLFormElement, found: ContactErrors) {
    const first = fieldOrder.find((key) => found[key]);
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      message: String(data.get("message") ?? ""),
      services: data.getAll("services").map(String),
      website: String(data.get("website") ?? ""), // hidden trap for bots
    };

    const result = validateContact(payload);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      focusFirstError(form, result.errors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as { ok?: boolean; errors?: ContactErrors } | null;

      if (response.ok && body?.ok) {
        setSentTo({ name: result.value.name, email: result.value.email });
        setStatus("success");
        form.reset();
        return;
      }

      if (response.status === 400 && body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        focusFirstError(form, body.errors);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className="card p-6 sm:p-10 lg:p-12">
      {status === "success" ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Message sent</p>
          <h2
            className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.025em] text-text-primary outline-none sm:text-5xl"
            ref={successRef}
            tabIndex={-1}
          >
            Thanks, {sentTo.name.split(" ")[0]}.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            We&apos;ve got your message and will reply to <span className="text-text-primary [overflow-wrap:anywhere]">{sentTo.email}</span>.
            If it&apos;s urgent, message us on WhatsApp too.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="button button-primary" href={whatsappHref} rel="noopener noreferrer" target="_blank">
              Open WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <button className="button button-secondary" onClick={() => setStatus("idle")} type="button">
              Send another message
            </button>
          </div>
        </motion.div>
      ) : (
        <form noValidate onSubmit={onSubmit}>
          <p className="eyebrow">Project enquiry</p>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[0.95] tracking-[-0.025em] text-text-primary sm:text-4xl">
            Tell us about it.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-text-secondary">
            A few details is plenty. We&apos;ll ask for the rest.
          </p>

          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            <div>
              <label className="eyebrow" htmlFor="contact-name">Your name</label>
              <input
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                className={cn(field, errors.name ? "border-red-400/70" : "border-border")}
                id="contact-name"
                maxLength={limits.name}
                name="name"
                type="text"
              />
              {errors.name && <p className="mt-2 text-sm text-red-300" id="contact-name-error">{errors.name}</p>}
            </div>

            <div>
              <label className="eyebrow" htmlFor="contact-email">Email</label>
              <input
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className={cn(field, errors.email ? "border-red-400/70" : "border-border")}
                id="contact-email"
                inputMode="email"
                maxLength={limits.email}
                name="email"
                type="email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-300" id="contact-email-error">{errors.email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="eyebrow" htmlFor="contact-organization">
                Organization <span className="normal-case tracking-normal text-text-secondary/70">(optional)</span>
              </label>
              <input
                aria-describedby={errors.organization ? "contact-organization-error" : undefined}
                aria-invalid={Boolean(errors.organization)}
                autoComplete="organization"
                className={cn(field, errors.organization ? "border-red-400/70" : "border-border")}
                id="contact-organization"
                maxLength={limits.organization}
                name="organization"
                type="text"
              />
              {errors.organization && (
                <p className="mt-2 text-sm text-red-300" id="contact-organization-error">{errors.organization}</p>
              )}
            </div>
          </div>

          <fieldset
            aria-describedby={errors.services ? "contact-services-error" : undefined}
            className="mt-9 min-w-0"
          >
            <legend className="eyebrow">What do you need?</legend>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {contactServices.map((service) => (
                <label className="cursor-pointer" key={service}>
                  <input
                    aria-invalid={Boolean(errors.services)}
                    className="peer sr-only"
                    name="services"
                    type="checkbox"
                    value={service}
                  />
                  <span
                    className={cn(
                      "block rounded-full border px-4 py-3 text-sm text-text-primary/90 transition-colors duration-200 hover:border-white/30 peer-checked:border-brand peer-checked:bg-brand/15 peer-checked:text-text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand",
                      errors.services ? "border-red-400/70" : "border-border",
                    )}
                  >
                    {service}
                  </span>
                </label>
              ))}
            </div>
            {errors.services && <p className="mt-3 text-sm text-red-300" id="contact-services-error">{errors.services}</p>}
          </fieldset>

          <div className="mt-9">
            <label className="eyebrow" htmlFor="contact-message">Tell us about your project</label>
            <textarea
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              aria-invalid={Boolean(errors.message)}
              className={cn(field, "min-h-40 resize-y leading-7", errors.message ? "border-red-400/70" : "border-border")}
              id="contact-message"
              maxLength={limits.message}
              name="message"
              placeholder="What are you building, who is it for, and when would you like it live?"
              rows={6}
            />
            {errors.message && <p className="mt-2 text-sm text-red-300" id="contact-message-error">{errors.message}</p>}
          </div>

          {/* Honeypot: invisible to people and screen readers, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
            <label htmlFor="contact-website">Leave this empty</label>
            <input autoComplete="off" id="contact-website" name="website" tabIndex={-1} type="text" />
          </div>

          {status === "error" && (
            <div className="mt-8 rounded-control border border-red-400/40 bg-red-400/5 p-5 text-sm leading-6 text-text-primary" role="alert">
              <p className="font-semibold">We couldn&apos;t send that just now.</p>
              <p className="mt-2 text-text-secondary">
                Your message is still here, so you can try again. Or reach us directly:{" "}
                <a className="text-text-primary underline underline-offset-4 hover:text-brand [overflow-wrap:anywhere]" href={emailHref}>
                  {contact.email}
                </a>{" "}
                or{" "}
                <a className="text-text-primary underline underline-offset-4 hover:text-brand" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
                .
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              aria-disabled={sending}
              className="w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
              disabled={sending}
              type="submit"
            >
              {sending ? "Sending…" : "Send message"} {!sending && <span aria-hidden="true">↗</span>}
            </Button>
            <p className="text-sm text-text-secondary">We&apos;ll reply to the email you give us.</p>
          </div>
        </form>
      )}
    </div>
  );
}
