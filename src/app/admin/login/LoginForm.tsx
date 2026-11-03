"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import { inputCls } from "@/components/admin/fields";

export function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="grid gap-1 text-sm">
        Password
        <input name="password" type="password" required autoFocus autoComplete="current-password" className={inputCls} />
      </label>
      <FormMessage state={state} />
      <SubmitButton pendingText="Signing in…">Sign in</SubmitButton>
    </form>
  );
}
