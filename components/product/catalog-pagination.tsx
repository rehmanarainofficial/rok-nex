import Link from "next/link";

type CatalogPaginationProps = {
  basePath: string;
  page: number;
  params?: Record<string, string | undefined>;
  totalPages: number;
};

function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "page") {
      searchParams.set(key, value);
    }
  });

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();

  return query ? `${basePath}?${query}` : basePath;
}

export function CatalogPagination({
  basePath,
  page,
  params = {},
  totalPages,
}: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Catalog pagination"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {page > 1 ? (
        <Link
          className="inline-flex h-11 items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-bold text-[var(--color-text)]"
          href={buildPageHref(basePath, params, page - 1)}
        >
          Previous
        </Link>
      ) : null}
      <span className="text-sm font-bold text-[var(--color-muted)]">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          className="inline-flex h-11 items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-bold text-[var(--color-text)]"
          href={buildPageHref(basePath, params, page + 1)}
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
