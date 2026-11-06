# Timón Sublimados — sitio web

Sitio de una sola página para Timón Sublimados (Miramar, Buenos Aires): ropa deportiva y uniformes, personalizados y souvenirs, todo para cumpleaños, impresión 3D, productos para negocios, estampados y diseño.

React 19 + TypeScript + Tailwind CSS 4 + Motion + Lucide. Sin backend: todas las consultas salen por WhatsApp con el mensaje ya escrito.

## Uso

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # versión de producción en dist/
npm run preview    # probar la versión de producción
```

`dist/` es estático: se puede subir tal cual a Hostinger, Netlify, Vercel o cualquier hosting.

## Estructura

```
src/
  App.tsx                 orden de las secciones
  data/
    site.ts               WhatsApp, Instagram, mensajes predefinidos y menú
    services.ts           los seis servicios, lista de productos y clientes
    works.ts              trabajos de la galería (título, detalle, categoría, formato)
    image-meta.json       generado por `npm run images`
  components/
    Header, Hero, Services, Catalog, Birthday («Armá tu cumple»), Gallery, Customize, Workshop, FinalCta, Footer, WhatsAppFab
    brand/                logo vectorial (extraído del PDF original) e íconos de redes
    ui/                   Photo, Button, Reveal, ProcessVideo
public/
  img/works/              fotos optimizadas (WebP en 480, 960 y 1440 px)
  media/                  videos cortos del taller (sin audio)
  favicon.svg, og-image.jpg, logo-timon.svg
assets-source/
  logo/logo-timon.pdf     logo original
  instagram/seleccion/    fotos originales usadas en la web (con nombre descriptivo)
  contenido-nuevo.json    de qué archivo de la carpeta "contenido nuevo" salió cada foto nueva
  instagram/archivo/      todas las fotos descargadas del Instagram (218), por código de publicación
scripts/
  optimize-images.mjs     genera las WebP y image-meta.json
  og-image.mjs            genera la imagen para compartir el link
```

## Navegación e intro

- Los enlaces internos son `<a href="#seccion">` normales, pero `src/lib/navigation.ts` intercepta el clic, hace el scroll descontando el header y no agrega `#` a la URL.
- La animación de entrada (`src/components/Intro.tsx`) se muestra una vez por visita y nunca a quien tiene activado "reducir movimiento". Se saltea con un toque o una tecla.

## Velocidad y SEO

- La tipografía (Bricolage Grotesque, licencia OFL) está en `public/fonts/` y se precarga: no depende de Google Fonts.
- La foto principal del inicio se precarga en `index.html`; el carrusel baja las demás de a una, después de que cargó la página.
- `vercel.json` guarda en caché fotos, videos y fuentes.
- `index.html` tiene título, descripción, Open Graph, datos estructurados (LocalBusiness), `canonical`, `robots.txt` y `sitemap.xml`.
- **Si el sitio pasa a un dominio propio**, cambiar `https://timonsublimados.vercel.app` por el dominio nuevo en `index.html`, `public/robots.txt` y `public/sitemap.xml`.

## Cambios frecuentes

- **Número de WhatsApp o Instagram:** `src/data/site.ts`.
- **Textos de los mensajes de WhatsApp:** `WA_MESSAGES` en `site.ts`, `waMessage` de cada servicio en `services.ts`.
- **Agregar una foto a la galería:**
  1. Copiar el `.jpg` a `assets-source/instagram/seleccion/` con un nombre como `remeras-club-x.jpg`.
  2. Correr `npm run images`.
  3. Sumarla en `WORKS` (`src/data/works.ts`) con su título, detalle, categoría y formato (`square`, `tall`, `wide` o `big`).
- **Clientes de la cinta:** `CLIENTS` en `services.ts`.
- **Opciones de «Armá tu cumple»:** `ITEMS` y `PHOTOS` en `src/components/Birthday.tsx`.

## Contenido

- Todas las fotos y videos son trabajos reales: los publicados en [@timonsublimados](https://www.instagram.com/timonsublimados/) y los que mandó la clienta en noviembre de 2026 (carpeta `contenido nuevo/`, que no se sube al repo).
- El video y las fotos de impresión 3D salen del reel de Instagram del 3/11/2026 (secador de soft, sujeta dorsales y pastilleros).
- Se evitaron fotos con caras de chicos y productos con personajes de terceros (Disney, Pixar, etc.).
- Los clientes listados son los que la marca etiquetó o agradeció públicamente en Instagram.
- La historia del taller resume lo que Mariela contó en sus publicaciones.
- No hay precios, años de experiencia, dirección exacta ni horarios porque no estaban publicados. Si se suman, el lugar natural es el footer (`Footer.tsx`) y la sección del taller.
