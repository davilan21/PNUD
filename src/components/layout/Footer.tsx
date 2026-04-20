import Image from 'next/image'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src="/images/undp-logo-white.svg" alt="UNDP" width={80} height={32} />
          <p className={styles.desc}>United Nations Development Programme</p>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Strategy</h4>
          <a href="#foreword" className={styles.link}>Foreword</a>
          <a href="#context" className={styles.link}>Context</a>
          <a href="#priorities" className={styles.link}>Priorities</a>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Resources</h4>
          <a href="#" className={styles.link}>Download PDF</a>
          <a href="#" className={styles.link}>UNDP.org</a>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Languages</h4>
          <a href="/en" className={styles.link}>English</a>
          <a href="/es" className={styles.link}>Español</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 United Nations Development Programme</p>
      </div>
    </footer>
  )
}
