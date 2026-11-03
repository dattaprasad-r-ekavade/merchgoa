import type { Metadata } from "next";
import { LegalPage, SellerDetails } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Terms for buying from MerchGoa.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & conditions">
      <p>
        These terms apply when you use {site.url.replace("https://", "")} or buy from MerchGoa, a brand operated by{" "}
        {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By placing an order you agree to them.
      </p>

      <h2>Products</h2>
      <ul>
        <li>All products are made to order. Product images show the artwork on a mockup; the printed item may vary slightly in colour and placement.</li>
        <li>We may change or withdraw products, designs and prices at any time. This does not affect orders already paid for.</li>
      </ul>

      <h2>Prices and payment</h2>
      <ul>
        <li>Prices are in Indian Rupees (INR) and include applicable GST unless stated otherwise.</li>
        <li>
          Payments are processed securely by Razorpay. We never see or store your full card, UPI PIN or banking details.
        </li>
        <li>An order is confirmed only after payment succeeds. If we cannot fulfil a paid order, we refund it in full.</li>
        <li>Bulk and branded orders are priced by written quote, which forms part of these terms for that order.</li>
      </ul>

      <h2>Your artwork and logos</h2>
      <ul>
        <li>
          If you send us a logo, text or artwork, you confirm you have the right to use it and allow us to print it for
          your order.
        </li>
        <li>We may refuse artwork that is offensive or unlawful, or that appears to infringe someone else&rsquo;s rights.</li>
        <li>You are responsible for checking proofs for spelling and design before you approve them.</li>
      </ul>

      <h2>Our designs</h2>
      <p>
        MerchGoa designs, photos and text on this site belong to us. Please do not copy or reuse them commercially
        without our written permission.
      </p>

      <h2>Delivery, cancellations and refunds</h2>
      <p>
        See our <a href="/shipping">shipping &amp; delivery</a> and <a href="/refunds">cancellations &amp; refunds</a>{" "}
        policies, which form part of these terms.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, our total liability for any order is limited to the amount you paid for it. We are
        not responsible for delays caused by couriers, weather, strikes or other events outside our control.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in Goa have jurisdiction over any dispute.</p>

      <SellerDetails />
    </LegalPage>
  );
}
