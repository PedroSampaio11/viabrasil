"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface AccentCtaButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

/**
 * Botão CTA compartilhado: estilo âmbar com seta (chevron).
 * Use em qualquer seção: Cotar agora, Saiba mais, etc.
 */
export function AccentCtaButton({
  href,
  children,
  className,
  ariaLabel,
}: AccentCtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative z-10 inline-flex min-h-[3rem] w-full max-w-[20rem] items-center justify-center gap-4 rounded-full bg-[var(--vb-yellow)] pl-5 pr-6 py-3 text-black transition-all hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
        className
      )}
      aria-label={ariaLabel ?? undefined}
    >
      <span
        className="pointer-events-none shrink-0 border-t-2 border-r-2 border-black w-2.5 h-2.5 rotate-45 inline-block -ml-1"
        aria-hidden
      />
      <span className="font-bold uppercase tracking-wide pointer-events-none">{children}</span>
    </Link>
  )
}
