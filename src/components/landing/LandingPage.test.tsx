import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LandingPage } from './LandingPage'
import { hero, about, objectives, speciesBenefits } from '../../data/site-content'

describe('LandingPage', () => {
  it('incluye el Hero con el propósito del programa', () => {
    render(<LandingPage />)
    expect(
      screen.getByRole('heading', { name: hero.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(hero.subtitle, { exact: false })).toBeInTheDocument()
  })

  it('incluye la sección "¿Qué es Renacimiento Verde?"', () => {
    render(<LandingPage />)
    expect(
      screen.getByRole('heading', { name: about.title }),
    ).toBeInTheDocument()
    for (const paragraph of about.body) {
      expect(screen.getByText(paragraph, { exact: false })).toBeInTheDocument()
    }
  })

  it('incluye al menos 3 objetivos', () => {
    render(<LandingPage />)
    expect(objectives.length).toBeGreaterThanOrEqual(3)
    for (const objective of objectives) {
      expect(
        screen.getByRole('heading', { name: objective.title }),
      ).toBeInTheDocument()
    }
  })

  it('incluye al menos 3 beneficios de especies nativas', () => {
    render(<LandingPage />)
    expect(speciesBenefits.length).toBeGreaterThanOrEqual(3)
    for (const benefit of speciesBenefits) {
      expect(
        screen.getByRole('heading', { name: benefit.title }),
      ).toBeInTheDocument()
    }
  })
})
