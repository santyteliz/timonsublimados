import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Cake, Check, Flag, Gift, PartyPopper, Shirt, type LucideIcon } from 'lucide-react'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { waLink } from '../data/site'
import type { Work } from '../data/works'
import { WhatsAppIcon } from './brand/SocialIcons'
import { Photo } from './ui/Photo'
import { Reveal, Rise, Unveil } from './ui/Reveal'

type Item = { id: string; label: string; text: string; icon: LucideIcon; message: string }

const ITEMS: Item[] = [
  { id: 'remera', label: 'Remera del cumpleañero', text: 'Con el nombre y la edad. También para la familia.', icon: Shirt, message: 'remera del cumpleañero' },
  { id: 'banderines', label: 'Banderines', text: 'Con el nombre, para colgar en la mesa o en la pared.', icon: Flag, message: 'banderines' },
  { id: 'torta', label: 'Decoración de la torta', text: 'Adornos con la temática que elijas.', icon: Cake, message: 'decoración de la torta' },
  { id: 'deco', label: 'Decoración', text: 'Para la mesa dulce y el salón.', icon: PartyPopper, message: 'decoración' },
  { id: 'souvenirs', label: 'Souvenirs', text: 'Tazas, latas o lo que imagines, con el nombre de cada invitado.', icon: Gift, message: 'souvenirs' },
]

const PHOTOS: { slug: Work['slug']; alt: string; className: string }[] = [
  { slug: 'tazas-nombre', alt: 'Tazas sublimadas, cada una con un nombre distinto', className: 'col-span-2 aspect-[16/10]' },
  { slug: 'remera-baby-shower', alt: 'Remera para un baby shower con el nombre Benicio', className: 'aspect-square' },
  { slug: 'taza-benja', alt: 'Taza con el nombre Benja de un lado y el sol del otro', className: 'aspect-square' },
]

