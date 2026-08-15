# Fase 2 — Impacto Visual y Métricas

> Referencias: `spec/constitution/mission.md`, `tech-stack.md` (§2: framer-motion), `roadmap.md` (Fase 2), `spec/features/fase-1-identidad/spec.md`.

## 1. Alcance
Dashboard de métricas globales en la landing, visible inmediatamente después del Hero:
1. **Contador animado** de árboles sembrados (framer-motion), activado al entrar en viewport.
2. **Barra de porcentaje animada** de árboles sembrados respecto a la meta estatal.
3. **Indicadores** de municipios beneficiados y lugares de entrega activos (contadores animados).

## 2. Requerimientos funcionales
- Los 4 datos viven en `src/data/site-content.ts` (interface `GlobalMetrics`), marcados `TODO_OFICIAL` hasta recibir cifras reales de la SDS (misión §2: transparencia).
- El contador y la barra animan **solo al entrar en viewport** (no en la carga inicial fuera de pantalla).
- Porcentaje = `round(sembrados / meta × 100)`, con tope visual de 100%.
- Números con formato `es-MX` (separador de miles).

## 3. Requerimientos de accesibilidad (WCAG 2.1 AA)
- **`prefers-reduced-motion: reduce`:** sin animación; se muestran los valores finales de inmediato (vía `useReducedMotion` de framer-motion).
- **Barra de progreso:** `role="progressbar"` + `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow={porcentaje}` y `aria-label` descriptivo; porcentaje visible como texto.
- **Contadores:** el valor animado es decorativo (`aria-hidden="true"`); el **valor final** se expone a tecnologías de asistencia con un `sr-only`. La animación nunca es la única vía de información.
- **Jerarquía de headings:** sección con `h2` propio (no rompe el `h1` único del Hero); cada indicador con `h3`.
- **Contraste AA** usando tokens `brand`/`cta` existentes; íconos Lucide decorativos con `aria-hidden="true"`.
- Si `IntersectionObserver` no existe en el navegador, los valores finales se muestran sin animación (fallback progresivo).

## 4. Criterios de aceptación
1. Arnés en verde: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
2. El dashboard renderiza los 4 indicadores con datos de `site-content.ts`.
3. Contador animado presente con valor final accesible (sr-only) y dígitos `aria-hidden`.
4. Barra con `role="progressbar"` y ARIA completo; porcentaje textual visible.
5. Con `prefers-reduced-motion` simulado, los componentes renderizan valores finales sin animar (validado en tests).
6. Tests Vitest + RTL validando criterios 2–5 (incluye mocks de `IntersectionObserver` y `matchMedia` en `src/test/setup.ts`).
7. Sección integrada en la landing tras el Hero; jerarquía h1/h2/h3 intacta; responsive 320px–1440px.
8. Solo dependencias autorizadas: se añade `framer-motion` (tech-stack §2); íconos de `lucide-react` ya instalado.

## 5. Casos borde
- **Meta = 0 o indefinida:** porcentaje 0%, sin división por cero ni NaN.
- **Sembrados > meta:** porcentaje y ancho de barra topados en 100%.
- **Viewport 320px:** indicadores apilados en 1 columna; números grandes sin desbordar.
- **Cifras placeholder:** marcadas `TODO_OFICIAL`; ningún número inventado fuera de `site-content.ts`.
- **JS sin IntersectionObserver (navegadores antiguos/test):** contenido legible con valores finales.
- **Fuera de alcance:** datos en tiempo real / API, gráficas históricas, filtros (fases posteriores).
