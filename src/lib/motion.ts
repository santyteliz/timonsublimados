/**
 * Las animaciones de entrada arrancan un poco antes de que el bloque entre en pantalla (margen positivo abajo).
 * Así, aunque se baje rápido en el celular, nunca se ve un espacio vacío esperando a que aparezca algo.
 */
export const viewport = { once: true, margin: '0px 0px 18% 0px' } as const

export const ease = [0.22, 1, 0.36, 1] as const
