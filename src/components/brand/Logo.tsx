import type { SVGProps } from 'react'
import { LOGO_FULL, LOGO_WAVE, LOGO_WORDMARK, type LogoShape } from './logo-paths'

type Props = SVGProps<SVGSVGElement> & { title?: string }

function Shape({ shape, title, ...rest }: Props & { shape: LogoShape }) {
  return (
    <svg
      viewBox={shape.vb}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {shape.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.evenodd ? 'evenodd' : undefined} />
      ))}
    </svg>
  )
}

/** Logo completo: "Timon" + "Sublimados". */
export function Logo(props: Props) {
  return <Shape shape={LOGO_FULL} {...props} />
}

/** Solo la palabra "Timon" (con la ola). */
export function Wordmark(props: Props) {
  return <Shape shape={LOGO_WORDMARK} {...props} />
}

/** La ola de la "O": el símbolo de la marca. */
export function Wave(props: Props) {
  return <Shape shape={LOGO_WAVE} {...props} />
}
