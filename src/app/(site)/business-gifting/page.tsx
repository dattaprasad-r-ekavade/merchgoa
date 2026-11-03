import type { Metadata } from "next";
import Link from "next/link";
import { EnquireForm } from "@/components/EnquireForm";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProducts, getSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Corporate gifts in Goa: branded mugs, tees & kits",
  description:
    "Branded corporate gifts for Goa hotels, villas, offices and events: mugs, t-shirts, totes and notebooks with your logo, delivered across India.",
  alternates: { canonical: "/business-gifting" },
};

const audiences = [
  { title: "Hotels, villas & homestays", body: "Guest welcome kits, staff uniforms and take-home souvenirs with your property's name." },
  { title: "Offices & startups", body: "Onboarding kits, team offsites, Diwali and Christmas gifts with your logo." },
  { title: "Events & weddings", body: "Conference kits, destination wedding favours and crew t-shirts." },
];

export default async function BusinessPage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);
  const types = [...new Set(products.map((p) => p.category))].join(", ").toLowerCase();

  const faqs = [
    {
      q: "What can you brand with our logo?",
      a: `Everything in our collection (${types}) can carry your logo or your own artwork, alone or alongside a Goa design.`,
    },
    {
      q: "How long does a branded order take?",
      a: `Once you approve the artwork proof, production takes ${settings.productionDays} and delivery ${settings.deliveryDays}. Large orders may need longer, and we confirm dates in your quote.${settings.christmasCutoff ? ` For Christmas, send your brief before ${settings.christmasCutoff}.` : ""}`,
    },
    {
      q: "Is there a minimum order?",
      a: "Single pieces are available in the shop. For branded orders, tell us the quantity you need and we quote the per-piece price, which drops as quantities go up.",
    },
    {
      q: "What logo file should we send?",
      a: "A vector file (PDF, SVG, AI or EPS) is best. A high-resolution PNG with a transparent background also works. We send a proof for approval before anything is printed.",
    },
    {
      q: "Do you deliver outside Goa?",
      a: `Yes. We deliver to ${settings.shipsTo}, and can split delivery across several addresses for remote teams.`,
    },
    ...(settings.gstin
      ? [{ q: "Do you provide a GST invoice?", a: "Yes. Every business order comes with a GST invoice in your company's name." }]
      : []),
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main className="mx-auto max-w-4xl px-5 py-14">
      <JsonLd data={faqLd} />
      <p className="text-xs uppercase tracking-[0.22em] text-[#c45c26]">MerchGoa / for business</p>
      <h1 className="mt-3 text-5xl">Corporate gifts &amp; branded merchandise in Goa</h1>
      <p className="mt-4 max-w-2xl text-lg text-[#5c5148]">
        Thoughtful gifts with your branding for Goa businesses, hotels, offices and events. Tell us your budget,
        quantity and date, and we plan gifts around your logo or a Goa-inspired design.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#brief" className="rounded-full bg-[#c45c26] px-5 py-3 text-white">
          Send a gift brief
        </a>
        <WhatsAppButton
          message="Hi MerchGoa, I'd like a quote for branded gifts. Quantity: , needed by: "
          label="Brief us on WhatsApp"
        />
      </div>

      <section className="mt-14">
        <h2 className="text-3xl">Who we make gifts for</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl bg-[#fffaf3] p-5">
              <h3 className="text-xl">{a.title}</h3>
              <p className="mt-2 text-sm text-[#5c5148]">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#5c5148]">
          Browse the <Link href="/shop" className="underline underline-offset-2">full collection</Link> for products you
          can brand.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl">How it works</h2>
        <ol className="mt-6 grid gap-4 text-sm md:grid-cols-3">
          <li className="rounded-2xl bg-[#fffaf3] p-5">
            <strong className="block text-base">01 · Brief</strong>
            Quantity, budget, recipients, delivery addresses and the date you need them.
          </li>
          <li className="rounded-2xl bg-[#fffaf3] p-5">
            <strong className="block text-base">02 · Quote &amp; proof</strong>
            We send options, a full price and a mockup with your logo.
          </li>
          <li className="rounded-2xl bg-[#fffaf3] p-5">
            <strong className="block text-base">03 · Approve &amp; deliver</strong>
            You approve the artwork, we print and deliver on the agreed schedule.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl">Questions businesses ask</h2>
        <div className="mt-6 divide-y divide-[#241c16]/10 rounded-2xl bg-[#fffaf3] px-6">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span aria-hidden className="text-[#c45c26] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-[#5c5148]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="brief" className="mt-14 scroll-mt-24 rounded-2xl bg-[#fffaf3] p-6">
        <h2 className="text-2xl">Send a gift brief</h2>
        <p className="mt-2 text-sm text-[#5c5148]">Even a rough brief is enough. We reply within a day.</p>
        <div className="mt-4">
          <EnquireForm defaultProduct="Business gifting" />
        </div>
      </section>
    </main>
  );
}
