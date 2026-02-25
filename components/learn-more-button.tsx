"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LearnMoreButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

/**
 * Botão estilo "Learn More" (círculo que expande no hover com seta).
 * Use com href para Link ou onClick para button.
 */
export function LearnMoreButton({
  children,
  href,
  onClick,
  className,
}: LearnMoreButtonProps) {
  const content = (
    <>
      <span className="learn-more-circle" aria-hidden="true">
        <span className="learn-more-icon learn-more-arrow" />
      </span>
      <span className="learn-more-button-text">{children}</span>
    </>
  )

  const sharedClass = cn("learn-more", className)

  if (href) {
    return (
      <Link href={href} className={sharedClass}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={sharedClass}>
      {content}
    </button>
  )
}
