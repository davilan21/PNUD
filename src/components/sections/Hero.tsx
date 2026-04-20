'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import styles from './Hero.module.css'

export function Hero({ onDownloadClick }: { onDownloadClick: () => void }) {
  const t = useTranslations('hero')
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const shapes = ['◆','●','▲','◯','◉']
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
  }, [])

  return (
    <section className={styles.hero}>
      <div ref={particlesRef} className={styles.particles} aria-hidden />
      <div className={styles.grid}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.2 }}
        >
          <p className={styles.label}>{t('label')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <div className={styles.buttons}>
            <button className={styles.btnPrimary} onClick={onDownloadClick}>↓ {t('ctaDownload')}</button>
            <button
              className={styles.btnGhost}
              onClick={() => document.getElementById('foreword')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('ctaRead')} →
            </button>
          </div>
        </motion.div>
        <motion.div
          className={styles.illustration}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16,1,0.3,1], delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            className={styles.globe}
          >
            🌍
          </motion.div>
        </motion.div>
      </div>
      <div className={styles.scrollIndicator} aria-hidden>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >↓</motion.div>
      </div>
    </section>
  )
}
