'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Starfield from './Starfield'

interface ParallaxSceneProps {
  children: React.ReactNode
  className?: string
  intensity?: number // px translate at edges
  showStars?: boolean
  /** If true, render a solid dark base behind stars (overrides parent bg). */
  solidBase?: boolean
  /** Which layer should parallax move: content (default) or background */
  layer?: 'content' | 'background'
  /** Controls star density/visibility */
  starDensity?: 'low' | 'medium' | 'high'
  /** Choose between CSS-based or Canvas-based stars */
  starMode?: 'css' | 'canvas'
  /** Canvas star size multiplier */
  starSize?: number
  /** Vignette/overlay opacity for contrast (0..1) */
  starOverlayOpacity?: number
}

export default function ParallaxScene({ children, className = '', intensity = 6, showStars = false, solidBase = false, layer = 'content', starDensity = 'low', starMode = 'css', starSize = 1, starOverlayOpacity = 0.12 }: ParallaxSceneProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const latest = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches
  const lastMoveRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion || !isFinePointer) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      // throttle mousemove to ~60Hz
      const now = performance.now()
      if (now - lastMoveRef.current < 16) return
      lastMoveRef.current = now
      const rect = el.getBoundingClientRect()
      const rx = (e.clientX - rect.left) / rect.width
      const ry = (e.clientY - rect.top) / rect.height
      // normalize to [-1, 1]
      target.current.x = (rx - 0.5) * 2
      target.current.y = (ry - 0.5) * 2
      loop()
    }

    const onLeave = () => {
      target.current.x = 0
      target.current.y = 0
      loop()
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, isFinePointer])

  const loop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      // simple easing
      latest.current.x += (target.current.x - latest.current.x) * 0.08
      latest.current.y += (target.current.y - latest.current.y) * 0.08
      const tx = latest.current.x * intensity
      const ty = latest.current.y * intensity
      // Apply transform to the selected layer
      const moveContent = layer === 'content' || !showStars
      const elToMove = moveContent ? ref.current : starsRef.current
      if (elToMove) {
        elToMove.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      }
      // keep easing until close to target
      if (Math.abs(latest.current.x - target.current.x) > 0.002 || Math.abs(latest.current.y - target.current.y) > 0.002) {
        loop()
      }
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: layer === 'content' ? 'transform' as const : undefined, position: 'relative', overflow: 'hidden' }}
    >
      {showStars && (
        <div aria-hidden ref={starsRef} className="pointer-events-none absolute inset-0 z-0" style={{ willChange: layer === 'background' ? 'transform' as const : undefined }}>
          {/* solid space base to override parent gradients (optional) */}
          {solidBase && <div className="absolute inset-0 bg-[#0a0a1a]" />}
          {/* star layer */}
          {starMode === 'canvas' ? (
            <Starfield className="z-0" density={starDensity} starSize={starSize} overlayOpacity={starOverlayOpacity} />
          ) : (
            (() => {
              const cfg = starDensity === 'high'
                ? { size: 260, opacity: 0.3 }
                : starDensity === 'low'
                ? { size: 600, opacity: 0.12 }
                : { size: 380, opacity: 0.2 }
              return (
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: cfg.opacity,
                    backgroundImage:
                      'radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.95), transparent 55%),'+
                      'radial-gradient(1px 1px at 80px 90px, rgba(255,255,255,0.85), transparent 55%),'+
                      'radial-gradient(1.5px 1.5px at 140px 50px, rgba(255,255,255,0.8), transparent 60%),'+
                      'radial-gradient(1px 1px at 200px 120px, rgba(255,255,255,0.9), transparent 55%),'+
                      'radial-gradient(1px 1px at 260px 40px, rgba(255,255,255,0.8), transparent 55%)',
                    backgroundSize: `${cfg.size}px ${cfg.size}px`,
                    backgroundRepeat: 'repeat',
                  }}
                />
              )
            })()
          )}
          {/* nebula/glow overlays (skip when canvas + solid base to keep stars bright) */}
          {!(starMode === 'canvas' && solidBase) && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f2a] opacity-12" />
              <div className="absolute -inset-8 opacity-10" style={{
                background:
                  'radial-gradient(800px 400px at 10% -10%, rgba(131,56,236,0.25), transparent 60%),'+
                  'radial-gradient(600px 300px at 110% 10%, rgba(0,206,209,0.18), transparent 60%)'
              }} />
            </>
          )}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
