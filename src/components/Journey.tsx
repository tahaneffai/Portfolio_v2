import { useRef } from 'react'
import { alongside, bars, ui } from '../content'
import { useLang } from '../lib/langContext'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

const KIND = {
  work: { fr: 'expérience', en: 'work' },
  study: { fr: 'études', en: 'studies' },
} as const

export function Journey() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)

  // Each step's ring is drawn as it scrolls into view, in order.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-ring]', {
          drawSVG: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', once: true },
        })
        gsap.from('[data-step-num]', {
          autoAlpha: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.15,
          delay: 0.4,
          scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="parcours" aria-labelledby="route-title" className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="route-title" className="h2 flex items-baseline gap-4">
          <span className="font-mono text-xs font-semibold" aria-hidden="true">
            (03)
          </span>
          {t(ui.routeTitle)}
        </h2>
        <p className="note">{t(ui.routeNote)}</p>
      </div>
      <div aria-hidden="true" className="dashed mt-6 h-px" />

      <ol data-steps="" className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        <span aria-hidden="true" className="dashed absolute top-[3.25rem] right-[10%] left-[10%] hidden h-px lg:block" />
        {bars.map((b, i) => (
          <li key={b.id} className="relative grid grid-cols-[6.5rem_1fr] gap-5 lg:block">
            <div className="relative grid h-[6.5rem] w-[6.5rem] place-items-center bg-cream lg:mx-0">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  data-ring=""
                  cx="50"
                  cy="50"
                  r="47"
                  fill={b.kind === 'work' ? 'var(--color-lime)' : 'none'}
                  stroke="var(--color-ink)"
                  strokeWidth="2"
                />
              </svg>
              <span data-step-num="" aria-hidden="true" className="relative font-display text-4xl font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="lg:mt-5">
              <p className="note tabular-nums">
                {t(b.when)}
                <span className="sr-only">, {t(b.kind === 'work' ? KIND.work : KIND.study)}</span>
              </p>
              <h3 className="mt-1 font-display text-xl leading-tight font-bold uppercase">{t(b.title)}</h3>
              <p className="mt-1 text-[0.82rem] font-semibold" translate="no">
                {b.place}
              </p>
              {b.detail ? <p className="mt-1 text-[0.8rem] text-ink-2">{t(b.detail)}</p> : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-3 rounded-[1.25rem] border-[1.5px] border-ink bg-cream-2 p-5 sm:grid-cols-[12rem_1fr] sm:p-7">
        <div>
          <p className="note">// {t(ui.alongside)}</p>
          <h3 className="mt-1 font-display text-xl font-bold uppercase">{t(alongside.title)}</h3>
        </div>
        <p className="text-[0.85rem] sm:self-end">{t(alongside.detail)}</p>
      </div>
    </section>
  )
}
