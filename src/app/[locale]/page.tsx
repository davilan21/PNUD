'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { SectionNav } from '@/components/layout/SectionNav'
import { Footer } from '@/components/layout/Footer'
import { DownloadModal } from '@/components/ui/DownloadModal'
import { Hero } from '@/components/sections/Hero'
import { Foreword } from '@/components/sections/Foreword'
import { Context } from '@/components/sections/Context'
import { Learned } from '@/components/sections/Learned'
import { Directions } from '@/components/sections/Directions'
import { Priorities } from '@/components/sections/Priorities'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Header onDownloadClick={() => setModalOpen(true)} />
      <SectionNav />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Hero onDownloadClick={() => setModalOpen(true)} />
        <Foreword />
        <Context />
        <Learned />
        <Directions />
        <Priorities />
      </main>
      <Footer />
      <DownloadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
