import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { waLink } from '../data/site'
import { WhatsAppIcon } from './brand/SocialIcons'

/** Botón flotante de WhatsApp. Aparece después del hero, que ya tiene sus propios botones. */
export function WhatsAppFab() {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          className="group fixed right-4 bottom-4 z-40 flex h-15 items-center gap-0 rounded-full bg-sol px-[1.125rem] text-ink shadow-[0_0_0_2px_var(--color-ink),0_14px_32px_-10px_rgb(35_37_44/0.6)] transition-colors hover:bg-cotton sm:right-6 sm:bottom-6"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        >
          <WhatsAppIcon className="size-6 shrink-0" />
          <span className="max-w-0 overflow-hidden font-semibold whitespace-nowrap transition-[max-width,margin] duration-300 ease-out-soft group-hover:ml-2.5 group-hover:max-w-40 group-focus-visible:ml-2.5 group-focus-visible:max-w-40">
            Escribinos
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
