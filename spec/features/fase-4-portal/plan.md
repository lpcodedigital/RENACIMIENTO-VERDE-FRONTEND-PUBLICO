# Plan Técnico — Fase 4 (Kimi K3, Orquestador)

## 1. Arquitectura
Dos nuevos módulos:
- `src/components/delivery/`: sección "Puntos de Entrega y Viveros SDS" (listado, puntos de entrega, disponibilidad por época de lluvias y mapa lazy).
- `src/components/request/`: formulario dinámico de solicitud pública con React Hook Form + Zod.

**Formulario obligatorio con `react-hook-form` y `zod`** (tech-stack §4). El
esquema Zod se deriva por tipo de solicitante; el tipo se selecciona con radios y
condiciona los campos visibles.

Archivos a crear/modificar:
```
src/
├── data/site-content.ts                    # MODIFICAR: + DeliveryPoint + deliveryPoints + tipos/requisitos (TODO_OFICIAL)
├── components/
│   ├── delivery/
│   │   ├── DeliverySection.tsx             + DeliverySection.test.tsx   # h2 "Puntos de Entrega y Viveros", listado, fallback accesible
│   │   ├── DeliveryPointCard.tsx           + DeliveryPointCard.test.tsx # tarjeta: nombre, dirección, horarios, disponibilidad
│   │   ├── DeliveryMap.tsx                 + DeliveryMap.test.tsx       # chunk perezoso Leaflet (puntos de entrega)
│   │   └── AvailabilityBadge.tsx           + AvailabilityBadge.test.tsx # suficiente/limitada/agotada + época de lluvias
│   ├── request/
│   │   ├── RequestForm.tsx                 + RequestForm.test.tsx       # useForm + zodResolver, campos dinámicos
│   │   ├── RequestSchema.ts                + RequestSchema.test.ts      # esquemas Zod por tipo de solicitante
│   │   ├── RequestFields.tsx               + RequestFields.test.tsx     # render condicional de grupos de campos
│   │   └── PrivacyCheckbox.tsx             + PrivacyCheckbox.test.tsx   # checkbox obligatorio "He leído y acepto el Aviso de Privacidad Integral"
│   └── landing/LandingPage.tsx             # MODIFICAR: insertar <DeliverySection /> y <RequestForm /> (o contenedor) tras <NativeSpecies />
package.json                                # MODIFICAR: + react-hook-form, zod, @hookform/resolvers
```

## 2. Modelo de datos (site-content.ts)
```ts
export interface DeliveryPoint {
  id: string
  name: string
  municipality: string
  address: string
  schedule: string         // horarios; '' => "Por confirmar"
  coordinates: [number, number]
  stockStatus: 'suficiente' | 'limitada' | 'agotada'  // TODA_OFICIAL
  rainySeasonDemand: 'alta' | 'baja'                 // demanda según época de lluvias
  isNursery: boolean
}
export const deliveryPoints: DeliveryPoint[] = [ /* ≥ 4 puntos, TODO_OFICIAL */ ]
export const requestorTypes = ['escuela', 'ayuntamiento', 'sociedad'] as const
```
- Nombres de campo comunes: `tipoSolicitante`, `especiePreferida`, `cantidadEstimada`,
  `aceptaPrivacidad` (boolean literal `true`).
- Campos por tipo (objeto `requestorFieldMap`), validados por Zod con
  `z.enum`, `z.string().min()`, `z.number().min(1).max(...)`, `z.literal(true)`.

## 3. Formulario (React Hook Form + Zod)
- `RequestForm` usa `useForm<RequestData>({ resolver: zodResolver(schemaPorTipo), defaultValues, mode: 'onTouched' })`.
- El `resolver` se elige según `tipoSolicitante` (observado con `watch`); los campos
  dependientes del rol se registran solo cuando aplican.
- **Labels arriba a la izquierda** (`flex flex-col items-start`) con `htmlFor`/`id`.
- **Errores junto a cada input**: `<p role="alert" aria-describedby>` bajo el campo.
- **Privacidad**: checkbox requerido con texto literal
  "He leído y acepto el Aviso de Privacidad Integral"; `fieldset`/`legend`.
- `onSubmit` recibe `RequestData` tipada; en este alcance no hay backend (caso borde: fuera de alcance).
- `PrivacyCheckbox` aísla el checkbox y su mensaje de error.

## 4. Puntos de Entrega y mapa lazy
- `DeliverySection`: `h2` "Puntos de Entrega y Viveros SDS", listado de tarjetas
  (siempre visible = fallback accesible) y `DeliveryMap` con `React.lazy` +
  `Suspense` + `IntersectionObserver` (una vez en viewport).
- `DeliveryMap`: **chunk perezoso** con `import('leaflet/dist/leaflet.css')` dentro
  del componente; `MapContainer` Yucatán, tiles CartoDB Positron (Fase 3, tech-stack §3),
  `L.divIcon` por status; `import 'leaflet/dist/leaflet.css'` en el chunk, no en `index.css`.
- `AvailabilityBadge`: texto y token de color por `stockStatus` y `rainySeasonDemand`.

## 5. Estrategia de pruebas (Test First, por componente)
jsdom no renderiza mapas reales: tests de `DeliveryMap` con `vi.mock` de
`react-leaflet`/`leaflet`. Los demás son de UI/lógica pura:
- `RequestSchema`: esquema por cada tipo valida datos válidos e inválidos (reglas y mensajes es-MX).
- `RequestForm`: campos dinámicos según `tipoSolicitante`, errores por campo al enviar inválido,
  envío válido → `onSubmit` con data tipada, cambio de tipo limpia campos dependientes.
- `PrivacyCheckbox`: texto literal exacto, required, mensaje de error al no aceptar.
- `DeliverySection`/`DeliveryPointCard`/`AvailabilityBadge`: contenido de puntos, disponibilidad, horarios, fallback accesible.
- `DeliveryMap`: props (centro, tiles, nº de marcadores), con mocks.
- Flujo: test → rojo → implementación → verde (por tarea).

## 6. Notas para el Trabajador
- TypeScript strict; `coordinates` como tupla `[number, number]`.
- Esquema compartido en `RequestSchema.ts`; mensajes de error en es-MX.
- No agregar dependencias fuera de tech-stack §4 (`react-hook-form`, `zod`, `@hookform/resolvers`) y §3 (mapa).
- No reescribir secciones de Fases 1–3 salvo la línea de integración en `LandingPage.tsx`.
- Respetar la Guía de Imagen Institucional: labels arriba-izquierda, errores por campo,
  texto exacto del checkbox de Privacidad Integral.
