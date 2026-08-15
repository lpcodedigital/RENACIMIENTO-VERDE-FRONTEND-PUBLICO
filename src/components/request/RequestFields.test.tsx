import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { requestSchemas } from './RequestSchema'
import { requestorFieldMap } from '../../data/site-content'
import { RequestFields } from './RequestFields'

type CapturedMethods = {
  trigger: () => Promise<boolean>
}

let capturedMethods: CapturedMethods | null = null

function FormHost({
  tipoSolicitante,
  children,
}: {
  tipoSolicitante: 'escuela' | 'ayuntamiento' | 'sociedad'
  children: ReactNode
}) {
  const methods = useForm({
    resolver: zodResolver(requestSchemas[tipoSolicitante]),
    defaultValues: { tipoSolicitante },
    mode: 'onSubmit',
  })
  capturedMethods = methods as unknown as CapturedMethods
  return <FormProvider {...methods}>{children}</FormProvider>
}

const renderFields = (tipoSolicitante: Parameters<typeof RequestFields>[0]['tipoSolicitante']) => {
  capturedMethods = null
  render(
    <FormHost tipoSolicitante={tipoSolicitante}>
      <RequestFields tipoSolicitante={tipoSolicitante} />
    </FormHost>,
  )
}

describe('RequestFields', () => {
  it('renderiza un campo con label y input asociados', () => {
    renderFields('escuela')
    const label = screen.getByLabelText(/Nombre de la escuela/i)
    expect(label.tagName).toBe('INPUT')
  })

  it('muestra un campo por requisito del rol seleccionado', () => {
    renderFields('ayuntamiento')
    requestorFieldMap.ayuntamiento.forEach((field) => {
      expect(screen.getByLabelText(new RegExp(field.label, 'i'))).toBeInTheDocument()
    })
  })

  it('no muestra campos de otro rol', () => {
    renderFields('escuela')
    expect(screen.queryByLabelText(/Nombre de la persona/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/organización \/ colectivo/i)).not.toBeInTheDocument()
  })

  it('muestra el campo de especie preferida', () => {
    renderFields('sociedad')
    expect(screen.getByLabelText(/especie preferida/i)).toBeInTheDocument()
  })

  it('muestra un error bajo el campo con aria-describedby', async () => {
    const user = userEvent.setup()
    renderFields('escuela')
    const schoolName = screen.getByLabelText(/Nombre de la escuela/i)
    await user.click(schoolName)
    await user.tab()
    await capturedMethods?.trigger()
    const linkedIds = schoolName
      .getAttribute('aria-describedby')
      ?.split(' ')
    expect(linkedIds).toBeTruthy()
    const linkedError = screen.getByText(/Ingresa el nombre de la escuela/i)
    expect(linkedError.getAttribute('role')).toBe('alert')
    expect(linkedIds).toContain(linkedError.getAttribute('id'))
  })
})
