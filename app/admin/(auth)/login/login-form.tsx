"use client";

import { LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction, type LoginState } from "@/app/admin/(auth)/login/actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-bold text-[var(--color-text)]" htmlFor="email">
          Admin email
        </label>
        <input
          autoComplete="email"
          id="email"
          name="email"
          placeholder="admin@company.com"
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-[var(--color-text)]" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          type="password"
        />
      </div>
      {state.error ? (
        <div className="rounded-[var(--radius-sm)] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-300">
          {state.error}
        </div>
      ) : null}
      <SubmitButton />
      <p className="flex items-center gap-2 text-xs leading-5 text-[var(--color-muted)]">
        <LockKeyhole aria-hidden="true" size={14} />
        Protected with HTTP-only signed sessions and rate-limited login attempts.
      </p>
    </form>
  );
}
