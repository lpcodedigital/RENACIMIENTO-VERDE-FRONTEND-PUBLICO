# Tareas Atómicas — Fase 2 (ejecutar UNA a una, en orden)

## Dependencias y datos
- [ ] **T1.** Instalar `framer-motion` (dependencia de producción).
  Archivos: `package.json`
- [ ] **T2.** Añadir `GlobalMetrics` + `metrics` (placeholders `TODO_OFICIAL`) al contenido.
  Archivos: `src/data/site-content.ts`
- [ ] **T3.** Añadir mocks de `IntersectionObserver` y `matchMedia` para el entorno jsdom.
  Archivos: `src/test/setup.ts`

## Componentes (Test First)
- [ ] **T4.** MetricCounter: escribir `MetricCounter.test.tsx` (debe fallar) → implementar `MetricCounter.tsx`
  (contador animado on-view, sr-only con valor final, formato es-MX, reduced-motion).
  Archivos: `src/components/metrics/MetricCounter.test.tsx`, `src/components/metrics/MetricCounter.tsx`
- [ ] **T5.** ProgressBar: escribir `ProgressBar.test.tsx` (debe fallar) → implementar `ProgressBar.tsx`
  (role=progressbar + ARIA, clamp 100%, meta 0 → 0%, animación de ancho on-view, reduced-motion).
  Archivos: `src/components/metrics/ProgressBar.test.tsx`, `src/components/metrics/ProgressBar.tsx`
- [ ] **T6.** MetricsDashboard: escribir `MetricsDashboard.test.tsx` (debe fallar) → implementar `MetricsDashboard.tsx`
  (h2 de sección, 4 indicadores desde site-content, íconos Lucide aria-hidden, grid responsive).
  Archivos: `src/components/metrics/MetricsDashboard.test.tsx`, `src/components/metrics/MetricsDashboard.tsx`

## Integración y verificación
- [ ] **T7.** Integrar `<MetricsDashboard />` tras `<Hero />` en `LandingPage.tsx` y verificar que los tests
  existentes (incluido el de LandingPage de Fase 1) siguen en verde.
  Archivos: `src/components/landing/LandingPage.tsx`
- [ ] **T8.** Arnés completo: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
  Revisión visual 320px/768px/1440px y con teclado (animación solo al hacer scroll al dashboard).
  Archivos: solo los necesarios para corregir fallos.
