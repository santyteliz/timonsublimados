import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Fragment, useState } from 'react'
import { PRODUCTS } from '../data/services'
import { waLink } from '../data/site'
import type { Work } from '../data/works'
import { Wave } from './brand/Logo'
import { WhatsAppIcon } from './brand/SocialIcons'
import { Photo } from './ui/Photo'
import { Reveal, Rise } from './ui/Reveal'

/** Lista tipográfica de productos. En escritorio, al pasar el mouse aparece la foto real. */
export function Catalog() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<Work['slug'] | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 })

  return (
    <section
      aria-labelledby="catalogo-title"
      className="on-dark relative bg-mar py-16 text-cotton sm:py-24 md:py-32"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
    >
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="catalogo-title" className="display max-w-[12ch] text-[clamp(3rem,8vw,6.5rem)]">
            <Rise>Todo esto sale del taller</Rise>
          </h2>
          <p className="max-w-[24rem] text-[1.1rem] leading-relaxed text-cotton/80">
            Algunas de las cosas que ya hicimos. Si lo que buscás no está, igual preguntanos.
          </p>
        </Reveal>

        <Reveal y={20}>
          <p className="display-soft mt-14 text-[clamp(2rem,5.4vw,4.4rem)] leading-[1.12] md:mt-20">
            {PRODUCTS.map((p, i) => (
              <Fragment key={p.name}>
                <span
                  className={`sm:whitespace-nowrap transition-colors duration-200 ${p.photo ? 'cursor-default hover:text-sol' : ''}`}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && p.photo && setHover(p.photo)}
                  onPointerLeave={() => setHover(null)}
                >
                  {p.name}
                </span>
                {i < PRODUCTS.length - 1 ? (
                  <Wave aria-hidden className="mx-[0.28em] inline-block h-[0.5em] w-auto -translate-y-[0.06em] text-cotton/45" />
                ) : null}
              </Fragment>
            ))}
          </p>
        </Reveal>

        <a
          href={waLink('¡Hola! Quería saber si pueden personalizar algo que no vi en la lista de la web.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-flex min-h-13 items-center gap-2.5 rounded-full bg-cotton px-6 font-semibold text-ink transition-colors hover:bg-sol"
        >
          <WhatsAppIcon className="size-5" />
          ¿No está en la lista? Preguntanos
        </a>
      </div>

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hover ? (
              <motion.div
                key={hover}
                className="-translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-[1.2rem] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.45)]"
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Photo slug={hover} alt="" sizes="16rem" className="aspect-[4/5] w-64" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </section>
  )
}
