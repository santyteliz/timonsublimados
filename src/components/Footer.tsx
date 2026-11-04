import { NAV, SITE, waLink } from '../data/site'
import { SERVICES } from '../data/services'
import { Logo } from './brand/Logo'
import { InstagramIcon, WhatsAppIcon } from './brand/SocialIcons'
import { MapPin } from 'lucide-react'

const YEAR = new Date().getFullYear()

export function Footer() {
  const year = YEAR
  return (
    <footer className="on-dark bg-ink pt-20 pb-28 text-cotton md:pb-12">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo title="Timón Sublimados" className="h-auto w-full max-w-[22rem]" />
            <p className="display-soft mt-8 text-[clamp(2rem,4vw,3rem)] text-sol">Lo pedís, lo tenés.</p>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-semibold text-cotton/55">Navegación</p>
              <ul className="mt-4 space-y-1">
                {[{ href: '#inicio', label: 'Inicio' }, ...NAV].map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="inline-block py-1.5 hover:text-sol">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-cotton/55">Servicios</p>
              <ul className="mt-4 space-y-1">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={`#servicio-${s.id}`} className="inline-block py-1.5 hover:text-sol">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-semibold text-cotton/55">Contacto</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-1 hover:text-sol">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-1 hover:text-sol">
                    <InstagramIcon className="size-5 shrink-0" />
                    {SITE.instagramHandle}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 py-1">
                  <MapPin className="size-5 shrink-0" aria-hidden />
                  {SITE.city}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cotton/15 pt-6 text-[0.92rem] text-cotton/55 sm:flex-row sm:justify-between">
          <p>© {year} Timón Sublimados</p>
          <p>Sublimados, estampados, ploteos, personalizados, diseño y confección en Miramar</p>
        </div>
      </div>
    </footer>
  )
}
