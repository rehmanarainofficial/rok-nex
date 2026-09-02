import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  variant?: "auto" | "black" | "white";
};

export function BrandMark({ compact = false, variant = "auto" }: BrandMarkProps) {
  const sizeClass = compact
    ? "relative block h-8 w-28 overflow-hidden"
    : "relative block h-10 w-36 overflow-hidden sm:w-44";
  const imageSizes = compact ? "112px" : "(max-width: 640px) 144px, 176px";

  const renderLogo = (src: string, className = "block object-cover") => (
    <Image
      alt="Rox & Nex"
      className={className}
      fill
      priority
      sizes={imageSizes}
      src={src}
      style={{ objectPosition: "center 58%" }}
    />
  );

  return (
    <Link
      aria-label="Rox & Nex home"
      className="group inline-flex rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      href="/"
    >
      <span className={sizeClass}>
        {variant === "black" ? renderLogo("/black-logo.png") : null}
        {variant === "white" ? renderLogo("/white-logo.png") : null}
        {variant === "auto" ? (
          <>
            {renderLogo("/black-logo.png", "block object-cover dark:hidden")}
            {renderLogo("/white-logo.png", "hidden object-cover dark:block")}
          </>
        ) : null}
      </span>
    </Link>
  );
}
