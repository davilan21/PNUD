'use client'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'
import styles from './Hero.module.css'

function FloralBloom() {
  const shouldReduceMotion = useReducedMotion()

  const spinCW  = (dur: number) => shouldReduceMotion ? {} : { animate: { rotate: 360  }, transition: { duration: dur, repeat: Infinity, ease: 'linear' as const } }
  const spinCCW = (dur: number) => shouldReduceMotion ? {} : { animate: { rotate: -360 }, transition: { duration: dur, repeat: Infinity, ease: 'linear' as const } }
  const breathe = shouldReduceMotion ? {} : {
    animate: { scale: [1, 1.035, 1] },
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' as const },
  }

  const petals12 = Array.from({ length: 12 }, (_, i) => i * 30)
  const petals10 = Array.from({ length: 10 }, (_, i) => i * 36)
  const petals8  = Array.from({ length: 8  }, (_, i) => i * 45)
  const petals6  = Array.from({ length: 6  }, (_, i) => i * 60)

  return (
    <motion.svg
      viewBox="-140 -140 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.floralSvg}
      {...breathe}
    >
      {/* Outer halo ring */}
      <circle cx="0" cy="0" r="128" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 7"/>

      {/* Layer 1 — 12 outermost petals, very delicate, slow CW */}
      <motion.g {...spinCW(110)}>
        {petals12.map(a => (
          <ellipse key={a} cx="0" cy="0" rx="9" ry="90"
            transform={`rotate(${a})`}
            stroke="rgba(255,255,255,0.16)" strokeWidth="0.8"/>
        ))}
      </motion.g>

      {/* Layer 2 — 10 petals, offset 18°, slow CCW */}
      <motion.g initial={{ rotate: 18 }} {...spinCCW(85)}>
        {petals10.map(a => (
          <ellipse key={a} cx="0" cy="0" rx="10" ry="74"
            transform={`rotate(${a})`}
            stroke="rgba(255,255,255,0.24)" strokeWidth="1"/>
        ))}
      </motion.g>

      {/* Layer 3 — 12 petals, offset 7.5°, medium CW */}
      <motion.g initial={{ rotate: 7.5 }} {...spinCW(65)}>
        {petals12.map(a => (
          <ellipse key={a} cx="0" cy="0" rx="8" ry="56"
            transform={`rotate(${a})`}
            stroke="rgba(255,255,255,0.32)" strokeWidth="1.2"/>
        ))}
      </motion.g>

      {/* Layer 4 — 8 petals, medium CCW */}
      <motion.g {...spinCCW(50)}>
        {petals8.map(a => (
          <ellipse key={a} cx="0" cy="0" rx="7" ry="40"
            transform={`rotate(${a})`}
            stroke="rgba(255,255,255,0.44)" strokeWidth="1.5"/>
        ))}
      </motion.g>

      {/* Layer 5 — 6 inner petals, faster CW */}
      <motion.g initial={{ rotate: 30 }} {...spinCW(35)}>
        {petals6.map(a => (
          <ellipse key={a} cx="0" cy="0" rx="6" ry="26"
            transform={`rotate(${a})`}
            stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
        ))}
      </motion.g>

      {/* Golden accent dots at outer petal tips */}
      <motion.g {...spinCW(110)}>
        {petals12.map(a => {
          const rad = (a - 90) * (Math.PI / 180)
          return (
            <circle key={a}
              cx={Math.cos(rad) * 90}
              cy={Math.sin(rad) * 90}
              r="2"
              fill="rgba(255,235,0,0.65)"
            />
          )
        })}
      </motion.g>

      {/* Smaller accent dots on layer 2 tips */}
      <motion.g initial={{ rotate: 18 }} {...spinCCW(85)}>
        {petals10.map(a => {
          const rad = (a + 18 - 90) * (Math.PI / 180)
          return (
            <circle key={a}
              cx={Math.cos(rad) * 74}
              cy={Math.sin(rad) * 74}
              r="1.5"
              fill="rgba(255,255,255,0.45)"
            />
          )
        })}
      </motion.g>

      {/* Center rings */}
      <circle cx="0" cy="0" r="22" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
      <circle cx="0" cy="0" r="14" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
      <circle cx="0" cy="0" r="7"  fill="rgba(255,255,255,0.9)"/>
      <circle cx="0" cy="0" r="3"  fill="rgba(255,235,0,1)"/>
    </motion.svg>
  )
}

export function Hero({ onDownloadClick }: { onDownloadClick: () => void }) {
  const t = useTranslations('hero')
  const heroRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const { scrollY } = useScroll()

  const floralY       = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const particlesY    = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const textOpacity   = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const textY         = useTransform(scrollYProgress, [0, 0.55], ['0%', '-6%'])
  const indicatorOpacity = useTransform(scrollY, [0, 80], [1, 0])

  const floralYSpring = useSpring(floralY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const container = particlesRef.current
    if (!container || shouldReduceMotion) return
    const shapes = ['◆', '●', '▲', '◯', '◉']
    for (let i = 0; i < 38; i++) {
      const el = document.createElement('span')
      el.textContent = shapes[i % shapes.length]
      el.style.cssText = `
        position:absolute;
        font-size:${10 + Math.random() * 28}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        opacity:0.22;
        color:hsl(${270 + Math.random() * 30},60%,${60 + Math.random() * 20}%);
        animation:particleDrift ${12 + Math.random() * 18}s ${Math.random() * 6}s ease-in-out infinite alternate;
        pointer-events:none;
      `
      container.appendChild(el)
    }
    return () => { if (container) container.innerHTML = '' }
  }, [shouldReduceMotion])

  return (
    <section ref={heroRef} className={styles.hero}>
      <motion.div
        ref={particlesRef}
        className={styles.particles}
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { y: particlesY }}
      />

      <div className={styles.grid}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : 0.2 }}
          style={shouldReduceMotion ? {} : { opacity: textOpacity, y: textY }}
        >
          <p className={styles.label}>{t('label')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <div className={styles.buttons}>
            <button className={styles.btnPrimary} onClick={onDownloadClick}>
              <span aria-hidden="true">↓</span> {t('ctaDownload')}
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => document.getElementById('foreword')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('ctaRead')} <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className={styles.illustration}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : 0.4 }}
          style={shouldReduceMotion ? {} : { y: floralYSpring }}
        >
          <FloralBloom />
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { opacity: indicatorOpacity }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >↓</motion.div>
      </motion.div>
    </section>
  )
}
