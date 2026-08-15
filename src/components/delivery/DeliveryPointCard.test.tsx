import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { DeliveryPoint } from '../../data/site-content'
import { DeliveryPointCard } from './DeliveryPointCard'

const completePoint: DeliveryPoint = {
  id: 'p1',
  name: 'Vivero Xmatkuil',
  municipality: 'Mérida',
  address: 'Calle 21 s/n, Xmatkuil',
  schedule: 'Lunes a viernes 8:00 a 15:00 hrs',
  coordinates: [20.79, -89.68],
  stockStatus: 'suficiente',
  rainySeasonDemand: 'alta',
  isNursery: true,
}

describe('DeliveryPointCard', () => {
  it('muestra el nombre del punto', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByText('Vivero Xmatkuil')).toBeInTheDocument()
  })

  it('muestra la dirección del punto', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByText(/Calle 21 s\/n, Xmatkuil/)).toBeInTheDocument()
  })

  it('muestra el municipio', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByText(/Mérida/)).toBeInTheDocument()
  })

  it('muestra los horarios', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByText(/Lunes a viernes 8:00 a 15:00 hrs/)).toBeInTheDocument()
  })

  it('muestra el badge de disponibilidad', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('muestra "Por confirmar" cuando el horario no está disponible', () => {
    render(
      <DeliveryPointCard
        point={{ ...completePoint, schedule: '' }}
      />,
    )
    expect(screen.getByText('Por confirmar')).toBeInTheDocument()
  })

  it('muestra "Vivero" como tipo del punto cuando es vivero', () => {
    render(<DeliveryPointCard point={completePoint} />)
    expect(screen.getByText('Vivero', { exact: true })).toBeInTheDocument()
  })

  it('indica que es un punto de entrega cuando no es vivero', () => {
    render(
      <DeliveryPointCard point={{ ...completePoint, isNursery: false }} />,
    )
    expect(
      screen.getByText('Punto de entrega', { exact: true }),
    ).toBeInTheDocument()
  })
})