/** Banderines de tela colgando de un hilo: los colores de la marca. */
function Garland() {
  const reduce = useReducedMotion()
  const colors = ['bg-mar', 'bg-sol', 'bg-fucsia', 'bg-menta', 'bg-cotton', 'bg-mar', 'bg-sol', 'bg-fucsia', 'bg-menta', 'bg-cotton', 'bg-mar', 'bg-sol']
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden md:h-28">
      <svg className="absolute inset-x-0 top-0 h-10 w-full text-ink/30" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 1 Q50 9 100 1" fill="none" stroke="currentColor" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between px-[2%]">
        {colors.map((c, i) => {
          // Cada banderín cuelga sobre la curva del hilo.
          const t = (i + 0.5) / colors.length
          const sag = 4 * t * (1 - t)
          return (
            <motion.span
              key={i}
              className={`block h-10 w-7 md:h-14 md:w-10 ${c} ${i > 7 ? 'hidden sm:block' : ''}`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', marginTop: `${0.25 + sag * 1.9}rem`, transformOrigin: '50% 0' }}
              animate={reduce ? undefined : { rotate: [-4, 4, -4] }}
              transition={{ duration: 3.2 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            />
          )
        })}
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[1.02rem] font-semibold">
        {label} {hint ? <span className="font-normal text-ink-soft">{hint}</span> : null}
      </span>
      {children}
    </label>
  )
}

const input =
  'w-full rounded-[1rem] bg-mist px-4 py-3.5 text-[1.0625rem] text-ink placeholder:text-ink/45 outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-mar)]'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${d}/${m}` : ''
}

export function Birthday() {
  const [picked, setPicked] = useState<string[]>(['remera', 'banderines', 'torta', 'souvenirs'])
  const [kid, setKid] = useState('')
  const [age, setAge] = useState('')
  const [theme, setTheme] = useState('')
  const [guests, setGuests] = useState('')
  const [date, setDate] = useState('')

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const souvenirs = picked.includes('souvenirs')

  const message = useMemo(() => {
    const lines = ['¡Hola! Quiero armar un cumple con ustedes.']
    const who = kid.trim()
    if (who || age) lines.push(`Es para ${who || 'el cumpleañero'}${age ? `, que cumple ${age}` : ''}.`)
    if (theme.trim()) lines.push(`Temática: ${theme.trim()}.`)
    const chosen = ITEMS.filter((i) => picked.includes(i.id)).map((i) =>
      i.id === 'souvenirs' && guests ? `souvenirs (unos ${guests})` : i.message,
    )
    if (chosen.length) lines.push(`Me interesa: ${chosen.join(', ')}.`)
    if (date) lines.push(`El cumple es el ${formatDate(date)}.`)
    return lines.join('\n')
  }, [kid, age, theme, picked, guests, date])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="cumple" aria-labelledby="cumple-title" className="relative overflow-hidden bg-[#ffe3ee] pt-28 pb-16 sm:pb-24 md:pt-40 md:pb-32">
      <Garland />
      <div className="mx-auto grid max-w-[88rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[1.05rem] font-semibold text-fucsia">Cumpleaños, baby showers y egresos</p>
            <h2 id="cumple-title" className="display mt-2 text-[clamp(3.4rem,9vw,7rem)]">
              <Rise>Armá tu cumple</Rise>
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.15rem] leading-relaxed text-ink-soft text-pretty">
              La remera del cumpleañero, los banderines, la decoración de la torta y los souvenirs, todo con la misma
              temática y hecho en el taller. Elegí lo que necesitás y te llega la consulta lista a WhatsApp.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {PHOTOS.map((p, i) => (
              <Unveil key={p.slug} className={p.className} delay={i * 0.12}>
                <Photo slug={p.slug} alt={p.alt} sizes="(min-width: 1024px) 20rem, 46vw" className="size-full" />
              </Unveil>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <form
            onSubmit={onSubmit}
            className="rounded-[2rem] bg-cotton p-5 shadow-[0_30px_80px_-40px_rgb(255_61_139/0.45)] sm:p-8 lg:p-10"
            aria-label="Armá tu cumple y mandalo por WhatsApp"
          >
            <fieldset>
              <legend className="mb-3 text-[1.02rem] font-semibold">¿Qué querés para el cumple?</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {ITEMS.map((it) => {
                  const on = picked.includes(it.id)
                  const Icon = it.icon
                  return (
                    <label
                      key={it.id}
                      className={`relative flex cursor-pointer items-start gap-3.5 rounded-[1.2rem] p-4 transition-[background-color,color,transform] duration-200 active:scale-[0.98] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-mar ${
                        on ? 'bg-ink text-cotton' : 'bg-mist text-ink hover:bg-ink/15'
                      } ${it.id === 'souvenirs' ? 'sm:col-span-2' : ''}`}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggle(it.id)} className="sr-only" />
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors ${on ? 'bg-sol text-ink' : 'bg-cotton text-ink'}`}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={on ? 'on' : 'off'}
                            className="grid place-items-center"
                            initial={{ scale: 0.3, rotate: -120, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0.3, rotate: 90, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 520, damping: 26 }}
                          >
                            {on ? <Check className="size-5" aria-hidden /> : <Icon className="size-5" aria-hidden />}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <span>
                        <span className="block text-[1.05rem] font-semibold leading-snug">{it.label}</span>
                        <span className={`mt-0.5 block text-[0.95rem] leading-snug ${on ? 'text-cotton/70' : 'text-ink-soft'}`}>{it.text}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="¿Quién cumple?" hint="(opcional)">
                <input type="text" value={kid} onChange={(e) => setKid(e.target.value)} placeholder="Nombre" className={input} />
              </Field>
              <Field label="¿Cuántos cumple?" hint="(opcional)">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={input}
                />
              </Field>
              <Field label="Temática" hint="(opcional)">
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Fútbol, dinosaurios, el espacio…"
                  className={input}
                />
              </Field>
              <Field label="Fecha del cumple" hint="(opcional)">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${input} min-h-[3.4rem]`} />
              </Field>
              {souvenirs ? (
                <Field label="¿Cuántos souvenirs?" hint="(aproximado)">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={input}
                  />
                </Field>
              ) : null}
            </div>

            <div className="mt-8 rounded-[1.25rem] bg-[#e4f3e0] p-4" aria-live="polite">
              <p className="text-[0.85rem] font-semibold text-ink/60">Vista previa del mensaje</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed whitespace-pre-line">{message}</p>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-fucsia px-6 text-[1.1rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-cotton active:scale-[0.98] sm:w-auto"
            >
              <WhatsAppIcon className="size-6" />
              Armar mi cumple por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
