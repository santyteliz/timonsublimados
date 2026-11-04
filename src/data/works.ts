import meta from './image-meta.json'

/**
 * Trabajos reales publicados en el Instagram de Timón Sublimados.
 * Los archivos originales están en assets-source/instagram/seleccion.
 * Para sumar fotos: copiar el .jpg ahí, agregarlo acá y correr `npm run images`.
 */

export type Category = 'remeras' | 'deportivo' | 'gorras' | 'objetos' | 'hogar' | 'locales'

export const CATEGORIES: { id: Category | 'todo'; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'remeras', label: 'Remeras y buzos' },
  { id: 'deportivo', label: 'Deportivo' },
  { id: 'gorras', label: 'Gorras' },
  { id: 'objetos', label: 'Tazas, mates y más' },
  { id: 'hogar', label: 'Hogar y mascotas' },
  { id: 'locales', label: 'Locales y marcas' },
]

/** Formato del recorte en la grilla. */
export type Shape = 'square' | 'tall' | 'wide' | 'big'

export type Work = {
  slug: keyof typeof meta
  title: string
  detail: string
  category: Category
  shape: Shape
  /** Posición del recorte (object-position) */
  focus?: string
}

export const WORKS: Work[] = [
  { slug: 'tops-deportivos', title: 'Tops deportivos', detail: 'Diseño y confección propia', category: 'deportivo', shape: 'big', focus: '50% 40%' },
  { slug: 'remera-cacho', title: 'Remeras para Balneario Cacho', detail: 'El logo del balneario sobre algodón de color', category: 'remeras', shape: 'square' },
  { slug: 'automates-tropicales', title: 'Automates', detail: 'Estampa tropical a todo color', category: 'objetos', shape: 'tall', focus: '50% 50%' },
  { slug: 'gorras-mates-gold', title: 'Gorras para Mates Gold', detail: 'Gorras trucker con el logo de la marca', category: 'gorras', shape: 'square' },
  { slug: 'top-manguitas', title: 'Top y manguitas', detail: 'Conjunto para entrenar al aire libre', category: 'deportivo', shape: 'tall', focus: '50% 35%' },
  { slug: 'remeras-johnnys', title: 'Remeras para Johnny’s', detail: 'Estampa amarilla sobre remera negra', category: 'remeras', shape: 'wide' },
  { slug: 'colchoneta-ave-paraiso', title: 'Colchoneta con ave del paraíso', detail: 'Diseño exclusivo sublimado', category: 'hogar', shape: 'wide' },
  { slug: 'funda-carry-on', title: 'Funda de carry on', detail: 'Para Vamos Bien Marketing Digital', category: 'objetos', shape: 'tall', focus: '50% 70%' },
  { slug: 'running-15k', title: 'Listos para correr', detail: 'El equipo de Timón en los 15k de Mar del Plata', category: 'deportivo', shape: 'big', focus: '45% 50%' },
  { slug: 'gorra-playa-beira', title: 'Gorras para Playa Beira', detail: 'Balneario de Miramar', category: 'gorras', shape: 'square' },
  { slug: 'mates-tropicales', title: 'Mates personalizados', detail: 'Cada uno con su estampa', category: 'objetos', shape: 'square' },
  { slug: 'fly-banner-veterinaria', title: 'Fly banner y vidriera', detail: 'Cartelería completa para Veterinaria Pehuén', category: 'locales', shape: 'tall', focus: '50% 40%' },
  { slug: 'cuellitos-estampas', title: 'Cuellitos', detail: 'Diseños propios para el invierno', category: 'deportivo', shape: 'square' },
  { slug: 'buzo-cacho', title: 'Buzo con capucha', detail: 'Logo estampado en la espalda', category: 'remeras', shape: 'square' },
  { slug: 'chapitas-mascotas', title: 'Chapitas para mascotas', detail: 'Con el nombre de cada una', category: 'hogar', shape: 'tall', focus: '50% 45%' },
  { slug: 'remera-enjoy-the-ride', title: 'Remera para D-Burger', detail: 'Estampa a un color', category: 'remeras', shape: 'tall', focus: '50% 40%' },
  { slug: 'gorras-signal', title: 'Gorras para Signal', detail: 'Monitoreo de alarmas', category: 'gorras', shape: 'tall', focus: '50% 30%' },
  { slug: 'malla-tropical', title: 'Mallas', detail: 'Estampadas y armadas por nosotros', category: 'deportivo', shape: 'square', focus: '50% 40%' },
  { slug: 'tazas-beach-house', title: 'Tazas para AP Beach House', detail: 'Tazas personalizadas con el logo', category: 'objetos', shape: 'wide' },
  { slug: 'remera-dicioto', title: 'Remeras para Dicioto Pizzas', detail: 'Uniforme del local', category: 'remeras', shape: 'square' },
  { slug: 'almohadillas-semillas', title: 'Almohadillas de semillas', detail: 'Estampas tropicales y animal print', category: 'hogar', shape: 'square' },
  { slug: 'cuellitos-surf', title: 'Cuellitos para The Crow Surf Shop', detail: 'Temporada 2025', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'bolsas-magic-wash', title: 'Bolsas para Magic Wash', detail: 'Estampadas en serigrafía', category: 'locales', shape: 'square' },
  { slug: 'kit-yerbera', title: 'Yerbera, azucarera y termo', detail: 'Kit matero personalizado', category: 'objetos', shape: 'tall', focus: '50% 60%' },
  { slug: 'remera-guardavidas', title: 'Remera de guardavidas', detail: 'Remera de algodón roja', category: 'remeras', shape: 'square' },
  { slug: 'gorras-long-beach', title: 'Gorras para Long Beach', detail: 'Balneario de Miramar', category: 'gorras', shape: 'square' },
  { slug: 'top-hockey', title: 'Top en un Nacional de Hockey', detail: 'Estampa propia', category: 'deportivo', shape: 'wide', focus: '50% 30%' },
  { slug: 'llaveros-banderas', title: 'Llaveros', detail: 'Banderas del mundo para un cumpleaños', category: 'objetos', shape: 'square' },
  { slug: 'colchonetas-mascotas', title: 'Colchonetas para mascotas', detail: 'Diseños exclusivos', category: 'hogar', shape: 'tall', focus: '50% 50%' },
  { slug: 'remeras-veterinaria', title: 'Remeras para Veterinaria Pehuén', detail: 'Ropa de trabajo con la marca del local', category: 'locales', shape: 'wide', focus: '50% 35%' },
  { slug: 'equipo-ritmos', title: 'Ritmos en Acción', detail: 'Indumentaria para la escuela de danza', category: 'remeras', shape: 'wide', focus: '50% 40%' },
  { slug: 'tazas-rugby', title: 'Tazas y jarros térmicos', detail: 'Para Miramar Rugby Club', category: 'objetos', shape: 'wide', focus: '50% 55%' },
  { slug: 'buzo-argentina', title: 'Buzo y gorra', detail: 'Edición Mundial', category: 'remeras', shape: 'square', focus: '50% 40%' },
  { slug: 'bolsas-mates-gold', title: 'Bolsas para Mates Gold', detail: 'Packaging con logo y contacto', category: 'locales', shape: 'square' },
  { slug: 'gorra-huerte-co', title: 'Gorras para Huerte-có', detail: 'Gorra y buzo con la marca', category: 'gorras', shape: 'square' },
  { slug: 'delantal-tropical', title: 'Delantal', detail: 'De jean, con bolsillo estampado', category: 'hogar', shape: 'tall', focus: '50% 60%' },
  { slug: 'remera-tricolor', title: 'Remeras para Tricolor en Acción', detail: 'Remeras para la colonia de verano', category: 'remeras', shape: 'tall', focus: '50% 35%' },
  { slug: 'cinturon-hidratacion', title: 'Cinturón de hidratación', detail: 'En los 21k de Mar del Plata', category: 'deportivo', shape: 'square', focus: '50% 40%' },
]

export function img(slug: Work['slug'], width: 480 | 960 | 1440 = 960) {
  const max = meta[slug].w
  const w = width > max && width !== 480 ? (max >= 960 ? 960 : 480) : width
  return `/img/works/${slug}-${w}.webp`
}

export function srcSet(slug: Work['slug']) {
  const max = meta[slug].w
  return ([480, 960, 1440] as const)
    .filter((w) => w === 480 || w <= max)
    .map((w) => `/img/works/${slug}-${w}.webp ${w}w`)
    .join(', ')
}

export function imgMeta(slug: Work['slug']) {
  return meta[slug]
}
