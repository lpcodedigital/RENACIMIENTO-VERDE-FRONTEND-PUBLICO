interface MapFiltersProps {
  municipalities: string[]
  speciesTypes: string[]
  municipality: string
  speciesType: string
  onMunicipalityChange: (value: string) => void
  onSpeciesTypeChange: (value: string) => void
  resultCount?: number
}

export function MapFilters({
  municipalities,
  speciesTypes,
  municipality,
  speciesType,
  onMunicipalityChange,
  onSpeciesTypeChange,
  resultCount,
}: MapFiltersProps) {
  const municipalitySelectId = 'map-filter-municipality'
  const speciesTypeSelectId = 'map-filter-species-type'

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex w-full flex-col gap-1 sm:max-w-xs">
          <label
            htmlFor={municipalitySelectId}
            className="text-sm font-medium text-brand-800"
          >
            Municipio
          </label>
          <select
            id={municipalitySelectId}
            value={municipality}
            onChange={(e) => onMunicipalityChange(e.target.value)}
            className="w-full rounded border border-brand-200 bg-white px-3 py-2 text-brand-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="">Todos los municipios</option>
            {municipalities.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col gap-1 sm:max-w-xs">
          <label
            htmlFor={speciesTypeSelectId}
            className="text-sm font-medium text-brand-800"
          >
            Tipo de especie
          </label>
          <select
            id={speciesTypeSelectId}
            value={speciesType}
            onChange={(e) => onSpeciesTypeChange(e.target.value)}
            className="w-full rounded border border-brand-200 bg-white px-3 py-2 text-brand-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="">Todos los tipos</option>
            {speciesTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {resultCount !== undefined && (
        <p role="status" aria-live="polite" className="mt-4 text-sm text-brand-800/90">
          {resultCount} {resultCount === 1 ? 'sitio encontrado' : 'sitios encontrados'}
        </p>
      )}
    </>
  )
}
