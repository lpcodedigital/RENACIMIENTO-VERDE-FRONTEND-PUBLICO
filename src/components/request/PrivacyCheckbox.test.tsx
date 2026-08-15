import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { requestSchemas } from './RequestSchema'
import { PrivacyCheckbox } from './PrivacyCheckbox'

type CapturedMethods = {
  trigger: (name?: string) => Promise<boolean>
}

let capturedMethods: CapturedMethods | null = null

function FormHost({ children }: { children: ReactNode }) {
  const methods = useForm({
    resolver: zodResolver(requestSchemas.escuela),
    defaultValues: { aceptaPrivacidad: false },
    mode: 'onSubmit',
  })
  capturedMethods = methods as unknown as CapturedMethods
  return <FormProvider {...methods}>{children}</FormProvider>
}

const renderWidget = () => {
  capturedMethods = null
  render(
    <FormHost>
      <PrivacyCheckbox />
    </FormHost>,
  )
}

describe('PrivacyCheckbox', () => {
  it('muestra el texto literal del Aviso de Privacidad Integral', () => {
    renderWidget()
    expect(
      screen.getByText('He leído y acepto el Aviso de Privacidad Integral'),
    ).toBeInTheDocument()
  })

  it('renderiza un checkbox asociado a su label', () => {
    renderWidget()
    const checkbox = screen.getByRole('checkbox', {
      name: 'He leído y acepto el Aviso de Privacidad Integral',
    })
    expect(checkbox).toBeInTheDocument()
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('el checkbox es requerido', () => {
    renderWidget()
    expect(
      screen.getByRole('checkbox', {
        name: 'He leído y acepto el Aviso de Privacidad Integral',
      }),
    ).toBeRequired()
  })

  it('marca el checkbox al interactuar', async () => {
    const user = userEvent.setup()
    renderWidget()
    const checkbox = screen.getByRole('checkbox', {
      name: 'He leído y acepto el Aviso de Privacidad Integral',
    })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('vincula el error de validación con aria-describedby', async () => {
    renderWidget()
    await capturedMethods?.trigger('aceptaPrivacidad')
    const error = screen.getByRole('alert')
    expect(error.getAttribute('id')).toBeTruthy()
    expect(
      screen
        .getByRole('checkbox')
        .getAttribute('aria-describedby')?.split(' '),
    ).toContain(error.getAttribute('id'))
  })
})
