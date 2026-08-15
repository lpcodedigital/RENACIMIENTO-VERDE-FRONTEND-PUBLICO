import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import type { PlantationSite } from '../../data/site-content'
import { MapMarkerModal } from './MapMarkerModal'

const site: PlantationSite = {
  id: 'test-1',
  species: 'Flamboyán',
  speciesType: 'Floral',
  municipality: 'Mérida',
  quantity: 180,
  plantingDate: '2025-05-12',
  coordinates: [20.9674, -89.6235],
}

const renderModal = (props: Partial<Parameters<typeof MapMarkerModal>[0]> = {}) => {
  const ref = { current: null }
  const onClose = props.onClose ?? vi.fn()
  const utils = render(
    <MapMarkerModal
      site={site}
      focusReturnRef={ref as React.RefObject<HTMLButtonElement | null>}
      onClose={onClose}
      {...props}
    />,
  )
  return { ref, onClose, ...utils }
}

describe('MapMarkerModal', () => {
  it('es un dialog accesible con aria-modal', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('muestra los 5 datos del sitio', () => {
    renderModal()
    expect(screen.getAllByText('Flamboyán').length).toBeGreaterThan(0)
    expect(screen.getByText('180')).toBeInTheDocument()
    expect(screen.getByText(/12 de mayo de 2025/)).toBeInTheDocument()
    expect(screen.getByText('Mérida')).toBeInTheDocument()
    expect(screen.getByText('Floral')).toBeInTheDocument()
  })

  it('formatea la fecha en es-MX', () => {
    renderModal()
    expect(
      screen.getByText('12 de mayo de 2025'),
    ).toBeInTheDocument()
  })

  it('muestra "Fecha por confirmar" cuando no hay fecha', () => {
    renderModal({
      site: { ...site, plantingDate: '' },
    })
    expect(screen.getByText('Fecha por confirmar')).toBeInTheDocument()
  })

  it('muestra un ícono placeholder como imagen cuando no hay foto', () => {
    renderModal()
    expect(screen.getByLabelText(/árbol/i)).toBeInTheDocument()
  })

  it('cierra al presionar Esc', async () => {
    const user = userEvent.setup()
    const { onClose } = renderModal()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('cierra al hacer clic en el botón visible', async () => {
    const user = userEvent.setup()
    const { onClose } = renderModal()
    await user.click(screen.getByRole('button', { name: /cerrar/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('cierra al hacer clic en el overlay exterior', async () => {
    const user = userEvent.setup()
    const { onClose } = renderModal()
    await user.click(screen.getByRole('dialog').parentElement as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('mueve el foco al contenido al abrirse', async () => {
    renderModal()
    await waitFor(() => {
      expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true)
    })
  })
})
