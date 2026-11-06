import meta from './image-meta.json'

/**
 * Trabajos reales de Timón Sublimados.
 * Los originales están en assets-source/instagram/seleccion (fotos de Instagram
 * y las que mandó la clienta en noviembre de 2026, ver assets-source/contenido-nuevo.json).
 * Para sumar fotos: copiar el .jpg ahí, agregarlo acá y correr `npm run images`.
 */

export type Category = 'deportivo' | 'equipos' | 'remeras' | 'gorras' | 'objetos' | 'locales'

export const CATEGORIES: { id: Category | 'todo'; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'deportivo', label: 'Deportivo' },
  { id: 'equipos', label: 'Gimnasios y equipos' },
  { id: 'remeras', label: 'Remeras y buzos' },
  { id: 'gorras', label: 'Gorras' },
  { id: 'objetos', label: 'Tazas, 3D y más' },
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
  // Lo primero que se ve: la línea deportiva actual.
  { slug: 'top-tropical-frente', title: 'Tops deportivos', detail: 'Estampa tropical, diseño y confección propia', category: 'deportivo', shape: 'big', focus: '50% 30%' },
  { slug: 'buzo-urban', title: 'Buzos para Urban Team Training', detail: 'Equipo de running', category: 'equipos', shape: 'tall' },
  { slug: 'conjunto-omega', title: 'Top y biker para Omega', detail: 'Conjunto con el logo del gimnasio', category: 'equipos', shape: 'tall' },
  { slug: 'kit-running-argentina', title: 'Kit de carrera', detail: 'Remera, manguitas y cinturón con la misma estampa', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'tops-planos', title: 'Tops recién cosidos', detail: 'Estampados y armados en el taller', category: 'deportivo', shape: 'square', focus: '50% 30%' },
  { slug: 'uniforme-parroquial', title: 'Uniforme de básquet', detail: 'Musculosa y short para Parroquial', category: 'equipos', shape: 'tall', focus: '50% 35%' },
  { slug: 'remera-cvd', title: 'Remeras para CVD Fitness Club', detail: 'Logo en dos colores', category: 'equipos', shape: 'square', focus: '50% 45%' },
  { slug: 'top-tropical-espalda', title: 'Espalda nadadora', detail: 'El mismo top, visto de atrás', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'remeras-running-tandil', title: 'Remeras para Otta Team', detail: '«Expectativa» y «realidad» para una carrera de trail en Tandil', category: 'equipos', shape: 'wide' },
  { slug: 'conjunto-maniqui', title: 'Top, cuellito y manguitas', detail: 'Conjunto para entrenar al aire libre', category: 'deportivo', shape: 'tall', focus: '50% 35%' },
  { slug: 'remera-marea-fit', title: 'Remeras para Marea Fit', detail: 'Logo estampado sobre negro', category: 'equipos', shape: 'square', focus: '50% 45%' },
  { slug: 'cintas-medallas', title: 'Cintas de medallas', detail: 'Para la Copa Costa Atlántica', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'tincho-trainer', title: 'Remera y gorra para un personal trainer', detail: 'La marca personal de Tincho', category: 'equipos', shape: 'square', focus: '50% 50%' },
  { slug: 'top-hojas', title: 'Top con hojas', detail: 'Estampa propia a todo color', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'running-15k', title: 'Listos para correr', detail: 'El equipo de Timón en los 15k de Mar del Plata', category: 'deportivo', shape: 'wide', focus: '45% 50%' },
  { slug: 'buzo-omega', title: 'Buzos para Omega Entrenamiento', detail: 'Estampa amarilla sobre negro', category: 'equipos', shape: 'square', focus: '50% 40%' },
  { slug: 'conjunto-negro', title: 'Top y biker negros', detail: 'Confección propia', category: 'deportivo', shape: 'tall', focus: '50% 30%' },
  { slug: 'remera-keep-moving', title: 'Remeras para Keep Moving', detail: 'Dos logos para la marca', category: 'equipos', shape: 'square', focus: '50% 30%' },
  { slug: 'top-tropical-azul', title: 'Top hojas azules', detail: 'Otra estampa de la temporada', category: 'deportivo', shape: 'tall', focus: '50% 35%' },
  { slug: 'remera-kinesiologia', title: 'Remeras para Kinesiología Miramar', detail: 'Ropa de trabajo con la marca', category: 'equipos', shape: 'square', focus: '65% 30%' },
  { slug: 'secador-soft-3d', title: 'Secador de soft', detail: 'Impreso en 3D en el taller', category: 'objetos', shape: 'tall', focus: '50% 60%' },
  { slug: 'pastillero-3d', title: 'Pastillero para correr', detail: 'Impreso en 3D, con compartimentos y tapa a rosca', category: 'objetos', shape: 'square', focus: '45% 45%' },
  { slug: 'cuellitos-surf', title: 'Cuellitos para The Crow Surf Shop', detail: 'Temporada 2025', category: 'deportivo', shape: 'tall', focus: '50% 40%' },
  { slug: 'remera-estudio-danza', title: 'Remeras para un estudio de danza', detail: 'Estudio homologado por la Fundación Julio Bocca', category: 'equipos', shape: 'tall', focus: '50% 35%' },
  { slug: 'tops-deportivos', title: 'Tops con estampa propia', detail: 'Diseño y confección propia', category: 'deportivo', shape: 'wide', focus: '50% 40%' },
  { slug: 'cinturon-hidratacion', title: 'Cinturón de hidratación', detail: 'En los 21k de Mar del Plata', category: 'deportivo', shape: 'square', focus: '50% 40%' },
  { slug: 'equipo-ritmos', title: 'Ritmos en Acción', detail: 'Indumentaria para la escuela de danza', category: 'equipos', shape: 'wide', focus: '50% 40%' },
  { slug: 'top-manguitas', title: 'Top y manguitas', detail: 'Para entrenar en la costa', category: 'deportivo', shape: 'tall', focus: '50% 35%' },
  { slug: 'malla-tropical', title: 'Mallas', detail: 'Estampadas y armadas por nosotros', category: 'deportivo', shape: 'square', focus: '50% 40%' },
  { slug: 'top-hockey', title: 'Top en un Nacional de Hockey', detail: 'Estampa propia', category: 'deportivo', shape: 'wide', focus: '50% 30%' },
  { slug: 'tops-planos-2', title: 'Tops en producción', detail: 'Dos estampas, mismo molde', category: 'deportivo', shape: 'square', focus: '50% 35%' },
  { slug: 'cuellitos-estampas', title: 'Cuellitos', detail: 'Diseños propios para el invierno', category: 'deportivo', shape: 'square' },
  { slug: 'remera-omega-fucsia', title: 'Remera fucsia para Omega', detail: 'Laureles estampados en el pecho', category: 'equipos', shape: 'square', focus: '50% 60%' },

  // Remeras, buzos y marcas
  { slug: 'remeras-fortia', title: 'Remeras para Fortia', detail: 'Logo chico adelante, grande atrás', category: 'remeras', shape: 'wide' },
  { slug: 'remera-la-astral', title: 'Remeras para La Astral Pizzería', detail: 'Ilustración a todo color', category: 'remeras', shape: 'tall', focus: '50% 40%' },
  { slug: 'remeras-popeye', title: 'Remeras para Popeye', detail: 'Un clásico de Miramar', category: 'remeras', shape: 'tall', focus: '50% 50%' },
  { slug: 'remera-tour-typical', title: 'Remera Tour Typical', detail: 'Estampa blanca sobre negro', category: 'remeras', shape: 'square', focus: '50% 45%' },
  { slug: 'remera-cacho', title: 'Remeras para Balneario Cacho', detail: 'El logo del balneario sobre algodón de color', category: 'remeras', shape: 'square' },
  { slug: 'remera-dinamo', title: 'Remeras para Dínamo Producciones', detail: 'Logo en el pecho', category: 'remeras', shape: 'tall', focus: '50% 40%' },
  { slug: 'buzo-chocolate', title: 'Buzo para Chocolate Helados', detail: 'Helado artesanal', category: 'remeras', shape: 'square', focus: '50% 40%' },
  { slug: 'remera-fauna-marina', title: 'Remeras para Rescate Fauna Marina', detail: 'Miramar', category: 'remeras', shape: 'square', focus: '50% 40%' },
  { slug: 'remeras-vaca-loca', title: 'Remeras para La Vaca Loca', detail: 'Cubanitos', category: 'remeras', shape: 'tall', focus: '50% 30%' },
  { slug: 'buzo-vamos-bien', title: 'Buzo para Vamos Bien', detail: 'Marketing digital', category: 'remeras', shape: 'square' },
  { slug: 'remera-entre-escolleras', title: 'Remeras para Entre Escolleras', detail: 'Balneario de Miramar', category: 'remeras', shape: 'tall', focus: '50% 45%' },
  { slug: 'remera-milos', title: 'Remera para Milo’s', detail: 'Logo a todo color', category: 'remeras', shape: 'square', focus: '50% 40%' },
  { slug: 'remeras-johnnys', title: 'Remeras para Johnny’s', detail: 'Estampa amarilla sobre remera negra', category: 'remeras', shape: 'wide' },
  { slug: 'buzo-cacho', title: 'Buzo con capucha', detail: 'Logo estampado en la espalda', category: 'remeras', shape: 'square' },
  { slug: 'remera-enjoy-the-ride', title: 'Remera para D-Burger', detail: 'Estampa a un color', category: 'remeras', shape: 'tall', focus: '50% 40%' },
  { slug: 'remera-tricolor', title: 'Remeras para Tricolor en Acción', detail: 'Remeras para la colonia de verano', category: 'remeras', shape: 'tall', focus: '50% 35%' },
  { slug: 'buzo-argentina', title: 'Buzo y gorra', detail: 'Edición Mundial', category: 'remeras', shape: 'square', focus: '50% 40%' },

  // Gorras
  { slug: 'gorra-playa-sublimada', title: 'Gorra con la playa', detail: 'Paisaje sublimado en el frente', category: 'gorras', shape: 'tall', focus: '50% 30%' },
  { slug: 'gorras-mates-gold', title: 'Gorras para Mates Gold', detail: 'Gorras trucker con el logo de la marca', category: 'gorras', shape: 'square' },
  { slug: 'gorra-playa-beira', title: 'Gorras para Playa Beira', detail: 'Balneario de Miramar', category: 'gorras', shape: 'square' },
  { slug: 'gorras-signal', title: 'Gorras para Signal', detail: 'Monitoreo de alarmas', category: 'gorras', shape: 'tall', focus: '50% 30%' },
  { slug: 'gorras-long-beach', title: 'Gorras para Long Beach', detail: 'Balneario de Miramar', category: 'gorras', shape: 'square' },

  // Tazas, 3D y más
  { slug: 'tazas-surf-trips', title: 'Tazas para Surf Trips', detail: '«Hasta la última ola»', category: 'objetos', shape: 'tall', focus: '50% 45%' },
  { slug: 'tazas-storani', title: 'Tazas para Storani Techos', detail: 'Diseño envolvente', category: 'objetos', shape: 'square', focus: '50% 50%' },
  { slug: 'tazas-beach-house', title: 'Tazas para AP Beach House', detail: 'Tazas personalizadas con el logo', category: 'objetos', shape: 'wide' },
  { slug: 'funda-carry-on', title: 'Funda de carry on', detail: 'Para Vamos Bien Marketing Digital', category: 'objetos', shape: 'tall', focus: '50% 70%' },

  // Locales y marcas
  { slug: 'bandera-farmacia-acha', title: 'Bandera para Farmacia Acha', detail: 'Impresa a todo color con los datos del local', category: 'locales', shape: 'tall', focus: '50% 25%' },
  { slug: 'bandera-proservice', title: 'Bandera para Proservice', detail: 'Logo a todo color', category: 'locales', shape: 'square', focus: '50% 25%' },
  { slug: 'cintas-flipper', title: 'Cintas para Balneario Flipper', detail: 'Con el logo repetido', category: 'locales', shape: 'tall', focus: '50% 45%' },
  { slug: 'bolsa-flipper', title: 'Bolsa para Balneario Flipper', detail: 'Logo sobre tela natural', category: 'locales', shape: 'square', focus: '50% 45%' },
  { slug: 'remeras-veterinaria', title: 'Remeras para Veterinaria Pehuén', detail: 'Ropa de trabajo con la marca del local', category: 'locales', shape: 'wide', focus: '50% 35%' },
  { slug: 'bolsas-magic-wash', title: 'Bolsas para Magic Wash', detail: 'Estampadas en serigrafía', category: 'locales', shape: 'square' },
  { slug: 'bolsas-mates-gold', title: 'Bolsas para Mates Gold', detail: 'Packaging con logo y contacto', category: 'locales', shape: 'square' },
]

const SIZES = [480, 960, 1440] as const

/** Anchos que existen para una foto (ver scripts/optimize-images.mjs). */
function available(slug: Work['slug']) {
  const max = meta[slug].w
  return SIZES.filter((_, i) => i === 0 || max > SIZES[i - 1])
}

export function img(slug: Work['slug'], width: 480 | 960 | 1440 = 960) {
  const list = available(slug)
  const w = [...list].reverse().find((s) => s <= width) ?? list[0]
  return `/img/works/${slug}-${w}.webp`
}

export function srcSet(slug: Work['slug']) {
  const max = meta[slug].w
  return available(slug)
    .map((w) => `/img/works/${slug}-${w}.webp ${Math.min(w, max)}w`)
    .join(', ')
}

export function imgMeta(slug: Work['slug']) {
  return meta[slug]
}
