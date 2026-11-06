import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { ease, viewport } from '../../lib/motion'

/** Entrada suave al hacer scroll. Se usa solo en bloques grandes, una vez. */
export function Reveal({ children, delay = 0, className, y = 22 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Títulos: el texto sube desde abajo de una línea invisible, como en el hero.
 * Va dentro del <h2>, así el lector de pantalla lee el título normal.
 */
export function Rise({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        whileInView={{ y: '0%' }}
        viewport={viewport}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * Fotos: se destapan de abajo hacia arriba, como una tela que se levanta de la plancha.
 * La foto acompaña con un zoom muy leve.
 * El scroll se mira en el contenedor de afuera: el navegador no detecta un elemento recortado por completo.
 */
export function Unveil({ children, delay = 0, className = '', radius = '1.2rem' }: { children: ReactNode; delay?: number; className?: string; radius?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={reduce ? 'show' : 'hide'} whileInView="show" viewport={viewport}>
      <motion.div
        className="size-full overflow-hidden"
        style={{ borderRadius: radius }}
        variants={{
          hide: { clipPath: `inset(100% 0% 0% 0% round ${radius})` },
          show: { clipPath: `inset(0% 0% 0% 0% round ${radius})`, transition: { duration: 0.85, delay, ease: [0.65, 0, 0.35, 1] } },
        }}
      >
        <motion.div
          className="size-full"
          variants={{ hide: { scale: 1.12 }, show: { scale: 1, transition: { duration: 1.2, delay, ease } } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
