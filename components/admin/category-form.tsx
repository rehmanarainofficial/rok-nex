import Image from "next/image";

import type { Category } from "@/types/product";

type CategoryFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  buttonLabel: string;
  category?: Category;
};

export function CategoryForm({ action, buttonLabel, category }: CategoryFormProps) {
  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-neutral-700">
        Name
        <input defaultValue={category?.name} name="name" required />
      </label>
      <input name="slug" type="hidden" value={category?.slug ?? ""} />
      <input name="sortOrder" type="hidden" value={category?.sortOrder ?? 0} />
      <input name="existingImage" type="hidden" value={category?.image ?? ""} />
      <label className="grid gap-2 text-sm font-bold text-neutral-700">
        Description
        <textarea defaultValue={category?.description} name="description" required />
      </label>
      <label className="grid gap-2 text-sm font-bold text-neutral-700">
        Division
        <select defaultValue={category?.brandDivision ?? "rox-fitness"} name="brandDivision" required>
          <option value="rox-fitness">Rox Fitness</option>
          <option value="nex-games">Nex Games</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-neutral-700">
        Image
        <input accept="image/jpeg,image/png,image/webp" name="categoryImage" type="file" />
      </label>
      {category?.image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-neutral-100">
          <Image
            alt={`${category.name} category preview`}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            src={category.image}
            unoptimized
          />
        </div>
      ) : null}
      <label className="inline-flex items-center gap-2 text-sm font-bold text-neutral-700">
        <input
          className="size-4"
          defaultChecked={category?.active ?? true}
          name="active"
          type="checkbox"
        />
        Active
      </label>
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 text-sm font-bold text-white"
        type="submit"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
