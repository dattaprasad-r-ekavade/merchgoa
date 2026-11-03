import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";

/** Header, announcement, footer and site-wide structured data for every public page. */
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  const org = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${site.url}/#org` },
      },
      {
        "@type": ["Organization", "Store"],
        "@id": `${site.url}/#org`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        image: `${site.url}/images/og.jpg`,
        description: site.description,
        email: site.email,
        ...(s.phone ? { telephone: s.phone } : {}),
        ...(s.address ? { address: { "@type": "PostalAddress", streetAddress: s.address, addressRegion: "Goa", addressCountry: "IN" } } : {}),
        areaServed: { "@type": "Country", name: "India" },
        currenciesAccepted: "INR",
        ...(s.instagram ? { sameAs: [s.instagram] } : {}),
      },
    ],
  };
  return (
    <>
      <JsonLd data={org} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      {s.announcement ? (
        <div className="bg-[#c45c26] px-5 py-2 text-center text-sm text-white">{s.announcement}</div>
      ) : null}
      <Header />
      <div id="main">{children}</div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
