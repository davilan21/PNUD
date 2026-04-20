'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './Priorities.module.css'

const TABS = [
  { label: 'Poverty & Inequality', tag: 'Priority 1', title: 'Ending Poverty and Inequality', body: 'Addressing the root causes of poverty through gender-responsive social protection and economic empowerment.', bullets: ['Universal social protection floors', 'Women\'s financial inclusion', 'Equal pay legislation'], img: '/images/field.jpg' },
  { label: 'Governance', tag: 'Priority 2', title: 'Inclusive Governance', body: 'Ensuring women\'s equal participation in decision-making at all levels.', bullets: ['50/50 electoral representation', 'Women in peace negotiations', 'Anti-discrimination legislation'], img: '/images/CardImage4.jpg' },
  { label: 'Resilience', tag: 'Priority 3', title: 'Climate Resilience', body: 'Integrating gender perspectives into climate action and disaster risk reduction.', bullets: ['Gender-responsive climate finance', 'Women-led adaptation', 'Disaster risk reduction'], img: '/images/bees.jpg' },
  { label: 'Environment', tag: 'Priority 4', title: 'Environment & Natural Resources', body: 'Securing women\'s rights to land, water, and natural resources.', bullets: ['Land tenure rights', 'Water access equity', 'Green economy jobs'], img: '/images/Mongolia-cashmere-goats.jpg' },
  { label: 'Energy', tag: 'Priority 5', title: 'Energy Access', body: 'Expanding clean energy access with gender equality at the center.', bullets: ['Clean cooking solutions', 'Women in energy sector', 'Off-grid solutions for rural women'], img: '/images/CardImage2.jpg' },
  { label: 'Gender Equality', tag: 'Priority 6', title: 'Ending Gender-Based Violence', body: 'Eliminating all forms of violence against women and girls.', bullets: ['GBV response services', 'Prevention programming', 'Legal protections'], img: '/images/CardImage3.jpg' },
]

export function Priorities() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  const handleTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') setActive((i + 1) % TABS.length)
    if (e.key === 'ArrowLeft') setActive((i - 1 + TABS.length) % TABS.length)
  }

  return (
    <section id="priorities" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Signature Solutions</h2>
        <div className={styles.tabs} role="tablist">
          {TABS.map((t, i) => (
            <button
              key={i}
              role="tab"
              id={`tab-${i}`}
              aria-selected={i === active}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={styles.panel} role="tabpanel" aria-labelledby={`tab-${active}`}>
          <div className={styles.panelText}>
            <p className={styles.tag}>{tab.tag}</p>
            <h3 className={styles.panelTitle}>{tab.title}</h3>
            <p className={styles.panelBody}>{tab.body}</p>
            <ul className={styles.bullets}>
              {tab.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <div className={styles.panelImg}>
            <Image src={tab.img} alt={tab.title} fill className={styles.img} />
          </div>
        </div>
      </div>
    </section>
  )
}
