import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import {
  plantations,
  municipalityFilterOptions,
  speciesTypeFilterOptions,
} from '../../data/site-content'
import { MapFilters } from './MapFilters'
import { MapMarkerModal } from './MapMarkerModal'
import type { PlantationSite } from '../../data/site-content'

const ReforestationMap = lazy(() => import('./ReforestationMap'))

const formatEsMxDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`)
  if (!iso || Number.isNaN(date.getTime())) {
    return 'Fecha por confirmar'
  }
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function MapSection() {
  const [municipality, setMunicipality] = useState('')
  const [speciesType, setSpeciesType] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSite, setSelectedSite] = useState<PlantationSite | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const markerButtonRef = useRef<HTMLButtonElement>(null)

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

  const filteredSites = useMemo(() => {
    return plantations.filter((site) => {
      const matchesMunicipality = municipality === '' || site.municipality === municipality
      const matchesType = speciesType === '' || site.speciesType === speciesType
      return matchesMunicipality && matchesType
    })
  }, [municipality, speciesType])

  return (
    <section
      ref={sectionRef}
      id="mapa"
      className="bg-brand-50 py-12 sm:py-16"
      aria-label="Mapa interactivo de sitios de reforestación"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 text-3xl font-bold text-brand-800">
          Mapa de reforestación
        </h2>
        <p className="mb-6 text-brand-800/90">
          Explora los sitios de siembra de especies nativas en Yucatán.
        </p>

        <MapFilters
          municipalities={municipalityFilterOptions}
          speciesTypes={speciesTypeFilterOptions}
          municipality={municipality}
          speciesType={speciesType}
          onMunicipalityChange={setMunicipality}
          onSpeciesTypeChange={setSpeciesType}
          resultCount={filteredSites.length}
        />

        {filteredSites.length === 0 && (
          <p className="mt-6 rounded border border-brand-200 bg-white p-4 text-brand-800">
            No hay sitios para este filtro.
          </p>
        )}

        <div className="mt-6 overflow-hidden rounded border border-brand-200 bg-white shadow-sm">
          {isVisible && (
            <Suspense
              fallback={
                <div className="h-[400px] w-full bg-brand-100" aria-hidden="true" />
              }
            >
              <ReforestationMap sites={filteredSites} onMarkerClick={setSelectedSite} />
            </Suspense>
          )}
        </div>

        <ul
          aria-label="Lista de sitios de reforestación"
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          {filteredSites.map((site) => (
            <li
              key={site.id}
              className="rounded border border-brand-200 bg-white p-4"
            >
              <h3 className="font-semibold text-brand-800">{site.species}</h3>
              <dl className="mt-1 text-sm text-brand-800/90">
                <div>
                  <dt className="inline font-medium">Municipio:</dt>{' '}
                  <dd className="inline">{site.municipality}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Cantidad:</dt>{' '}
                  <dd className="inline">{site.quantity}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Fecha:</dt>{' '}
                  <dd className="inline">{formatEsMxDate(site.plantingDate)}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>

      {selectedSite && (
        <MapMarkerModal
          site={selectedSite}
          focusReturnRef={markerButtonRef}
          onClose={() => setSelectedSite(null)}
        />
      )}
    </section>
  )
}
