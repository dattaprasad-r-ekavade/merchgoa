import type { Metadata } from "next";
import { LegalPage, SellerDetails } from "@/components/LegalPage";
import { business, filled, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How MerchGoa collects and uses your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const officer = filled(business.grievanceOfficer);
  return (
    <LegalPage title="Privacy policy">
      <p>
        This policy explains what personal data MerchGoa ({business.legalName}) collects, why, and the choices you
        have. We follow India&rsquo;s Digital Personal Data Protection Act, 2023.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiries:</strong> your name, email, phone number, and the details you put in the form (product,
          quantity, date, location, notes).
        </li>
        <li>
          <strong>Orders:</strong> your name, delivery address, phone, email and what you ordered.
        </li>
        <li>
          <strong>Payments:</strong> handled by Razorpay. We receive a payment confirmation and reference, but never
          your full card, UPI or bank details.
        </li>
        <li>
          <strong>Artwork:</strong> logos or files you send for branded orders.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to enquiries, prepare quotes, and make and deliver your order.</li>
        <li>To send order updates and tracking by email or WhatsApp.</li>
        <li>To handle refunds and support, and to keep the records the law requires (for example GST invoices).</li>
      </ul>
      <p>We do not sell your data, and we do not send marketing messages unless you ask to receive them.</p>

      <h2>Who we share it with</h2>
      <p>Only what each service needs to do its part:</p>
      <ul>
        <li>Razorpay, to process payments.</li>
        <li>Our printing and fulfilment partners and courier companies, to make and deliver your order.</li>
        <li>Email and messaging providers we use to contact you.</li>
        <li>Authorities, where the law requires it.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for up to 2 years and order records for as long as tax and accounting law requires. After
        that we delete them.
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses only the cookies it needs to work. If we add analytics, we will update this policy first.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your personal data, or withdraw consent, by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days.
      </p>

      <h2>Grievance officer</h2>
      <p>
        {officer ? <>{officer}, </> : null}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <SellerDetails />
    </LegalPage>
  );
}
