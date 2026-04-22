import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EngineTicker from '@/components/layout/EngineTicker'
import Hero from '@/components/home/Hero'
import Work from '@/components/home/Work'
import Info from '@/components/home/Info'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Info />
        <Contact />
      </main>
      <Footer />
      <EngineTicker />
    </>
  )
}
