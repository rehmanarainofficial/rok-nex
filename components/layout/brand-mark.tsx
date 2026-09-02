import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link
      aria-label="Rox & Nex home"
      className="group inline-flex rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      href="/"
    >
      <span
        className={
          compact
            ? "relative block h-10 w-36 overflow-hidden"
            : "relative block h-12 w-44 overflow-hidden sm:w-52"
        }
      >
        <Image
          alt="Rox & Nex"
          className="block object-cover dark:hidden"
          fill
          priority
          sizes={compact ? "144px" : "(max-width: 640px) 176px, 208px"}
          src="/logo-black.png"
          style={{ objectPosition: "center 58%" }}
        />
        <Image
          alt="Rox & Nex"
          className="hidden object-cover dark:block"
          fill
          priority
          sizes={compact ? "144px" : "(max-width: 640px) 176px, 208px"}
          src="/logo-white.png"
          style={{ objectPosition: "center 58%" }}
        />
      </span>
    </Link>
  );
}
