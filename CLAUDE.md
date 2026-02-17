# CLAUDE.md — Instructions for Claude Code

## Project: mailpeek

This is a Vue.js email development toolkit. The first package is `@mailpeek/preview` — a drop-in component for previewing email HTML.

## GSD Workflow

This project uses the GSD (Get Shit Done) meta-prompting framework. Install GSD first:

```bash
npx get-shit-done --claude
```

Then use:
- `/discuss-project` to finalize SPEC.md
- `/plan 1` to plan Phase 1
- `/execute 1` to build Phase 1
- `/verify 1` to verify Phase 1

## Key Files

- `SPEC.md` — Product specification (review and finalize with `/discuss-project`)
- `ROADMAP.md` — Phased development plan
- `CONTEXT.md` — All market research, technical decisions, and background

## Technical Constraints

- Vue 3 + Composition API + TypeScript
- Vite library mode for building
- pnpm monorepo (future packages: @mailpeek/components, @mailpeek/render)
- Zero runtime dependencies beyond Vue 3 peer dep
- Must work with Nuxt 3 (SSR compatible)
- All components use `<script setup>` and `defineProps`

## Code Style

- TypeScript strict mode
- Vue 3 Composition API only (no Options API)
- `<script setup>` for all components
- Props defined with `defineProps<T>()` (type-based, not runtime)
- Emits defined with `defineEmits<T>()`
- Use `computed()` and `ref()` from vue
- Scoped styles where possible
- No Tailwind in the library itself (users may use Tailwind in their apps)

## Testing

- Vitest + @vue/test-utils
- Test each component's rendered HTML output
- Test prop reactivity (html changes → iframe updates)
- Test event emissions
- Test TypeScript types compile correctly
