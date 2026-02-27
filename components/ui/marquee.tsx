"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  speed?: number
  gap?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  speed = 40,
  gap = "1rem",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return

    const getSize = () => {
      if (!innerRef.current) return
      const first = innerRef.current.querySelector("[data-marquee-item]")
      if (!first) return
      setSize((first as HTMLElement).scrollWidth)
    }

    getSize()
    const observer = new ResizeObserver(getSize)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [children])

  const duration = size > 0 ? size / speed : 30

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex flex-row will-change-transform",
          reverse ? "marquee-animate-x-reverse" : "marquee-animate-x",
          paused && "marquee-paused"
        )}
        style={
          {
            gap,
            "--marquee-gap": gap,
            "--marquee-size": `${size}px`,
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 flex-row" data-marquee-item style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 flex-row" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  )
}
