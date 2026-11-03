/**
 * Values marked "TODO:" must be replaced before launch.
 * `npm run check:launch` fails while any remain.
 */
export const site = {
  name: "MerchGoa",
  url: "https://merchgoa.com",
  tagline: "Merchandise for Goa",
  description:
    "Custom merchandise and corporate gifts for Goa businesses, teams and events. Choose a Goa-inspired design or bring your own branding.",
  email: "hello@merchgoa.com",
  /** Display format, e.g. "+91 98765 43210". */
  phone: "TODO: +91 phone number",
  /** Digits only with country code, e.g. "919876543210". Empty hides WhatsApp buttons. */
  whatsapp: "",
  instagram: "",
};

/** The legal entity that sells and takes payment (must match the Razorpay account). */
export const business = {
  legalName: "Magica Infotech LLP",
  address: "TODO: registered address, Goa – PIN",
  gstin: "TODO: GSTIN (or remove this line on the legal pages if not registered)",
  grievanceOfficer: "TODO: name of the person handling complaints",
  /** Shown on policy pages. */
  policiesUpdated: "3 November 2026",
};

/** Dispatch and delivery estimates shown to customers. */
export const fulfilment = {
  productionDays: "2–4 business days",
  deliveryDays: "3–7 business days",
  christmasCutoff: "15 December",
  shipsTo: "addresses across India",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  category: string;
  /** Single-piece price in INR, inclusive of GST and shipping. null = not priced yet. */
  price: number | null;
  /** Optional per-piece price for bulk orders, e.g. { min: 25, price: 299 }. */
  bulk?: { min: number; price: number };
};

export const products: Product[] = [
  {
    slug: "goa-arch-coaster",
    name: "Goa Arch Coaster",
    short: "A small piece of the coast for the desk.",
    description:
      "A coaster framed by a Goa arch, looking out to the sea. Printed to order. Ask about sets and branded packs.",
    image: "/images/coaster.png",
    category: "Home & desk",
    price: null, // TODO: price
  },
  {
    slug: "goa-coast-a5-notebook",
    name: "Goa Coast A5 Notebook",
    short: "For lists, briefs and ferry tickets.",
    description:
      "An A5 notebook with coastal artwork on the cover. Printed to order, and easy to add your logo for team kits.",
    image: "/images/notebook.png",
    category: "Desk",
    price: null, // TODO: price
  },
  {
    slug: "goa-coast-fridge-magnet",
    name: "Goa Coast Fridge Magnet",
    short: "A keepsake that actually stays put.",
    description:
      "A fridge magnet in warm coastal colour. Printed to order. A small keepsake for guests and visitors.",
    image: "/images/magnet.png",
    category: "Keepsakes",
    price: null, // TODO: price
  },
  {
    slug: "goa-coast-mouse-pad",
    name: "Goa Coast Mouse Pad",
    short: "A bit of shoreline under the cursor.",
    description:
      "A desk mouse pad with Goa-inspired artwork, printed to order.",
    image: "/images/mouse-pad.png",
    category: "Desk",
    price: null, // TODO: price
  },
  {
    slug: "goa-sunset-11-oz-mug",
    name: "Goa Sunset 11 oz Mug",
    short: "Tea, chai, deadlines.",
    description:
      "A classic 11 oz mug wrapped in Goa sunset artwork. Printed to order.",
    image: "/images/mug.png",
    category: "Drinkware",
    price: null, // TODO: price
  },
  {
    slug: "goa-sunset-classic-t-shirt",
    name: "Goa Sunset Classic T-Shirt",
    short: "Crew-neck, coastal artwork.",
    description:
      "A classic crew-neck tee with warm coastal artwork on the front. Printed to order in your size.",
    image: "/images/tee.png",
    category: "Apparel",
    price: null, // TODO: price
  },
  {
    slug: "goa-sunset-tote-bag",
    name: "Goa Sunset Tote Bag",
    short: "Market, ferry, unplanned detour.",
    description:
      "A canvas tote with sunset artwork. Printed to order.",
    image: "/images/tote.png",
    category: "Bags",
    price: null, // TODO: price
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function whatsappLink(message: string) {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Hide a placeholder value from the public site until it has been filled in. */
export function filled(value: string) {
  return value && !value.startsWith("TODO") ? value : null;
}
