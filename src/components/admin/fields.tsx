export const inputCls =
  "w-full rounded-lg border border-[#241c16]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#c45c26] focus:ring-2 focus:ring-[#c45c26]/20";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {hint ? <span className="text-xs text-[#5c5148]">{hint}</span> : null}
    </label>
  );
}

export function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[#241c16]/10 bg-white p-5">
      {title || actions ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h2 className="font-sans text-base font-semibold tracking-normal">{title}</h2> : <span />}
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}
