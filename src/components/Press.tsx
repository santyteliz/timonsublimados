import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import { Flame, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { waLink } from '../data/site'
import { ease } from '../lib/motion'
import { LOGO_WAVE } from './brand/logo-paths'
import { WhatsAppIcon } from './brand/SocialIcons'
import { Reveal, Rise } from './ui/Reveal'

type ProductId = 'taza' | 'remera' | 'gorra'
type Phase = 'idle' | 'down' | 'heat' | 'up' | 'done'

/** Zona donde va el estampado, en % del escenario. */
type Area = { left: number; top: number; width: number; height: number }

const PRODUCTS: { id: ProductId; label: string; article: string; area: Area }[] = [
  { id: 'taza', label: 'Taza', article: 'una taza', area: { left: 26, top: 43, width: 42, height: 26 } },
  { id: 'remera', label: 'Remera', article: 'una remera', area: { left: 33, top: 33, width: 34, height: 24 } },
  { id: 'gorra', label: 'Gorra', article: 'una gorra', area: { left: 30, top: 39, width: 40, height: 20 } },
]

const COLORS = [
  { id: 'mar', name: 'azul', value: 'var(--color-mar)' },
  { id: 'fucsia', name: 'fucsia', value: 'var(--color-fucsia)' },
  { id: 'menta', name: 'verde agua', value: 'var(--color-menta)' },
  { id: 'sol', name: 'amarillo', value: 'var(--color-sol)' },
  { id: 'ink', name: 'negro', value: 'var(--color-ink)' },
] as const

const BURST = ['bg-mar', 'bg-fucsia', 'bg-sol', 'bg-menta', 'bg-mar', 'bg-fucsia', 'bg-sol', 'bg-menta']

/** Dibujos simples de los productos, con el trazo grueso del logo. */
function ProductArt({ id }: { id: ProductId }) {
  const stroke = { stroke: 'var(--color-ink)', strokeWidth: 1.8, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
      <ellipse cx="50" cy="90" rx="30" ry="3" fill="var(--color-ink)" opacity="0.1" />
      {id === 'taza' ? (
        <>
          <path d="M73 41c14 0 14 24 0 24" fill="none" {...stroke} strokeWidth={5} />
          <path d="M73 41c14 0 14 24 0 24" fill="none" stroke="var(--color-cotton)" strokeWidth={1.6} />
          <path d="M22 32h52v40a14 14 0 0 1-14 14H36a14 14 0 0 1-14-14Z" fill="var(--color-cotton)" {...stroke} />
          <ellipse cx="48" cy="32" rx="26" ry="4.5" fill="#e4e5df" {...stroke} />
        </>
      ) : null}
      {id === 'remera' ? (
        <>
          <path
            d="M33 15 42 11c2 6 14 6 16 0l9 4 19 14-8 13-10-6v50H32V36l-10 6-8-13Z"
            fill="var(--color-cotton)"
            {...stroke}
          />
          <path d="M42 11c2 6 14 6 16 0" fill="none" {...stroke} />
        </>
      ) : null}
      {id === 'gorra' ? (
        <>
          <path d="M16 68C16 38 32 24 50 24s34 14 34 44Z" fill="var(--color-cotton)" {...stroke} />
          <path d="M10 68q40-9 80 0-3 11-40 9-37 2-40-9Z" fill="var(--color-ink)" {...stroke} />
          <circle cx="50" cy="24.5" r="2.6" fill="var(--color-ink)" />
        </>
      ) : null}
    </svg>
  )
}

/** Ondas de calor que suben mientras la plancha apoya. */
function Heat({ area }: { area: Area }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 10 30"
          className="absolute w-[5%] text-fucsia"
          style={{ left: `${area.left + area.width * (0.2 + i * 0.3)}%`, top: `${area.top - 22}%` }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 0.9, 0], y: [12, -10, -26] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: 'easeOut' }}
        >
          <path d="M5 29c-4-4 4-6 0-10s4-6 0-10 4-6 0-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </motion.svg>
      ))}
    </div>
  )
}

function fontSize(text: string, area: Area) {
  const n = Math.max(text.length, 3)
  return `${Math.min(area.height * 0.78, (area.width * 2.05) / n)}cqw`
}

