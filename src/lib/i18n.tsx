import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../content'
import { LangContext, type LangCtx } from './langContext'

// French by default. ?lang=en in the URL wins, then the last choice saved on this device.
function initialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'en' || fromUrl === 'fr') return fromUrl
    const saved = window.localStorage.getItem('lang')
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    /* storage can be blocked; fall back to French */
  }
  return 'fr'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title =
      lang === 'fr'
        ? 'Taha Yassine Neffai, ingénieur logiciel full-stack'
        : 'Taha Yassine Neffai, full-stack software engineer'
    const url = new URL(window.location.href)
    if (lang === 'fr') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
    try {
      window.localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const value = useMemo<LangCtx>(() => ({ lang, setLang, t: (s) => s[lang] }), [lang, setLang])
  return <LangContext value={value}>{children}</LangContext>
}

