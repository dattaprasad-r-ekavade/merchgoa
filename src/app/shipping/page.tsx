import type { Metadata } from "next";
import { LegalPage, SellerDetails } from "@/components/LegalPage";
import { fulfilment, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & delivery",
  description: "How MerchGoa orders are made, dispatched and delivered.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping & delivery">
      <h2>Where we ship</h2>
      <p>We currently deliver to {fulfilment.shipsTo}. We do not ship internationally yet.</p>

      <h2>How long it takes</h2>
      <ul>
        <li>
          Every piece is printed to order. Production takes <strong>{fulfilment.productionDays}</strong> after your
          payment is confirmed.
        </li>
        <li>
          Delivery then takes <strong>{fulfilment.deliveryDays}</strong> depending on your PIN code. Remote areas can
          take longer.
        </li>
        <li>
          For Christmas delivery, please order by <strong>{fulfilment.christmasCutoff}</strong>.
        </li>
        <li>Bulk and branded orders follow the delivery schedule agreed in your quote.</li>
      </ul>

      <h2>Shipping charges</h2>
      <p>
        Listed prices include shipping within India unless the product page or your quote says otherwise. Any extra
        charge is shown before you pay.
      </p>

      <h2>Tracking</h2>
      <p>
        Once your order is dispatched we send a tracking link by email or WhatsApp. If you have not received it within
        the production window above, write to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Delivery problems</h2>
      <ul>
        <li>Please check your address and phone number at checkout. We cannot change an address after dispatch.</li>
        <li>
          If a parcel is returned to us because of an incorrect address or because nobody accepted it, we can re-ship
          it at your cost.
        </li>
        <li>
          If your parcel arrives damaged, see our <a href="/refunds">cancellations &amp; refunds policy</a>.
        </li>
      </ul>

      <SellerDetails />
    </LegalPage>
  );
}
