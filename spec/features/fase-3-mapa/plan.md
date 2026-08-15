# Plan Técnico — Fase 3 (Kimi K3, Orquestador)

## 1. Arquitectura
Nuevo módulo `src/components/map/`. **Lazy loading obligatorio** (tech-stack §6):
`MapSection` es un shell ligero que carga `ReforestationMap` con `React.lazy` +
`Suspense` solo cuando la sección entra en viewport (`IntersectionObserver`, ya
mockeado en tests). Decisión de accesibilidad: modal propio (`role="dialog"`) en
lugar del `Popup` de Leaflet.

Archivos a crear/modificar:
```
src/
├── data/site-content.ts              # MODIFICAR: + PlantationSite + plantations + listas de filtros (TODO_OFICIAL)
├── components/
│   ├── landing/LandingPage.tsx       # MODIFICAR: insertar <MapSection /> tras <MetricsDashboard />
│   └── map/
│       ├── MapSection.tsx            + MapSection.test.tsx   # shell: h2, filtros, lazy loader, lista fallback
│       ├── MapFilters.tsx            + MapFilters.test.tsx   # selects municipio + tipo de especie
│       ├── ReforestationMap.tsx      + ReforestationMap.test.tsx  # chunk perezoso: MapContainer, tiles, marcadores
│       └── MapMarkerModal.tsx        + MapMarkerModal.test.tsx    # dialog accesible con los 5 datos
package.json                          # MODIFICAR: + leaflet, react-leaflet, @types/leaflet
```

## 2. Lazy loading y rendimiento
- `MapSection` renderiza: título, filtros, lista accesible y un contenedor con
  placeholder/skeleton del mapa.
- Al entrar en viewport (una vez), `React.lazy(() => import('./ReforestationMap'))`
  dentro de `<Suspense fallback={placeholder}>` → Vite emite un chunk separado.
- `import 'leaflet/dist/leaflet.css'` dentro del chunk perezoso (no en `index.css`).
- Marcadores con `L.divIcon` (HTML+CSS con tokens `brand`) personalizados por tipo
  de especie: sin assets de imagen, sin inflar el bundle.

## 3. Modelo de datos (site-content.ts)
```ts
export interface PlantationSite {
  id: string
  species: string            // especie nativa
  speciesType: string        // tipo (para filtro e ícono)
  municipality: string       // para filtro
  quantity: number
  plantingDate: string       // ISO; '' => "Fecha por confirmar"
  coordinates: [number, number]  // [lat, lng]
  photo?: string             // TODO_OFICIAL
}
export const plantations: PlantationSite[] = [ /* ≥ 6 sitios, TODO_OFICIAL */ ]
```
Listas derivadas para filtros: municipios y tipos únicos (computed en MapSection o
exportadas desde site-content).

## 4. Modal accesible (MapMarkerModal)
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (especie).
- Cierre: botón visible, `Esc`, clic en overlay.
- Foco inicial en el contenido, trap simple (Tab/Shift+Tab), retorno al marcador.
- Contenido: foto/ícono placeholder (Lucide `TreePine`), cantidad, fecha es-MX,
  especie nativa, municipio.

## 5. Estrategia de pruebas (Test First, por componente)
jsdom no renderiza mapas reales: los tests de `ReforestationMap` mockean
`react-leaflet`/`leaflet` (`vi.mock`) y verifican props (centro, tiles, nº de
marcadores según filtro). Los demás tests son de UI/a11y pura:
- `MapFilters`: render de selects, onChange, opciones derivadas de los datos.
- `MapMarkerModal`: 5 datos presentes, role/ARIA, cierre con Esc, formato de fecha.
- `MapSection`: h2, lista fallback con todos los sitios, resultado "sin resultados".
- Flujo: test → rojo → implementación → verde.

## 6. Notas para el Trabajador
- TypeScript strict; `coordinates` como tupla `[number, number]`.
- Tiles: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png` + atribución OSM/Carto.
- No modificar componentes de Fases 1–2 salvo la línea de integración en `LandingPage.tsx`.
- Ninguna dependencia fuera de tech-stack §3.
