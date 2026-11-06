import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { INTRO_KEY as KEY } from '../lib/intro'
import { LOGO_FULL } from './brand/logo-paths'

const HOLD = 1500
const ease = [0.22, 1, 0.36, 1] as const
const curtain = [0.76, 0, 0.24, 1] as const

// Orden de los trazos en LOGO_FULL: T, i, m, n, tres partes de la ola, "Sublimados".
const LETTERS = [0, 1, 2, 3]
const WAVE = [4, 5, 6]
const TAGLINE = 7

type Props = {
  /** Se llama cuando empieza a levantarse la cortina (el hero arranca su animación). */
  onReveal: () => void
  /** Se llama cuando la intro terminó y se puede desmontar. */
  onDone: () => void
}

export function Intro({ onReveal, onDone }: Props) {
  const [leaving, setLeaving] = useState(false)
  const left = useRef(false)

  const leave = useCallback(() => {
    if (left.current) return
    left.current = true
    setLeaving(true)
    document.documentElement.style.overflow = ''
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* sin almacenamiento: la intro puede volver a aparecer, no pasa nada */
    }
    onReveal()
  }, [onReveal])

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const t = window.setTimeout(leave, HOLD)
    const onKey = () => leave()
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [leave])

  const p = LOGO_FULL.paths

  return (
    <div className="fixed inset-0 z-[100]" onClick={leave} aria-hidden="true">
      {/* Segunda cortina: una pasada de azul, como el rodillo de la plancha */}
      <motion.div
        className="absolute inset-0 bg-mar"
        initial={false}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={{ duration: 0.75, delay: 0.14, ease: curtain }}
        onAnimationComplete={() => left.current && onDone()}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center bg-cotton"
        initial={false}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={{ duration: 0.7, ease: curtain }}
      >
        <motion.svg
          viewBox={LOGO_FULL.vb}
          className="w-[min(78vw,34rem)] overflow-visible text-ink"
          fill="currentColor"
          animate={leaving ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease }}
        >
          {/* La ola entra girando, como el timón */}
          <motion.g
            className="text-mar"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ opacity: 0, scale: 0.15, rotate: -220 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            {WAVE.map((i) => (
              <path key={i} d={p[i].d} fillRule={p[i].evenodd ? 'evenodd' : undefined} />
            ))}
          </motion.g>

          {LETTERS.map((i, n) => (
            <motion.path
              key={i}
              d={p[i].d}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 + n * 0.08, ease }}
            />
          ))}

          <motion.path
            d={p[TAGLINE].d}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease }}
          />
        </motion.svg>

        <motion.p
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] text-[0.95rem] font-semibold text-ink/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ delay: leaving ? 0 : 1.2, duration: 0.4 }}
        >
          Lo pedís, lo tenés.
        </motion.p>
      </motion.div>
    </div>
  )
}
