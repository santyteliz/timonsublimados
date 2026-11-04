import type { ImgHTMLAttributes } from 'react'
import { imgMeta, img, srcSet, type Work } from '../../data/works'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  slug: Work['slug']
  alt: string
  /** Ancho que ocupa la imagen en pantalla, para elegir el archivo correcto */
  sizes?: string
  priority?: boolean
  focus?: string
}

export function Photo({ slug, alt, sizes = '(min-width: 1024px) 33vw, 50vw', priority, focus, className = '', style, ...rest }: Props) {
  const m = imgMeta(slug)
  return (
    <img
      src={img(slug, 960)}
      srcSet={srcSet(slug)}
      sizes={sizes}
      alt={alt}
      width={m.w}
      height={m.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={`object-cover ${className}`}
      style={{ backgroundColor: m.color, objectPosition: focus, ...style }}
      {...rest}
    />
  )
}
