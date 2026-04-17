'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
