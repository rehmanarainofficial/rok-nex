export default function AdminLoading() {
  return (
    <div className="grid gap-4">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-black/10" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="h-28 animate-pulse rounded-lg bg-black/10" key={index} />
        ))}
      </div>
    </div>
  );
}
