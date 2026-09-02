"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { ProductSummary } from "@/types/product";

type ProductCardProps = {
  product: ProductSummary;
  priority?: boolean;
};

const stockLabels: Record<ProductSummary["stockStatus"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

const stockClasses: Record<ProductSummary["stockStatus"], string> = {
  "in-stock": "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  "low-stock": "bg-amber-500/14 text-amber-800 dark:text-amber-300",
  "out-of-stock": "bg-[var(--color-surface-raised)] text-[var(--color-muted)]",
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = useMemo(() => {
    const images = [
      { url: product.thumbnail, alt: product.name },
      ...product.images.filter((image) => image.url !== product.thumbnail),
    ];

    return images.length ? images : [{ url: product.thumbnail, alt: product.name }];
  }, [product.images, product.name, product.thumbnail]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function showPreviousImage() {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <>
      <article className="depth-card group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-solid)] hover:shadow-[var(--shadow-card-hover)]">
        <button
          className="block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[linear-gradient(90deg,var(--color-accent),transparent_62%)] opacity-80" />
          <div className="relative aspect-[1.12/1] overflow-hidden bg-[var(--color-surface-raised)]">
            <Image
              alt={product.name}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              priority={priority}
              sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) calc((100vw - 72px) / 2), 22rem"
              src={product.thumbnail}
            />
          </div>
          <div className="space-y-4 p-5">
            <span className={`inline-flex rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] ${stockClasses[product.stockStatus]}`}>
              Stock: {stockLabels[product.stockStatus]}
            </span>
            <div className="min-w-0">
              <h3
                className="truncate whitespace-nowrap font-display text-2xl font-normal leading-tight text-[var(--color-text)]"
                title={product.name}
              >
                {product.name}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-muted)]">
                {product.shortDescription}
              </p>
            </div>
          </div>
        </button>
      </article>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
        >
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card-solid)] shadow-[var(--shadow-popover)]">
            <button
              aria-label="Close product"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-raised)]">
                  <Image
                    alt={galleryImages[activeIndex]?.alt ?? product.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) calc(100vw - 32px), 44rem"
                    src={galleryImages[activeIndex]?.url ?? product.thumbnail}
                  />
                  {galleryImages.length > 1 ? (
                    <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                      <button
                        aria-label="Previous image"
                        className="grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md"
                        onClick={showPreviousImage}
                        type="button"
                      >
                        <ChevronLeft aria-hidden="true" size={18} />
                      </button>
                      <button
                        aria-label="Next image"
                        className="grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md"
                        onClick={showNextImage}
                        type="button"
                      >
                        <ChevronRight aria-hidden="true" size={18} />
                      </button>
                    </div>
                  ) : null}
                </div>
                {galleryImages.length > 1 ? (
                  <div className="grid grid-cols-5 gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        aria-label={`View image ${index + 1}`}
                        className={`relative aspect-square overflow-hidden rounded-[var(--radius-sm)] border ${
                          activeIndex === index
                            ? "border-[var(--color-accent)]"
                            : "border-[var(--color-border)]"
                        }`}
                        key={image.url}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      >
                        <Image
                          alt={image.alt}
                          className="object-cover"
                          fill
                          sizes="90px"
                          src={image.url}
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col justify-center p-2 sm:p-4">
                <span className={`w-fit rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] ${stockClasses[product.stockStatus]}`}>
                  Stock: {stockLabels[product.stockStatus]}
                </span>
                <h2 className="mt-5 font-display text-4xl font-normal leading-tight text-[var(--color-text)] sm:text-5xl">
                  {product.name}
                </h2>
                <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
                  {product.description || product.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
