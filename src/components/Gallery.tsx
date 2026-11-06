import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { SITE, waLink } from '../data/site'
import { CATEGORIES, WORKS, img, imgMeta, type Category, type Shape, type Work } from '../data/works'
import { InstagramIcon, WhatsAppIcon } from './brand/SocialIcons'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

const SPAN: Record<Shape, string> = {
  square: '',
  tall: 'row-span-2',
  wide: 'col-span-2',
  big: 'col-span-2 row-span-2',
}

const SIZES: Record<Shape, string> = {
  square: '(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 48vw',
  tall: '(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 48vw',
  wide: '(min-width: 1024px) 44vw, (min-width: 768px) 60vw, 96vw',
  big: '(min-width: 1024px) 44vw, (min-width: 768px) 60vw, 96vw',
}

const INITIAL = 14

export function Gallery() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<Category | 'todo'>('todo')
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const gridTop = useRef<HTMLDivElement>(null)

  // Al cambiar de filtro la grilla puede achicarse mucho (Gorras tiene 5 fotos).
  // Si el usuario estaba más abajo, la página quedaría en el footer: lo llevamos al inicio de la grilla.
  const choose = (id: Category | 'todo', button?: HTMLElement) => {
    // En celular la barra de filtros se desplaza de costado: centramos el botón elegido.
    const bar = button?.parentElement
    if (button && bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: button.offsetLeft - (bar.clientWidth - button.offsetWidth) / 2, behavior: reduce ? 'instant' : 'smooth' })
    }
    if (id === filter) return
    const el = gridTop.current
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 150
      if (window.scrollY > top) window.scrollTo({ top, behavior: reduce ? 'instant' : 'smooth' })
    }
    setFilter(id)
  }

  const list = useMemo(() => (filter === 'todo' ? WORKS : WORKS.filter((w) => w.category === filter)), [filter])
  const visible = filter === 'todo' && !expanded ? list.slice(0, INITIAL) : list

  return (
    <section id="trabajos" aria-labelledby="trabajos-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="trabajos-title" className="display text-[clamp(3rem,8vw,6.5rem)] lg:col-span-7">
            Hecho en el taller
          </h2>
          <p className="max-w-[30rem] text-[1.15rem] leading-relaxed text-ink-soft text-pretty lg:col-span-5 lg:justify-self-end">
            Pedidos reales de clientes, clubes, balnearios y emprendimientos. Tocá cualquier foto para verla grande y
            pedir algo parecido.
          </p>
        </Reveal>

        <div
          role="group"
          aria-label="Filtrar trabajos"
          className="no-scrollbar sticky top-[4.25rem] z-20 -mx-4 mt-12 flex gap-2 overflow-x-auto bg-cotton/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:flex-wrap sm:px-0 md:top-[4.75rem]"
        >
          {CATEGORIES.map((c) => {
            const on = filter === c.id
            const count = c.id === 'todo' ? WORKS.length : WORKS.filter((w) => w.category === c.id).length
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={(e) => choose(c.id, e.currentTarget)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[0.98rem] font-semibold transition-colors ${
                  on ? 'bg-ink text-cotton' : 'bg-mist text-ink hover:bg-ink/15'
                }`}
              >
                {c.label}
                <span className={`text-[0.85rem] tabular-nums ${on ? 'text-cotton/60' : 'text-ink/45'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div ref={gridTop} className="@container mt-6">
        <ul
          className="gallery-grid grid grid-flow-dense gap-[var(--gap)] [--cols:2] [--gap:0.5rem] md:[--cols:3] md:[--gap:0.75rem] lg:[--cols:4] lg:[--gap:1rem]"
          style={{ gridTemplateColumns: 'repeat(var(--cols), minmax(0, 1fr))', gridAutoRows: 'calc((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols))' } as CSSProperties}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((w) => (
              <motion.li
                key={w.slug}
                layout={!reduce}
                className={`relative ${SPAN[w.shape]}`}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget
                    setOpen(list.indexOf(w))
                  }}
                  className="group relative block size-full overflow-hidden rounded-[1.1rem] bg-mist md:rounded-[1.4rem]"
                  aria-label={`Ver ${w.title}`}
                >
                  <Photo
                    slug={w.slug}
                    alt={`${w.title}. ${w.detail}`}
                    focus={w.focus}
                    sizes={SIZES[w.shape]}
                    className="absolute inset-0 size-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.045]"
                  />
                  <span className="pointer-events-none absolute inset-x-2 bottom-2 hidden translate-y-3 items-center justify-between gap-3 rounded-[0.8rem] bg-cotton px-4 py-3 text-left opacity-0 transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:flex">
                    <span className="min-w-0">
                      <span className="block truncate text-[0.98rem] font-semibold">{w.title}</span>
                      <span className="block truncate text-[0.85rem] text-ink-soft">{w.detail}</span>
                    </span>
                    <Plus className="size-5 shrink-0" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {filter === 'todo' && !expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex min-h-13 items-center gap-2 rounded-full px-6 font-semibold shadow-[inset_0_0_0_2px_var(--color-ink)] transition-colors hover:bg-ink hover:text-cotton"
            >
              <Plus className="size-5" /> Ver {WORKS.length - INITIAL} trabajos más
            </button>
          ) : null}
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center gap-2.5 rounded-full px-6 font-semibold text-ink underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-5" /> Más trabajos en {SITE.instagramHandle}
          </a>
        </div>
      </div>

      <Lightbox
        items={list}
        index={open}
        onChange={setOpen}
        onClose={() => {
          setOpen(null)
          lastTrigger.current?.focus()
        }}
      />
    </section>
  )
}

function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: Work[]
  index: number | null
  onChange: (i: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const reduce = useReducedMotion()
  const [dir, setDir] = useState(1)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
    document.documentElement.style.overflow = index !== null ? 'hidden' : ''
  }, [index])

  const go = useCallback(
    (step: number) => {
      if (index === null) return
      setDir(step)
      onChange((index + step + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, go])

  // Precarga la foto siguiente para que el paso sea instantáneo.
  useEffect(() => {
    if (index === null) return
    const next = items[(index + 1) % items.length]
    const pre = new Image()
    pre.src = img(next.slug, 1440)
  }, [index, items])

  return (
    <dialog
      ref={ref}
      aria-label={item ? item.title : 'Trabajo'}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-cotton backdrop:bg-transparent"
    >
      {item ? (
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
            <p className="text-[0.95rem] text-cotton/70 tabular-nums" aria-live="polite">
              {index! + 1} de {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Cerrar"
              className="grid size-12 place-items-center rounded-full bg-cotton/10 transition-colors hover:bg-cotton/20"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-20">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.img
                key={item.slug}
                src={img(item.slug, 1440)}
                alt={`${item.title}. ${item.detail}`}
                width={imgMeta(item.slug).w}
                height={imgMeta(item.slug).h}
                className="max-h-full w-auto max-w-full touch-pan-y rounded-[1rem] object-contain select-none"
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1)
                  else if (info.offset.x > 70) go(-1)
                }}
                draggable={false}
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Trabajo anterior"
              className="absolute left-4 hidden size-12 place-items-center rounded-full bg-cotton/10 transition-colors hover:bg-cotton/20 sm:grid"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Trabajo siguiente"
              className="absolute right-4 hidden size-12 place-items-center rounded-full bg-cotton/10 transition-colors hover:bg-cotton/20 sm:grid"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-[56rem] flex-col gap-4 px-4 pt-2 pb-safe sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-8">
            <div>
              <p className="display-soft text-[1.75rem]">{item.title}</p>
              <p className="mt-1 text-cotton/70">{item.detail}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Trabajo anterior"
                className="grid size-13 shrink-0 place-items-center rounded-full bg-cotton/10 sm:hidden"
              >
                <ChevronLeft className="size-6" />
              </button>
              <a
                href={waLink(`¡Hola! Vi en la web el trabajo "${item.title}" y quería consultar por algo parecido.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-sol px-6 font-semibold text-ink transition-colors hover:bg-cotton"
              >
                <WhatsAppIcon className="size-5" />
                Quiero algo así
              </a>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Trabajo siguiente"
                className="grid size-13 shrink-0 place-items-center rounded-full bg-cotton/10 sm:hidden"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
