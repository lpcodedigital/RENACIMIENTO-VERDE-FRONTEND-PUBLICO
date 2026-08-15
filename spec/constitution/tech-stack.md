# Stack exacto (p. ej., Node.js, TypeScript, PostgreSQL) y librerías permitidas.
# Stack Tecnológico Autorizado

## 1. Core Framework & Build Tool
- **Entorno de Construcción:** [Vite](https://vitejs.dev/)
- **Librería UI:** [React](https://react.dev/) (con Functional Components y Hooks)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode activado)

## 2. Estilos y Componentes de Interfaz
- **CSS Framework:** [Tailwind CSS v3+](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Animaciones:** `framer-motion` (para barras de porcentaje y contadores de impacto)

## 3. Mapas e Interacción Geoespacial
- **Librería de Mapas:** [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) o **MapLibre GL JS** (OpenSource, ligero y de alto rendimiento).
- **Proveedor de Tiles:** OpenStreetMap / CartoDB Positron (estilo limpio e institucional).

## 4. Manejo de Formularios y Estado
- **Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Validación de Esquemas:** [Zod](https://zod.dev/)

## 5. Arnés de Control y Calidad de Código
- **Linter:** ESLint con reglas para React TypeScript + Hooks.
- **Formateador:** Prettier.
- **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **Verificación de Tipos:** `tsc --noEmit`

## 6. Reglas de Dependencias
- No se permite instalar librerías UI monolíticas (como Material UI o Ant Design) para evitar inflar el bundle size.
- Todas las utilidades de mapa deben usar lazy loading (`React.lazy` / `import()`) para no ralentizar la carga inicial de la página.