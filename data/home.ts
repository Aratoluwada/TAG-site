export const stats = [
  { value: "20+", label: "Projects shipped" },
  { value: "12+", label: "Brands served" },
  { value: "99%", label: "Client satisfaction" },
  { value: "∞", label: "Ideas explored" },
] as const;

export const services = [
  {
    number: "01",
    title: "Websites",
    description: "Built to be clear, fast, and unmistakably yours.",
    offerings: ["Marketing websites", "Corporate websites", "School websites", "Church websites", "NGO websites", "Landing pages"],
  },
  {
    number: "02",
    title: "Web platforms",
    description: "Useful digital products for the work happening behind the scenes.",
    offerings: ["Dashboards", "Portals", "Management systems", "Member platforms", "Custom web applications"],
  },
  {
    number: "03",
    title: "Digital experiences",
    description: "Distinct interactions that make a digital presence memorable.",
    offerings: ["UI/UX", "Interactive experiences", "Animations", "Creative development"],
  },
  {
    number: "04",
    title: "Brand systems",
    description: "A focused visual language for the places your brand lives online.",
    offerings: ["Digital identity", "Visual systems", "Brand websites", "Campaign pages"],
  },
] as const;
