import { Leaf } from 'lucide-react'
import { about } from '../../data/site-content'

export function About() {
  return (
    <section id="que-es" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-brand-100">
            <Leaf aria-hidden="true" className="h-8 w-8 text-brand-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-800">{about.title}</h2>
            {about.body.map((paragraph, index) => (
              <p key={index} className="mt-3 text-lg text-brand-800/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
