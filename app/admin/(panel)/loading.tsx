function SkeletonBlock({ className }: { className: string }) {
  return <div className={`skeleton-surface ${className}`} />;
}

export default function AdminLoading() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <SkeletonBlock className="h-4 w-36 rounded-full" />
        <SkeletonBlock className="h-10 w-72 max-w-full rounded-lg" />
        <SkeletonBlock className="h-5 w-[32rem] max-w-full rounded-lg" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"
            key={index}
          >
            <SkeletonBlock className="h-4 w-28 rounded-full" />
            <SkeletonBlock className="mt-5 h-10 w-20 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
        <SkeletonBlock className="h-12 w-full" />
        <div className="grid gap-3 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock className="h-11 rounded-lg" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
