import { MotionConfig } from 'motion/react'
import { Catalog } from './components/Catalog'
import { Customize } from './components/Customize'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Workshop } from './components/Workshop'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Catalog />
        <Gallery />
        <Customize />
        <Workshop />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  )
}
