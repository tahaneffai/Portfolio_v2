import { useEffect, useRef, useState } from 'react'
import { ui, type Lang } from '../content'
import { useLang } from '../lib/langContext'
import { Flip, MOTION_OK, useGSAP } from '../lib/gsap'

const NAV = [
  { id: 'stack', label: ui.navStack },
  { id: 'projets', label: ui.navWork },
  { id: 'parcours', label: ui.navRoute },
  { id: 'contact', label: ui.navContact },
] as const
const LANGS: Lang[] = ['fr', 'en']

/** Which section is in the middle of the screen. Sections load lazily, so it re-checks until they exist. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    let io: IntersectionObserver | null = null
    let timer = 0
    const attach = () => {
      const els = NAV.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => e !== null)
      if (els.length < NAV.length) {
        timer = window.setTimeout(attach, 300)
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
        },
        { rootMargin: '-45% 0px -50% 0px' },
      )
      els.forEach((el) => io!.observe(el))
    }
    attach()
    return () => {
      window.clearTimeout(timer)
      io?.disconnect()
    }
  }, [])
  return active
}

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)

  // The lime marker slides to the chosen language: record its position, change the DOM, animate the difference.
  useGSAP(
    () => {
      const state = flipState.current
      flipState.current = null
      if (!state || !window.matchMedia(MOTION_OK).matches) return
      Flip.from(state, { duration: 0.35, ease: 'power2.inOut' })
    },
    { scope: root, dependencies: [lang] },
  )

  return (
    <div ref={root} role="group" aria-label={t(ui.langLabel)} className="flex rounded-full border-[1.5px] border-ink p-0.5 text-[0.72rem] font-semibold">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => {
            if (l === lang) return
            flipState.current = Flip.getState(root.current!.querySelector('[data-flip-id="lang"]'))
            setLang(l)
          }}
          className="relative min-h-8 min-w-9 rounded-full px-2 uppercase"
        >
          {lang === l ? <span data-flip-id="lang" aria-hidden="true" className="absolute inset-0 rounded-full bg-ink" /> : null}
          <span className={`relative ${lang === l ? 'text-lime' : ''}`}>{l}</span>
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const active = useActiveSection()
  return (
    <header className="sticky top-0 z-40 border-b-[1.5px] border-ink bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" translate="no" className="font-display text-xl font-bold tracking-wide uppercase hover:opacity-70">
          T.Y. Neffai
        </a>
        <nav aria-label="Navigation" className="hidden md:block">
          <ul className="flex gap-1.5 text-[0.72rem] font-semibold uppercase">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`block rounded-full border-[1.5px] px-3 py-1 transition-colors ${
                    active === n.id ? 'border-ink bg-lime' : 'border-transparent hover:border-ink'
                  }`}
                >
                  {t(n.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a href="#contact" className="pill pill-lime hidden sm:inline-flex">
            {t(ui.sayHello)} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <nav aria-label="Navigation mobile" className="border-t-[1.5px] border-ink md:hidden">
        <ul className="grid grid-cols-4 text-center text-[0.68rem] font-semibold uppercase">
          {NAV.map((n, i) => (
            <li key={n.id} className={i > 0 ? 'border-l-[1.5px] border-ink' : ''}>
              <a href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} className={`block py-2 ${active === n.id ? 'bg-lime' : ''}`}>
                {t(n.label)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
