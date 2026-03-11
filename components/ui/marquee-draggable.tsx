"use client"

import { useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MarqueeDraggableProps {
  className?: string
  children: React.ReactNode
  speed?: number
  gap?: string
  pauseOnHover?: boolean
}

export function MarqueeDraggable({
  className,
  children,
  speed = 40,
  gap = "1rem",
  pauseOnHover = false,
}: MarqueeDraggableProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollOffsetRef = useRef(0)
  const copyWidthRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const lastClientXRef = useRef(0)
  const pausedRef = useRef(false)

  const applyTransform = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    track.style.transform = `translateX(${-scrollOffsetRef.current}px)`
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const firstCopy = track.querySelector("[data-marquee-item]") as HTMLElement | null
    if (!firstCopy) return

    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const gapPx = parseFloat(getComputedStyle(track).gap) || 0
      copyWidthRef.current = firstCopy.offsetWidth + gapPx
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(firstCopy)

    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000
      lastTime = now

      if (!isDraggingRef.current && !pausedRef.current && copyWidthRef.current > 0) {
        scrollOffsetRef.current += speed * dt
        while (scrollOffsetRef.current >= copyWidthRef.current) {
          scrollOffsetRef.current -= copyWidthRef.current
        }
        applyTransform()
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }
    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [speed, applyTransform])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      lastClientXRef.current = e.clientX
      isDraggingRef.current = true
      containerRef.current?.setPointerCapture?.(e.pointerId)
    },
    []
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return
      const delta = e.clientX - lastClientXRef.current
      lastClientXRef.current = e.clientX
      const w = copyWidthRef.current
      scrollOffsetRef.current -= delta
      if (w > 0) {
        while (scrollOffsetRef.current < 0) scrollOffsetRef.current += w
        while (scrollOffsetRef.current >= w) scrollOffsetRef.current -= w
      }
      applyTransform()
    },
    [applyTransform]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false
    containerRef.current?.releasePointerCapture?.(e.pointerId)
  }, [])

  const handlePointerLeave = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => pauseOnHover && (pausedRef.current = true)}
      onMouseLeave={() => pauseOnHover && (pausedRef.current = false)}
      role="region"
      aria-label="Carrossel, arraste para navegar"
    >
      <div
        ref={trackRef}
        className="flex flex-row will-change-transform cursor-grab active:cursor-grabbing"
        style={{ gap }}
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
