import { useRef } from 'react'
import { ui } from '../content'
import { useLang } from '../lib/langContext'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

const MARKS = ['bg-lime', 'bg-mint', 'bg-butter']

export function Manifesto() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)

  // As you scroll through, a marker highlight sweeps behind each line in turn.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-mark]', {
          clipPath: 'inset(0% 100% 0% 0%)',
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 75%', scrub: 0.5 },
        })
      })
    },
    { scope: root },
  )

  const lines = [ui.manifestoB, ui.manifestoC, ui.manifestoD]
  return (
    <section ref={root} aria-labelledby="manifesto-title" className="on-dark bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 sm:py-28">
        <p className="note text-cream/70">{t(ui.manifestoLabel)}</p>
        <h2 id="manifesto-title" className="display mt-6 text-[clamp(3rem,10vw,9.5rem)]">
          <span className="block">{t(ui.manifestoA)}</span>
          {lines.map((l, i) => (
            <span key={i} className="relative block w-fit px-[0.12em]">
              {t(l)}
              {/* Highlighted copy on top, revealed left to right by a clip-path. */}
              <span
                data-mark=""
                aria-hidden="true"
                style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                className={`absolute inset-0 px-[0.12em] text-ink ${MARKS[i]}`}
              >
                {t(l)}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-10 max-w-[56ch] text-cream/80">{t(ui.manifestoText)}</p>
      </div>
    </section>
  )
}
