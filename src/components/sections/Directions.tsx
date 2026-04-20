import Image from 'next/image'
import styles from './Directions.module.css'

const CARDS = [
  { num: '01', title: 'Structural Transformation', body: 'Dismantling the systems, norms, and institutions that perpetuate inequality.', img: '/images/bees.jpg', color: 'rgba(91,30,140,0.9)' },
  { num: '02', title: 'Leaving No One Behind', body: 'Centering the most marginalized women and girls in all programming.', img: '/images/Mongolia-cashmere-goats.jpg', color: 'rgba(194,24,91,0.9)' },
  { num: '03', title: 'Building Resilience', body: 'Strengthening women\'s capacity to withstand and recover from crises.', img: '/images/CardImage2.jpg', color: 'rgba(0,110,181,0.9)' },
]

export function Directions() {
  return (
    <section id="directions" className={styles.section}>
      <div className={styles.grid}>
        {CARDS.map(({ num, title, body, img, color }) => (
          <div key={num} className={styles.card}>
            <Image src={img} alt={title} fill className={styles.cardImg} />
            <div className={styles.overlay} style={{ background: `linear-gradient(to top, ${color} 0%, transparent 60%)` }} />
            <div className={styles.content}>
              <p className={styles.num}>{num}</p>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
              <div className={styles.arrow}>→</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
