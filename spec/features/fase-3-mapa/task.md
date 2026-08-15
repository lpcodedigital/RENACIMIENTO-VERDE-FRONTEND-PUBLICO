# Tareas Atómicas — Fase 3 (ejecutar UNA a una, en orden)

## Dependencias y datos
- [ ] **T1.** Instalar `leaflet`, `react-leaflet` y `@types/leaflet` (producción/dev según corresponda).
  Archivos: `package.json`
- [ ] **T2.** Añadir `PlantationSite` + `plantations` (≥6 sitios, `TODO_OFICIAL`) y listas de filtros al contenido.
  Archivos: `src/data/site-content.ts`

## Componentes (Test First)
- [ ] **T3.** MapFilters: escribir `MapFilters.test.tsx` (debe fallar) → implementar `MapFilters.tsx`
  (selects con label, opciones desde datos, estado comunicado).
  Archivos: `src/components/map/MapFilters.test.tsx`, `src/components/map/MapFilters.tsx`
- [ ] **T4.** MapMarkerModal: escribir `MapMarkerModal.test.tsx` (debe fallar) → implementar `MapMarkerModal.tsx`
  (dialog ARIA, 5 datos, fecha es-MX, cierre Esc/overlay/botón, foco).
  Archivos: `src/components/map/MapMarkerModal.test.tsx`, `src/components/map/MapMarkerModal.tsx`
- [ ] **T5.** ReforestationMap: escribir `ReforestationMap.test.tsx` con `vi.mock` de react-leaflet (debe fallar) →
  implementar `ReforestationMap.tsx` (MapContainer Yucatán, tiles CartoDB Positron, divIcon por tipo, marcadores filtrados).
  Archivos: `src/components/map/ReforestationMap.test.tsx`, `src/components/map/ReforestationMap.tsx`
- [ ] **T6.** MapSection: escribir `MapSection.test.tsx` (debe fallar) → implementar `MapSection.tsx`
  (h2, filtros, lista fallback accesible, lazy loading React.lazy + Suspense disparado en viewport, "sin resultados").
  Archivos: `src/components/map/MapSection.test.tsx`, `src/components/map/MapSection.tsx`

## Integración y verificación
- [ ] **T7.** Integrar `<MapSection />` tras `<MetricsDashboard />` en `LandingPage.tsx`; tests existentes en verde.
  Archivos: `src/components/landing/LandingPage.tsx`
- [ ] **T8.** Arnés completo + verificación de lazy chunk en `npm run build` (chunk separado para el mapa) +
  revisión visual 320px/768px/1440px y navegación con teclado (marcador → modal → Esc).
  Archivos: solo los necesarios para corregir fallos.
Resumen del plan
Aspecto	Decisión
Librería	Leaflet + React-Leaflet (tu elección)
Ubicación	Tras el Dashboard de métricas (tu elección)
Lazy loading	React.lazy + Suspense + IntersectionObserver; chunk separado verificable en build
Marcadores	L.divIcon HTML con tokens brand, personalizados por tipo de especie (sin imágenes)
Descriptivo	Modal propio accesible (no Popup Leaflet) — foco atrapado, Esc, retorno de foco
Datos	PlantationSite[] en site-content.ts con TODO_OFICIAL
Riesgo anticipado	jsdom no renderiza Leaflet → tests con vi.mock de react-leaflet
