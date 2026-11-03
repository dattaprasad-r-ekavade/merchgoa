"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText = "Saving…",
  variant = "primary",
  pending: pendingProp,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: "primary" | "secondary" | "danger";
  /** Pass when the form submits via onSubmit (useFormStatus only sees `action` submissions). */
  pending?: boolean;
}) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  const styles = {
    primary: "bg-sea text-white hover:bg-sea-hover",
    secondary: "border border-ink/20 bg-surface hover:bg-page",
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
      <p role="alert" className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-ink">
        {state.error}
      </p>
    );
  if (state.ok)
    return (
      <p role="status" className="rounded-lg bg-ok-bg px-3 py-2 text-sm text-ok-ink">
        {state.ok}
      </p>
    );
  return null;
}

/**
 * React 19 resets a <form action={fn}> after every submission, wiping what the user typed
 * when the server returns a validation error. Submitting through onSubmit keeps the values.
 */
export function submitWithoutReset(dispatch: (fd: FormData) => void, startTransition: (fn: () => void) => void) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
}
