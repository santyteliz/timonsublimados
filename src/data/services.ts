import type { Work } from './works'

export type Service = {
  id: string
  name: string
  /** Frase corta que aparece arriba del nombre */
  hook: string
  body: string
  items: string[]
  /** Color de "tela" del panel */
  tone: 'mar' | 'sol' | 'fucsia' | 'menta' | 'ink' | 'mist'
  photo: Work['slug']
  /** Texto del botón de WhatsApp (si no, «Consultar por …» con el nombre) */
  cta?: string
  /** Posición del recorte de la foto (object-position) */
  focus?: string
  video?: { src: string; poster: string; label: string }
  waMessage: string
}

export const SERVICES: Service[] = [
  {
    id: 'deportivo',
    name: 'Ropa deportiva',
    hook: 'Hecha por gente que entrena',
    body:
      'Tops, bikers, mallas, cuellitos, manguitas y cinturones de hidratación, con estampas propias o con la marca de tu equipo. Los cortamos, los estampamos y los cosemos en el taller.',
    items: ['Tops y bikers', 'Mallas', 'Cuellitos y manguitas', 'Musculosas', 'Cinturones de hidratación', 'Uniformes de equipo'],
    tone: 'mar',
    photo: 'top-tropical-frente',
    video: {
      src: '/media/proceso-sublimacion.mp4',
      poster: '/media/proceso-sublimacion.jpg',
      label: 'Video: estampas tropicales saliendo de la plancha de sublimación',
    },
    waMessage: '¡Hola! Quería consultar por ropa deportiva.',
  },
  {
    id: 'personalizados',
    name: 'Personalizados',
    hook: 'Sublimados con tu nombre, tu foto o tu diseño',
    body:
      'Tazas, mates, latas, almohadones y regalos con el nombre o el diseño que elijas. Los sublimamos con la plancha: la tinta queda dentro del material y los colores salen vivos. También armamos souvenirs para cumpleaños y eventos.',
    items: ['Tazas con nombre', 'Mates', 'Latas y yerberas', 'Almohadones', 'Chapitas para mascotas', 'Souvenirs'],
    tone: 'sol',
    photo: 'tazas-nombre',
    waMessage: '¡Hola! Quería consultar por un producto personalizado.',
  },
  {
    id: 'impresion-3d',
    name: 'Impresión 3D',
    hook: 'Nuevo en el taller',
    body:
      'Diseñamos e imprimimos piezas en 3D. Empezamos por lo que nos faltaba para correr: secadores de soft, sujeta dorsales y pastilleros. Si tenés otra idea, la hacemos a tu medida.',
    items: ['Secadores de soft', 'Sujeta dorsales', 'Pastilleros', 'Piezas a medida'],
    tone: 'fucsia',
    photo: 'secador-soft-3d',
    video: {
      src: '/media/impresion-3d.mp4',
      poster: '/media/impresion-3d.jpg',
      label: 'Video: secador de soft, sujeta dorsales y pastilleros impresos en 3D',
    },
    waMessage: '¡Hola! Quería consultar por un producto impreso en 3D.',
  },
  {
    id: 'negocios',
    name: 'Para tu negocio',
    cta: 'Consultar para mi negocio',
    hook: 'Tu marca, a la vista',
    body:
      'Trabajamos mucho con locales, balnearios, gimnasios y emprendimientos de la zona. Ropa de trabajo con tu logo, tazas, bolsas y gorras con tu marca, y con el plotter de corte, vidrieras y carteles para que te vean desde la vereda.',
    items: ['Ropa de trabajo', 'Gorras con logo', 'Tazas y bolsas', 'Vidrieras', 'Carteles de lona', 'Vinilo de corte'],
    tone: 'mist',
    photo: 'plotter-de-corte',
    focus: '62% 50%',
    waMessage: '¡Hola! Tengo un negocio y quería consultar por productos con mi marca.',
  },
  {
    id: 'estampados',
    name: 'Estampados',
    hook: 'DTF, serigrafía y vinilo',
    body:
      'Elegimos la técnica según la prenda y el diseño. Con DTF estampamos algodón, jean y gabardina, en telas claras y oscuras. La serigrafía la aprendimos en casa y la seguimos haciendo a la antigua.',
    items: ['Remeras', 'Buzos y camperas', 'Ropa de equipo', 'Ropa de trabajo', 'Gorras', 'Bolsas'],
    tone: 'menta',
    photo: 'buzo-urban',
    video: {
      src: '/media/estampado-urban.mp4',
      poster: '/media/estampado-urban.jpg',
      label: 'Video: buzos estampados para Urban Team Training',
    },
    waMessage: '¡Hola! Quería consultar por estampado de remeras o buzos.',
  },
  {
    id: 'diseno',
    name: 'Diseño',
    hook: 'De la idea al archivo',
    body:
      'Si tenés el diseño, lo preparamos para producir. Si tenés una idea, una foto o una referencia, la llevamos a la compu con vos. Y también creamos estampas propias que no vas a ver en otro lado.',
    items: ['Adaptación de logos', 'Estampas exclusivas', 'Diseños para equipos', 'Ilustraciones a pedido'],
    tone: 'ink',
    photo: 'estampas-propias',
    waMessage: '¡Hola! Tengo una idea y necesito ayuda con el diseño.',
  },
]

