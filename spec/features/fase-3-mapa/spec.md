# Fase 3 — Mapa Interactivo de Reforestación (GIS Light)

> Referencias: `spec/constitution/mission.md`, `tech-stack.md` (§3 mapas, §6 lazy loading), `roadmap.md` (Fase 3).

## 1. Alcance
Sección de mapa interactivo en la landing, ubicada tras el Dashboard de métricas:
1. Mapa con Leaflet + React-Leaflet, tiles CartoDB Positron (estilo limpio institucional).
2. Marcadores personalizados por tipo de árbol (ícono/color distintivo).
3. Modal accesible al hacer clic en un marcador: foto/ícono, cantidad, fecha de siembra, especie nativa y municipio.
4. Filtros básicos: por municipio y por tipo de especie.

## 2. Requerimientos funcionales
- Datos de sitios de siembra en `src/data/site-content.ts` (interface `PlantationSite`: id, especie, tipo, municipio, cantidad, fecha, coordenadas, foto), marcados `TODO_OFICIAL`.
- El mapa se carga con **lazy loading** (`React.lazy` + `Suspense`) disparado al entrar la sección en viewport (tech-stack §6: no ralentizar la carga inicial).
- Los filtros actualizan los marcadores visibles sin recargar el mapa.
- Vista inicial: encuadre en el estado de Yucatán con todos los marcadores visibles.
- **Modal propio accesible** (no `Popup` de Leaflet): `role="dialog"`, `aria-modal="true"`, cierre con `Esc` y botón visible, foco atrapado dentro y devuelto al marcador al cerrar.
- Fecha formateada `es-MX` (ej. "12 de mayo de 2025").

## 3. Requerimientos de accesibilidad (WCAG 2.1 AA)
- Contenedor del mapa con `aria-label` descriptivo.
- **Fallback accesible:** lista de sitios (nombre, municipio, cantidad, fecha) visible para lectores de pantalla y como degradación si el mapa no carga (conectividad limitada, misión §3).
- Marcadores enfocables por teclado (Leaflet `keyboard: true`).
- Filtros con `<label>` asociado; estado del filtro comunicado (resultados anunciados con `aria-live="polite"`).
- Íconos de marcador decorativos con texto accesible; contraste AA en modal y controles.
- Sección con `h2` propio; jerarquía h1/h2/h3 intacta.

## 4. Criterios de aceptación
1. Arnés en verde: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
2. El bundle inicial **no incluye** Leaflet: el build genera un chunk separado para el mapa (verificable en la salida de `vite build`).
3. La sección muestra los marcadores de los sitios de `site-content.ts` y los filtra por municipio y tipo de especie.
4. Clic/teclado en un marcador abre el modal con los 5 datos (foto/ícono, cantidad, fecha, especie, municipio); `Esc` cierra y devuelve el foco.
5. Lista accesible de sitios presente como fallback.
6. Tests Vitest + RTL: filtros (lógica + UI), contenido y a11y del modal, datos de sitios; Leaflet/React-Leaflet mockeados en tests (jsdom no renderiza mapas reales).
7. Responsive 320px–1440px: mapa con altura fija usable y filtros apilados en móvil.
8. Solo dependencias autorizadas: `leaflet`, `react-leaflet`, `@types/leaflet` (tech-stack §3).

## 5. Casos borde
- **Sin resultados tras filtrar:** mensaje "No hay sitios para este filtro" + mapa sin marcadores (no error).
- **Sitio sin foto:** ícono placeholder de Lucide con texto alternativo.
- **Filtro combinado sin coincidencias parciales:** intersección estricta (municipio Y tipo).
- **Fecha inválida/ausente:** se muestra "Fecha por confirmar" (datos `TODO_OFICIAL`).
- **Carga del chunk fallida (offline):** la lista accesible permanece funcional.
- **Fuera de alcance:** clustering de marcadores, geocodificación, capas GIS adicionales, datos en tiempo real.
