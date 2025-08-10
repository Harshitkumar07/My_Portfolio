"use client"

import React, { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

export type StarfieldDensity = "low" | "medium" | "high"

interface StarfieldProps {
  className?: string
  density?: StarfieldDensity
  color?: string // base CSS color for stars
  starSize?: number // multiplier for star radius
  overlayOpacity?: number // 0..1
}

// Lightweight static canvas starfield sized to container
export default function Starfield({ className = "", density = "medium", color = "#ffffff", starSize = 1, overlayOpacity = 0.1 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const starsRef = useRef<Array<{
    x: number
    y: number
    r: number
    baseAlpha: number
    twinkleAmp: number
    twinkleSpeed: number
    phase: number
    color: string
    layer: number // 0: far, 1: mid, 2: near
  }> | null>(null)
  const driftRef = useRef({ t: 0, ox: 0, oy: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number | null = null

    // Cap DPR to reduce GPU cost while keeping sharpness
    const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1))

    const gen = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // determine count by area and density
      // Lower star density per 1k px area
      const basePerK = density === "high" ? 110 : density === "low" ? 40 : 70
      const areaK = (width * height) / 1000
      const count = Math.min(1400, Math.floor((areaK * basePerK) / 100))

      // generate stars with layers and properties
      const arr: NonNullable<typeof starsRef.current> = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const layerRnd = Math.random()
        const layer = layerRnd < 0.55 ? 0 : layerRnd < 0.9 ? 1 : 2 // far, mid, near
        const baseR = layer === 2 ? 1.2 : layer === 1 ? 0.9 : 0.6
        const r = (baseR + Math.random() * (layer === 2 ? 1.2 : 0.8)) * starSize
        const baseAlpha = 0.40 + Math.random() * 0.35
        // Reduce twinkle amplitude and speed to cut per-frame variance work
        const twinkleAmp = (layer === 0 ? 0.05 : layer === 1 ? 0.08 : 0.12) * (0.6 + Math.random() * 0.8)
        const twinkleSpeed = (layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1.1) * (0.8 + Math.random() * 0.6)
        const phase = Math.random() * Math.PI * 2

        // subtle color temperature variance around base color
        const tint = Math.random()
        const starColor = tint < 0.15
          ? "#c7d2ff" // blue-white
          : tint < 0.3
            ? "#fff4e5" // warm
            : color

        arr.push({ x, y, r, baseAlpha, twinkleAmp, twinkleSpeed, phase, color: starColor, layer })
      }
      starsRef.current = arr
    }

    const paint = (tSec: number) => {
      const { width, height } = canvas.getBoundingClientRect()
      // clear and paint dark base
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#070814'
      ctx.fillRect(0, 0, width, height)

      const stars = starsRef.current || []
      // slight drift based on time
      const driftSpeed = 0.012
      driftRef.current.ox = Math.sin(tSec * driftSpeed) * 1.5
      driftRef.current.oy = Math.cos(tSec * driftSpeed * 0.7) * 1.5

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const twinkle = prefersReducedMotion ? 0 : Math.sin(tSec * s.twinkleSpeed + s.phase) * s.twinkleAmp
        const alpha = Math.max(0, Math.min(1, s.baseAlpha + twinkle))
        const dx = driftRef.current.ox * (0.3 + s.layer * 0.35)
        const dy = driftRef.current.oy * (0.3 + s.layer * 0.35)
        const x = s.x + dx
        const y = s.y + dy

        ctx.beginPath()
        ctx.fillStyle = hexToRgba(s.color, alpha)
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Frame cap to reduce CPU usage (approx 45 FPS)
    let lastTs = 0
    const minDelta = 1000 / 45
    const draw = (t: number) => {
      if (t - lastTs >= minDelta) {
        lastTs = t
        paint(t / 1000)
      }
      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw)
      }
    }

    const onResize = () => {
      cancel()
      gen()
      draw(0)
    }

    const cancel = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    // initial
    gen()
    draw(0)

    // Pause animation when tab is hidden to save cycles
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = null
      } else {
        if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(draw)
      }
    }

    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      cancel()
    }
  }, [density, color, starSize, prefersReducedMotion])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* subtle radial vignette to improve contrast, keeps stars visible on scroll */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(7,8,20,1) 100%)',
          opacity: overlayOpacity,
        }}
      />
    </div>
  )
}

function hexToRgba(hex: string, alpha: number) {
  // supports #rgb and #rrggbb
  let c = hex.replace("#", "")
  if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("")
  const bigint = parseInt(c, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
