'use client'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import styles from './Context.module.css'

const STATS = [
  { num: '2.4B', label: 'women and girls lack access to basic services' },
  { num: '68%',  label: 'of unpaid care work is done by women' },
  { num: '300yr', label: 'to close the economic gender gap at current pace' },
  { num: '1 in 3', label: 'women experience gender-based violence' },
]

const CHALLENGES = [
  { title: 'Structural inequality', desc: "Discriminatory laws and social norms that limit women's opportunities." },
  { title: 'Economic exclusion', desc: 'Limited access to finance, markets, and decent work.' },
  { title: 'Climate vulnerability', desc: 'Women and girls disproportionately affected by climate change.' },
  { title: 'Digital divide', desc: 'Gender gap in access to technology and digital skills.' },
  { title: 'Political underrepresentation', desc: 'Women remain underrepresented in decision-making roles.' },
]

export function Context() {
  const t = useTranslations('context')
  return (
    <section id="context" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal direction="left">
          <div className={styles.statsGrid}>
            {STATS.map(({ num, label }) => (
              <div key={num} className={styles.statCard}>
                <p className={styles.statNum}>{num}</p>
                <p className={styles.statLabel}>{label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className={styles.challenges}>
            <h2 className={styles.title}>{t('title')}</h2>
            {CHALLENGES.map(({ title, desc }, i) => (
              <div key={i} className={styles.challengeItem}>
                <div className={styles.num}>{i + 1}</div>
                <p className={styles.challengeText}><strong>{title}:</strong> {desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
