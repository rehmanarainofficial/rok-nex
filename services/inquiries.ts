import "server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { validateInquiryInput, type InquiryInput } from "@/lib/validation/inquiry";
import { InquiryModel } from "@/models/inquiry";
import type { Inquiry, InquiryStatus } from "@/types/product";

type InquiryDocumentWithId = {
  _id: { toString: () => string };
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  productInterest?: string;
  message: string;
  source: Inquiry["source"];
  productSlug?: string;
  status: Inquiry["status"] | "read" | "archived";
  createdAt: Date;
  updatedAt: Date;
};

function normalizeInquiryStatus(status: InquiryDocumentWithId["status"]): Inquiry["status"] {
  if (status === "read") {
    return "contacted";
  }

  if (status === "archived") {
    return "closed";
  }

  return status;
}

function serializeInquiry(inquiry: InquiryDocumentWithId): Inquiry {
  return {
    id: inquiry._id.toString(),
    name: inquiry.name,
    companyName: inquiry.companyName,
    phone: inquiry.phone,
    email: inquiry.email,
    productInterest: inquiry.productInterest,
    message: inquiry.message,
    source: inquiry.source,
    productSlug: inquiry.productSlug,
    status: normalizeInquiryStatus(inquiry.status),
    createdAt: inquiry.createdAt,
    updatedAt: inquiry.updatedAt,
  };
}

export async function createInquiry(input: unknown) {
  const validation = validateInquiryInput(input);

  if (!validation.success) {
    return validation;
  }

  await connectToDatabase();

  const inquiry = await InquiryModel.create(validation.data satisfies InquiryInput);

  return {
    success: true as const,
    data: serializeInquiry(inquiry.toObject() as InquiryDocumentWithId),
  };
}

export async function getInquiries(limit = 100) {
  await connectToDatabase();

  const inquiries = await InquiryModel.find({})
    .sort({ createdAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 200))
    .lean<InquiryDocumentWithId[]>()
    .exec();

  return inquiries.map(serializeInquiry);
}

export async function setInquiryStatus(id: string, status: InquiryStatus) {
  if (!["new", "contacted", "closed"].includes(status)) {
    return { success: false as const, errors: ["Inquiry status is invalid."] };
  }

  await connectToDatabase();

  const inquiry = await InquiryModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  )
    .lean<InquiryDocumentWithId | null>()
    .exec();

  if (!inquiry) {
    return { success: false as const, errors: ["Inquiry not found."] };
  }

  return { success: true as const, data: serializeInquiry(inquiry) };
}
