import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import SiteBackground from '@/components/sections/SiteBackground'

export default function Home() {
  return (
    <main className="relative">
      <SiteBackground />
      <Navigation />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
