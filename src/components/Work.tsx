import { useRef } from 'react'
import { projects, ui, type Project } from '../content'
import { useLang } from '../lib/langContext'
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap'

function Card({ p }: { p: Project }) {
  const { t } = useLang()
  const { image } = p
  const srcSet = image.widths.map((w) => `/img/${image.base}-${w}.webp ${w}w`).join(', ')
  const largest = image.widths[image.widths.length - 1]
  const meta = [p.year, p.context ? t(p.context) : null].filter(Boolean).join(' / ')
  return (
    <article
      aria-labelledby={`${p.id}-title`}
      className="flex w-[min(86vw,36rem)] shrink-0 snap-start flex-col rounded-[1.25rem] border-[1.5px] border-ink p-5 sm:p-6"
      style={{ background: p.color }}
    >
      <p className="note text-ink">{meta || t(p.platform)}</p>
      <h3 id={`${p.id}-title`} translate="no" className="display mt-3 text-[clamp(2.4rem,4.2vw,3.6rem)]">
        {p.name}
      </h3>
      <p className="mt-3 text-[0.85rem] font-semibold">{t(p.summary)}</p>

      <div className={`mt-4 overflow-hidden rounded-xl border-[1.5px] border-ink bg-cream ${image.tall ? 'flex h-48 justify-center pt-4 [@media(min-height:960px)]:h-56' : ''}`}>
        <img
          src={`/img/${image.base}-${largest}.webp`}
          srcSet={srcSet}
          sizes={image.tall ? '12rem' : '(min-width: 640px) 32rem, 84vw'}
          width={image.width}
          height={image.height}
          alt={t(image.alt)}
          loading="lazy"
          decoding="async"
          className={image.tall ? 'h-auto w-40 self-start rounded-t-lg sm:w-48' : 'block aspect-[16/8] h-auto w-full object-cover object-top'}
        />
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed">{t(p.details)}</p>

      <div className="mt-auto pt-4">
        <div aria-hidden="true" className="h-px bg-[linear-gradient(90deg,var(--color-ink)_50%,transparent_50%)] bg-[length:8px_1px]" />
        <ul translate="no" className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        {p.links.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem] font-semibold uppercase">
            {p.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="u-link">
                  {t(l.label)} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {t(ui.newTab)}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export function Work() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)

  // Desktop: the section pins and the cards slide sideways as you scroll down.
  // Small screens and reduced motion: a normal horizontal scroller with snap points.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const track = root.current!.querySelector<HTMLElement>('[data-track]')!
        const viewport = track.parentElement!
        viewport.style.overflow = 'hidden'
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 64px',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        gsap.to('[data-progress]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 64px', end: () => `+=${distance()}`, scrub: true },
        })
        return () => {
          viewport.style.overflow = ''
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="projets" aria-labelledby="work-title" className="overflow-hidden border-y-[1.5px] border-ink bg-cream-2">
      <div className="mx-auto flex max-w-[90rem] flex-col justify-center px-4 py-16 sm:px-8 lg:min-h-[calc(100vh-64px)] lg:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-title" className="h2 flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold" aria-hidden="true">
              (02)
            </span>
            {t(ui.workTitle)}
          </h2>
          <p className="note">{t(ui.workNote)} →</p>
        </div>
        <div aria-hidden="true" className="dashed mt-6 h-px" />

        <div
          className="mt-6 snap-x snap-mandatory overflow-x-auto pb-4 [contain:paint] [scrollbar-width:thin]"
          role="region"
          aria-label={t(ui.workTitle)}
          tabIndex={0}
        >
          <div data-track="" className="flex w-max gap-5 pr-4">
            {projects.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="mt-6 hidden h-1 overflow-hidden rounded-full bg-rule lg:block">
          <div data-progress="" className="h-full origin-left scale-x-0 bg-ink motion-reduce:scale-x-100" />
        </div>
      </div>
    </section>
  )
}
