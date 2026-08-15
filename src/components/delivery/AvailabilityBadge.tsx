interface AvailabilityBadgeProps {
  stockStatus: 'suficiente' | 'limitada' | 'agotada'
  rainySeasonDemand: 'alta' | 'baja'
}

const stockLabels: Record<AvailabilityBadgeProps['stockStatus'], string> = {
  suficiente: 'Disponibilidad: suficiente',
  limitada: 'Disponibilidad: limitada',
  agotada: 'Disponibilidad: agotada',
}

const stockColors: Record<AvailabilityBadgeProps['stockStatus'], string> = {
  suficiente: 'bg-brand-100 text-brand-800',
  limitada: 'bg-amber-100 text-amber-800',
  agotada: 'bg-red-100 text-red-800',
}

const demandLabels: Record<AvailabilityBadgeProps['rainySeasonDemand'], string> = {
  alta: 'Época de lluvias: alta demanda',
  baja: 'Época de lluvias: baja demanda',
}

export function AvailabilityBadge({
  stockStatus,
  rainySeasonDemand,
}: AvailabilityBadgeProps) {
  return (
    <span role="status" className="flex flex-wrap gap-2">
      <span
        className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${stockColors[stockStatus]}`}
      >
        {stockLabels[stockStatus]}
      </span>
      <span
        className="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-brand-700"
      >
        {demandLabels[rainySeasonDemand]}
      </span>
    </span>
  )
}
