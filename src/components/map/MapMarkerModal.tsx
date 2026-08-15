import { useEffect, useRef } from 'react'
import { TreePine, X } from 'lucide-react'
import type { PlantationSite } from '../../data/site-content'

interface MapMarkerModalProps {
  site: PlantationSite
  focusReturnRef: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
}

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

export function MapMarkerModal({
  site,
  focusReturnRef,
  onClose,
}: MapMarkerModalProps) {
  const titleId = `map-marker-title-${site.id}`
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const focusReturnTarget = focusReturnRef.current
    closeButtonRef.current?.focus()
    return () => {
      focusReturnTarget?.focus()
    }
  }, [focusReturnRef])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-xl font-bold text-brand-800">
            {site.species}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded p-1 text-brand-700 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {site.photo ? (
          <img
            src={site.photo}
            alt={`${site.species} sembrada en ${site.municipality}`}
            className="mb-4 h-40 w-full rounded object-cover"
          />
        ) : (
          <div className="mb-4 flex h-40 w-full items-center justify-center rounded bg-brand-50">
            <TreePine
              aria-label={`Árbol ${site.species}`}
              className="h-14 w-14 text-brand-700"
            />
          </div>
        )}

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="font-medium text-brand-800">Tipo de especie</dt>
            <dd className="text-brand-800/90">{site.speciesType}</dd>
          </div>
          <div>
            <dt className="font-medium text-brand-800">Municipio</dt>
            <dd className="text-brand-800/90">{site.municipality}</dd>
          </div>
          <div>
            <dt className="font-medium text-brand-800">Cantidad</dt>
            <dd className="text-brand-800/90">{site.quantity}</dd>
          </div>
          <div>
            <dt className="font-medium text-brand-800">Fecha de siembra</dt>
            <dd className="text-brand-800/90">{formatEsMxDate(site.plantingDate)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
