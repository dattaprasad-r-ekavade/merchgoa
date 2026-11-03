export const site = {
  name: "MerchGoa",
  url: "https://merchgoa.com",
  tagline: "Merchandise for Goa",
  description:
    "Custom merchandise and corporate gifts for Goa businesses, teams and events. Choose a Goa-inspired design or bring your own branding.",
  email: "hello@merchgoa.com",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    slug: "goa-arch-coaster",
    name: "Goa Arch Coaster",
    short: "A small piece of the coast for the desk.",
    description:
      "A coaster concept with Goa arch geometry. We confirm material, print and pack size with your quote.",
    image: "/images/coaster.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-coast-a5-notebook",
    name: "Goa Coast A5 Notebook",
    short: "For lists, briefs and ferry tickets.",
    description:
      "An A5 notebook with coastal artwork. Paper, binding and print options are confirmed before production.",
    image: "/images/notebook.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-coast-fridge-magnet",
    name: "Goa Coast Fridge Magnet",
    short: "A keepsake that actually stays put.",
    description:
      "A fridge magnet concept with warm coastal colour. Final size and finish come with the quote.",
    image: "/images/magnet.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-coast-mouse-pad",
    name: "Goa Coast Mouse Pad",
    short: "A bit of shoreline under the cursor.",
    description:
      "A desk mouse pad with Goa-inspired artwork. Size, base and print method are locked in with your order plan.",
    image: "/images/mouse-pad.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-sunset-11-oz-mug",
    name: "Goa Sunset 11 oz Mug",
    short: "Tea, chai, deadlines.",
    description:
      "A classic 11 oz mug concept with sunset artwork. We confirm ceramic, print area and packing before quoting.",
    image: "/images/mug.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-sunset-classic-t-shirt",
    name: "Goa Sunset Classic T-Shirt",
    short: "Crew-neck, coastal artwork.",
    description:
      "A classic crew-neck tee with warm coastal artwork. Sizes, colour, fabric and print options are confirmed with your quote.",
    image: "/images/tee.png",
    category: "Goa Collection",
  },
  {
    slug: "goa-sunset-tote-bag",
    name: "Goa Sunset Tote Bag",
    short: "Market, ferry, unplanned detour.",
    description:
      "A tote concept with sunset artwork. Cloth weight, print and handle style are confirmed before production.",
    image: "/images/tote.png",
    category: "Goa Collection",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
