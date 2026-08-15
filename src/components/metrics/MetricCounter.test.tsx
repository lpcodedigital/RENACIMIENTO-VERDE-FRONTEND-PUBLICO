import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MetricCounter } from './MetricCounter'
import { metrics } from '../../data/site-content'

const formatEsMx = (value: number) =>
  new Intl.NumberFormat('es-MX').format(value)

describe('MetricCounter', () => {
  it('expone el valor final formateado en es-MX de forma accesible', () => {
    render(
      <MetricCounter value={metrics.treesPlanted} label="Árboles sembrados" />,
    )
    const expected = formatEsMx(metrics.treesPlanted)
    const srValue = screen.getByText(expected, { selector: '.sr-only' })
    expect(srValue).toBeInTheDocument()
  })

  it('hace decorativo el contador animado visible con aria-hidden', () => {
    const { container } = render(
      <MetricCounter value={metrics.treesPlanted} label="Árboles sembrados" />,
    )
    const animated = container.querySelector('[aria-hidden="true"]')
    expect(animated).toBeInTheDocument()
  })

  it('incluye el texto descriptivo del indicador', () => {
    render(
      <MetricCounter value={metrics.treesPlanted} label="Árboles sembrados" />,
    )
    expect(screen.getByText('Árboles sembrados')).toBeInTheDocument()
  })

  it('es un elemento con rol de list/item coherente dentro del dashboard', () => {
    const { container } = render(
      <MetricCounter value={metrics.deliveryPointsActive} label="Puntos activos" />,
    )
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
    expect(
      within(article as HTMLElement).getByText('Puntos activos'),
    ).toBeInTheDocument()
  })
})
