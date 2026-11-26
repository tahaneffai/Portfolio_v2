import { beyondCode, languages, skills, ui } from '../content'
import { useLang } from '../lib/langContext'

export function Stack() {
  const { t } = useLang()
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="stack-title" className="h2 flex items-baseline gap-4">
          <span className="font-mono text-xs font-semibold" aria-hidden="true">
            (01)
          </span>
          {t(ui.stackTitle)}
        </h2>
        <p className="note">{t(ui.stackNote)}</p>
      </div>
      <div aria-hidden="true" className="dashed mt-6 h-px" />

      <ul className="mt-2">
        {skills.map((s, i) => (
          <li
            key={s.ref}
            className="group relative grid gap-4 border-b border-dashed border-rule px-3 py-6 transition-colors duration-200 hover:bg-lime sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:px-5"
          >
            <span aria-hidden="true" className="font-display text-3xl font-bold text-ink/25 group-hover:text-ink/50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none font-bold uppercase">{t(s.domain)}</h3>
              <p className="mt-2 max-w-[48ch] text-[0.85rem] text-ink-2 group-hover:text-ink">{t(s.desc)}</p>
            </div>
            <ul translate="no" className="flex max-w-md flex-wrap gap-1.5 sm:justify-end">
              {s.parts.map((p) => (
                <li key={p} className="tag">
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="note">// {t(ui.languages)}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <li key={l.name.en} className="tag normal-case">
                {t(l.name)} <span className="font-normal text-ink-2">/ {t(l.level)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="note">// {t(ui.beyond)}</h3>
          <p className="mt-3 max-w-[52ch] text-[0.85rem]">{t(beyondCode)}</p>
        </div>
      </div>
    </section>
  )
}
