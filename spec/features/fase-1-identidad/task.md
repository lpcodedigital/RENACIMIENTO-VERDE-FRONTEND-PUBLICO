# Tareas Atómicas — Fase 1 (ejecutar UNA a una, en orden)

## Entorno
- [ ] **T1.** Inicializar Vite (react-ts) en la raíz e instalar deps base.
  Archivos: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`
- [ ] **T2.** Instalar y configurar Tailwind v3.4 + PostCSS con tokens institucionales (§2 del plan).
  Archivos: `tailwind.config.js`, `postcss.config.js`, `src/index.css`
- [ ] **T3.** Integrar Lato self-hosted (pesos 400/700/900 + itálica) y registrarla en fontFamily.
  Archivos: `package.json`, `src/main.tsx`, `tailwind.config.js`
- [ ] **T4.** Configurar ESLint (flat, react-ts + hooks) y Prettier; scripts `lint`/`format`.
  Archivos: `eslint.config.js`, `.prettierrc`, `package.json`
- [ ] **T5.** Configurar Vitest + jsdom + RTL + jest-dom; script `test`.
  Archivos: `vite.config.ts`, `src/test/setup.ts`, `package.json`
- [ ] **T6.** Crear contenido institucional estático (textos, 3+ objetivos, 3+ beneficios, contacto con `TODO_OFICIAL`).
  Archivos: `src/data/site-content.ts`

## Layout (Test First)
- [ ] **T7.** Header: escribir `Header.test.tsx` (debe fallar) → implementar `Header.tsx` con logo placeholder, nombre SDS/programa y nav accesible.
  Archivos: `src/components/layout/Header.test.tsx`, `src/components/layout/Header.tsx`, `src/assets/logo-sds.svg`
- [ ] **T8.** Footer: escribir `Footer.test.tsx` (debe fallar) → implementar `Footer.tsx` con contacto, enlaces accesibilidad/privacidad y año dinámico.
  Archivos: `src/components/layout/Footer.test.tsx`, `src/components/layout/Footer.tsx`
- [ ] **T9.** Layout: escribir `Layout.test.tsx` (debe fallar) → implementar `Layout.tsx` con skip link, `<main id="contenido">` e integrar Header/Footer en `App.tsx`.
  Archivos: `src/components/layout/Layout.test.tsx`, `src/components/layout/Layout.tsx`, `src/App.tsx`

## Landing (Test First)
- [ ] **T10.** Escribir `LandingPage.test.tsx` (debe fallar) verificando las 4 secciones.
  Archivos: `src/components/landing/LandingPage.test.tsx`
- [ ] **T11.** Implementar secciones `Hero.tsx`, `About.tsx`, `Objectives.tsx`, `NativeSpecies.tsx` (íconos Lucide, mobile-first, CTA 44px) y componerlas en `LandingPage.tsx`; montar en `App.tsx`.
  Archivos: `src/components/landing/{Hero,About,Objectives,NativeSpecies,LandingPage}.tsx`, `src/App.tsx`
- [ ] **T12.** Pulir `index.html`: `lang="es"`, `<title>`, meta description, theme-color.
  Archivos: `index.html`

## Verificación (arnés de control)
- [ ] **T13.** Ejecutar `npm run lint`, `npx tsc --noEmit`, `npm run test` y `npm run build`. Corregir hasta que todo pase. Revisión visual a 320px/768px/1440px y navegación con teclado.
  Archivos: solo los necesarios para corregir fallos.
