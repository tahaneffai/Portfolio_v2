import { useEffect, useRef, useState } from 'react'
import { person, ui } from '../content'
import { useLang } from '../lib/langContext'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../lib/gsap'

const timeFormat = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Casablanca', hour: '2-digit', minute: '2-digit' })

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {timeFormat.format(now)}
    </time>
  )
}

/** Circular badge: the text ring turns with the page scroll, not on its own. */
function Badge({ label }: { label: string }) {
  return (
    <div data-badge="" aria-hidden="true" className="relative h-full w-full rounded-full border-[1.5px] border-ink bg-lime">
      <svg data-ring="" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="font-mono" fontSize="8.6" fontWeight="700" letterSpacing="1.2" fill="currentColor">
          <textPath href="#badge-circle">{label.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] grid place-items-center rounded-full bg-ink font-display text-[clamp(1rem,2.2vw,1.9rem)] font-bold text-lime">
        DEV
      </span>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)

  // Page-load moment: the name rises letter by letter out of a mask, then the badge pops in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create('[data-name]', { type: 'chars', mask: 'chars' })
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
        tl.from(split.chars, { yPercent: 110, duration: 0.9, stagger: 0.025 }, 0.1)
          .from('[data-photo]', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, 0.15)
          .from('[data-badge]', { scale: 0, rotation: -120, duration: 0.8, ease: 'back.out(1.6)' }, 0.55)
          .from('[data-hero-fade]', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, 0.6)
          .add(() => split.revert())

        // The badge ring turns as the page scrolls.
        gsap.to('[data-ring]', {
          rotation: 360,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=1600', scrub: 0.6 },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="mx-auto max-w-[90rem] px-4 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-24">
      <div data-hero-fade="" className="note flex items-center justify-between pb-3">
        <span translate="no">{t(ui.metaLeft)}</span>
        <span>
          {t(ui.metaRight)} <Clock />
        </span>
      </div>
      <div aria-hidden="true" className="dashed h-px" />

      <div className="relative mt-8 grid grid-cols-12 items-start sm:mt-12">
        <h1 id="hero-title" translate="no" className="relative z-10 col-start-1 col-end-13 row-start-1">
          <span className="sr-only">Taha Yassine Neffai, {t(ui.role)}</span>
          <span aria-hidden="true" data-name="" className="display block text-[clamp(3.4rem,13.2vw,13.5rem)]">
            Taha Yassine
          </span>
          <span aria-hidden="true" data-name="" className="display block pl-[8vw] text-[clamp(3.4rem,13.2vw,13.5rem)]">
            Neffai
          </span>
        </h1>

        <div className="absolute top-[clamp(2.2rem,8.6vw,8.6rem)] left-[84%] z-20 sm:left-[44%] w-[clamp(4.5rem,11vw,10.5rem)] -translate-x-1/2 aspect-square">
          <Badge label={t(ui.badge)} />
        </div>

        <figure
          data-photo=""
          className="relative col-start-1 col-end-13 row-start-2 mt-8 overflow-hidden rounded-[1.25rem] border-[1.5px] border-ink bg-peach sm:col-end-9 lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:mt-0"
        >
          <img
            src="/img/taha-640.webp"
            srcSet="/img/taha-320.webp 320w, /img/taha-640.webp 640w"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 58vw, 92vw"
            width={640}
            height={640}
            alt={t(ui.portraitAlt)}
            fetchPriority="high"
            className="block aspect-[4/4.4] h-auto w-full object-cover object-top"
          />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-full border-[1.5px] border-ink bg-cream px-4 py-1.5 text-[0.7rem]">
            {t(ui.photoCaption)}
          </figcaption>
        </figure>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:mt-14 lg:max-w-[66%] lg:flex-row lg:items-center lg:justify-between">
        <p data-hero-fade="" className="font-display text-2xl font-medium uppercase sm:text-3xl">
          {t(ui.role)}
        </p>
        <div data-hero-fade="" className="flex flex-wrap gap-3">
          <a href="#contact" className="pill pill-lime">
            {t(ui.ctaContact)} <span aria-hidden="true">→</span>
          </a>
          <a href="#projets" className="pill">
            {t(ui.ctaWork)}
          </a>
          <a href={person.cv} download className="pill">
            {t(ui.ctaCv)}
          </a>
        </div>
      </div>
    </section>
  )
}
