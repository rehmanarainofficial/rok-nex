"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-950 shadow-sm">
      <div className="flex max-w-2xl items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-red-600 shadow-sm">
          <AlertTriangle aria-hidden="true" size={21} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">
            Admin state
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold">
            Admin panel error
          </h1>
          <p className="mt-2 text-sm leading-6 text-red-900/80">
            The requested admin data could not be loaded safely.
          </p>
          <button
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={reset}
            type="button"
          >
            <RefreshCcw aria-hidden="true" size={15} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
