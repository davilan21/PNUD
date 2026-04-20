// src/components/sections/Enablers.tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './Enablers.module.css'

const CARDS = [
  { title: 'Finance', body: 'Mobilizing gender-responsive financing through public, private, and blended mechanisms to fund transformative programmes at scale.', accent: 'var(--color-rose)', link: 'Learn more' },
  { title: 'Digitalization', body: 'Harnessing digital tools and data to close gender gaps, while ensuring women benefit equitably from the digital economy.', accent: 'var(--color-violet)', link: 'Learn more' },
  { title: 'Innovation', body: 'Scaling proven solutions and piloting new approaches to accelerate progress on the most entrenched gender inequalities.', accent: 'var(--color-undpBlue)', link: 'Learn more' },
]

export function Enablers() {
  return (
    <section id="enablers" className={styles.section}>
      <div className={styles.inner}>
        <SectionLabel>Enablers</SectionLabel>
        <h2 className={styles.title}>What Makes It Possible</h2>
        <div className={styles.grid}>
          {CARDS.map(({ title, body, accent, link }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className={styles.card} style={{ '--accent': accent } as React.CSSProperties}>
                <div className={styles.cardAccent} />
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
                <a href="#" className={styles.cardLink}>{link} →</a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
