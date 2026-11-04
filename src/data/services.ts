import type { Work } from './works'

export type Service = {
  id: string
  name: string
  /** Frase corta que aparece al lado del nombre en el índice */
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
    id: 'sublimacion',
    name: 'Sublimación',
    hook: 'Color que no se va',
    body:
      'Imprimimos tu diseño en papel de sublimación y lo pasamos con la plancha. La tinta queda dentro de la tela o de la pieza, por eso los colores salen vivos y aguantan el uso.',
    items: ['Tazas y jarros', 'Mates y botellas', 'Mouse pads', 'Fundas de carry on', 'Almohadones', 'Llaveros', 'Ropa deportiva'],
    tone: 'mar',
    photo: 'automates-tropicales',
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
    items: ['Remeras', 'Buzos y canguros', 'Bolsas', 'Gorras', 'Ropa de trabajo', 'Uniformes'],
    tone: 'sol',
    photo: 'remeras-johnnys',
    video: {
      src: '/media/proceso-dtf.mp4',
      poster: '/media/proceso-dtf.jpg',
      label: 'Video: estampado DTF sobre una remera negra',
    },
    waMessage: '¡Hola! Quería consultar por estampado de remeras o buzos.',
  },
  {
    id: 'ploteos',
    name: 'Ploteos',
    hook: 'Tu marca, a la vista',
    body:
      'Vestimos locales y eventos: vidrieras ploteadas, carteles de lona, fly banners e identificación para que tu negocio se vea desde la vereda.',
    items: ['Vidrieras', 'Carteles de lona', 'Fly banners', 'Identificaciones', 'Vinilo de corte'],
    tone: 'menta',
    photo: 'fly-banner-veterinaria',
    waMessage: '¡Hola! Quería consultar por ploteo y cartelería para mi local.',
  },
  {
    id: 'personalizacion',
    name: 'Personalización',
    hook: 'Con nombre y apellido',
    body:
      'Regalos de cumpleaños, el Día de la Madre, egresados, la vuelta al cole o tu mascota. Hacemos piezas únicas con el nombre, la foto o el detalle que lo vuelve tuyo.',
    items: ['Etiquetas para ropa', 'Mochilas de tela', 'Chapitas para mascotas', 'Kits materos', 'Regalos de cumpleaños'],
    tone: 'fucsia',
    photo: 'chapitas-mascotas',
    waMessage: '¡Hola! Quería hacer un regalo personalizado.',
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
    id: 'confeccion',
    name: 'Corte y confección',
    hook: 'Cosido en el taller',
    body:
      'No solo estampamos: también cortamos y cosemos. Nuestras mallas, tops y cuellitos se estampan y se arman acá, y podemos hacer tu modelo personalizado.',
    items: ['Tops deportivos', 'Mallas', 'Cuellitos y manguitas', 'Bikers y polainas', 'Cinturones de hidratación', 'Delantales'],
    tone: 'mist',
    photo: 'top-manguitas',
    waMessage: '¡Hola! Quería consultar por confección de indumentaria.',
  },
]

/** Lo que más se pide, para la lista tipográfica. */
export const PRODUCTS: { name: string; photo?: Work['slug'] }[] = [
  { name: 'Remeras', photo: 'remera-cacho' },
  { name: 'Buzos', photo: 'buzo-cacho' },
  { name: 'Gorras', photo: 'gorras-mates-gold' },
  { name: 'Tops', photo: 'tops-deportivos' },
  { name: 'Mallas', photo: 'malla-tropical' },
  { name: 'Cuellitos', photo: 'cuellitos-surf' },
  { name: 'Manguitas', photo: 'top-manguitas' },
  { name: 'Tazas', photo: 'tazas-beach-house' },
  { name: 'Mates', photo: 'mates-tropicales' },
  { name: 'Jarros térmicos', photo: 'tazas-rugby' },
  { name: 'Automates', photo: 'automates-tropicales' },
  { name: 'Llaveros', photo: 'llaveros-banderas' },
  { name: 'Fundas de carry on', photo: 'funda-carry-on' },
  { name: 'Mouse pads' },
  { name: 'Bolsas', photo: 'bolsas-magic-wash' },
  { name: 'Delantales', photo: 'delantal-tropical' },
  { name: 'Almohadillas de semillas', photo: 'almohadillas-semillas' },
  { name: 'Colchonetas para mascotas', photo: 'colchonetas-mascotas' },
  { name: 'Chapitas', photo: 'chapitas-mascotas' },
  { name: 'Cinturones de hidratación', photo: 'cinturon-hidratacion' },
  { name: 'Fly banners', photo: 'fly-banner-veterinaria' },
  { name: 'Uniformes', photo: 'remeras-veterinaria' },
]

/** Marcas, clubes y eventos que Timón etiquetó o agradeció públicamente en Instagram. */
export const CLIENTS = [
  'Ritmos en Acción',
  'Balneario Playa Beira',
  'Long Beach Miramar',
  'Balneario Cacho',
  'Miramar III',
  'Miramar Rugby Club',
  'Veterinaria Pehuén',
  'Vamos Bien Marketing',
  'The Crow Surf Shop',
  'Mates Gold',
  'Signal',
  'Dicioto Pizzas',
  'Johnny’s',
  'Menéndez Pinturería',
  'Rallycross Miramar',
  'Omega Entrenamiento',
  'Magic Wash',
  'Colegio San Andrés',
]
