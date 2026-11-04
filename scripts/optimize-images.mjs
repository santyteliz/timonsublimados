// Genera versiones WebP optimizadas de las fotos seleccionadas de Instagram.
// Uso: npm run images
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'

const SRC = 'assets-source/instagram/seleccion'
const OUT = 'public/img/works'
const WIDTHS = [480, 960, 1440]

mkdirSync(OUT, { recursive: true })
const meta = {}

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg'))) {
  const slug = basename(file, '.jpg')
  const input = sharp(join(SRC, file))
  const { width, height } = await input.metadata()
  meta[slug] = { w: width, h: height }
  for (const w of WIDTHS) {
    if (w > width && w !== WIDTHS[0]) continue
    await sharp(join(SRC, file))
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(join(OUT, `${slug}-${w}.webp`))
  }
  // Color dominante para el placeholder mientras carga.
  const { dominant } = await sharp(join(SRC, file)).stats()
  meta[slug].color = `rgb(${dominant.r} ${dominant.g} ${dominant.b})`
}

writeFileSync('src/data/image-meta.json', JSON.stringify(meta, null, 2))
console.log(`Optimizadas ${Object.keys(meta).length} imágenes en ${OUT}`)
