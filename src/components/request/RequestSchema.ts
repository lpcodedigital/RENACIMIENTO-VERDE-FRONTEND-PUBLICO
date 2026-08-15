import { z } from 'zod'
import { requestorTypes } from '../../data/site-content'

export const requestBaseSchema = z.object({
  tipoSolicitante: z.enum(requestorTypes),
  especiePreferida: z.string().min(1, 'Selecciona una especie preferida'),
  aceptaPrivacidad: z
    .boolean()
    .refine((v) => v === true, {
      message: 'He leído y acepto el Aviso de Privacidad Integral',
    }),
})

export const requestSchemas = {
  escuela: requestBaseSchema.extend({
    escuelaNombre: z.string().min(1, 'Ingresa el nombre de la escuela'),
    nivelEducativo: z.string().min(1, 'Ingresa el nivel educativo'),
    cct: z.string().min(1, 'Ingresa la Clave de Centro de Trabajo (CCT)'),
    municipio: z.string().min(1, 'Ingresa el municipio'),
    directorResponsable: z
      .string()
      .min(1, 'Ingresa el nombre de la persona responsable'),
    cantidadEstimada: z
      .number()
      .min(1, 'La cantidad debe ser mayor a 0')
      .max(500, 'La cantidad máxima permitida es 500'),
  }),
  ayuntamiento: requestBaseSchema.extend({
    ayuntamientoNombre: z
      .string()
      .min(1, 'Ingresa el nombre del ayuntamiento o comité'),
    municipio: z.string().min(1, 'Ingresa el municipio'),
    autoridadResponsable: z
      .string()
      .min(1, 'Ingresa la autoridad responsable'),
    cantidadEstimada: z
      .number()
      .min(1, 'La cantidad debe ser mayor a 0')
      .max(500, 'La cantidad máxima permitida es 500'),
  }),
  sociedad: requestBaseSchema.extend({
    nombrePersona: z.string().min(1, 'Ingresa tu nombre'),
    organizacion: z
      .string()
      .optional()
      .or(z.literal('').transform(() => undefined)),
    telefono: z
      .string()
      .min(8, 'Ingresa un teléfono válido')
      .regex(/^\d+$/, 'El teléfono solo debe contener números'),
    correo: z.string().email('Ingresa un correo electrónico válido'),
    municipio: z.string().min(1, 'Ingresa el municipio'),
    predioComunidad: z
      .string()
      .min(1, 'Indica el predio o comunidad donde se sembrará'),
    cantidadEstimada: z
      .number()
      .min(1, 'La cantidad debe ser mayor a 0')
      .max(500, 'La cantidad máxima permitida es 500'),
  }),
}

export type RequestData = z.infer<(typeof requestSchemas)['escuela']>
