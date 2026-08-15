import { TreePine, Target, MapPinned, Warehouse } from 'lucide-react'
import { MetricCounter } from './MetricCounter'
import { ProgressBar } from './ProgressBar'
import { metrics } from '../../data/site-content'

export function MetricsDashboard() {
  return (
    <section id="metricas" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 text-3xl font-bold text-brand-800">
          Impacto hasta ahora
        </h2>
        <p className="mb-8 text-brand-800/90">
          Avance del programa de reforestación en el estado.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 rounded border border-brand-200 bg-brand-50 p-6">
            <TreePine aria-hidden="true" className="h-8 w-8 text-brand-700" />
            <h3 className="sr-only">Árboles sembrados</h3>
            <MetricCounter value={metrics.treesPlanted} label="Árboles sembrados" />
          </div>

          <div className="flex flex-col justify-between gap-3 rounded border border-brand-200 bg-brand-50 p-6 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Target aria-hidden="true" className="h-8 w-8 text-brand-700" />
              <h3 className="text-brand-800">Meta estatal</h3>
            </div>
            <ProgressBar value={metrics.treesPlanted} goal={metrics.treesGoal} label="Meta estatal" />
          </div>

          <div className="flex flex-col gap-3 rounded border border-brand-200 bg-brand-50 p-6">
            <MapPinned aria-hidden="true" className="h-8 w-8 text-brand-700" />
            <h3 className="sr-only">Municipios beneficiados</h3>
            <MetricCounter
              value={metrics.municipalitiesBenefited}
              label="Municipios beneficiados"
            />
          </div>

          <div className="flex flex-col gap-3 rounded border border-brand-200 bg-brand-50 p-6">
            <Warehouse aria-hidden="true" className="h-8 w-8 text-brand-700" />
            <h3 className="sr-only">Puntos de entrega</h3>
            <MetricCounter
              value={metrics.deliveryPointsActive}
              label="Puntos de entrega activos"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
