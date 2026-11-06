import { useId, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { waLink } from '../data/site'
import { WhatsAppIcon } from './brand/SocialIcons'
import { Reveal } from './ui/Reveal'

const PRODUCTS = ['Ropa deportiva', 'Uniformes para mi equipo', 'Remeras o buzos', 'Gorras', 'Productos en 3D', 'Ploteo o cartelería', 'Otra cosa']
const QUANTITIES = ['Una sola', 'Entre 2 y 10', 'Entre 11 y 50', 'Más de 50']
const DESIGN = ['Ya tengo el diseño', 'Tengo una idea o referencia', 'Necesito ayuda con el diseño']

const STEPS = [
  { title: 'Contanos tu idea', text: 'Por WhatsApp, con una foto, un dibujo, un logo o una referencia que te guste.' },
  { title: 'Lo definimos juntos', text: 'Producto, técnica, colores, talles y cantidad.' },
  { title: 'Lo hacemos en el taller', text: 'Diseño, impresión, plancha, costura e impresión 3D, todo acá.' },
  { title: 'Lo pedís, lo tenés', text: 'Coordinamos por WhatsApp para que lo retires en Miramar.' },
]

function Choice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const name = useId()
  return (
    <fieldset>
      <legend className="mb-3 text-[1.02rem] font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o
          return (
            <label
              key={o}
              className={`relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-[0.98rem] font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-mar ${
                on ? 'bg-ink text-cotton' : 'bg-mist text-ink hover:bg-ink/15'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o}
                checked={on}
                onChange={() => onChange(o)}
                onClick={() => on && onChange('')}
                className="sr-only"
              />
              {on ? <Check className="-ml-1 size-4" aria-hidden /> : null}
              {o}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
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

export function Customize() {
  const [product, setProduct] = useState('')
  const [qty, setQty] = useState('')
  const [design, setDesign] = useState('')
  const [details, setDetails] = useState('')
  const [name, setName] = useState('')

  const message = useMemo(() => {
    const lines = [`¡Hola! ${name.trim() ? `Soy ${name.trim()}. ` : ''}Estuve viendo sus trabajos y quería consultar por un producto personalizado.`]
    if (product) lines.push(`Quiero hacer: ${product.toLowerCase()}.`)
    if (qty) lines.push(`Cantidad: ${qty.toLowerCase()}.`)
    if (design) lines.push(`${design}.`)
    if (details.trim()) lines.push(details.trim())
    return lines.join('\n')
  }, [product, qty, design, details, name])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="personaliza" aria-labelledby="personaliza-title" className="on-dark bg-ink py-24 text-cotton md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="personaliza-title" className="display text-[clamp(3rem,7.4vw,6rem)]">
              ¿Lo imaginaste? Podemos hacerlo realidad.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.15rem] leading-relaxed text-cotton/75 text-pretty">
              Traé una idea, un diseño o una foto de algo que viste. Armamos tu consulta acá y te llega lista a
              WhatsApp, donde también podés mandarnos imágenes.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-cotton/15">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5 bg-ink p-5 sm:p-6">
                <span
                  className="display grid size-12 shrink-0 place-items-center rounded-full bg-cotton/10 text-[1.6rem] text-sol tabular-nums"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-[1.2rem] font-semibold">{s.title}</p>
                  <p className="mt-1 text-cotton/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="lg:col-span-7 lg:pl-6" delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-[2rem] bg-cotton p-5 text-ink sm:p-8 lg:p-10"
            aria-label="Armá tu consulta para WhatsApp"
          >
            <div className="grid gap-8">
              <Choice legend="¿Qué querés hacer?" options={PRODUCTS} value={product} onChange={setProduct} />
              <Choice legend="¿Cuántas unidades?" options={QUANTITIES} value={qty} onChange={setQty} />
              <Choice legend="¿Cómo está el diseño?" options={DESIGN} value={design} onChange={setDesign} />
              <Field label="Contanos un poco más" hint="(opcional)">
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Colores, talles, para cuándo lo necesitás, para qué es…"
                  className={`${input} resize-y`}
                />
              </Field>
              <Field label="Tu nombre" hint="(opcional)">
                <input
                  type="text"
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={input}
                />
              </Field>
            </div>

            <div className="mt-8 rounded-[1.25rem] bg-[#e4f3e0] p-4" aria-live="polite">
              <p className="text-[0.85rem] font-semibold text-ink/60">Vista previa del mensaje</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed whitespace-pre-line">{message}</p>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-mar px-6 text-[1.1rem] font-semibold text-cotton transition-colors hover:bg-mar-deep active:scale-[0.98] sm:w-auto"
            >
              <WhatsAppIcon className="size-6" />
              Pedir presupuesto por WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
