import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('expone un rol progressbar con ARIA completo', () => {
    render(<ProgressBar value={25} goal={100} label="Meta estatal" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    expect(bar).toHaveAttribute('aria-valuenow', '25')
    expect(bar).toHaveAttribute('aria-label', 'Meta estatal')
  })

  it('muestra el porcentaje como texto visible', () => {
    render(<ProgressBar value={25} goal={100} label="Meta estatal" />)
    expect(screen.getByText('25%')).toBeInTheDocument()
  })

  it('limita el porcentaje al 100% cuando value supera al goal', () => {
    render(<ProgressBar value={150} goal={100} label="Meta estatal" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '100')
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('muestra 0% cuando el goal es 0 (sin división por cero)', () => {
    render(<ProgressBar value={10} goal={0} label="Meta estatal" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '0')
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
