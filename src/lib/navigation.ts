/**
 * Navegación interna sin "#" en la URL.
 * Todos los enlaces del sitio siguen siendo <a href="#seccion"> (funcionan sin JavaScript
 * y con el teclado), pero al hacer clic se intercepta el salto, se hace un scroll
 * calculado con la altura del header y la URL queda limpia.
 */

export const NAV_EVENT = 'timon:navigate'

/** Espacio que ocupa el header fijo cuando está compacto. */
const HEADER_OFFSET = 76

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Devuelve el elemento visible al que hay que ir para un id. */
function resolveTarget(id: string): HTMLElement | null {
  const el = document.getElementById(id)
  // Los servicios en escritorio no tienen artículo propio (son pestañas): se va a la sección.
  if (!el || el.offsetParent === null) {
    if (id.startsWith('servicio-')) return document.getElementById('servicios')
    return null
  }
  return el
}

export function scrollToSection(id: string, opts: { instant?: boolean } = {}) {
  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: id }))
  const el = id === 'inicio' ? null : resolveTarget(id)
  const top = el ? el.getBoundingClientRect().top + window.scrollY - (id === 'contenido' ? 0 : HEADER_OFFSET) : 0
  window.scrollTo({ top: Math.max(0, top), behavior: opts.instant || prefersReducedMotion() ? 'instant' : 'smooth' })

  // El enlace "Ir al contenido" también tiene que mover el foco del teclado.
  if (id === 'contenido' && el) {
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

/** Intercepta los clics en enlaces internos de toda la página. */
export function installInternalLinks() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
    if (!a) return
    const id = decodeURIComponent(a.getAttribute('href')!.slice(1))
    if (!id) return
    e.preventDefault()
    // Si hay un menú abierto que bloquea el scroll, se espera a que se cierre.
    const wait = document.body.style.overflow === 'hidden' ? 80 : 0
    window.setTimeout(() => scrollToSection(id), wait)
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

/** Si alguien entra con un link viejo tipo /#trabajos, se limpia la URL y se va a esa sección. */
export function consumeInitialHash() {
  const id = decodeURIComponent(window.location.hash.slice(1))
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  return id || null
}
