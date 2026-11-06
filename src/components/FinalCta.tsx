import { SITE, WA_MESSAGES, waLink } from '../data/site'
import { Wave } from './brand/Logo'
import { InstagramIcon, WhatsAppIcon } from './brand/SocialIcons'
import { Reveal, Rise } from './ui/Reveal'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-mar text-cotton">
      <Wave
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-[22%] w-[85vw] max-w-[60rem] -translate-y-1/2 text-cotton/[0.09] md:-right-[8%] md:w-[52vw]"
      />
      <div className="relative mx-auto max-w-[88rem] px-4 py-20 sm:px-6 sm:py-24 md:py-36 lg:px-10">
        <Reveal>
          <h2 id="cta-title" className="display max-w-[11ch] text-[clamp(3.6rem,11vw,10rem)]">
            <Rise>Tu próximo proyecto empieza acá.</Rise>
          </h2>
          <p className="mt-8 max-w-[30rem] text-[1.2rem] leading-relaxed text-cotton/80">
            Escribinos con lo que tengas en mente. Te respondemos por WhatsApp con opciones para hacerlo.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waLink(WA_MESSAGES.presupuesto)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-15 items-center justify-center gap-3 rounded-full bg-cotton px-8 text-[1.15rem] font-semibold text-ink transition-colors hover:bg-sol active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-6" />
              Hablemos por WhatsApp
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-15 items-center justify-center gap-3 rounded-full px-8 text-[1.15rem] font-semibold shadow-[inset_0_0_0_2px_var(--color-cotton)] transition-colors hover:bg-cotton hover:text-ink"
            >
              <InstagramIcon className="size-6" />
              Seguinos en Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
