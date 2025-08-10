"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SpaceObjects from "./SpaceObjects";
import CosmicAccents from "./CosmicAccents";
import EarthAccents from "./EarthAccents";
import Starfield from "./Starfield";

export default function BackgroundLayer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => setMounted(true), []);

  // Track viewport size for perf-friendly stars on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsSmall(mq.matches)
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
    } else {
      // Safari
      // @ts-ignore
      mq.addListener(update)
    }
    update()
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', update)
      } else {
        // @ts-ignore
        mq.removeListener(update)
      }
    }
  }, [])

  if (!mounted) return null;

  // Determine dark mode robustly
  const isDark = resolvedTheme === "dark" || theme === "space" || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
  const perfMode = prefersReducedMotion || isSmall
  const starDensity = perfMode ? 'low' : 'medium'
  const starSize = perfMode ? 1.0 : 1.2
  const overlayOpacity = perfMode ? 0.12 : 0.08

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            {/* Global starfield for dark mode (perf-aware) */}
            <Starfield density={starDensity} starSize={starSize} overlayOpacity={overlayOpacity} />
            {/* Optional decorative layers, skip in perf mode */}
            {!perfMode && <SpaceObjects />}
            {!perfMode && <CosmicAccents />}
          </>
        ) : (
          <EarthAccents />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
