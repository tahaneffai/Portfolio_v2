import { createContext, use } from 'react'
import type { Lang, T } from '../content'

export type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (s: T) => string }
export const LangContext = createContext<LangCtx | null>(null)

export function useLang() {
  const ctx = use(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
