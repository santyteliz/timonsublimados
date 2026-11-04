import { CLIENTS } from '../data/services'
import { Wave } from './brand/Logo'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

const REASONS = [
  {
    title: 'Todo bajo el mismo techo',
    text: 'Diseñamos, imprimimos, estampamos y cosemos en el taller, así que seguimos tu pedido de principio a fin.',
  },
  {
    title: 'La técnica justa para cada tela',
    text: 'Sublimación, DTF, serigrafía y vinilo. Elegimos según la prenda, el diseño y la cantidad que necesitás.',
  },
  {
    title: 'Ropa deportiva hecha por gente que entrena',
    text: 'Mariela es profe de Educación Física y en el taller corremos. Los tops, cuellitos y cinturones de hidratación los usamos en nuestras propias carreras.',
  },
  {
    title: 'De una unidad a todo el equipo',
    text: 'Hacemos el regalo de cumpleaños para una sola persona y también la ropa de clubes, escuelas, balnearios y empresas.',
  },
  {
    title: 'Un taller de Miramar',
    text: 'Consultás por WhatsApp, coordinamos los detalles y retirás tu pedido en el taller.',
  },
]

export function Workshop() {
  return (
    <section id="taller" aria-labelledby="taller-title" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <figure>
              <div className="relative">
                <Photo
                  slug="historia-serigrafia"
                  alt="Foto de archivo familiar: un stand de máquinas para serigrafía en una exposición, con tres personas posando"
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="aspect-[5/4] w-full rounded-[1.75rem] sepia-[0.15]"
                  focus="30% 55%"
                />
                <span aria-hidden className="absolute -right-2 -bottom-6 grid size-[20%] place-items-center rounded-full bg-sol text-ink shadow-[0_0_0_8px_var(--color-cotton)] md:-right-5">
                  <Wave className="w-[62%]" />
                </span>
              </div>
              <figcaption className="mt-4 max-w-[28rem] text-[0.95rem] text-ink-soft">
                Archivo familiar: un stand de máquinas para serigrafía en una exposición textil.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:pt-6 lg:pl-6" delay={0.1}>
            <h2 id="taller-title" className="display text-[clamp(3rem,7.4vw,6rem)]">
              Un oficio que viene de familia
            </h2>
            <div className="mt-8 max-w-[34rem] space-y-5 text-[1.15rem] leading-relaxed text-ink-soft text-pretty">
              <p>
                Mariela, la creadora de Timón, creció entre shablones, tintas y porta gomas. Su papá arrancó con la
                serigrafía en un garage de San Martín a principios de los años 70, y los fines de semana los chicos de
                la casa ayudaban a armar herramientas en el patio.
              </p>
              <p>
                La vida la llevó por otro lado, se recibió de profe de Educación Física, y un día ese mundo la volvió
                a encontrar. Se metió de lleno en la sublimación, los colores y el diseño. Así nació Timón Sublimados.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h3 className="display text-[clamp(2.6rem,5.6vw,4.5rem)]">¿Por qué elegir Timón?</h3>
            <div className="mt-8 hidden gap-3 lg:grid lg:grid-cols-2">
              <Photo slug="taller-overlock" alt="Máquina de coser overlock en el taller" sizes="14rem" className="aspect-[3/4] w-full rounded-[1.2rem]" />
              <Photo slug="running-15k" alt="Integrantes del taller corriendo los 15k de Mar del Plata con ropa de Timón" sizes="14rem" className="mt-10 aspect-[3/4] w-full rounded-[1.2rem]" focus="60% 50%" />
            </div>
          </Reveal>
          <ul className="lg:col-span-8 lg:pl-6">
            {REASONS.map((r) => (
              <li key={r.title} className="grid gap-2 border-t-2 border-ink py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10 md:py-8">
                <h4 className="display-soft text-[clamp(1.6rem,2.8vw,2.3rem)]">{r.title}</h4>
                <p className="text-[1.08rem] leading-relaxed text-ink-soft text-pretty">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-24 md:mt-32" aria-labelledby="clientes-title">
        <p id="clientes-title" className="mx-auto max-w-[88rem] px-4 text-[1.1rem] font-semibold sm:px-6 lg:px-10">
          Marcas, clubes y eventos que trabajaron con nosotros
        </p>
        <div className="marquee mt-6 overflow-hidden border-y-2 border-ink py-5">
          <ul className="marquee-track flex w-max items-center" aria-label="Clientes">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <li
                key={`${c}-${i}`}
                aria-hidden={i >= CLIENTS.length}
                className="display-soft flex items-center text-[clamp(1.8rem,3.6vw,3rem)] whitespace-nowrap"
              >
                {c}
                <Wave className="mx-7 h-[0.6em] w-auto text-mar" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
