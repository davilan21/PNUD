// src/components/sections/Transformation.tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import styles from './Transformation.module.css'

const BLOCKS = [
  { num: '01', title: 'Normative Leadership', body: 'Championing international standards and norms on gender equality.' },
  { num: '02', title: 'Policy Advocacy', body: 'Supporting governments to adopt gender-responsive legislation.' },
  { num: '03', title: 'Integrated Programming', body: 'Mainstreaming gender across all UNDP programme areas.' },
  { num: '04', title: 'Capacity Building', body: 'Strengthening national institutions and civil society organizations.' },
  { num: '05', title: 'Knowledge & Innovation', body: 'Generating evidence and scaling what works.' },
  { num: '06', title: 'Partnerships', body: 'Mobilizing coalitions across public, private, and civil society sectors.' },
  { num: '07', title: 'Accountability', body: 'Rigorous monitoring, evaluation, and learning systems.' },
  { num: '★',  title: 'Gender Equality Seal', body: 'UNDP\'s certification for gender-responsive organizations.', dark: true },
]

export function Transformation() {
  return (
    <section id="transformation" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Enabling Transformation</h2>
        <div className={styles.grid}>
          {BLOCKS.map(({ num, title, body, dark }, i) => (
            <ScrollReveal key={num} delay={i * 0.06}>
              <div className={`${styles.block} ${dark ? styles.blockDark : ''}`}>
                <p className={styles.num}>{num}</p>
                <h3 className={styles.blockTitle}>{title}</h3>
                <p className={styles.blockBody}>{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
