import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

vi.mock('./ReforestationMap', () => ({
  default: ({ sites }: { sites: unknown[] }) => (
    <div data-testid="reforestation-map">Mapa con {sites.length} sitios</div>
  ),
}))

import { MapSection } from './MapSection'
import {
  plantations,
  municipalityFilterOptions,
  speciesTypeFilterOptions,
} from '../../data/site-content'

const fireInterested = () => {
  intersectionCallback?.(
    [{ isIntersecting: true } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )
}

describe('MapSection', () => {
  beforeEach(() => {
    intersectionCallback = undefined
  })

  it('muestra un título de sección h2', () => {
    render(<MapSection />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('no carga el mapa hasta que entra la sección en viewport', () => {
    render(<MapSection />)
    expect(screen.queryByTestId('reforestation-map')).not.toBeInTheDocument()
  })

  it('carga el mapa al entrar en viewport', async () => {
    render(<MapSection />)
    fireInterested()
    expect(await screen.findByTestId('reforestation-map')).toBeInTheDocument()
  })

  it('muestra la lista accesible de sitios con todos los datos', () => {
    render(<MapSection />)
    const list = screen.getByRole('list', {
      name: /sitios de reforestación/i,
    })
    expect(list).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(plantations.length)
    plantations.forEach((site) => {
      expect(list.textContent).toContain(site.species)
      expect(list.textContent).toContain(site.municipality)
      expect(list.textContent).toContain(String(site.quantity))
    })
  })

  it('muestra "sin resultados" cuando el filtro no coincide', async () => {
    const user = userEvent.setup()
    render(<MapSection />)
    const municipality = municipalityFilterOptions[0]
    const typesInMunicipality = new Set(
      plantations
        .filter((s) => s.municipality === municipality)
        .map((s) => s.speciesType),
    )
    const typeNotThere = speciesTypeFilterOptions.find(
      (t) => !typesInMunicipality.has(t),
    )
    expect(typeNotThere).toBeTruthy()
    await user.selectOptions(
      screen.getByRole('combobox', { name: /municipio/i }),
      municipality,
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /tipo de especie/i }),
      typeNotThere!,
    )
    fireInterested()
    expect(
      await screen.findByText(/no hay sitios para este filtro/i),
    ).toBeInTheDocument()
  })

  it('filtra los sitios de la lista por municipio', async () => {
    const user = userEvent.setup()
    render(<MapSection />)
    const municipality = municipalityFilterOptions[0]
    await user.selectOptions(
      screen.getByRole('combobox', { name: /municipio/i }),
      municipality,
    )
    const items = screen.getAllByRole('listitem')
    items.forEach((item) => {
      expect(item.textContent).toContain(municipality)
    })
  })

  it('filtra los sitios de la lista por tipo de especie', async () => {
    const user = userEvent.setup()
    render(<MapSection />)
    const type = speciesTypeFilterOptions[0]
    await user.selectOptions(
      screen.getByRole('combobox', { name: /tipo de especie/i }),
      type,
    )
    const expectedSpecies = plantations
      .filter((s) => s.speciesType === type)
      .map((s) => s.species)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(expectedSpecies.length)
    items.forEach((item) => {
      const speciesName = expectedSpecies.find((name) =>
        item.textContent?.includes(name),
      )
      expect(speciesName).toBeTruthy()
    })
  })
})
