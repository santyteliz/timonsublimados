import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import { Catalog } from './components/Catalog'
import { Customize } from './components/Customize'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Services } from './components/Services'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Workshop } from './components/Workshop'
import { shouldShowIntro } from './lib/intro'
import { consumeInitialHash, installInternalLinks, scrollToSection } from './lib/navigation'

// Se calcula una sola vez, antes del primer render.
const initialHash = typeof window !== 'undefined' ? consumeInitialHash() : null
const showIntro = typeof window !== 'undefined' && !initialHash && shouldShowIntro()

export default function App() {
  const [intro, setIntro] = useState(showIntro)
  const [revealed, setRevealed] = useState(!showIntro)

  useEffect(() => installInternalLinks(), [])

  // Links viejos con "#": se va a la sección y la URL queda limpia.
  useEffect(() => {
    if (!initialHash) return
    const t = window.setTimeout(() => scrollToSection(initialHash, { instant: true }), 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {intro ? <Intro onReveal={() => setRevealed(true)} onDone={() => setIntro(false)} /> : null}
      <Header />
      <main id="contenido">
        <Hero ready={revealed} />
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
