'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import styles from './Foreword.module.css'

export function Foreword() {
  const t = useTranslations('foreword')
  return (
    <section id="foreword" className={styles.section}>
      <div className={styles.grid}>
        <ScrollReveal direction="left">
          <div className={styles.text}>
            <SectionLabel>{t('overline')}</SectionLabel>
            <h2 className={styles.title}>{t('title')}</h2>
            <blockquote className={styles.quote}>{t('quote')}</blockquote>
            <p className={styles.body}>{t('body1')}</p>
            <p className={styles.body}>{t('body2')}</p>
            <div className={styles.author}>
              <Image src="/images/bio.jpg" alt={t('authorName')} width={56} height={56} className={styles.avatar} />
              <div>
                <p className={styles.authorName}>{t('authorName')}</p>
                <p className={styles.authorTitle}>{t('authorTitle')}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className={styles.imageWrap}>
            <Image src="/images/field.jpg" alt="Field" fill className={styles.image} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
