import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import Hero from '@/components/sections/Hero'
import Now from '@/components/sections/Now'
import Race from '@/components/sections/Race'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import SiteBackground from '@/components/sections/SiteBackground'

export default function Home() {
  return (
    <main className="relative">
      <SiteBackground />
      <Navigation />
      <Hero />
      <Now />
      <Race />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
