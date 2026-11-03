export function StatusPill({ status }: { status: string }) {
  const c: Record<string, string> = {
    new: "bg-[#c45c26] text-white",
    contacted: "bg-surface-2 text-ink",
    quoted: "bg-sea text-white",
    won: "bg-[#1f7a4d] text-white",
    lost: "bg-muted-bg text-muted-ink",
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${c[status] ?? ""}`}>{status}</span>;
}
