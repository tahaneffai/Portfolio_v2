import { person, ui } from '../content'
import { useLang } from '../lib/langContext'

const YEAR = new Date().getFullYear()

export function Contact() {
  const { t } = useLang()
  const links = [
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
  ]
  return (
    <footer id="contact" aria-labelledby="contact-title" className="on-dark bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-4 pt-20 pb-8 sm:px-8 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="note flex items-baseline gap-4 text-cream/70">
            <span className="font-semibold" aria-hidden="true">
              (04)
            </span>
            {t(ui.navContact)}
          </p>
        </div>
        <h2 id="contact-title" className="display mt-6 text-[clamp(3.4rem,12vw,11rem)]">
          <span className="block">{t(ui.contactTitleA)}</span>
          <span className="block w-fit bg-lime px-[0.1em] text-ink">{t(ui.contactTitleB)}</span>
        </h2>
        <p className="mt-8 max-w-[52ch] text-cream/80">{t(ui.contactLead)}</p>

        <a
          href={`mailto:${person.email}`}
          translate="no"
          className="mt-10 inline-block font-display text-[clamp(1.6rem,5.4vw,4.2rem)] font-bold break-all uppercase underline decoration-lime decoration-[3px] underline-offset-[0.15em] hover:text-lime"
        >
          {person.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <a href={`mailto:${person.email}`} className="pill pill-lime border-lime text-ink">
              {t(ui.ctaContact)} <span aria-hidden="true">→</span>
            </a>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="pill border-cream hover:bg-cream hover:text-ink">
                {l.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> {t(ui.newTab)}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={person.cv} download className="pill border-cream hover:bg-cream hover:text-ink">
              {t(ui.ctaCv)}
            </a>
          </li>
        </ul>

        <div className="mt-20 flex flex-wrap justify-between gap-3 border-t border-dashed border-cream/30 pt-6 text-[0.72rem] text-cream/70">
          <span translate="no">
            © {YEAR} {person.name}
          </span>
          <span>{t(ui.footer)}</span>
        </div>
      </div>
    </footer>
  )
}
