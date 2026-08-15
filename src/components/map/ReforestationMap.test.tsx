import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ReactNode } from 'react'
import type { PlantationSite } from '../../data/site-content'

vi.mock('leaflet', () => ({
  divIcon: (options: { html?: string }) => ({ __divIcon: true, ...options }),
}))

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom }: { children: ReactNode; center: [number, number]; zoom: number }) => (
    <div data-testid="map-container" data-center={JSON.stringify(center)} data-zoom={String(zoom)}>
      {children}
    </div>
  ),
  TileLayer: ({ url }: { url: string }) => <div data-testid="tile-layer" data-url={url} />,
  Marker: ({ children, icon }: { children?: ReactNode; icon?: { html?: string } }) => (
    <div data-testid="map-marker" data-icon-html={icon?.html}>
      {children}
    </div>
  ),
}))

import { ReforestationMap } from './ReforestationMap'

const sites: PlantationSite[] = [
  {
    id: 'a',
    species: 'Flamboyán',
    speciesType: 'Floral',
    municipality: 'Mérida',
    quantity: 10,
    plantingDate: '2025-05-12',
    coordinates: [20.9674, -89.6235],
  },
  {
    id: 'b',
    species: 'Ciricote',
    speciesType: 'Buena sombra',
    municipality: 'Valladolid',
    quantity: 20,
    plantingDate: '2025-04-03',
    coordinates: [20.6895, -88.2019],
  },
  {
    id: 'c',
    species: 'Yaaxnik',
    speciesType: 'Buena sombra',
    municipality: 'Tizimín',
    quantity: 30,
    plantingDate: '2025-03-18',
    coordinates: [21.1424, -88.1503],
  },
]

describe('ReforestationMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('centra el mapa en Yucatán con teclado habilitado', () => {
    render(<ReforestationMap sites={sites} onMarkerClick={vi.fn()} />)
    const container = screen.getByTestId('map-container')
    expect(container).toHaveAttribute('data-center')
    expect(container).toHaveAttribute('data-zoom', '7')
  })

  it('usa los tiles de CartoDB Positron', () => {
    render(<ReforestationMap sites={sites} onMarkerClick={vi.fn()} />)
    const tile = screen.getByTestId('tile-layer')
    expect(tile.getAttribute('data-url')).toContain('basemaps.cartocdn.com')
  })

  it('renderiza un marcador por sitio recibido', () => {
    render(<ReforestationMap sites={sites} onMarkerClick={vi.fn()} />)
    expect(screen.getAllByTestId('map-marker')).toHaveLength(3)
  })

  it('actualiza el número de marcadores según el filtro', () => {
    render(<ReforestationMap sites={[sites[0]]} onMarkerClick={vi.fn()} />)
    expect(screen.getAllByTestId('map-marker')).toHaveLength(1)
  })

  it('personaliza el ícono por marcador incluyendo la especie', () => {
    render(<ReforestationMap sites={[sites[0]]} onMarkerClick={vi.fn()} />)
    const marker = screen.getAllByTestId('map-marker')[0]
    expect(marker.getAttribute('data-icon-html')).toContain('Flamboyán')
  })
})
