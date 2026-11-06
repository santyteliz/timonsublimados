export const INTRO_KEY = 'timon-intro-vista'

/** La intro se muestra una vez por visita y nunca a quien pidió menos movimiento. */
export function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return sessionStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}

