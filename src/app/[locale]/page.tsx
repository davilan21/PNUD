'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { SectionNav } from '@/components/layout/SectionNav'
import { Footer } from '@/components/layout/Footer'
import { DownloadModal } from '@/components/ui/DownloadModal'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Header onDownloadClick={() => setModalOpen(true)} />
      <SectionNav />
      <main style={{ paddingTop: '112px' }}>
        <Hero onDownloadClick={() => setModalOpen(true)} />
      </main>
      <Footer />
      <DownloadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
