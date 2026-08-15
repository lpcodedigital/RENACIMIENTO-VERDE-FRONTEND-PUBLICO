import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

let intersectionCallback: IntersectionObserverCallback | undefined

class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

vi.mock('./DeliveryMap', () => ({
  default: () => <div data-testid="delivery-map">Mapa de puntos</div>,
}))

import { DeliverySection } from './DeliverySection'
import { deliveryPoints } from '../../data/site-content'

const fireInterested = () => {
  intersectionCallback?.(
    [{ isIntersecting: true } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )
}

describe('DeliverySection', () => {
  beforeEach(() => {
    intersectionCallback = undefined
  })

  it('muestra un título de sección h2 "Puntos de Entrega y Viveros SDS"', () => {
    render(<DeliverySection />)
    expect(
      screen.getByRole('heading', { level: 2, name: /puntos de entrega y viveros/i }),
    ).toBeInTheDocument()
  })

  it('muestra una tarjeta por punto de entrega', () => {
    render(<DeliverySection />)
    expect(screen.getAllByRole('article')).toHaveLength(deliveryPoints.length)
  })

  it('no carga el mapa hasta que entra la sección en viewport', () => {
    render(<DeliverySection />)
    expect(screen.queryByTestId('delivery-map')).not.toBeInTheDocument()
  })

  it('carga el mapa al entrar en viewport', async () => {
    render(<DeliverySection />)
    fireInterested()
    expect(await screen.findByTestId('delivery-map')).toBeInTheDocument()
  })

  it('muestra el nombre de cada punto de entrega', () => {
    render(<DeliverySection />)
    deliveryPoints.forEach((point) => {
      expect(screen.getByText(point.name)).toBeInTheDocument()
    })
  })

  it('lista los puntos de entrega con una lista accesible', () => {
    render(<DeliverySection />)
    const list = screen.getByRole('list', {
      name: /puntos de entrega/i,
    })
    expect(list).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(deliveryPoints.length)
  })
})
