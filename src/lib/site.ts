/**
 * Static brand constants, types and first-run defaults.
 * Everything editable lives in data/*.json and is changed from /admin (see src/lib/store.ts).
 */
export const site = {
  name: "MerchGoa",
  url: "https://merchgoa.com",
  tagline: "Goa souvenirs & custom corporate gifts",
  description:
    "Goa-inspired mugs, tees, totes and desk gifts, printed to order and delivered across India. Branded corporate gifting for Goa hotels, offices and events.",
  email: "hello@merchgoa.com",
  legalName: "Magica Infotech LLP",
  locale: "en_IN",
};

export type Settings = {
  /** Display format, e.g. "+91 98765 43210". */
  phone: string;
  /** Digits only with country code, e.g. "919876543210". Empty hides WhatsApp buttons. */
  whatsapp: string;
  instagram: string;
  address: string;
  gstin: string;
  grievanceOfficer: string;
  productionDays: string;
  deliveryDays: string;
  christmasCutoff: string;
  shipsTo: string;
  /** One-line banner above the header. Empty hides it. */
  announcement: string;
  /** Google Search Console HTML-tag verification code (content="…" value only). */
  googleVerification: string;
  policiesUpdated: string;
};

export const defaultSettings: Settings = {
  phone: "",
  whatsapp: "",
  instagram: "",
  address: "",
  gstin: "",
  grievanceOfficer: "",
  productionDays: "2–4 business days",
  deliveryDays: "3–7 business days",
  christmasCutoff: "15 December",
  shipsTo: "addresses across India",
  announcement: "",
  googleVerification: "",
  policiesUpdated: "3 November 2026",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  imageAlt?: string;
  category: string;
  /** Single-piece price in INR, inclusive of GST and shipping. null = "Price on request". */
  price: number | null;
  /** Optional per-piece price for bulk orders. */
  bulk?: { min: number; price: number } | null;
  hidden?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
};

export const ENQUIRY_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export type Enquiry = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  needed_by: string;
  location: string;
  notes: string;
  status: EnquiryStatus;
  adminNote: string;
  updatedAt?: string;
};

export const seedProducts: Product[] = [
  {
    slug: "goa-arch-coaster",
    name: "Goa Arch Coaster",
    short: "Goa arch artwork for the desk or coffee table.",
    description:
      "A coaster framed by a Goa arch, looking out to the sea. Printed to order. Ask about sets and branded packs.",
    image: "/images/coaster.jpg",
    imageAlt: "Goa arch coaster with sunset sea artwork and bougainvillea",
    category: "Home & desk",
    price: null,
  },
  {
    slug: "goa-coast-a5-notebook",
    name: "Goa Coast A5 Notebook",
    short: "A5, with coastal artwork on the cover.",
    description:
      "An A5 notebook with coastal artwork on the cover. Printed to order, and easy to add your logo for team kits.",
    image: "/images/notebook.jpg",
    imageAlt: "A5 notebook with Goa coast artwork through a painted arch",
    category: "Desk",
    price: null,
  },
  {
    slug: "goa-coast-fridge-magnet",
    name: "Goa Coast Fridge Magnet",
    short: "A small souvenir in warm coastal colours.",
    description:
      "A fridge magnet in warm coastal colour. Printed to order. A small keepsake for guests and visitors.",
    image: "/images/magnet.jpg",
    imageAlt: "Goa souvenir fridge magnet with palm trees and sunset",
    category: "Keepsakes",
    price: null,
  },
  {
    slug: "goa-coast-mouse-pad",
    name: "Goa Coast Mouse Pad",
    short: "Goa beach artwork for the desk.",
    description: "A desk mouse pad with Goa-inspired artwork, printed to order.",
    image: "/images/mouse-pad.jpg",
    imageAlt: "Mouse pad printed with a Goa beach, arch and palm trees",
    category: "Desk",
    price: null,
  },
  {
    slug: "goa-sunset-11-oz-mug",
    name: "Goa Sunset 11 oz Mug",
    short: "11 oz, with wrap-around sunset artwork.",
    description: "A classic 11 oz mug wrapped in Goa sunset artwork. Printed to order.",
    image: "/images/mug.jpg",
    imageAlt: "White 11 oz mug with Goa sunset, waves and laterite arch artwork",
    category: "Drinkware",
    price: null,
  },
  {
    slug: "goa-sunset-classic-t-shirt",
    name: "Goa Sunset Classic T-Shirt",
    short: "Crew-neck tee with a Goa sunset print.",
    description:
      "A classic crew-neck tee with warm coastal artwork on the front. Printed to order in your size.",
    image: "/images/tee.jpg",
    imageAlt: "White crew-neck t-shirt with Goa sunset and palm tree print",
    category: "Apparel",
    price: null,
  },
  {
    slug: "goa-sunset-tote-bag",
    name: "Goa Sunset Tote Bag",
    short: "Canvas tote with Goa sunset artwork.",
    description: "A canvas tote with sunset artwork. Printed to order.",
    image: "/images/tote.jpg",
    imageAlt: "Canvas tote bag with Goa sunset and palm tree artwork",
    category: "Bags",
    price: null,
  },
];

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function whatsappLink(number: string, message: string) {
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
