import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'
import { institution, navLinks } from '../../data/site-content'

describe('Header', () => {
  it('muestra el nombre de la institución y del programa', () => {
    render(<Header />)
    expect(
      screen.getByText(institution.name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(institution.programName),
    ).toBeInTheDocument()
  })

  it('incluye un <nav> con etiqueta accesible', () => {
    const { container } = render(<Header />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label')
  })

  it('renders un enlace por cada elemento de navegación', () => {
    render(<Header />)
    for (const link of navLinks) {
      expect(
        screen.getByRole('link', { name: link.label }),
      ).toHaveAttribute('href', link.href)
    }
  })
})
