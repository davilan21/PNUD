'use client'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import styles from './DownloadModal.module.css'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

const DOWNLOADS = [
  { lang: 'EN', label: 'English', size: '4.2 MB' },
  { lang: 'ES', label: 'Español', size: '4.1 MB' },
  { lang: 'FR', label: 'Français', size: '4.3 MB' },
  { lang: 'RU', label: 'Русский', size: '4.4 MB' },
  { lang: 'ZH', label: '中文',    size: '3.9 MB' },
  { lang: 'AR', label: 'عربي',   size: '4.0 MB' },
]

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>Download the Strategy</h2>
          <button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <ul className={styles.list}>
          {DOWNLOADS.map(({ lang, label, size }) => (
            <li key={lang} className={styles.item}>
              <span className={styles.itemLabel}>{label}</span>
              <span className={styles.itemSize}>{size}</span>
              <a href="#download" className={styles.itemBtn} download>↓ Download</a>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
}
