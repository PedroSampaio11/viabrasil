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
 * Botão CTA compartilhado: gradiente verde→amarelo desliza no hover.
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
        "group relative inline-flex h-12 min-w-[9rem] w-full max-w-none sm:max-w-[20rem] items-center justify-center gap-3 overflow-hidden rounded-[30em] border-none bg-[var(--vb-yellow)] px-6 py-0 text-[15px] font-bold uppercase tracking-wide text-black shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_8px_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-amber-500/50",
        className
      )}
      aria-label={ariaLabel ?? undefined}
    >
      <span
        className="absolute left-0 top-0 h-full w-0 rounded-[30em] bg-gradient-to-r from-[#0fd850] to-[#f9f047] transition-[width] duration-500 ease-out group-hover:w-full"
        aria-hidden
      />
      <span className="relative z-10 flex items-center justify-center gap-3">
        <span className="pointer-events-none font-bold uppercase tracking-wide">{children}</span>
      </span>
    </Link>
  )
}
