import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MapFilters } from './MapFilters'
import {
  municipalityFilterOptions,
  speciesTypeFilterOptions,
} from '../../data/site-content'

describe('MapFilters', () => {
  it('muestra un select para municipio con label asociado', () => {
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={() => {}}
      />,
    )
    const select = screen.getByRole('combobox', {
      name: /municipio/i,
    })
    expect(select).toBeInTheDocument()
    expect(select).toHaveAccessibleName(/municipio/i)
  })

  it('muestra un select para tipo de especie con label asociado', () => {
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={() => {}}
      />,
    )
    const select = screen.getByRole('combobox', {
      name: /tipo de especie/i,
    })
    expect(select).toBeInTheDocument()
    expect(select).toHaveAccessibleName(/tipo de especie/i)
  })

  it('ofrece una opción por cada municipio de los datos', () => {
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={() => {}}
      />,
    )
    const select = screen.getByRole('combobox', {
      name: /municipio/i,
    })
    const options = screen.getAllByRole('option')
    municipalityFilterOptions.forEach((municipality) => {
      expect(options.length).toBe(
        municipalityFilterOptions.length + speciesTypeFilterOptions.length + 2,
      )
      expect(select.textContent).toContain(municipality)
    })
  })

  it('ofrece una opción por cada tipo de especie de los datos', () => {
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={() => {}}
      />,
    )
    const select = screen.getByRole('combobox', {
      name: /tipo de especie/i,
    })
    speciesTypeFilterOptions.forEach((speciesType) => {
      expect(select.textContent).toContain(speciesType)
    })
  })

  it('llama a onMunicipalityChange al cambiar el municipio', async () => {
    const user = userEvent.setup()
    const onMunicipalityChange = vi.fn()
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={onMunicipalityChange}
        onSpeciesTypeChange={() => {}}
      />,
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /municipio/i }),
      municipalityFilterOptions[0],
    )
    expect(onMunicipalityChange).toHaveBeenCalledWith(
      municipalityFilterOptions[0],
    )
  })

  it('llama a onSpeciesTypeChange al cambiar el tipo de especie', async () => {
    const user = userEvent.setup()
    const onSpeciesTypeChange = vi.fn()
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={onSpeciesTypeChange}
      />,
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /tipo de especie/i }),
      speciesTypeFilterOptions[0],
    )
    expect(onSpeciesTypeChange).toHaveBeenCalledWith(
      speciesTypeFilterOptions[0],
    )
  })

  it('comunica el número de resultados con aria-live', () => {
    render(
      <MapFilters
        municipalities={municipalityFilterOptions}
        speciesTypes={speciesTypeFilterOptions}
        municipality=""
        speciesType=""
        resultCount={3}
        onMunicipalityChange={() => {}}
        onSpeciesTypeChange={() => {}}
      />,
    )
    expect(screen.getByRole('status')).toHaveTextContent(/3/)
  })
})
