import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MetricsDashboard } from './MetricsDashboard'
import { metrics } from '../../data/site-content'

const formatEsMx = (value: number) =>
  new Intl.NumberFormat('es-MX').format(value)

const percent = Math.min(100, Math.round((metrics.treesPlanted / metrics.treesGoal) * 100))

describe('MetricsDashboard', () => {
  it('incluye un título de sección h2', () => {
    render(<MetricsDashboard />)
    expect(
      screen.getByRole('heading', { level: 2 }),
    ).toBeInTheDocument()
  })

  it('incluye el contador accesible de árboles sembrados con datos reales', () => {
    render(<MetricsDashboard />)
    expect(
      screen.getByText(formatEsMx(metrics.treesPlanted), { selector: '.sr-only' }),
    ).toBeInTheDocument()
  })

  it('incluye la barra de progreso de la meta estatal', () => {
    render(<MetricsDashboard />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', String(percent))
    expect(screen.getByText(`${percent}%`)).toBeInTheDocument()
  })

  it('incluye indicadores de municipios y puntos de entrega', () => {
    render(<MetricsDashboard />)
    expect(
      screen.getByText(formatEsMx(metrics.municipalitiesBenefited), {
        selector: '.sr-only',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(formatEsMx(metrics.deliveryPointsActive), {
        selector: '.sr-only',
      }),
    ).toBeInTheDocument()
  })

  it('usa un h3 por cada indicador (jerarquía de headings)', () => {
    render(<MetricsDashboard />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.length).toBeGreaterThanOrEqual(3)
  })
})
