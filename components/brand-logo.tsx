import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "header" | "footer";
};

/** Official TAG artwork. Its source aspect ratio and typography remain unmodified. */
export function BrandLogo({ className, size = "header" }: BrandLogoProps) {
  const dimensions = size === "footer" ? 116 : 72;

  return (
    <Link aria-label="TAG home" className={cn("inline-flex shrink-0 items-center", className)} href="/">
      <Image
        alt="TAG"
        className="block"
        height={dimensions}
        priority={size === "header"}
        src="/images/tag-logo.png"
        width={dimensions}
      />
    </Link>
  );
}
