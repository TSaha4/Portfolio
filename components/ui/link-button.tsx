import { cn } from "@/lib/utils"
import type { AnchorHTMLAttributes } from "react"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "solid" | "ghost" }

/** External link styled as a button. Opens in a new tab unless it is a mailto/hash link. */
export function LinkButton({ variant = "ghost", className, href = "", children, ...rest }: Props) {
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "wobble inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "solid"
          ? "bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] hover:bg-secondary"
          : "border border-border bg-muted/40 text-foreground hover:border-primary hover:text-secondary",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
