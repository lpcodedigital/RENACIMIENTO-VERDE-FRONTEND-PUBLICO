import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Layout } from './Layout'

describe('Layout', () => {
  it('incluye el skip link como primer elemento que apunta a #contenido', () => {
    render(<Layout>Contenido</Layout>)
    const skip = screen.getByRole('link', { name: /saltar|ir al contenido/i })
    expect(skip).toHaveAttribute('href', '#contenido')
  })

  it('incluye un <main> con id "contenido"', () => {
    render(<Layout>Contenido</Layout>)
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'contenido')
  })

  it('define los landmarks header, main y footer', () => {
    const { container } = render(<Layout>Contenido</Layout>)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
