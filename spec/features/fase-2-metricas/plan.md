# Plan Técnico — Fase 2 (Kimi K3, Orquestador)

## 1. Arquitectura
Nuevo módulo `src/components/metrics/` con 3 componentes presentacionales puros.
Datos centralizados en `site-content.ts`. Integración: `<MetricsDashboard />` tras `<Hero />`
en `LandingPage.tsx` (impacto inmediato al abrir la página; posición ajustable).

Archivos a crear/modificar:
```
src/
├── data/site-content.ts                  # MODIFICAR: + interface GlobalMetrics + const metrics (TODO_OFICIAL)
├── test/setup.ts                         # MODIFICAR: + mocks IntersectionObserver y matchMedia (jsdom)
├── components/
│   ├── landing/LandingPage.tsx           # MODIFICAR: insertar <MetricsDashboard /> tras <Hero />
│   └── metrics/
│       ├── MetricCounter.tsx             + MetricCounter.test.tsx
│       ├── ProgressBar.tsx               + ProgressBar.test.tsx
│       └── MetricsDashboard.tsx          + MetricsDashboard.test.tsx
package.json                              # MODIFICAR: + framer-motion
```

## 2. Integración de framer-motion (tech-stack §2)
- `MetricCounter`: `useMotionValue(0)` + `animate()` en `useEffect` cuando `useInView(ref, { once: true })`;
  redondeo por frame al entero más cercano; formateo `Intl.NumberFormat('es-MX')`.
  Con `useReducedMotion()` → set directo del valor final.
  DOM: dígitos animados `aria-hidden="true"` + `<span className="sr-only">{valorFinal}</span>`.
- `ProgressBar`: `motion.div` con `initial={{ width: 0 }}`, `whileInView={{ width: pct + '%' }}`,
  `viewport={{ once: true }}`; con reduced-motion, `initial`/`animate` = ancho final.
  ARIA: `role="progressbar"`, `aria-valuemin/max/now`, `aria-label` en el contenedor.
- `MetricsDashboard`: layout en grid responsive (1 col móvil → 2/4 cols), título `h2` de sección,
  íconos Lucide (`TreePine`, `Target`, `MapPinned`, `Warehouse`) decorativos.

## 3. Datos (site-content.ts)
```ts
export interface GlobalMetrics {
  treesPlanted: number        // TODO_OFICIAL
  treesGoal: number           // TODO_OFICIAL
  municipalitiesBenefited: number  // TODO_OFICIAL
  deliveryPointsActive: number     // TODO_OFICIAL
}
export const metrics: GlobalMetrics = { /* placeholders claros */ }
```

## 4. Prerequisito de tests (crítico)
jsdom no implementa `IntersectionObserver` ni `matchMedia`. Se añaden mocks mínimos
en `src/test/setup.ts` antes de los tests de métricas, para que `useInView` /
`useReducedMotion` funcionen en el entorno de prueba.

## 5. Estrategia de pruebas (Test First, por componente)
- `MetricCounter.test.tsx`: valor final accesible (sr-only), dígitos aria-hidden,
  formato es-MX, reduced-motion → valor final inmediato.
- `ProgressBar.test.tsx`: role/ARIA correctos, porcentaje textual, clamp 100%,
  meta 0 → 0%.
- `MetricsDashboard.test.tsx`: 4 indicadores renderizados desde site-content,
  h2 de sección presente, íconos aria-hidden.
- Flujo por tarea: test → rojo → implementación → verde.

## 6. Notas para el Trabajador
- TypeScript strict; props tipadas (`value`, `label`, `goal?`).
- Sin hex hardcodeados; solo tokens `brand`/`cta` de Fase 1.
- No modificar componentes de Fase 1 salvo la línea de integración en `LandingPage.tsx`.
- `framer-motion` es la única dependencia nueva permitida en esta fase.