/** Lo que sale del taller hoy, para la lista tipográfica. */
export const PRODUCTS: { name: string; photo?: Work['slug'] }[] = [
  { name: 'Tops', photo: 'top-tropical-espalda' },
  { name: 'Bikers', photo: 'conjunto-negro' },
  { name: 'Mallas', photo: 'malla-tropical' },
  { name: 'Cuellitos', photo: 'cuellitos-surf' },
  { name: 'Manguitas', photo: 'conjunto-maniqui' },
  { name: 'Musculosas', photo: 'uniforme-parroquial' },
  { name: 'Remeras de running', photo: 'remeras-running-tandil' },
  { name: 'Cinturones de hidratación', photo: 'cinturon-hidratacion' },
  { name: 'Cintas de medallas', photo: 'cintas-medallas' },
  { name: 'Secadores de soft', photo: 'secador-soft-3d' },
  { name: 'Sujeta dorsales' },
  { name: 'Pastilleros', photo: 'pastillero-3d' },
  { name: 'Tazas con nombre', photo: 'tazas-nombre' },
  { name: 'Mates', photo: 'mates-sublimados' },
  { name: 'Souvenirs', photo: 'taza-benja' },
  { name: 'Remeras de cumpleaños' },
  { name: 'Banderines' },
  { name: 'Decoración de tortas' },
  { name: 'Almohadones', photo: 'almohadones-raton-perez' },
  { name: 'Latas y yerberas', photo: 'latas-yerba-azucar' },
  { name: 'Chapitas para mascotas', photo: 'chapitas-mascotas' },
  { name: 'Uniformes de equipo', photo: 'conjunto-omega' },
  { name: 'Buzos', photo: 'buzo-urban' },
  { name: 'Remeras', photo: 'remera-la-astral' },
  { name: 'Gorras', photo: 'gorra-playa-sublimada' },
  { name: 'Ropa de trabajo', photo: 'remera-kinesiologia' },
  { name: 'Tazas', photo: 'tazas-surf-trips' },
  { name: 'Fundas de carry on', photo: 'funda-carry-on' },
  { name: 'Bolsas', photo: 'bolsa-flipper' },
]

/** Marcas, clubes y eventos que aparecen en los trabajos de Timón (Instagram y fotos de la clienta). */
export const CLIENTS = [
  'Urban Team Training',
  'Omega Entrenamiento',
  'CVD Fitness Club',
  'Marea Fit',
  'Keep Moving',
  'Otta Team',
  'Parroquial',
  'Ritmos en Acción',
  'Kinesiología Miramar',
  'Miramar Rugby Club',
  'The Crow Surf Shop',
  'Balneario Playa Beira',
  'Long Beach Miramar',
  'Entre Escolleras',
  'Balneario Flipper',
  'Balneario Cacho',
  'La Astral Pizzería',
  'Dínamo Producciones',
  'Popeye',
  'Fortia',
  'Vamos Bien Marketing',
  'Mates Gold',
  'Veterinaria Pehuén',
  'Rescate Fauna Marina Miramar',
]
