"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { ProductImage } from "@/types/product";
import { cn } from "@/utilities/cn";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
  thumbnail: string;
};

export function ProductGallery({ images, productName, thumbnail }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const merged = [
      { url: thumbnail, alt: productName },
      ...images.filter((image) => image.url !== thumbnail),
    ];

    return merged.length ? merged : [{ url: thumbnail, alt: productName }];
  }, [images, productName, thumbnail]);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="grid gap-4">
      <div className="group relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
        <Image
          alt={activeImage.alt}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          priority
          sizes="(max-width: 1024px) calc(100vw - 40px), 38rem"
          src={activeImage.url}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,var(--color-red-glow),transparent_34%)]" />
      </div>
      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {galleryImages.map((image) => (
            <button
              aria-label={`View ${image.alt}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[var(--radius-sm)] border bg-[var(--color-surface-raised)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
                activeImage.url === image.url
                  ? "border-[var(--color-accent)]"
                  : "border-[var(--color-border)]",
              )}
              key={image.url}
              onClick={() => setActiveImage(image)}
              type="button"
            >
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                sizes="96px"
                src={image.url}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
