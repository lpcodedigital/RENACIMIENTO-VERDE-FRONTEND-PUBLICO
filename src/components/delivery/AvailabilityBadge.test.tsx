import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AvailabilityBadge } from './AvailabilityBadge'

describe('AvailabilityBadge', () => {
  it('muestra disponibilidad suficiente', () => {
    render(<AvailabilityBadge stockStatus="suficiente" rainySeasonDemand="alta" />)
    expect(screen.getByText(/suficiente/i)).toBeInTheDocument()
  })

  it('muestra disponibilidad limitada', () => {
    render(<AvailabilityBadge stockStatus="limitada" rainySeasonDemand="baja" />)
    expect(screen.getByText(/limitada/i)).toBeInTheDocument()
  })

  it('muestra disponibilidad agotada', () => {
    render(<AvailabilityBadge stockStatus="agotada" rainySeasonDemand="baja" />)
    expect(screen.getByText(/agotada/i)).toBeInTheDocument()
  })

  it('muestra demanda alta en época de lluvias', () => {
    render(<AvailabilityBadge stockStatus="suficiente" rainySeasonDemand="alta" />)
    expect(screen.getByText(/alta demanda/i)).toBeInTheDocument()
  })

  it('muestra demanda baja fuera de lluvias', () => {
    render(<AvailabilityBadge stockStatus="suficiente" rainySeasonDemand="baja" />)
    expect(screen.getByText(/baja demanda/i)).toBeInTheDocument()
  })

  it('asocia un aria-live a la disponibilidad', () => {
    render(<AvailabilityBadge stockStatus="agotada" rainySeasonDemand="alta" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
