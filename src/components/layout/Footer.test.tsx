import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from './Footer'
import { contact, accessibilityLinks } from '../../data/site-content'

describe('Footer', () => {
  it('es un <footer> landmark', () => {
    const { container } = render(<Footer />)
    const footerEl = container.querySelector('footer')
    expect(footerEl).toBeInTheDocument()
  })

  it('renderiza los datos de contacto desde site-content', () => {
    render(<Footer />)
    expect(
      screen.getByText(contact.name),
    ).toBeInTheDocument()
    expect(
      screen.getByText(contact.department),
    ).toBeInTheDocument()
  })

  it('incluye enlaces de accesibilidad y aviso de privacidad', () => {
    render(<Footer />)
    for (const link of accessibilityLinks) {
      expect(
        screen.getByRole('link', { name: link.label }),
      ).toHaveAttribute('href', link.href)
    }
  })

  it('muestra el año actual', () => {
    render(<Footer />)
    expect(
      screen.getByText(new Date().getFullYear().toString(), { exact: false }),
    ).toBeInTheDocument()
  })
})
