'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTranslations } from 'next-intl'
import styles from './Hero.module.css'

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
      {/* Animated background figures */}
      <div className={styles.bgFigures} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={`${styles.bgFigure} ${styles.bgFigure1}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={`${styles.bgFigure} ${styles.bgFigure2}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={`${styles.bgFigure} ${styles.bgFigure3}`} />
      </div>

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
          <Image
            src="/images/hero-illustration.png"
            alt="Woman holding the globe — representing UNDP's commitment to gender equality worldwide"
            width={460}
            height={520}
            priority
            className={styles.heroIllustration}
          />
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
