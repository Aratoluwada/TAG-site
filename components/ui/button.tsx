import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "default";

export function buttonVariants({ variant = "primary", size = "default" }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return cn("button", `button-${variant}`, size === "sm" && "button-sm");
}

export function Button({ className, variant, ...props }: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
