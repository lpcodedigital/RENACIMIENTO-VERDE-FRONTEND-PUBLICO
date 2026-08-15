import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ReactNode } from 'react'

vi.mock('leaflet', () => ({
  divIcon: (options: { html?: string }) => ({ __divIcon: true, ...options }),
}))

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom }: { children: ReactNode; center: [number, number]; zoom: number }) => (
    <div data-testid="delivery-map-container" data-center={JSON.stringify(center)} data-zoom={String(zoom)}>
      {children}
    </div>
  ),
  TileLayer: ({ url }: { url: string }) => <div data-testid="delivery-tile-layer" data-url={url} />,
  Marker: ({ children, icon }: { children?: ReactNode; icon?: { html?: string } }) => (
    <div data-testid="delivery-map-marker" data-icon-html={icon?.html}>
      {children}
    </div>
  ),
}))

import { DeliveryMap } from './DeliveryMap'
import { deliveryPoints } from '../../data/site-content'

describe('DeliveryMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('centra el mapa en Yucatán con teclado habilitado', () => {
    render(<DeliveryMap points={deliveryPoints} />)
    const container = screen.getByTestId('delivery-map-container')
    expect(container).toHaveAttribute('data-center')
    expect(container).toHaveAttribute('data-zoom', '7')
  })

  it('usa los tiles de CartoDB Positron', () => {
    render(<DeliveryMap points={deliveryPoints} />)
    const tile = screen.getByTestId('delivery-tile-layer')
    expect(tile.getAttribute('data-url')).toContain('basemaps.cartocdn.com')
  })

  it('renderiza un marcador por punto de entrega recibido', () => {
    render(<DeliveryMap points={deliveryPoints} />)
    expect(screen.getAllByTestId('delivery-map-marker')).toHaveLength(
      deliveryPoints.length,
    )
  })

  it('personaliza el ícono por marcador incluyendo el nombre del punto', () => {
    render(<DeliveryMap points={[deliveryPoints[0]]} />)
    const marker = screen.getAllByTestId('delivery-map-marker')[0]
    expect(marker.getAttribute('data-icon-html')).toContain(deliveryPoints[0].name)
  })
})
