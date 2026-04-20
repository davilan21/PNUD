// src/components/sections/DownloadCTA.tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import styles from './DownloadCTA.module.css'

const LANGS = ['EN', 'FR', 'ES', 'AR', 'RU', 'ZH']

export function DownloadCTA({ onDownloadClick }: { onDownloadClick: () => void }) {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <h2 className={styles.title}>Download the Full Strategy</h2>
        <p className={styles.body}>Available in six official UN languages. Free to download and share.</p>
        <button className={styles.primaryBtn} onClick={onDownloadClick}>Download Now</button>
        <div className={styles.langs}>
          {LANGS.map(l => (
            <button key={l} className={styles.langBtn} onClick={onDownloadClick}>{l}</button>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
