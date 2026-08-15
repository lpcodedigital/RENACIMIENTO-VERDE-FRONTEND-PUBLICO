import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('configuración de Vitest + RTL', () => {
  it('renderiza la App en entorno jsdom', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Renacimiento Verde' }),
    ).toBeInTheDocument()
  })
})
