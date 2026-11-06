import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SERVICES } from '../data/services'
import type { Work } from '../data/works'
import { Wave } from './brand/Logo'
import { ButtonLink } from './ui/Button'
import { Photo } from './ui/Photo'

const SLIDES: { slug: Work['slug']; label: string; focus?: string }[] = [
  { slug: 'top-tropical-frente', label: 'Tops deportivos con estampa propia', focus: '50% 28%' },
  { slug: 'buzo-urban', label: 'Buzos para Urban Team Training', focus: '50% 30%' },
  { slug: 'conjunto-omega', label: 'Top y biker para Omega Entrenamiento', focus: '50% 40%' },
  { slug: 'tazas-nombre', label: 'Tazas personalizadas con nombre', focus: '50% 50%' },
  { slug: 'kit-running-argentina', label: 'Kit de carrera con la misma estampa', focus: '50% 40%' },
  { slug: 'top-tropical-espalda', label: 'Espalda nadadora, confección propia', focus: '50% 35%' },
  { slug: 'remera-cvd', label: 'Remeras para CVD Fitness Club', focus: '50% 45%' },
]

const INTERVAL = 4200
const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ ready = true }: { ready?: boolean }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const porthole = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  // Velocidad: al cargar solo se baja la primera foto. Cuando la página terminó de cargar,
  // se baja la siguiente del carrusel mientras se ve la actual (nunca todas juntas).
  const [warm, setWarm] = useState(() => typeof document !== 'undefined' && document.readyState === 'complete')
  const [reach, setReach] = useState(1)

  useEffect(() => {
    if (warm) return
    const on = () => setWarm(true)
    window.addEventListener('load', on, { once: true })
    return () => window.removeEventListener('load', on)
  }, [warm])

  const go = (i: number) => {
    setIndex(i)
    setReach((r) => Math.max(r, i + 1))
  }

  useEffect(() => {
    const el = porthole.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || paused || !visible || !ready) return
    const t = window.setTimeout(() => go((index + 1) % SLIDES.length), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, reduce, paused, visible, ready])

  const slide = SLIDES[index]
  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 40 }, animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }, transition: { duration: 0.6, delay, ease } }

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto grid max-w-[88rem] gap-x-10 gap-y-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="display text-[clamp(4.1rem,27vw,13rem)] lg:text-[clamp(6rem,14vw,14rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...enter(0)}>
                Lo pedís,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-mar" {...enter(0.08)}>
                lo tenés.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-[34rem] text-[1.15rem] leading-relaxed text-ink-soft text-pretty md:mt-8 md:text-[1.3rem]"
            {...enter(0.14)}
          >
            Ropa deportiva, personalizados, souvenirs para tu cumple y todo lo que tu negocio necesita con su marca.
            Sublimamos, estampamos, cosemos e imprimimos en 3D en nuestro taller de Miramar.
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3 xs:flex-row md:mt-10" {...enter(0.2)}>
            <ButtonLink href="#personaliza">Quiero personalizar</ButtonLink>
            <ButtonLink href="#trabajos" variant="outline">
              Ver nuestros trabajos
            </ButtonLink>
          </motion.div>
        </div>

        {/* Ojo de buey: la "O" del logo convertida en ventana a los trabajos reales */}
        <motion.div
          className="relative mx-auto w-full max-w-[34rem] lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -4 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.92, rotate: -4 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <div
            ref={porthole}
            className="relative aspect-square rounded-full p-[3.2%] shadow-[inset_0_0_0_clamp(5px,1.1vw,10px)_var(--color-ink)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative size-full overflow-hidden rounded-full bg-mist [transform:translateZ(0)]">
              {SLIDES.map((s, i) => {
                const on = i === index
                if (i !== 0 && !on && !(warm && i <= reach)) return null
                return (
                  <motion.div
                    key={s.slug}
                    className="absolute inset-0"
                    aria-hidden={!on}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, scale: on || reduce ? 1 : 1.08, zIndex: on ? 1 : 0 }}
                    transition={{ duration: reduce ? 0.2 : 1.1, ease }}
                  >
                    <Photo
                      slug={s.slug}
                      alt={on ? s.label : ''}
                      focus={s.focus}
                      priority={i === 0}
                      sizes="(min-width: 1024px) 34rem, 90vw"
                      className="size-full"
                    />
                  </motion.div>
                )
              })}
            </div>
            <span
              aria-hidden
              className="absolute top-[7%] right-[7%] z-10 grid size-[22%] place-items-center rounded-full bg-sol text-ink shadow-[0_0_0_clamp(5px,1.1vw,10px)_var(--color-cotton)]"
            >
              <Wave className="w-[62%]" />
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="min-h-[1.5em] text-[0.98rem] font-medium" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={slide.slug}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {slide.label}
                </motion.span>
              </AnimatePresence>
            </p>
            <div className="-ml-2.5 flex shrink-0 items-center gap-0.5 sm:ml-0" role="group" aria-label="Elegir trabajo">
              {SLIDES.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={s.label}
                  aria-current={i === index}
                  className="group grid size-8 place-items-center rounded-full"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-5 bg-ink' : 'w-2 bg-ink/25 group-hover:bg-ink/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lo que dice su bio, como índice de servicios */}
      <motion.div
        className="mx-auto mt-14 max-w-[88rem] px-4 sm:px-6 md:mt-20 lg:px-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <div className="flex items-center gap-4 border-t-2 border-ink pt-5 pb-6">
          <a
            href="#servicios"
            aria-label="Ir a servicios"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-cotton transition-colors hover:bg-mar"
          >
            <ArrowDown className="size-5" />
          </a>
          <ul className="no-scrollbar -mr-4 flex gap-x-7 overflow-x-auto pr-4 text-[1.05rem] font-semibold whitespace-nowrap sm:mr-0 md:flex-wrap md:gap-y-2 md:text-lg">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a href={`#servicio-${s.id}`} className="underline-offset-4 hover:text-mar hover:underline">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
