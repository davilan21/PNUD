'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import styles from './SectionNav.module.css'

const SECTIONS = ['foreword','context','learned','directions','priorities','enablers','transformation'] as const

export function SectionNav() {
  const t = useTranslations('nav')
  const [active, setActive] = useState<string>('foreword')

  useEffect(() => {
    const observers = SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -40% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <nav className={styles.nav}>
      {SECTIONS.map(id => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link} ${active === id ? styles.active : ''}`}
        >
          {t(id)}
        </a>
      ))}
    </nav>
  )
}
