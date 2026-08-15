import { describe, it, expect } from 'vitest'
import { requestSchemas } from './RequestSchema'

const schoolValid = {
  tipoSolicitante: 'escuela',
  especiePreferida: 'Flamboyán',
  escuelaNombre: 'Escuela Primaria Niño Artillero',
  nivelEducativo: 'Primaria',
  cct: '31DPR0001A',
  municipio: 'Mérida',
  directorResponsable: 'María Pérez',
  cantidadEstimada: 40,
  aceptaPrivacidad: true,
}

const councilValid = {
  tipoSolicitante: 'ayuntamiento',
  especiePreferida: 'Ciricote',
  ayuntamientoNombre: 'Comité de Reforestación de Motul',
  municipio: 'Motul',
  autoridadResponsable: 'Juan López',
  cantidadEstimada: 120,
  aceptaPrivacidad: true,
}

const civilValid = {
  tipoSolicitante: 'sociedad',
  especiePreferida: 'Yaaxnik',
  nombrePersona: 'Ana Gómez',
  organizacion: 'Colectivo Verdemas',
  telefono: '9991234567',
  correo: 'ana@example.com',
  municipio: 'Tizimín',
  predioComunidad: 'Comisaría San Pedro',
  cantidadEstimada: 15,
  aceptaPrivacidad: true,
}

describe('RequestSchema', () => {
  it('acepta datos válidos de escuela', () => {
    expect(requestSchemas.escuela.safeParse(schoolValid).success).toBe(true)
  })

  it('acepta datos válidos de ayuntamiento', () => {
    expect(requestSchemas.ayuntamiento.safeParse(councilValid).success).toBe(true)
  })

  it('acepta datos válidos de sociedad civil', () => {
    expect(requestSchemas.sociedad.safeParse(civilValid).success).toBe(true)
  })

  it('rechaza sociedad civil sin nombre (campo por tipo requerido)', () => {
    const result = requestSchemas.sociedad.safeParse({
      ...civilValid,
      nombrePersona: '',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.some((i) => i.path[0] === 'nombrePersona')).toBe(true)
  })

  it('rechaza cantidad estimada menor a 1', () => {
    const result = requestSchemas.escuela.safeParse({
      ...schoolValid,
      cantidadEstimada: 0,
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.some((i) => i.path[0] === 'cantidadEstimada')).toBe(true)
  })

  it('rechaza cantidad estimada mayor al máximo', () => {
    const result = requestSchemas.escuela.safeParse({
      ...schoolValid,
      cantidadEstimada: 501,
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.some((i) => i.path[0] === 'cantidadEstimada')).toBe(true)
  })

  it('rechaza cuando no se acepta el Aviso de Privacidad Integral', () => {
    const result = requestSchemas.escuela.safeParse({
      ...schoolValid,
      aceptaPrivacidad: false,
    })
    expect(result.success).toBe(false)
    expect(
      result.error?.issues.some(
        (i) => typeof i.message === 'string' && i.message.includes('Aviso de Privacidad'),
      ),
    ).toBe(true)
  })
})
