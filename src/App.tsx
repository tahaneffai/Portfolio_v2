import { ui } from './content'
import { useLang } from './lib/langContext'
import { Marquee } from './components/Marquee'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Stack } from './components/Stack'
import { Work } from './components/Work'
import { Journey } from './components/Journey'
import { Contact } from './components/Contact'

export default function App() {
  const { t } = useLang()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold"
      >
        {t(ui.skip)}
      </a>
      <Marquee />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Stack />
        <Work />
        <Journey />
      </main>
      <Contact />
    </>
  )
}
