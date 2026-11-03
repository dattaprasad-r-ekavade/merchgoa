"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText = "Saving…",
  variant = "primary",
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "secondary" | "danger";
}) {
  const { pending } = useFormStatus();
  const styles = {
    primary: "bg-[#163a44] text-white hover:bg-[#241c16]",
    secondary: "border border-[#241c16]/20 bg-white hover:bg-[#f3eadc]",
    danger: "bg-[#a3321a] text-white hover:bg-[#7c2412]",
  }[variant];
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60 ${styles}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}

export function FormMessage({ state }: { state?: { error?: string; ok?: string } }) {
  if (!state) return null;
  if (state.error)
    return (
      <p role="alert" className="rounded-lg bg-[#fbe4dc] px-3 py-2 text-sm text-[#7c2412]">
        {state.error}
      </p>
    );
  if (state.ok)
    return (
      <p role="status" className="rounded-lg bg-[#dcefe4] px-3 py-2 text-sm text-[#14502f]">
        {state.ok}
      </p>
    );
  return null;
}
