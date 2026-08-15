import { useFormContext } from 'react-hook-form'

const PRIVACY_LABEL = 'He leído y acepto el Aviso de Privacidad Integral'
const FIELD_NAME = 'aceptaPrivacidad'

export function PrivacyCheckbox() {
  const { register, formState } = useFormContext()
  const error = formState.errors[FIELD_NAME]
  const errorId = `${FIELD_NAME}-error`

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-brand-800">
        Aviso de Privacidad
      </legend>
      <div className="flex items-start gap-2">
        <input
          id={FIELD_NAME}
          type="checkbox"
          required
          {...register(FIELD_NAME)}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-4 w-4 rounded border-brand-300 text-brand-700 focus:ring-brand-500"
        />
        <label htmlFor={FIELD_NAME} className="text-sm text-brand-800/90">
          {PRIVACY_LABEL}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-700">
          {typeof error.message === 'string' ? error.message : PRIVACY_LABEL}
        </p>
      )}
    </fieldset>
  )
}
