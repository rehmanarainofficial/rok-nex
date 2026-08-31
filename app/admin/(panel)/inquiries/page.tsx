import Link from "next/link";

import { updateInquiryStatusAction } from "@/app/admin/(panel)/inquiries/actions";
import { AdminCard } from "@/components/admin/admin-card";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DataError } from "@/components/admin/data-error";
import { requireAdminPage } from "@/lib/auth/admin-page";
import { getInquiries } from "@/services/inquiries";
import type { Inquiry, InquiryStatus } from "@/types/product";

type AdminInquiriesPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const statusLabels: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ProductInterest({ inquiry }: { inquiry: Inquiry }) {
  if (inquiry.productSlug) {
    return (
      <Link
        className="font-bold text-red-700 underline-offset-4 hover:underline"
        href={`/products/${inquiry.productSlug}`}
      >
        {inquiry.productInterest || inquiry.productSlug}
      </Link>
    );
  }

  return <span>{inquiry.productInterest || "General inquiry"}</span>;
}

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  await requireAdminPage();

  const params = await searchParams;
  let inquiries: Inquiry[] = [];
  let error: string | null = null;

  try {
    inquiries = await getInquiries();
  } catch {
    error = "Unable to load inquiries.";
  }

  return (
    <>
      <AdminPageHeader
        description="Review wholesale contact requests and update the simple inquiry status."
        title="Inquiries"
      />
      {params.saved ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          Inquiry {params.saved}.
        </div>
      ) : null}
      {params.error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {params.error}
        </div>
      ) : null}
      {error ? (
        <DataError message={error} />
      ) : (
        <AdminCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50 text-xs uppercase tracking-[0.14em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Product Interest</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {inquiries.length ? (
                  inquiries.map((inquiry) => (
                    <tr className="align-top" key={inquiry.id}>
                      <td className="px-4 py-4 font-bold text-neutral-950">
                        {inquiry.name}
                      </td>
                      <td className="px-4 py-4 text-neutral-600">
                        {inquiry.companyName || "-"}
                      </td>
                      <td className="px-4 py-4 text-neutral-600">{inquiry.phone}</td>
                      <td className="px-4 py-4 text-neutral-600">
                        {inquiry.email || "-"}
                      </td>
                      <td className="px-4 py-4 text-neutral-600">
                        <ProductInterest inquiry={inquiry} />
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-neutral-600">
                        {inquiry.message}
                      </td>
                      <td className="px-4 py-4 text-neutral-500">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <form action={updateInquiryStatusAction} className="flex gap-2">
                          <input name="id" type="hidden" value={inquiry.id} />
                          <label className="sr-only" htmlFor={`status-${inquiry.id}`}>
                            Inquiry status
                          </label>
                          <select
                            className="min-w-32"
                            defaultValue={inquiry.status}
                            id={`status-${inquiry.id}`}
                            name="status"
                          >
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                          <button
                            className="h-11 rounded-[var(--radius-sm)] bg-neutral-950 px-3 text-xs font-bold text-white"
                            type="submit"
                          >
                            Save
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-10 text-center text-neutral-500" colSpan={8}>
                      No inquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </>
  );
}
