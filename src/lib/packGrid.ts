import type { Shape } from '../data/works'

/**
 * La galería usa una grilla con `grid-auto-flow: dense`. Según el filtro y la cantidad de columnas,
 * al final pueden quedar celdas vacías. Acá se simula el acomodo del navegador y, si sobran huecos,
 * se cambia el formato de las últimas fotos (por ejemplo, una cuadrada pasa a ancha) hasta que la
 * grilla quede completa.
 */

const SPANS: Record<Shape, [cols: number, rows: number]> = {
  square: [1, 1],
  tall: [1, 2],
  wide: [2, 1],
  big: [2, 2],
}

/** Cuenta las celdas vacías que deja el acomodo "dense" (igual que hace el navegador). */
export function countHoles(shapes: Shape[], cols: number) {
  const grid: boolean[][] = []
  const free = (r: number, c: number) => !grid[r]?.[c]
  let lastRow = 0

  for (const shape of shapes) {
    const [w0, h] = SPANS[shape]
    const w = Math.min(w0, cols)
    // Dense: busca desde el principio el primer lugar donde entra.
    let placed = false
    for (let r = 0; !placed; r++) {
      for (let c = 0; c + w <= cols && !placed; c++) {
        let fits = true
        for (let dr = 0; dr < h && fits; dr++) for (let dc = 0; dc < w && fits; dc++) fits = free(r + dr, c + dc)
        if (!fits) continue
        for (let dr = 0; dr < h; dr++) {
          grid[r + dr] ??= []
          for (let dc = 0; dc < w; dc++) grid[r + dr][c + dc] = true
        }
        lastRow = Math.max(lastRow, r + h)
        placed = true
      }
    }
  }

  let holes = 0
  for (let r = 0; r < lastRow; r++) for (let c = 0; c < cols; c++) if (free(r, c)) holes++
  return holes
}

const OPTIONS: Shape[] = ['square', 'wide', 'tall', 'big']

/** Devuelve los formatos ajustados para que no quede ningún hueco. Toca solo las últimas fotos. */
export function fillShapes(shapes: Shape[], cols: number): Shape[] {
  if (shapes.length === 0 || countHoles(shapes, cols) === 0) return shapes

  // Prueba variar las últimas 1, 2 y hasta 3 fotos, y se queda con la opción con menos cambios.
  for (let k = 1; k <= Math.min(3, shapes.length); k++) {
    const attempt = shapes.slice()
    const start = shapes.length - k
    let best: Shape[] | null = null
    let bestChanges = Infinity
    const run = (pos: number, changes: number) => {
      if (changes >= bestChanges) return
      if (pos === attempt.length) {
        if (countHoles(attempt, cols) === 0) {
          best = attempt.slice()
          bestChanges = changes
        }
        return
      }
      for (const s of OPTIONS) {
        attempt[pos] = s
        run(pos + 1, changes + (s === shapes[pos] ? 0 : 1))
      }
      attempt[pos] = shapes[pos]
    }
    run(start, 0)
    if (best) return best
  }
  return shapes
}
