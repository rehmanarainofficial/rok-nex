"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900">
      <h1 className="font-display text-2xl font-bold">Admin panel error</h1>
      <p className="mt-2 text-sm leading-6">{error.message}</p>
      <button
        className="mt-5 inline-flex h-10 items-center rounded-[var(--radius-sm)] bg-red-600 px-4 text-sm font-bold text-white"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
