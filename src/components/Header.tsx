import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAV, SITE, waLink } from '../data/site'
import { Logo } from './brand/Logo'
import { InstagramIcon, WhatsAppIcon } from './brand/SocialIcons'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-cotton focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Ir al contenido
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
          scrolled && !open ? 'bg-cotton/95 py-2.5 shadow-[0_1px_0_rgb(35_37_44/0.08)] backdrop-blur-md' : 'py-4 md:py-5'
        } ${open ? 'text-cotton' : 'text-ink'}`}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <a href="#inicio" aria-label="Timón Sublimados, volver al inicio" className="relative z-10 -m-2 rounded-lg p-2">
            <Logo className={`w-auto transition-[height] duration-300 ${scrolled ? 'h-9 md:h-10' : 'h-10 md:h-12'}`} />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-[1rem] font-medium transition-colors hover:bg-ink/[0.07]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.98rem] font-semibold text-cotton transition-colors hover:bg-mar sm:inline-flex"
            >
              <WhatsAppIcon className="size-5" />
              Escribinos
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className={`relative z-10 grid size-12 place-items-center rounded-full transition-colors lg:hidden ${
                open ? 'bg-cotton text-mar' : 'bg-ink/[0.07]'
              }`}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="on-dark fixed inset-0 z-[45] flex flex-col bg-mar px-4 pt-28 text-cotton pb-safe sm:px-6 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Menú móvil" className="flex flex-col">
              {[{ href: '#inicio', label: 'Inicio' }, ...NAV].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display border-b border-cotton/20 py-3 text-[clamp(2.75rem,13vw,4.5rem)]"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-cotton text-lg font-semibold text-ink"
              >
                <WhatsAppIcon className="size-6" />
                Escribinos por WhatsApp
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2.5 rounded-full text-lg font-semibold shadow-[inset_0_0_0_2px_var(--color-cotton)]"
              >
                <InstagramIcon className="size-6" />
                {SITE.instagramHandle}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
