import { MapPin, Clock, Warehouse, TreePine } from 'lucide-react'
import type { DeliveryPoint } from '../../data/site-content'
import { AvailabilityBadge } from './AvailabilityBadge'

interface DeliveryPointCardProps {
  point: DeliveryPoint
}

export function DeliveryPointCard({ point }: DeliveryPointCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded border border-brand-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-brand-800">{point.name}</h3>
        <span className="inline-flex items-center gap-1 rounded bg-brand-100 px-2 py-1 text-xs font-medium text-brand-700">
          {point.isNursery ? (
            <TreePine aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Warehouse aria-hidden="true" className="h-4 w-4" />
          )}
          {point.isNursery ? 'Vivero' : 'Punto de entrega'}
        </span>
      </div>

      <p className="flex items-start gap-2 text-sm text-brand-800/90">
        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
        <span>
          {point.address || 'Por confirmar'}
          <span className="text-brand-700"> · {point.municipality}</span>
        </span>
      </p>

      <p className="flex items-start gap-2 text-sm text-brand-800/90">
        <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
        <span>{point.schedule || 'Por confirmar'}</span>
      </p>

      <AvailabilityBadge
        stockStatus={point.stockStatus}
        rainySeasonDemand={point.rainySeasonDemand}
      />
    </article>
  )
}
