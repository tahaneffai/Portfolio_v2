import { useRef, useState } from 'react'
import { ui } from '../content'
import { useLang } from '../lib/langContext'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

const WORDS = ['Frontend', 'Backend', 'Mobile', 'Desktop', 'React', 'TypeScript', 'Node.js', 'Django', 'Flutter', 'Electron', 'Zoho Creator', 'SQL']

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <li key={w} className="flex items-center gap-6 pr-6 whitespace-nowrap">
          {w}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
        </li>
      ))}
    </ul>
  )
}

/** Stack ticker. It loops slowly, pauses on hover, has a pause button, and stays still for reduced motion. */
export function Marquee() {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const [paused, setPaused] = useState(false)
  const [moving, setMoving] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        tween.current = gsap.to('[data-track]', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
        setMoving(true)
        return () => {
          tween.current = null
          setMoving(false)
        }
      })
    },
    { scope: root },
  )

  const toggle = () => {
    const tw = tween.current
    if (!tw) return
    if (paused) tw.play()
    else tw.pause()
    setPaused(!paused)
  }

  return (
    <div
      ref={root}
      className="relative flex items-center overflow-hidden border-b-[1.5px] border-ink bg-lime text-[0.72rem] font-semibold uppercase"
      onMouseEnter={() => !paused && tween.current?.pause()}
      onMouseLeave={() => !paused && tween.current?.play()}
    >
      <div data-track="" className="flex w-max py-1.5" translate="no">
        <Row />
        <Row hidden />
      </div>
      {moving ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={t(paused ? ui.marqueePlay : ui.marqueePause)}
          className="absolute right-0 grid h-full w-9 place-items-center border-l-[1.5px] border-ink bg-lime hover:bg-ink hover:text-lime"
        >
          {paused ? (
            <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-current">
              <path d="M2 1l7 4-7 4z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-current">
              <path d="M2 1h2v8H2zM6 1h2v8H6z" />
            </svg>
          )}
        </button>
      ) : null}
    </div>
  )
}
