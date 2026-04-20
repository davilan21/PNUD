'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import styles from './Header.module.css'

interface HeaderProps {
  onDownloadClick: () => void
}

export function Header({ onDownloadClick }: HeaderProps) {
  const t = useTranslations('header')
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src="/images/undp-logo-blue.svg" alt="UNDP" width={80} height={32} />
        <span className={styles.tagline}>{t('tagline')}</span>
      </div>
      <div className={styles.right}>
        <button className={styles.downloadBtn} onClick={onDownloadClick}>
          ↓ {t('download')}
        </button>
      </div>
    </header>
  )
}
