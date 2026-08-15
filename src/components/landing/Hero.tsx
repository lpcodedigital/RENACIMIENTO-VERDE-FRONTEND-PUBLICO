import { Sprout } from 'lucide-react'
import { hero } from '../../data/site-content'

export function Hero() {
  return (
    <section id="inicio" className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
            {hero.kicker}
          </p>
          <h1 className="text-4xl font-black text-brand-800 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 text-lg text-brand-800/90 sm:text-xl">{hero.subtitle}</p>
          <div className="mt-8">
            <a
              // href="#beneficios"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded bg-cta px-6 py-3 font-semibold text-white no-underline hover:bg-cta-hover"
            >
              <Sprout aria-hidden="true" className="h-5 w-5" />
              Conoce las especies nativas
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
