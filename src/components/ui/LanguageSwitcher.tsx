'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import styles from './LanguageSwitcher.module.css'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const switchTo = (code: string) => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${code}`)
    router.push(newPath)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus() }
  }

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (!triggerRef.current?.closest('[data-switcher]')?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOut)
    return () => document.removeEventListener('mousedown', handleClickOut)
  }, [])

  return (
    <div data-switcher style={{ position: 'relative' }}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currentLang.toUpperCase()} <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>&#9662;</span>
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={styles.dropdown}
          onKeyDown={handleKeyDown}
        >
          {LANGS.map(({ code, label }) => (
            <li
              key={code}
              role="option"
              aria-selected={code === currentLang}
              className={`${styles.option} ${code === currentLang ? styles.optionActive : ''}`}
              onClick={() => switchTo(code)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') switchTo(code) }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
