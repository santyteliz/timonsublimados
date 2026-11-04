import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = { src: string; poster: string; label: string; className?: string }

/** Video corto del taller: se reproduce en silencio solo cuando está en pantalla. */
export function ProcessVideo({ src, poster, label, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || reduce || userPaused) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => undefined)
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce, userPaused])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setUserPaused(false)
      v.play().catch(() => undefined)
    } else {
      setUserPaused(true)
      v.pause()
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="size-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar video' : 'Reproducir video'}
        className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-ink/70 text-cotton backdrop-blur transition-colors hover:bg-ink"
      >
        {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
      </button>
    </div>
  )
}
