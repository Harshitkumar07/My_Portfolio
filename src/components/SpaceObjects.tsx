'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Hook-driven canvas starfield with subtle parallax objects
// Respects prefers-reduced-motion and devicePixelRatio
export default function SpaceObjects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    type Star = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      c: string
      layer: number // for parallax speed
    }

    // Config
    const STAR_COLORS = ['#ffffff', '#cfe9ff', '#a5b4fc', '#e9d5ff']
    const LAYERS = [0.25, 0.5, 1] // parallax multipliers

    let stars: Star[] = []

    const random = (min: number, max: number) => Math.random() * (max - min) + min
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    function resize() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Rebuild stars on resize for consistent distribution
      // Target ~160–420 stars depending on screen size and motion preference
      const baseDensity = prefersReducedMotion ? 1 / 16000 : 1 / 12000
      const minCount = prefersReducedMotion ? 120 : 160
      const maxCount = prefersReducedMotion ? 300 : 420
      let count = Math.floor(width * height * baseDensity)
      count = Math.max(minCount, Math.min(maxCount, count))
      stars = new Array(count).fill(0).map(() => {
        const layerIndex = Math.floor(random(0, LAYERS.length))
        const layer = LAYERS[layerIndex]
        const speed = prefersReducedMotion ? 0.02 : random(0.04, 0.12)
        const angle = random(0, Math.PI * 2)
        return {
          x: random(0, width),
          y: random(0, height),
          vx: Math.cos(angle) * speed * layer,
          vy: Math.sin(angle) * speed * layer,
          r: random(0.4, 1.6) * (layerIndex === 0 ? 0.8 : layerIndex === 2 ? 1.2 : 1),
          c: pick(STAR_COLORS),
          layer,
        } as Star
      })
    }

    function step() {
      if (!ctx) return
      // subtle transparent fill for motion trails
      ctx.fillStyle = 'rgba(10, 10, 26, 0.4)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // update position
        if (!prefersReducedMotion) {
          s.x += s.vx
          s.y += s.vy
        }

        // wrap around edges
        if (s.x < -2) s.x = width + 2
        if (s.x > width + 2) s.x = -2
        if (s.y < -2) s.y = height + 2
        if (s.y > height + 2) s.y = -2

        // draw star
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = s.c
        ctx.globalAlpha = prefersReducedMotion ? 0.6 : 0.8
        ctx.fill()

        // subtle forward glow
        if (!prefersReducedMotion) {
          ctx.globalAlpha = 0.15
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = s.c
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }

      animationId = window.requestAnimationFrame(step)
    }

    const handleResize = () => {
      resize()
      // clear to base background color immediately on resize
      if (!ctx) return
      ctx.fillStyle = 'rgb(10, 10, 26)'
      ctx.fillRect(0, 0, width, height)
    }

    resize()
    // prime background
    ctx.fillStyle = 'rgb(10, 10, 26)'
    ctx.fillRect(0, 0, width, height)

    animationId = window.requestAnimationFrame(step)
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 20%, #0b1028 0%, #0b0f2b 30%, #090a1a 60%, #070712 100%)',
        transition: 'opacity 0.6s ease-in-out, background 0.6s ease-in-out',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
