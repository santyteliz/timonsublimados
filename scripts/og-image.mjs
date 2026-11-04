// Genera public/og-image.jpg (1200x630) para compartir el link en redes y WhatsApp.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const logo = readFileSync('public/logo-timon.svg', 'utf8').replace('fill="#2c2e35"', 'fill="#F6F6F3"')
const photo = await sharp('assets-source/instagram/seleccion/tops-deportivos.jpg').resize(470, 470).toBuffer()
const mask = Buffer.from('<svg width="470" height="470"><circle cx="235" cy="235" r="235"/></svg>')
const round = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
const ring = Buffer.from('<svg width="510" height="510"><circle cx="255" cy="255" r="249" fill="none" stroke="#F6F6F3" stroke-width="12"/></svg>')
const logoPng = await sharp(Buffer.from(logo), { density: 300 }).resize({ width: 520 }).png().toBuffer()
const text = Buffer.from(`<svg width="640" height="120"><text x="0" y="80" font-family="Arial Black, Arial" font-weight="900" font-size="52" fill="#FFC21A">Lo pedís, lo tenés.</text></svg>`)

await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#1E44FF' } })
  .composite([
    { input: logoPng, left: 70, top: 150 },
    { input: text, left: 70, top: 390 },
    { input: ring, left: 660, top: 60 },
    { input: round, left: 680, top: 80 },
  ])
  .jpeg({ quality: 84 })
  .toFile('public/og-image.jpg')
console.log('og-image.jpg listo')
