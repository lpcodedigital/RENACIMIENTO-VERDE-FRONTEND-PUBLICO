import { RequestForm } from './RequestForm'
import { requestorTypes } from '../../data/site-content'

export function SolicitudSection() {
  return (
    <section
      id="solicitud"
      className="bg-brand-50 py-12 sm:py-16"
      aria-label="Solicitud de árboles"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 text-3xl font-bold text-brand-800">
          Solicitud de árboles
        </h2>
        <p className="mb-8 text-brand-800/90">
          Escuelas, ayuntamientos y sociedad civil pueden solicitar especies nativas.
          Elegí el tipo de solicitante para ver los requisitos ({requestorTypes.join(', ')}).
        </p>
        <RequestForm onSubmit={(data) => console.log('Solicitud', data)} />
      </div>
    </section>
  )
}
