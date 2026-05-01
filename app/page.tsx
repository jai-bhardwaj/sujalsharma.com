import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DotGrid from '@/components/notebook/DotGrid'
import Spread from '@/components/notebook/Spread'
import Cover from '@/components/notebook/sections/Cover'
import Mach0Fig from '@/components/notebook/sections/Mach0Fig'
import Tcp1Fig from '@/components/notebook/sections/Tcp1Fig'
import NowMargin from '@/components/notebook/sections/NowMargin'
import RaceTaped from '@/components/notebook/sections/RaceTaped'
import Contact from '@/components/notebook/sections/Contact'

export default function Home() {
  return (
    <>
      <DotGrid />
      <Header />
      <Spread>
        <Cover />
        <Mach0Fig />
        <RaceTaped />
        <Tcp1Fig />
        <NowMargin />
        <Contact />
      </Spread>
      <Footer />
    </>
  )
}
