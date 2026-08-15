# Fase 1 — Identidad Institucional y Estructura Base

> Referencias: `spec/constitution/mission.md`, `tech-stack.md`, `roadmap.md` (Fase 1).

## 1. Alcance
Entregar el esqueleto funcional de la plataforma pública "Renacimiento Verde" (SDS, Gobierno de Yucatán):
1. Entorno de desarrollo Vite + React + TypeScript (strict) + Tailwind CSS v3.4 operativo.
2. Layout institucional: Header SDS, Footer con datos de contacto y enlaces de accesibilidad.
3. Landing Page informativa: "¿Qué es Renacimiento Verde?", objetivos y beneficios de especies nativas.

## 2. Identidad institucional (normativa de diseño)
- **Tipografía base:** Lato (self-hosted vía `@fontsource/lato`, pesos 400/700/900 + itálica 400; `font-display: swap`). Fallback: system sans-serif.
- **Enlaces:** Azul institucional con estados definidos (normal/hover/activo/visitado). Tokens: `link` `#0071BC`, `link-hover` `#205493`, `link-active` `#112E51`, `link-visited` `#4C2C92` (todos ≥ 4.5:1 sobre blanco).
- **Acento "Renacimiento Verde":** Escala semántica `brand` (50–900). Texto legible sobre blanco/gris claro: `brand-500` `#2E7D32`, `brand-700` `#1B5E20` (7.9:1).
- **CTA:** Fondo `brand-700` + texto blanco (AA). Zona táctil mínima **44×44 px** en todos los elementos interactivos.
- **Focus visible:** Anillo de 2px con offset, contraste ≥ 3:1 contra el fondo (nunca `outline: none` sin reemplazo).
- Los tokens viven exclusivamente en `tailwind.config.js` (`theme.extend`). Prohibido hardcodear hex en componentes.

## 3. Criterios de aceptación
1. `npm install && npm run dev` levanta la app sin errores; `npm run build` compila.
2. Arnés de control en verde: `npm run lint` (0 errores), `npx tsc --noEmit` (0 errores), `npm run test` (todos los tests pasan).
3. **Header:** logotipo placeholder (SVG inline) + texto "Secretaría de Desarrollo Sustentable" y "Renacimiento Verde"; navegación con `<nav aria-label>`; enlaces con estados azules definidos.
4. **Skip link:** primer elemento enfocable, visible al recibir foco, salta al `<main id="contenido">`.
5. **Footer:** datos de contacto SDS (placeholders marcados `TODO_OFICIAL` en `site-content.ts`), enlaces "Accesibilidad" y "Aviso de Privacidad", año dinámico.
6. **Landing:** Hero con propósito; sección "¿Qué es Renacimiento Verde?"; ≥ 3 objetivos; ≥ 3 beneficios de especies nativas (íconos Lucide).
7. **Accesibilidad (WCAG 2.1 AA):** `lang="es"`, landmarks `header/main/footer`, un solo `<h1>`, jerarquía de encabezados sin saltos, contraste AA, orden de tabulación lógico.
8. **Responsive:** sin scroll horizontal entre 320px y 1440px; mobile-first.
9. Tests con Vitest + React Testing Library validando los criterios 3–7 (render, landmarks, skip link, secciones, estados de enlace).
10. Ninguna dependencia fuera de `tech-stack.md` (`@fontsource/lato` autorizada como tipografía, no es librería UI).

## 4. Casos borde
- **Viewport 320px:** menú y textos no desbordan; CTAs conservan 44px.
- **Solo teclado:** skip link → nav → main → footer sin trampas de foco.
- **Fallo de carga de Lato:** la página sigue siendo legible con fuente del sistema.
- **Datos de contacto aún no oficiales:** centralizados en `src/data/site-content.ts` con marcador `TODO_OFICIAL`; ningún dato inventado disperso en componentes.
- **`prefers-reduced-motion: reduce`:** Fase 1 no incluye animaciones; las transiciones de hover no deben ser esenciales para la comprensión.
- **Fuera de alcance (declarado):** modo oscuro, i18n, imágenes fotográficas, mapas, formularios (fases posteriores).
