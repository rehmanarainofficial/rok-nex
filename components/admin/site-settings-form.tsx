import { updateSiteSettingsAction } from "@/app/admin/(panel)/settings/actions";
import type { SiteSettings } from "@/types/product";

type SiteSettingsFormProps = {
  settings: SiteSettings;
};

const fields: Array<{
  label: string;
  name: keyof SiteSettings;
  placeholder?: string;
  type?: string;
}> = [
  { label: "Business Name", name: "businessName" },
  { label: "Logo Text", name: "logoText" },
  { label: "Favicon URL", name: "favicon", placeholder: "/favicon.ico" },
  { label: "Phone", name: "phone" },
  { label: "WhatsApp", name: "whatsapp" },
  { label: "Email", name: "email", type: "email" },
  { label: "Address", name: "address" },
  { label: "Business Hours", name: "businessHours" },
  { label: "Facebook", name: "facebook", type: "url" },
  { label: "Instagram", name: "instagram", type: "url" },
  { label: "LinkedIn", name: "linkedin", type: "url" },
  { label: "YouTube", name: "youtube", type: "url" },
  { label: "Default SEO Image", name: "defaultSeoImage", placeholder: "/og-image.png" },
  { label: "Homepage SEO Title", name: "homepageSeoTitle" },
];

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  return (
    <form action={updateSiteSettingsAction} className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label className="grid gap-2 text-sm font-bold text-neutral-600" key={field.name}>
            {field.label}
            <input
              defaultValue={String(settings[field.name] ?? "")}
              name={field.name}
              placeholder={field.placeholder}
              required={field.name === "businessName"}
              type={field.type ?? "text"}
            />
          </label>
        ))}
      </div>
      <label className="grid gap-2 text-sm font-bold text-neutral-600">
        Homepage SEO Description
        <textarea
          defaultValue={settings.homepageSeoDescription}
          name="homepageSeoDescription"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-neutral-600">
        Footer Text
        <textarea defaultValue={settings.footerText} name="footerText" />
      </label>
      <button
        className="inline-flex h-11 w-fit items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 text-sm font-bold text-white shadow-[var(--shadow-red)]"
        type="submit"
      >
        Save Settings
      </button>
    </form>
  );
}
