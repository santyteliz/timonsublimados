import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'light' | 'sol'

const base =
  'group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-6 text-[1.0625rem] font-semibold leading-none transition-[background-color,color,transform,box-shadow] duration-200 ease-out-soft active:scale-[0.97] select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-mar text-cotton hover:bg-mar-deep',
  outline: 'text-ink shadow-[inset_0_0_0_2px_var(--color-ink)] hover:bg-ink hover:text-cotton',
  light: 'bg-cotton text-ink hover:bg-sol',
  sol: 'bg-sol text-ink hover:bg-cotton',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  icon?: ReactNode
  external?: boolean
}

export function ButtonLink({ variant = 'primary', icon, external, className = '', children, ...rest }: Props) {
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon ? <span className="-ml-1 grid size-6 place-items-center">{icon}</span> : null}
      <span>{children}</span>
    </a>
  )
}
