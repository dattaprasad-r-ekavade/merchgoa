export function StatusPill({ status }: { status: string }) {
  const c: Record<string, string> = {
    new: "bg-[#c45c26] text-white",
    contacted: "bg-[#e7dcc8] text-[#241c16]",
    quoted: "bg-[#163a44] text-white",
    won: "bg-[#1f7a4d] text-white",
    lost: "bg-[#ddd] text-[#555]",
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${c[status] ?? ""}`}>{status}</span>;
}
