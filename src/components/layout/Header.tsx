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

function IconMenu() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect width="20" height="2" rx="1" fill="currentColor"/>
      <rect y="6" width="20" height="2" rx="1" fill="currentColor"/>
      <rect y="12" width="20" height="2" rx="1" fill="currentColor"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

interface HeaderProps {
  onDownloadClick: () => void
}

export function Header({ onDownloadClick }: HeaderProps) {
  const t = useTranslations('header')
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Image src="/images/undp-logo-blue.svg" alt="UNDP" width={100} height={40} />
          <span className={styles.tagline}>{t('tagline')}</span>
        </div>
        <div className={styles.right}>
          <LanguageSwitcher currentLang={locale} />
          <button className={styles.downloadBtn} onClick={onDownloadClick}>
            <span aria-hidden="true">↓</span> {t('download')}
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-nav" className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
