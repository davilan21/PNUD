'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
}

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0 } },
}

export function ScrollReveal({ children, direction = 'up', delay = 0, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={variants[direction]}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
