import { services } from "@/data/home";

/** The story behind one service on /services. Numbers match the entries in data/home.ts. */
type ServiceDetail = {
  /** Anchor for in-page links, e.g. /services#websites */
  id: string;
  /** One confident line that sums the service up. */
  tagline: string;
  /** What it is, in plain language. */
  what: string;
  /** Who it's for, as short scannable lines. */
  who: readonly string[];
  /** Why it matters to the people we build it for. */
  why: string;
};

const details = {
  "01": {
    id: "websites",
    tagline: "The first thing people see of you.",
    what: "A website is where people decide whether to trust you. We design and build sites that are clear, fast and unmistakably yours, not a template with your logo dropped in.",
    who: [
      "Businesses that want to look as established as they are",
      "Schools, churches and NGOs reaching families, members and supporters",
      "People launching something new who need a proper home for it",
    ],
    why: "Most people meet you on their phone before they ever meet you in person. A site that loads quickly and says the right thing straight away turns attention into enquiries, admissions, members and support.",
  },
  "02": {
    id: "web-platforms",
    tagline: "The tools behind the scenes.",
    what: "Software that runs in the browser: the dashboards, portals and systems your team or community uses every day. We build them around how your people actually work, so they feel simple even when the job isn't.",
    who: [
      "Schools managing students, results and records",
      "Churches, associations and communities managing members",
      "Businesses that have outgrown spreadsheets and chat groups",
    ],
    why: "The right system gives hours back every week, cuts mistakes, and shows you what is really happening, so the admin stops getting in the way of the work that matters.",
  },
  "03": {
    id: "digital-experiences",
    tagline: "The details people remember.",
    what: "The design and craft that make a digital product feel considered: interface design, motion and interactive moments. It is the difference between a site that works and one people enjoy using.",
    who: [
      "Brands that want to stand out in a crowded space",
      "Launches and campaigns that need a moment people talk about",
      "Products where the first impression decides everything",
    ],
    why: "Attention is short. A clear interface and a few well-judged interactions keep people around long enough to understand what you offer, and remember it afterwards.",
  },
  "04": {
    id: "brand-systems",
    tagline: "One look, everywhere you appear online.",
    what: "A focused visual language for your digital presence: colors, type, layout rules and reusable components, so everything you publish looks and feels like it came from the same place.",
    who: [
      "New ventures deciding how they should look online",
      "Established organizations whose website, socials and campaigns have drifted apart",
      "Teams that publish often and want it to stay consistent",
    ],
    why: "Consistency builds recognition, and recognition builds trust. A system also saves time: new pages and campaigns come together faster and still look right.",
  },
} satisfies Record<(typeof services)[number]["number"], ServiceDetail>;

/**
 * Everything the /services page needs. The titles, descriptions and offerings come from
 * data/home.ts, so the home page and this page can never drift apart. `satisfies` above makes
 * adding a service there without writing its story here a type error.
 */
export const serviceSections = services.map((service) => ({ ...service, ...details[service.number] }));

export type ServiceSection = (typeof serviceSections)[number];
