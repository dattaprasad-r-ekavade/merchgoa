import type { Metadata } from "next";
import { LegalPage, SellerDetails } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellations & refunds",
  description: "MerchGoa cancellation, replacement and refund policy.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage title="Cancellations & refunds">
      <p>
        Every MerchGoa piece is printed to order for you, so we cannot take back items because of a change of mind.
        If something we sent is wrong or damaged, we will put it right.
      </p>

      <h2>Cancelling an order</h2>
      <ul>
        <li>
          You can cancel for a full refund <strong>until your order goes into production</strong>, usually within 12
          hours of payment. Email <a href={`mailto:${site.email}`}>{site.email}</a> or message us on WhatsApp with your
          order number.
        </li>
        <li>Once printing has started, the order cannot be cancelled.</li>
        <li>
          Bulk and branded orders can be cancelled free of charge until you approve the artwork proof. After approval,
          the cancellation terms in your quote apply.
        </li>
      </ul>

      <h2>Damaged, misprinted or wrong items</h2>
      <ul>
        <li>
          Tell us within <strong>48 hours of delivery</strong>, with your order number and clear photos of the item
          and packaging (an unboxing video helps).
        </li>
        <li>
          Once we have confirmed the problem, we will send a free replacement or give you a full refund for the
          affected items, whichever you prefer.
        </li>
        <li>You do not need to send the item back unless we ask you to.</li>
      </ul>

      <h2>What we cannot refund or replace</h2>
      <ul>
        <li>The wrong size or colour chosen at checkout. Please check the size details before ordering.</li>
        <li>Small variations in colour between your screen and the printed item, and slight differences in print placement.</li>
        <li>Spelling or artwork errors in personalisation or logos that you supplied or approved.</li>
        <li>Wear and tear after use, or damage from not following care instructions.</li>
      </ul>

      <h2>How refunds are paid</h2>
      <p>
        Approved refunds go back to your original payment method within <strong>5–7 business days</strong>. Your bank
        may take a few more days to show it.
      </p>

      <SellerDetails />
    </LegalPage>
  );
}
