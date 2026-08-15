import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { deliveryPoints } from '../../data/site-content'
import { DeliveryPointCard } from './DeliveryPointCard'

const DeliveryMap = lazy(() => import('./DeliveryMap'))

export function DeliverySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="puntos-de-entrega"
      className="bg-white py-12 sm:py-16"
      aria-label="Puntos de entrega y viveros de la SDS"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 text-3xl font-bold text-brand-800">
          Puntos de Entrega y Viveros SDS
        </h2>
        <p className="mb-6 text-brand-800/90">
          Ubicaciones para recoger especies nativas, con disponibilidad según la época de lluvias.
        </p>

        <div className="mb-6 overflow-hidden rounded border border-brand-200 bg-brand-100">
          {isVisible && (
            <Suspense
              fallback={
                <div className="h-[400px] w-full" aria-hidden="true" />
              }
            >
              <DeliveryMap points={deliveryPoints} />
            </Suspense>
          )}
        </div>

        <ul
          aria-label="Puntos de entrega y viveros"
          className="grid gap-6 sm:grid-cols-2"
        >
          {deliveryPoints.map((point) => (
            <li key={point.id}>
              <DeliveryPointCard point={point} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
