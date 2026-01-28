'use client'

import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { EasterEggProvider } from '@/lib/EasterEggContext'
import EasterEggOrchestrator from '@/components/EasterEggs/EasterEggOrchestrator'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <EasterEggProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </div>
      <EasterEggOrchestrator />
    </EasterEggProvider>
  )
}
