import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { SERVICES, type Service } from '../data/services'
import { waLink } from '../data/site'
import { Wave } from './brand/Logo'
import { WhatsAppIcon } from './brand/SocialIcons'
import { Photo } from './ui/Photo'
import { ProcessVideo } from './ui/ProcessVideo'
import { Reveal } from './ui/Reveal'

const TONES: Record<Service['tone'], { panel: string; dark: boolean; button: string }> = {
  mar: { panel: 'bg-mar text-cotton', dark: true, button: 'bg-cotton text-ink hover:bg-sol' },
  sol: { panel: 'bg-sol text-ink', dark: false, button: 'bg-ink text-cotton hover:bg-mar' },
  menta: { panel: 'bg-menta text-ink', dark: false, button: 'bg-ink text-cotton hover:bg-mar' },
  fucsia: { panel: 'bg-fucsia text-ink', dark: false, button: 'bg-ink text-cotton hover:bg-cotton hover:text-ink' },
  ink: { panel: 'bg-ink text-cotton', dark: true, button: 'bg-sol text-ink hover:bg-cotton' },
  mist: { panel: 'bg-mist text-ink', dark: false, button: 'bg-mar text-cotton hover:bg-mar-deep' },
}

function Media({ s, sizes, className = '' }: { s: Service; sizes: string; className?: string }) {
  if (s.video) return <ProcessVideo {...s.video} className={className} />
  return <Photo slug={s.photo} alt={`${s.name}: trabajo realizado en el taller`} sizes={sizes} className={`size-full ${className}`} />
}

function Detail({ s, headingLevel = 'h3' }: { s: Service; headingLevel?: 'h3' | 'p' }) {
  const t = TONES[s.tone]
  const H = headingLevel
  return (
    <div className="flex h-full flex-col">
      <p className={`text-[1.05rem] font-semibold ${t.dark ? 'text-cotton/75' : 'text-ink/70'}`}>{s.hook}</p>
      <H className="display mt-2 text-[clamp(2.9rem,6vw,5.25rem)]">{s.name}</H>
      <p className="mt-5 max-w-[32rem] text-[1.08rem] leading-relaxed text-pretty">{s.body}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[1rem] font-medium" aria-label={`Ejemplos de ${s.name.toLowerCase()}`}>
        {s.items.map((it) => (
          <li key={it} className="flex items-baseline gap-2.5">
            <span aria-hidden className={`mt-[0.55em] h-[3px] w-3 shrink-0 rounded-full ${t.dark ? 'bg-cotton/60' : 'bg-ink/50'}`} />
            {it}
          </li>
        ))}
      </ul>
      <a
        href={waLink(s.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 inline-flex min-h-13 items-center gap-2.5 self-start rounded-full px-6 font-semibold transition-colors lg:mt-auto ${t.button} ${t.dark ? 'on-dark' : ''}`}
      >
        <WhatsAppIcon className="size-5" />
        Consultar por {s.name.charAt(0).toLowerCase() + s.name.slice(1)}
      </a>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(SERVICES[0].id)
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const current = SERVICES.find((s) => s.id === active) ?? SERVICES[0]

  // Los enlaces #servicio-x del hero activan la pestaña correcta en escritorio.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace('#servicio-', '')
      if (!SERVICES.some((s) => s.id === id)) return
      setActive(id)
      if (window.matchMedia('(min-width: 1024px)').matches) {
        section.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [reduce])

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const next = SERVICES[(i + (e.key === 'ArrowDown' ? 1 : SERVICES.length - 1)) % SERVICES.length]
    setActive(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section ref={section} id="servicios" aria-labelledby="servicios-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="servicios-title" className="display text-[clamp(3rem,8vw,6.5rem)] lg:col-span-7">
            Seis oficios, un mismo taller
          </h2>
          <p className="max-w-[30rem] text-[1.15rem] leading-relaxed text-ink-soft text-pretty lg:col-span-5 lg:justify-self-end">
            Del diseño a la plancha y de la plancha a la máquina de coser. Así resolvemos la ropa de tu equipo, tu gimnasio
            o tu marca en un solo lugar.
          </p>
        </Reveal>

        {/* Escritorio: índice + panel */}
        <div className="mt-16 hidden gap-10 lg:grid lg:grid-cols-12">
          <div role="tablist" aria-label="Servicios" aria-orientation="vertical" className="flex flex-col lg:col-span-4">
            {SERVICES.map((s, i) => {
              const on = s.id === active
              return (
                <button
                  key={s.id}
                  id={`tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="panel-servicio"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group relative flex items-center gap-4 border-b border-ink/15 py-4 text-left"
                >
                  <span className="relative grid size-10 shrink-0 place-items-center">
                    {on ? (
                      <motion.span layoutId="service-wave" className="absolute inset-0" transition={{ type: 'spring', stiffness: 380, damping: 32 }}>
                        <Wave className="size-full text-mar" />
                      </motion.span>
                    ) : (
                      <span className="size-2 rounded-full bg-ink/25 transition-colors group-hover:bg-ink/60" />
                    )}
                  </span>
                  <span
                    className={`display-soft text-[clamp(1.9rem,2.7vw,2.6rem)] transition-colors ${
                      on ? 'text-ink' : 'text-ink/45 group-hover:text-ink/80'
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              )
            })}
          </div>

          <div id="panel-servicio" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className={`grid min-h-[38rem] grid-cols-2 gap-8 rounded-[2rem] p-6 ${TONES[current.tone].panel}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0 round 2rem)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 2rem)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Media s={current} sizes="30rem" className="aspect-[4/5] rounded-[1.4rem]" />
                <div className="py-4 pr-4">
                  <Detail s={current} headingLevel="p" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Celular y tablet: cada servicio con su propio color */}
        <div className="mt-12 flex flex-col gap-4 lg:hidden">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} y={20}>
              <article
                id={`servicio-${s.id}`}
                className={`grid gap-6 overflow-hidden rounded-[1.75rem] p-4 pb-7 sm:p-6 md:grid-cols-2 md:gap-8 ${TONES[s.tone].panel}`}
              >
                <Media
                  s={s}
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className={`rounded-[1.2rem] ${s.video ? 'aspect-[4/5]' : i % 2 ? 'aspect-[5/4] md:aspect-[4/5]' : 'aspect-square md:aspect-[4/5]'}`}
                />
                <div className="px-1 md:py-2">
                  <Detail s={s} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