export function Press() {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [productId, setProductId] = useState<ProductId>('taza')
  const [colorId, setColorId] = useState<(typeof COLORS)[number]['id']>('fucsia')
  const [phase, setPhase] = useState<Phase>('idle')
  const [temp, setTemp] = useState(0)
  const timers = useRef<number[]>([])

  const product = PRODUCTS.find((p) => p.id === productId)!
  const color = COLORS.find((c) => c.id === colorId)!
  const text = name.trim() || 'Tu nombre'
  const area = product.area
  const busy = phase === 'down' || phase === 'heat' || phase === 'up'

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  // Si se cambia algo después de planchar, vuelve el papel con el diseño nuevo.
  const change = (fn: () => void) => {
    fn()
    if (phase === 'done') setPhase('idle')
  }

  const run = () => {
    if (busy) return
    timers.current.forEach((t) => window.clearTimeout(t))
    if (reduce) {
      setPhase('done')
      return
    }
    setPhase('down')
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    at(520, () => {
      setPhase('heat')
      animate(0, 180, { duration: 0.9, ease: 'easeOut', onUpdate: (v) => setTemp(Math.round(v)) })
    })
    at(1650, () => setPhase('up'))
    at(2250, () => setPhase('done'))
  }

  const pressed = phase === 'down' || phase === 'heat'
  const printed = phase === 'up' || phase === 'done'
  // Arriba, la plancha espera justo encima del papel; al bajar, la placa tapa la zona del estampado.
  const raisedY = `-${area.height + 19}%`

  const message = name.trim()
    ? `¡Hola! Probé la plancha en la web y quiero ${product.article} con el nombre «${name.trim()}» en ${color.name}.`
    : `¡Hola! Probé la plancha en la web y quiero ${product.article} personalizada en ${color.name}.`

  return (
    <section id="probalo" aria-labelledby="probalo-title" className="overflow-hidden bg-sol py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[1.05rem] font-semibold text-ink/70">Así se sublima</p>
            <h2 id="probalo-title" className="display mt-2 text-[clamp(3.2rem,9vw,6.5rem)]">
              <Rise>Probá cómo queda</Rise>
            </h2>
            <p className="mt-5 max-w-[30rem] text-[1.12rem] leading-relaxed text-ink/80 text-pretty">
              Escribí un nombre, elegí el producto y bajá la plancha. En el taller imprimimos el diseño al revés en papel,
              lo apoyamos sobre la pieza y el calor lo pasa a la tela o a la cerámica.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6">
            <label className="block">
              <span className="mb-2 block text-[1.02rem] font-semibold">Nombre</span>
              <input
                type="text"
                value={name}
                maxLength={12}
                onChange={(e) => change(() => setName(e.target.value))}
                placeholder="Tu nombre"
                autoComplete="off"
                className="w-full rounded-[1rem] bg-cotton px-4 py-3.5 text-[1.0625rem] text-ink placeholder:text-ink/45 outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-ink)]"
              />
            </label>

            <fieldset>
              <legend className="mb-2 text-[1.02rem] font-semibold">Producto</legend>
              <div className="flex gap-2">
                {PRODUCTS.map((p) => {
                  const on = p.id === productId
                  return (
                    <label
                      key={p.id}
                      className={`inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-4 font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.96] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink sm:flex-none ${
                        on ? 'bg-ink text-cotton' : 'bg-cotton/70 text-ink hover:bg-cotton'
                      }`}
                    >
                      <input type="radio" name="press-product" className="sr-only" checked={on} onChange={() => change(() => setProductId(p.id))} />
                      {p.label}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-[1.02rem] font-semibold">Color del estampado</legend>
              <div className="flex gap-2.5">
                {COLORS.map((c) => {
                  const on = c.id === colorId
                  return (
                    <label
                      key={c.id}
                      className={`grid size-11 cursor-pointer place-items-center rounded-full transition-transform duration-200 active:scale-90 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                        on ? 'shadow-[0_0_0_3px_var(--color-ink)]' : 'shadow-[0_0_0_2px_rgb(35_37_44/0.18)]'
                      }`}
                      style={{ background: c.value }}
                    >
                      <input type="radio" name="press-color" className="sr-only" checked={on} onChange={() => change(() => setColorId(c.id))} />
                      <span className="sr-only">{c.name}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          {/* Escenario */}
          <div className="@container relative mx-auto aspect-square w-full max-w-[36rem] overflow-hidden rounded-[2rem] bg-cotton shadow-[0_30px_80px_-40px_rgb(35_37_44/0.5)]">
            <ProductArt id={productId} />

            {/* Lo que queda estampado */}
            <div
              className="absolute grid place-items-center"
              style={{ left: `${area.left}%`, top: `${area.top}%`, width: `${area.width}%`, height: `${area.height}%` }}
            >
              <AnimatePresence>
                {printed ? (
                  <motion.span
                    key={text + productId + colorId}
                    className="display block max-w-full truncate leading-none"
                    style={{ color: color.value, fontSize: fontSize(text, area) }}
                    initial={reduce ? false : { opacity: 0, scale: 0.92, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    {text}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Papel de sublimación con el diseño al revés */}
            <AnimatePresence>
              {!printed ? (
                <motion.div
                  key={`papel-${productId}`}
                  className="absolute grid place-items-center rounded-[3px] bg-white shadow-[0_6px_16px_-6px_rgb(35_37_44/0.35)]"
                  style={{
                    left: `${area.left - 3}%`,
                    top: `${area.top - 3}%`,
                    width: `${area.width + 6}%`,
                    height: `${area.height + 6}%`,
                    transformOrigin: '0% 100%',
                  }}
                  initial={reduce ? false : { opacity: 0, y: -14, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: '55%', y: '-70%', rotate: 24, transition: { duration: 0.6, ease } }}
                  transition={{ duration: 0.45, ease }}
                >
                  <span
                    className="display block max-w-full -scale-x-100 truncate leading-none opacity-55 saturate-50"
                    style={{ color: color.value, fontSize: fontSize(text, area) }}
                  >
                    {text}
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Plancha */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              initial={false}
              animate={{ y: pressed ? '0%' : raisedY }}
              transition={
                pressed
                  ? { duration: 0.5, ease: [0.55, 0, 0.75, 0.2] }
                  : { type: 'spring', stiffness: 160, damping: 18 }
              }
            >
              <div
                className="absolute"
                style={{ left: `${area.left - 7}%`, top: `${area.top - 4}%`, width: `${area.width + 14}%`, height: `${area.height + 8}%` }}
              >
                {/* Brazo */}
                <div className="absolute bottom-full left-1/2 h-[300%] w-[12%] -translate-x-1/2 bg-ink" />
                {/* Placa caliente, con la ola del logo como sello */}
                <div className="absolute inset-0 overflow-hidden rounded-[0.9rem] bg-ink">
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fucsia to-transparent"
                    animate={{ opacity: phase === 'heat' ? [0.35, 0.9, 0.35] : 0 }}
                    transition={phase === 'heat' ? { duration: 0.6, repeat: Infinity } : { duration: 0.3 }}
                  />
                  <div className="absolute top-1/2 left-1/2 grid h-[62%] aspect-square -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sol">
                    <svg viewBox={LOGO_WAVE.vb} className="w-[64%] text-ink" fill="currentColor">
                      {LOGO_WAVE.paths.map((p, i) => (
                        <path key={i} d={p.d} fillRule={p.evenodd ? 'evenodd' : undefined} />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {phase === 'heat' ? <Heat area={area} /> : null}

            {/* Temperatura */}
            <div className="absolute bottom-4 left-4 rounded-full bg-ink px-3 py-1.5 text-[0.9rem] font-semibold text-cotton tabular-nums" aria-hidden>
              {phase === 'heat' || phase === 'up' ? `${temp} °C` : phase === 'done' ? '¡Listo!' : 'Lista para planchar'}
            </div>

            {/* Festejo cuando queda estampado */}
            {phase === 'done' && !reduce ? (
              <div className="pointer-events-none absolute" style={{ left: `${area.left + area.width / 2}%`, top: `${area.top + area.height / 2}%` }} aria-hidden>
                {BURST.map((c, i) => {
                  const a = (i / BURST.length) * Math.PI * 2
                  return (
                    <motion.span
                      key={i}
                      className={`absolute size-2.5 rounded-full ${c}`}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: Math.cos(a) * 120, y: Math.sin(a) * 90, opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  )
                })}
              </div>
            ) : null}
          </div>

          <p className="sr-only" aria-live="polite">
            {phase === 'done' ? `Listo: ${product.article} con el nombre ${text} en ${color.name}.` : ''}
          </p>

          <div className="mx-auto mt-5 flex max-w-[36rem] flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={run}
              disabled={busy}
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[1.1rem] font-semibold text-cotton transition-[background-color,transform,opacity] duration-200 hover:bg-mar active:scale-[0.97] disabled:opacity-70"
            >
              {phase === 'done' ? <RotateCcw className="size-5" aria-hidden /> : <Flame className="size-5" aria-hidden />}
              {busy ? 'Planchando…' : phase === 'done' ? 'Planchar otra vez' : 'Bajar la plancha'}
            </button>
            <AnimatePresence>
              {phase === 'done' ? (
                <motion.a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-mar px-6 text-[1.1rem] font-semibold text-cotton transition-colors hover:bg-mar-deep"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <WhatsAppIcon className="size-5" />
                  Lo quiero así
                </motion.a>
              ) : null}
            </AnimatePresence>
          </div>
          <p className="mx-auto mt-3 max-w-[36rem] text-center text-[0.92rem] text-ink/65">
            Es una simulación para que te des una idea. El diseño final lo armamos con vos.
          </p>
        </div>
      </div>
    </section>
  )
}
