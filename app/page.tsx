import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Bento from '@/components/home/Bento'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Bento />
      </main>
      <Footer />
    </>
  )
}
