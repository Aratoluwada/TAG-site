/**
 * Everything the contact form needs that isn't UI: the rules for a valid message, the email we
 * send, and the request handler behind /api/contact.
 *
 * It is written against the standard Request/Response APIs and uses relative imports only, so the
 * same validation runs in the browser and on the server, and the handler can be tested on its own.
 */
import { contact } from "../data/contact";

export const contactServices = ["Website", "Web platform", "Digital experience", "Brand system", "Not sure yet"] as const;

export type ContactService = (typeof contactServices)[number];

export type ContactInput = {
  name: string;
  email: string;
  organization: string;
  services: ContactService[];
  message: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "organization" | "services" | "message", string>>;

export const limits = { name: 100, email: 254, organization: 120, message: 5000, body: 20_000 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max + 1) : "";
}

/** Checks a raw form payload. Returns clean values, or a message for each field that needs fixing. */
export function validateContact(raw: unknown): { ok: true; value: ContactInput } | { ok: false; errors: ContactErrors } {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;

  const name = text(data.name, limits.name);
  const email = text(data.email, limits.email);
  const organization = text(data.organization, limits.organization);
  const message = text(data.message, limits.message);
  const services = Array.isArray(data.services)
    ? contactServices.filter((service) => (data.services as unknown[]).includes(service))
    : [];

  const errors: ContactErrors = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > limits.name) errors.name = "That name is a little long. Please shorten it.";

  if (!emailPattern.test(email) || email.length > limits.email) errors.email = "Please enter a valid email address so we can reply.";

  if (services.length === 0) errors.services = "Pick at least one, or choose “Not sure yet”.";

  if (message.length < 10) errors.message = "Tell us a little more about what you have in mind.";
  else if (message.length > limits.message) errors.message = `Please keep this under ${limits.message} characters.`;

  if (organization.length > limits.organization) errors.organization = "That name is a little long. Please shorten it.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, value: { name, email, organization, services, message } };
}

/** Strips line breaks so user input can never inject extra email headers into the subject. */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function buildEmail(input: ContactInput) {
  const subject = `New project enquiry from ${oneLine(input.name)}`;
  const body = [
    `Name: ${oneLine(input.name)}`,
    `Email: ${input.email}`,
    `Organization: ${oneLine(input.organization) || "Not given"}`,
    `Interested in: ${input.services.join(", ")}`,
    "",
    "Message:",
    input.message,
    "",
    "Sent from the TAG website contact form. Hit reply to answer them directly.",
  ].join("\n");

  return { subject, text: body };
}

type Env = Record<string, string | undefined>;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * POST /api/contact. Validates the message and emails it to the TAG inbox through Resend.
 *
 * Environment variables (set in Vercel, see .env.example):
 *   RESEND_API_KEY      required to send. Without it the form tells people to use the direct links.
 *   CONTACT_TO_EMAIL    where messages land. Defaults to the address in data/contact.ts.
 *   CONTACT_FROM_EMAIL  the sender shown in your inbox. Defaults to Resend's shared test sender.
 */
export async function handleContact(request: Request, env: Env = process.env, fetchImpl: typeof fetch = fetch): Promise<Response> {
  const raw = await request.text();
  if (raw.length > limits.body) return json({ ok: false, error: "too_large" }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Hidden field that real people never fill in. Bots do, so we pretend it worked and send nothing.
  if (typeof payload === "object" && payload !== null && (payload as Record<string, unknown>).website) {
    return json({ ok: true }, 200);
  }

  const result = validateContact(payload);
  if (!result.ok) return json({ ok: false, error: "invalid", errors: result.errors }, 400);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: "not_configured" }, 503);

  const { subject, text: body } = buildEmail(result.value);

  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "TAG Website <onboarding@resend.dev>",
        to: [env.CONTACT_TO_EMAIL || contact.email],
        reply_to: result.value.email,
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      // Log the provider's reason (never the key or the visitor's message) so a failed send can be diagnosed in Vercel's logs.
      console.error("Contact form: Resend rejected the email", response.status, await response.text().catch(() => ""));
      return json({ ok: false, error: "send_failed" }, 502);
    }
  } catch (error) {
    // Only the error type and cause code (e.g. ENOTFOUND), never the full message, so nothing sensitive can end up in the logs.
    const code = (error as { cause?: { code?: string } } | null)?.cause?.code;
    console.error("Contact form: could not reach Resend", error instanceof Error ? error.name : "unknown error", code ?? "");
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
