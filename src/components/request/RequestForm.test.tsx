import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { RequestForm } from './RequestForm'

describe('RequestForm', () => {
  it('permite elegir el tipo de solicitante con radios', () => {
    render(<RequestForm onSubmit={vi.fn()} />)
    expect(screen.getByRole('radio', { name: /escuela/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /ayuntamiento/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /sociedad civil/i })).toBeInTheDocument()
  })

  it('muestra por defecto los campos de escuela', () => {
    render(<RequestForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/Nombre de la escuela/i)).toBeInTheDocument()
  })

  it('cambia los campos al seleccionar sociedad civil', async () => {
    const user = userEvent.setup()
    render(<RequestForm onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('radio', { name: /sociedad civil/i }))
    expect(screen.getByLabelText(/Nombre de la persona/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/predio o comunidad/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Nombre de la escuela/i)).not.toBeInTheDocument()
  })

  it('muestra errores de validación al enviar sin datos', async () => {
    const user = userEvent.setup()
    render(<RequestForm onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
  })

  it('incluye el checkbox de Aviso de Privacidad', () => {
    render(<RequestForm onSubmit={vi.fn()} />)
    expect(
      screen.getByRole('checkbox', {
        name: 'He leído y acepto el Aviso de Privacidad Integral',
      }),
    ).toBeInTheDocument()
  })

  it('no envía si no se acepta el Aviso de Privacidad', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RequestForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText(/Nombre de la escuela/i), 'Escuela Test')
    await user.selectOptions(screen.getByLabelText(/Especie preferida/i), 'Flamboyán')
    await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(
      screen.getAllByRole('alert').some((el) =>
        /He leído y acepto el Aviso de Privacidad Integral/.test(el.textContent ?? ''),
      ),
    ).toBe(true)
  })

  it('envía onSubmit con la data tipada al completar el formulario', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RequestForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText(/Nombre de la escuela/i), 'Escuela Test')
    await user.type(screen.getByLabelText(/Nivel educativo/i), 'Primaria')
    await user.type(screen.getByLabelText(/Clave de Centro de Trabajo/i), '31DPR0001A')
    await user.type(screen.getByLabelText(/Municipio/i), 'Mérida')
    await user.type(screen.getByLabelText(/Director\(a\) responsable/i), 'María Pérez')
    await user.type(screen.getByLabelText(/Cantidad estimada/i), '40')
    await user.selectOptions(screen.getByLabelText(/Especie preferida/i), 'Flamboyán')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /enviar solicitud/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    const submitted = onSubmit.mock.calls[0][0]
    expect(submitted.tipoSolicitante).toBe('escuela')
    expect(submitted.aceptaPrivacidad).toBe(true)
    expect(submitted.cantidadEstimada).toBe(40)
  })
})
