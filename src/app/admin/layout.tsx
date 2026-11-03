import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · MerchGoa admin" },
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f1e8] text-[#241c16]">{children}</div>;
}
