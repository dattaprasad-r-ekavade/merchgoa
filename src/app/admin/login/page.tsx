import type { Metadata } from "next";
import { adminConfigured } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-surface p-8">
        <p className="font-[family-name:var(--font-display)] text-2xl">MerchGoa</p>
        <p className="mt-1 text-sm text-ink-soft">Admin sign in</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-lg bg-danger-bg p-3 text-sm text-danger-ink">
            Admin is switched off. Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> (32+ random
            characters) in the server environment and restart.
          </p>
        )}
      </div>
    </main>
  );
}
