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
    waMessage: '¡Hola! Quería consultar por ropa deportiva.',
  },
  {
    id: 'sublimacion',
    name: 'Sublimación',
    hook: 'Color que no se va',
    body:
      'Imprimimos tu diseño en papel de sublimación y lo pasamos con la plancha. La tinta queda dentro de la tela, por eso los colores salen vivos y aguantan el entrenamiento y los lavados.',
    items: ['Ropa deportiva', 'Cintas de medallas', 'Uniformes', 'Gorras', 'Tazas', 'Banderas'],
    tone: 'sol',
    photo: 'tops-planos',
    video: {
      src: '/media/proceso-sublimacion.mp4',
      poster: '/media/proceso-sublimacion.jpg',
      label: 'Video: estampas tropicales saliendo de la plancha de sublimación',
    },
    waMessage: '¡Hola! Quería consultar por un trabajo de sublimación.',
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
    id: 'impresion-3d',
    name: 'Impresión 3D',
    hook: 'Nuevo en el taller',
    body:
      'Diseñamos e imprimimos piezas en 3D. Empezamos por lo que nos faltaba para correr: secadores de soft, sujeta dorsales y pastilleros. Si tenés otra idea, la hacemos a tu medida.',
    items: ['Secadores de soft', 'Sujeta dorsales', 'Pastilleros', 'Piezas a medida'],
    tone: 'fucsia',
    photo: 'secador-soft-3d',
    waMessage: '¡Hola! Quería consultar por un producto impreso en 3D.',
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
  {
    id: 'ploteos',
    name: 'Ploteos',
    hook: 'Tu marca, a la vista',
    body:
      'Vestimos locales y eventos: vidrieras ploteadas, banderas, carteles de lona e identificación para que tu negocio se vea desde la vereda.',
    items: ['Vidrieras', 'Banderas', 'Carteles de lona', 'Identificaciones', 'Vinilo de corte'],
    tone: 'mist',
    photo: 'bandera-farmacia-acha',
    waMessage: '¡Hola! Quería consultar por ploteo y cartelería para mi local.',
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
  { name: 'Uniformes de equipo', photo: 'conjunto-omega' },
  { name: 'Buzos', photo: 'buzo-urban' },
  { name: 'Remeras', photo: 'remera-la-astral' },
  { name: 'Gorras', photo: 'gorra-playa-sublimada' },
  { name: 'Ropa de trabajo', photo: 'remera-kinesiologia' },
  { name: 'Tazas', photo: 'tazas-surf-trips' },
  { name: 'Fundas de carry on', photo: 'funda-carry-on' },
  { name: 'Bolsas', photo: 'bolsa-flipper' },
  { name: 'Banderas', photo: 'bandera-proservice' },
  { name: 'Secadores de soft', photo: 'secador-soft-3d' },
  { name: 'Sujeta dorsales' },
  { name: 'Pastilleros' },
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
  'Farmacia Acha',
  'La Astral Pizzería',
  'Dínamo Producciones',
  'Popeye',
  'Fortia',
  'Vamos Bien Marketing',
  'Mates Gold',
  'Veterinaria Pehuén',
  'Rescate Fauna Marina Miramar',
]
