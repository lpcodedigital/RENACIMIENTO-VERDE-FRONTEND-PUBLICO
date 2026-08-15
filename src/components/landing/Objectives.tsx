import { Eye, Users, TreePine, Mountain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { objectives } from '../../data/site-content'

const icons: LucideIcon[] = [Eye, Users, TreePine, Mountain]

export function Objectives() {
  return (
    <section id="objetivos" className="bg-brand-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-3xl font-bold text-brand-800">Objetivos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.map((objective, index) => {
            const Icon = icons[index % icons.length]
            return (
              <article
                key={objective.title}
                className="flex flex-col gap-3 rounded border border-brand-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded bg-brand-100">
                  <Icon aria-hidden="true" className="h-6 w-6 text-brand-700" />
                </div>
                <h3 className="text-lg font-semibold text-brand-800">
                  {objective.title}
                </h3>
                <p className="text-brand-800/90">{objective.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
