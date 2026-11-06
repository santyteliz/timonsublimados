export const SITE = {
  name: 'Timón Sublimados',
  slogan: 'Lo pedís, lo tenés',
  city: 'Miramar, Buenos Aires',
  phoneDisplay: '2291 45-0621',
  phoneIntl: '542291450621',
  instagramHandle: '@timonsublimados',
  instagramUrl: 'https://www.instagram.com/timonsublimados/',
} as const

export const WA_MESSAGES = {
  general: '¡Hola! Estuve viendo sus trabajos y quería consultar por un producto personalizado.',
  presupuesto: '¡Hola! Tengo un proyecto en mente y quería pedirles un presupuesto.',
} as const

/** Arma un enlace de WhatsApp con el mensaje ya escrito. */
export function waLink(message: string = WA_MESSAGES.general) {
  return `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(message)}`
}

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#cumple', label: 'Cumples' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#personaliza', label: 'Personalizá' },
  { href: '#taller', label: 'El taller' },
] as const
