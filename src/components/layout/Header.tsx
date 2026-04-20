'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '#foreword', label: 'Foreword' },
  { href: '#context', label: 'Context' },
  { href: '#learned', label: 'Learned' },
  { href: '#directions', label: 'Directions' },
  { href: '#priorities', label: 'Priorities' },
  { href: '#enablers', label: 'Enablers' },
  { href: '#transformation', label: 'Transformation' },
]

interface HeaderProps {
  onDownloadClick: () => void
}

export function Header({ onDownloadClick }: HeaderProps) {
  const t = useTranslations('header')
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src="/images/undp-logo-blue.svg" alt="UNDP" width={80} height={32} />
        <span className={styles.tagline}>{t('tagline')}</span>
      </div>
      <div className={styles.right}>
        <LanguageSwitcher currentLang={locale} />
        <button className={styles.downloadBtn} onClick={onDownloadClick}>
          ↓ {t('download')}
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
