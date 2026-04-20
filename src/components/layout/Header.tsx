'use client'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import styles from './Header.module.css'

interface HeaderProps {
  onDownloadClick: () => void
}

export function Header({ onDownloadClick }: HeaderProps) {
  const t = useTranslations('header')
  const locale = useLocale()
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
      </div>
    </header>
  )
}
