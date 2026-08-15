# Fase 4 — Portal de Entregas y Solicitudes

> Referencias: `spec/constitution/mission.md`, `tech-stack.md` (§4 formularios, §6 lazy loading), `roadmap.md` (Fase 4).

## 1. Alcance
Dos secciones nuevas para facilitar la solicitud y entrega de especies nativas:

1. **Puntos de Entrega y Viveros SDS:** listado/ubicación de puntos de entrega y viveros con horarios, dirección e indicador de **disponibilidad de stock según la época de lluvias**.
2. **Formulario dinámico de solicitud pública** para tres tipos de solicitante: **Escuelas, Ayuntamientos y Sociedad Civil**, con requisitos variables por rol y validación en tiempo real.

## 2. Requerimientos funcionales
- Datos de puntos de entrega en `src/data/site-content.ts` (interface `DeliveryPoint`: id, nombre, municipio, dirección, horarios, coordenadas, `stockDisponible` y `epocaLluvias`, `esVivero`), marcados `TODO_OFICIAL`.
- **Formulario dinámico:** el tipo de solicitante (`tipoSolicitante`) condiciona los campos visibles y las reglas de validación:
  - **Escuela:** nombre de la escuela, nivel educativo, clave de centro de trabajo (CCT), municipio, director/a responsable y cantidad estimada.
  - **Ayuntamiento:** nombre del ayuntamiento/comité, municipio, autoridad responsable y cantidad estimada.
  - **Sociedad Civil:** nombre de la persona, organización/colectivo (opcional), teléfono y correo, municipio, predio/comunidad donde se sembrará y cantidad estimada.
- Campos comunes: tipo de solicitante, especie preferida (select), cantidad estimada, y el **checkbox obligatorio** de aviso de privacidad.
- **Validación con Zod** (`zodResolver`) y manejo de estado con **React Hook Form** (tech-stack §4). Errores por campo.
- Mapa/ubicación de los puntos de entrega con **lazy loading** (`React.lazy` + `Suspense`) disparado en viewport (tech-stack §6), reutilizando Leaflet/CartoDB de la Fase 3.
- Disponibilidad de stock comunicada por punto (suficiente / limitada / agotada) e indicador de época de lluvias (alta/baja demanda).

## 3. Diseño y Guía de Imagen Institucional
- **Labels en la parte superior izquierda** de cada campo (no flotantes ni centrados).
- **Errores de validación junto a cada input** (mensaje inmediatamente bajo el campo, con `aria-describedby` asociado).
- **Checkbox obligatorio con texto literal:** "He leído y acepto el Aviso de Privacidad Integral".
- Estética alineada con las secciones existentes: tokens `brand` (`border-brand-200`, `bg-brand-50`, `text-brand-800`), `max-w-6xl px-4 sm:px-6`, `h2 text-3xl font-bold text-brand-800`, iconos Lucide, jerarquía h1/h2/h3 intacta.
- Sección con `h2` propio; subbloques de puntos de entrega y requisitos con `h3`.

## 4. Requerimientos de accesibilidad (WCAG 2.1 AA)
- Cada campo con `<label>` visible asociado (`htmlFor`/`id`); mensaje de error vinculado con `aria-describedby`.
- Errores anunciados con `aria-live="polite"`; campos requeridos señalados con `required` y notación accesible.
- El formulario usa agrupaciones `<fieldset>`/`<legend>` para el tipo de solicitante y el checkbox de privacidad.
- contraste AA en controles, errores y textos; estados de enfoque visibles (`focus-visible`).
- Radio de "tipo de solicitante" navegable por teclado (flechas) y enfocable.
- Fallback accesible para el mapa: lista textual de puntos de entrega (nombre, dirección, horarios, disponibilidad) siempre visible.
- Lazy loading del mapa no bloquea la lectura de los puntos de entrega ni del formulario.

## 5. Criterios de aceptación
1. Arnés en verde: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
2. El bundle inicial **no incluye** las utilidades de mapa de los puntos de entrega: chunk separado verificable en `vite build`.
3. El formulario valida con Zod + React Hook Form: al enviar con datos inválidos muestra los errores **junto a cada campo**; al ser válido dispara `onSubmit` con la data tipada.
4. El formulario es **dinámico**: cambiar el tipo de solicitante muestra/oculta los campos y requisitos correspondientes.
5. Labels alineados **arriba a la izquierda**; checkbox obligatorio con el texto exacto "He leído y acepto el Aviso de Privacidad Integral".
6. La sección de Puntos de Entrega muestra nombre, dirección, horarios y disponibilidad de stock según época de lluvias.
7. Tests Vitest + RTL (Test First): esquema Zod, lógica dinámica por tipo, validación/errores por campo, a11y del checkbox y los labels, contenido de puntos de entrega.
8. Responsive 320px–1440px: formulario de una columna en móvil y de dos columnas en escritorio; puntos de entrega apilados en móvil.
9. Solo dependencias autorizadas: `react-hook-form`, `zod`, `@hookform/resolvers` + uso opcional de `leaflet`/`react-leaflet` (tech-stack §3–§4).

## 6. Casos borde
- **Envío sin aceptar el Aviso de Privacidad:** error en el checkbox "Debes aceptar el Aviso de Privacidad Integral" y no se envía.
- **Punto de entrega sin datos de stock/horarios (datos `TODO_OFICIAL`):** se muestra "Por confirmar"/"Sin información".
- **Cantidad fuera del rango permitido (p. ej. 0 o negativa):** error de validación por campo.
- **Cambio de tipo de solicitante con datos previos:** React Hook Form reutiliza campos comunes y limpia/valida los dependientes.
- **Carácter RTL/no relevantes:** únicamente texto es-MX; sin asunciones de bibliotecas externas.
- **Carga del chunk del mapa fallida (offline):** la lista accesible de puntos de entrega permanece funcional.
- **Fuera de alcance:** envío real a backend/persistencia, autenticación, pago, carga de archivos.
