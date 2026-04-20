import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './Learned.module.css'

const LESSONS = [
  { num: '01', title: 'Intersectionality matters', body: 'Gender equality interventions must account for how race, class, disability, and age intersect.' },
  { num: '02', title: 'Local ownership drives results', body: 'Programmes led by local women\'s organizations achieve more sustainable outcomes.' },
  { num: '03', title: 'Data gaps persist', body: 'Sex-disaggregated data remains scarce, limiting evidence-based policy design.' },
  { num: '04', title: 'Economic empowerment is foundational', body: 'Financial independence enables women to exit harmful situations and invest in families.' },
  { num: '05', title: 'Men and boys must be engaged', body: 'Transforming gender norms requires engaging men as allies and change agents.' },
  { num: '06', title: 'Crisis moments are inflection points', body: 'Crises can entrench or disrupt gender inequality — intentional action determines which.' },
]

export function Learned() {
  return (
    <section id="learned" className={styles.section}>
      <div className={styles.inner}>
        <SectionLabel>What We&apos;ve Learned</SectionLabel>
        <h2 className={styles.title}>Lessons from 2022–2025</h2>
        <div className={styles.grid}>
          {LESSONS.map(({ num, title, body }, i) => (
            <ScrollReveal key={num} delay={i * 0.08}>
              <div className={`${styles.card} ${i === 5 ? styles.cardDark : ''}`}>
                <p className={styles.ghostNum}>{num}</p>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
