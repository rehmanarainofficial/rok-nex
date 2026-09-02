import { AlertTriangle } from "lucide-react";

export function DataError({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-amber-600 shadow-sm">
          <AlertTriangle aria-hidden="true" size={19} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
            Data state
          </p>
          <h2 className="mt-1 font-display text-xl font-bold">
            Database data unavailable
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-900/80">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
