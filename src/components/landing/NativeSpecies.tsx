import { Sun, Bird, CloudSun, Droplets } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { speciesBenefits } from '../../data/site-content'

const icons: LucideIcon[] = [Sun, Bird, CloudSun, Droplets]

export function NativeSpecies() {
  return (
    <section id="beneficios" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-3 text-3xl font-bold text-brand-800">
          Beneficios de las especies nativas
        </h2>
        <p className="mb-8 text-lg text-brand-800/90">
          Árboles propios de Yucatán, adaptados a su clima y a la vida de sus comunidades.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speciesBenefits.map((benefit, index) => {
            const Icon = icons[index % icons.length]
            return (
              <article
                key={benefit.title}
                className="flex flex-col gap-3 rounded border border-brand-200 bg-brand-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded bg-white">
                  <Icon aria-hidden="true" className="h-6 w-6 text-brand-700" />
                </div>
                <h3 className="text-lg font-semibold text-brand-800">
                  {benefit.title}
                </h3>
                <p className="text-brand-800/90">{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
