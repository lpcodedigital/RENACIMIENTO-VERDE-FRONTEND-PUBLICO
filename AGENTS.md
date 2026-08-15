# AGENTS.md — Reglas y Arnés de Control

## 1. Arquitectura de Roles
- **Orquestador (Kimi K3 / Agente Planificador):** Lee la especificación (`/spec`), genera los planes en `/spec/features/`, desglosa tareas atómicas y coordina los cambios.[cite: 1]
- **Trabajador (DeepSeek V4 Flash / Agente Coder):** Escribe código de forma quirúrgica. SOLO toca los archivos asignados en el `task.md` activo.[cite: 1]

## 2. Leyes Absolutas (Anti-patrones)
- **NO hagas "Vibe Coding":** No generes código sin antes leer/actualizar la especificación en `/spec`.[cite: 1]
- **NO modifiques múltiples módulos a la vez:** Trabaja una sola tarea del `task.md` a la vez.[cite: 1]
- **NO asumas bibliotecas externas:** Usa exclusivamente las dependencias declaradas en el proyecto dentro de `tech-stack.md`.[cite: 1]

## 3. Flujo de Trabajo Obligatorio
1. **Fase Spec:** Lee `/spec/constitution/` y el `spec.md` correspondiente antes de escribir cualquier implementación.[cite: 1]
2. **Fase Test First:** Escribe o actualiza las pruebas unitarias que validen los criterios de aceptación.[cite: 1]
3. **Fase Código:** Implementa la solución con el Agente Trabajador.[cite: 1]
4. **Fase Verificación:** Ejecuta el arnés de control (Linter, TypeCheck y Tests). Si falla, corrige el código antes de dar la tarea por finalizada.[cite: 1]

## 4. Comandos del Arnés de Control
- Linter: `npm run lint` (ESLint integrado con Vite)[cite: 1]
- Tests: `npm run test` (Vitest)[cite: 1]
- TypeCheck: `npx tsc --noEmit`[cite: 1]