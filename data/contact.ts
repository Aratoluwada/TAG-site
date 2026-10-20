/** Where people can reach TAG. Used by the /contact page and as the default inbox for the form. */
export const contact = {
  email: "aratoluwadatoluwade@gmail.com",
  whatsapp: {
    display: "+234 703 305 9736",
    /** wa.me wants the number in international format with no "+", spaces or dashes. */
    number: "2347033059736",
    message: "Hi TAG, I'd like to talk about a project.",
  },
  linkedin: "https://www.linkedin.com/in/aratoluwada-toluwade-64b559350",
} as const;

export const whatsappHref = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`;
export const emailHref = `mailto:${contact.email}`;
