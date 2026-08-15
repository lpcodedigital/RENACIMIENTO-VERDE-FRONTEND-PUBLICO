# Plan Técnico — Fase 1 (Kimi K3, Orquestador)

## 1. Arquitectura
SPA estática con Vite. Sin router en Fase 1 (landing única). Contenido institucional
centralizado en `src/data/site-content.ts` para que los textos/datos oficiales se
actualicen en un solo lugar. Componentes presentacionales puros, sin estado global.

```
RENACIMIENTO_VERDE/
├── index.html                  # lang="es", meta description, title
├── package.json                # scripts: dev/build/lint/test/preview
├── vite.config.ts              # React plugin + config Vitest (jsdom)
├── tsconfig.json               # strict: true (+ tsconfig.node.json)
├── tailwind.config.js          # TOKENS institucionales (ver §2)
├── postcss.config.js
├── eslint.config.js            # flat config: react-ts + hooks
├── .prettierrc
└── src/
    ├── main.tsx                # bootstrap + imports @fontsource/lato
    ├── App.tsx                 # <Layout><LandingPage/></Layout>
    ├── index.css               # @tailwind base/components/utilities + capa base (enlaces, focus)
    ├── vite-env.d.ts
    ├── test/setup.ts           # @testing-library/jest-dom
    ├── data/site-content.ts    # textos, objetivos, beneficios, contacto (TODO_OFICIAL)
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx          + Header.test.tsx
    │   │   ├── Footer.tsx          + Footer.test.tsx
    │   │   └── Layout.tsx          + Layout.test.tsx   # skip link + landmarks
    │   └── landing/
    │       ├── Hero.tsx
    │       ├── About.tsx           # ¿Qué es Renacimiento Verde?
    │       ├── Objectives.tsx
    │       ├── NativeSpecies.tsx   # beneficios especies nativas
    │       └── LandingPage.tsx     + LandingPage.test.tsx
    └── assets/logo-sds.svg     # placeholder institucional
```

## 2. Tokens (tailwind.config.js → theme.extend)
- `fontFamily.sans: ['Lato', 'system-ui', 'sans-serif']`
- `colors.brand` 50–900: 500 `#2E7D32`, 600 `#256B29`, 700 `#1B5E20` (resto de la escala derivada)
- `colors.link`: DEFAULT `#0071BC`, hover `#205493`, active `#112E51`, visited `#4C2C92`
- `colors.cta`: DEFAULT `#1B5E20`, hover `#144A19` (texto siempre blanco)
- `minHeight.touch: '44px'` / `minWidth.touch: '44px'`
- Estilos base de enlaces (estados) y focus ring en `src/index.css` con `@layer base`.

## 3. Dependencias (solo tech-stack.md)
- Base: react, react-dom, typescript, vite, @vitejs/plugin-react
- Estilos: tailwindcss@^3.4, postcss, autoprefixer; íconos: lucide-react
- Tipografía: @fontsource/lato (self-host; justificado por misión §3: rendimiento)
- Calidad: eslint (+ plugins react/hooks/ts), prettier, vitest, jsdom,
  @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- ❌ Framer Motion, Leaflet, React Hook Form, Zod: fases 2–4.

## 4. Estrategia de pruebas (Test First)
- `Header.test.tsx`: nombre institucional, `<nav>` con aria-label, estados de enlace.
- `Footer.test.tsx`: contacto renderizado desde site-content, enlaces accesibilidad/privacidad, año actual.
- `Layout.test.tsx`: skip link apunta a #contenido; landmarks header/main/footer; h1 único en página.
- `LandingPage.test.tsx`: secciones ¿Qué es?/objetivos (≥3)/beneficios (≥3) presentes.
- Flujo por componente: escribir test → verificar que falla → implementar → verde.

## 5. Notas para el Trabajador
- TypeScript strict; sin `any`.
- Mobile-first con utilidades Tailwind; hex solo vía tokens.
- Íconos Lucide decorativos con `aria-hidden="true"`.
- No crear archivos fuera de esta lista sin actualizar primero este plan.
