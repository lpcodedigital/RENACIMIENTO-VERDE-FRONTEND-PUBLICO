import { FormProvider, useForm } from 'react-hook-form'
import type { Resolver, ResolverResult } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  requestorTypes,
  type RequestorType,
} from '../../data/site-content'
import { requestSchemas, type RequestData } from './RequestSchema'
import { RequestFields } from './RequestFields'
import { PrivacyCheckbox } from './PrivacyCheckbox'

const resolver: Resolver<RequestData> = (values, context, options) =>
  zodResolver(
    requestSchemas[values.tipoSolicitante] as typeof requestSchemas.escuela,
  )(values, context, options) as ResolverResult<RequestData>

const TYPE_LABELS: Record<RequestorType, string> = {
  escuela: 'Escuela',
  ayuntamiento: 'Ayuntamiento',
  sociedad: 'Sociedad Civil',
}

interface RequestFormProps {
  onSubmit: (data: RequestData) => void
}

export function RequestForm({ onSubmit }: RequestFormProps) {
  const methods = useForm<RequestData>({
    resolver,
    defaultValues: {
      tipoSolicitante: 'escuela',
      especiePreferida: '',
      aceptaPrivacidad: false,
    },
    mode: 'onSubmit',
  })

  const {
    register,
    handleSubmit,
    formState,
    watch,
  } = methods
  const tipoSolicitante = watch('tipoSolicitante') as RequestorType

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        noValidate
        className="flex flex-col gap-6"
      >
        <fieldset className="flex flex-col gap-2">
          <legend className="text-base font-semibold text-brand-800">
            Tipo de solicitante
          </legend>
          <div className="flex flex-wrap gap-4">
            {requestorTypes.map((tipo) => (
              <label
                key={tipo}
                className="flex items-center gap-2 text-sm text-brand-800/90"
              >
                <input
                  type="radio"
                  value={tipo}
                  {...register('tipoSolicitante')}
                  className="h-4 w-4 text-brand-700 focus:ring-brand-500"
                />
                {TYPE_LABELS[tipo]}
              </label>
            ))}
          </div>
        </fieldset>

        <RequestFields tipoSolicitante={tipoSolicitante} />

        <PrivacyCheckbox />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Enviar solicitud
        </button>

        {formState.isSubmitting && (
          <p role="status">Enviando solicitud…</p>
        )}
      </form>
    </FormProvider>
  )
}
