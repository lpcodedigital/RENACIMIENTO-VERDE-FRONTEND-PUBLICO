# Tareas Atómicas — Fase 4 (ejecutar UNA a una, en orden)

## Dependencias y datos
- [ ] **T1.** Instalar `react-hook-form`, `zod` y `@hookform/resolvers` (producción; dev según corresponda).
  Archivos: `package.json`
- [ ] **T2.** Añadir `DeliveryPoint` + `deliveryPoints` (≥4, `TODO_OFICIAL`), `requestorTypes` y el mapa de requisitos/campos por tipo al contenido.
  Archivos: `src/data/site-content.ts`

## Módulo: Puntos de Entrega y Viveros (Test First)
- [ ] **T3.** AvailabilityBadge: escribir `AvailabilityBadge.test.tsx` (debe fallar) → implementar `AvailabilityBadge.tsx`
  (texto/token por `stockStatus` y `rainySeasonDemand`).
  Archivos: `src/components/delivery/AvailabilityBadge.test.tsx`, `src/components/delivery/AvailabilityBadge.tsx`
- [ ] **T4.** DeliveryPointCard: escribir `DeliveryPointCard.test.tsx` (debe fallar) → implementar `DeliveryPointCard.tsx`
  (nombre, dirección, horarios, disponibilidad, badge). Datos `TODO_OFICIAL` → "Por confirmar".
  Archivos: `src/components/delivery/DeliveryPointCard.test.tsx`, `src/components/delivery/DeliveryPointCard.tsx`
- [ ] **T5.** DeliveryMap: escribir `DeliveryMap.test.tsx` con `vi.mock` de react-leaflet (debe fallar) →
  implementar `DeliveryMap.tsx` (chunk perezoso, MapContainer Yucatán, tiles CartoDB Positron, divIcon por status, marcadores).
  Archivos: `src/components/delivery/DeliveryMap.test.tsx`, `src/components/delivery/DeliveryMap.tsx`
- [ ] **T6.** DeliverySection: escribir `DeliverySection.test.tsx` (debe fallar) → implementar `DeliverySection.tsx`
  (h2 "Puntos de Entrega y Viveros SDS", listado accesible de tarjetas, lazy loading IntersectionObserver, contenedor del mapa).
  Archivos: `src/components/delivery/DeliverySection.test.tsx`, `src/components/delivery/DeliverySection.tsx`

## Módulo: Formulario de Solicitud (Test First)
- [ ] **T7.** RequestSchema: escribir `RequestSchema.test.ts` (debe fallar) → implementar `RequestSchema.ts`
  (esquema Zod base + por tipo: escuela/ayuntamiento/sociedad; reglas es-MX; `cantidadEstimada` en rango; `aceptaPrivacidad` literal true).
  Archivos: `src/components/request/RequestSchema.test.ts`, `src/components/request/RequestSchema.ts`
- [ ] **T8.** PrivacyCheckbox: escribir `PrivacyCheckbox.test.tsx` (debe fallar) → implementar `PrivacyCheckbox.tsx`
  (checkbox en `fieldset`/`legend`, texto literal "He leído y acepto el Aviso de Privacidad Integral", required, error por campo).
  Archivos: `src/components/request/PrivacyCheckbox.test.tsx`, `src/components/request/PrivacyCheckbox.tsx`
- [ ] **T9.** RequestFields: escribir `RequestFields.test.tsx` (debe fallar) → implementar `RequestFields.tsx`
  (labels arriba-izquierda, inputs con `htmlFor`/`id`, errores con `aria-describedby` bajo cada campo, grupos por tipo de solicitante).
  Archivos: `src/components/request/RequestFields.test.tsx`, `src/components/request/RequestFields.tsx`
- [ ] **T10.** RequestForm: escribir `RequestForm.test.tsx` (debe fallar) → implementar `RequestForm.tsx`
  (`useForm` + `zodResolver`, `resolver` según tipo con `watch`, campos dinámicos por rol, `onSubmit` tipado, limpieza al cambiar de tipo).
  Archivos: `src/components/request/RequestForm.test.tsx`, `src/components/request/RequestForm.tsx`

## Integración y verificación
- [ ] **T11.** Integrar `<DeliverySection />` y el formulario (p. ej. `<SolicitudSection />` que agrupa `<RequestForm />`) en `LandingPage.tsx` tras `<NativeSpecies />`; tests existentes en verde.
  Archivos: `src/components/landing/LandingPage.tsx` (y, si aplica, un pequeño contenedor `src/components/request/SolicitudSection.tsx`)
- [ ] **T12.** Arnés completo + verificación de lazy chunk en `npm run build` (chunk separado para el mapa de puntos de entrega) +
  revisión visual 320px/768px/1440px y navegación con teclado (radios de tipo de solicitante, campos, errores, checkbox de privacidad).
  Archivos: solo los necesarios para corregir fallos.

Resumen del plan
Aspecto	Decisión
Formulario	React Hook Form + Zod + @hookform/resolvers (tech-stack §4)
Dinamismo	Campos por tipo de solicitante (escuela/ayuntamiento/sociedad) según `watch`
Labels	Arriba a la izquierda, asociados con `htmlFor`/`id`
Errores	Junto a cada input con `aria-describedby` y `role="alert"`
Privacidad	Checkbox requerido con texto literal "He leído y acepto el Aviso de Privacidad Integral"
Puntos de entrega	Listado accesible de tarjetas (fallback) + mapa Leaflet lazy
Lazy chunk	React.lazy + Suspense + IntersectionObserver; chunk separado verificable en build
Riesgo anticipado	jsdom no renderiza Leaflet → tests de DeliveryMap con vi.mock de react-leaflet
