import { useFormContext } from 'react-hook-form'
import { requestorFieldMap, type RequestorType } from '../../data/site-content'

interface RequestFieldsProps {
  tipoSolicitante: RequestorType
}

const ESPECIES = [
  'Flamboyán',
  'Ciricote',
  'Yaaxnik',
  'Chaká',
  'Uva de mar',
  'Tsalam',
]

const registerFor = (key: string) =>
  key === 'cantidadEstimada' ? { valueAsNumber: true } : {}

export function RequestFields({ tipoSolicitante }: RequestFieldsProps) {
  const { register, formState } = useFormContext()
  const fields = requestorFieldMap[tipoSolicitante]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label
          htmlFor="especiePreferida"
          className="text-sm font-medium text-brand-800"
        >
          Especie preferida
        </label>
        <select
          id="especiePreferida"
          {...register('especiePreferida')}
          className="rounded border border-brand-200 bg-white px-3 py-2 text-brand-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          <option value="">Selecciona una especie</option>
          {ESPECIES.map((especie) => (
            <option key={especie} value={especie}>
              {especie}
            </option>
          ))}
        </select>
      </div>

      {fields.map((field) => {
        const error = formState.errors[field.key]
        const inputType =
          field.key === 'cantidadEstimada'
            ? 'number'
            : field.key === 'telefono'
              ? 'tel'
              : 'text'
        return (
          <div key={field.key} className="flex flex-col gap-1">
            <label
              htmlFor={field.key}
              className="text-sm font-medium text-brand-800"
            >
              {field.label}
              {field.required && (
                <span aria-hidden="true" className="text-red-700">
                  {' '}
                  *
                </span>
              )}
            </label>
            <input
              id={field.key}
              type={inputType}
              {...register(field.key, registerFor(field.key))}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${field.key}-error` : undefined}
              className="rounded border border-brand-200 bg-white px-3 py-2 text-brand-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            {error && (
              <p id={`${field.key}-error`} role="alert" className="text-sm text-red-700">
                {typeof error.message === 'string' ? error.message : ''}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
