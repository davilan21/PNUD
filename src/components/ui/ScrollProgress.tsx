'use client'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (shouldReduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--color-yellow)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 201,
      }}
    />
  )
}
