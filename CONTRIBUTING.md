# Contributing to mailpeek

Thanks for your interest in contributing! Here's how to get started.

## Setup

1. Fork the repo and clone it locally
2. Install dependencies: `pnpm install`
3. Build all packages: `pnpm build`
4. Run tests: `pnpm test`

## Project structure

This is a pnpm workspace monorepo with the following packages:

```
packages/
  preview/       → @mailpeek/preview  (email preview component)
  components/    → @mailpeek/components (email building blocks)
sandbox/         → Local dev playground for testing components
docs/            → VitePress documentation site
```

Packages reference each other via `workspace:*` in `package.json`, so changes are picked up automatically — no need for `npm link`.

## Local development

### Testing packages in isolation

Each package has its own test suite. Run tests for a specific package:

```bash
cd packages/preview
pnpm test
```

Or run all tests from the root:

```bash
pnpm test
```

### Using the sandbox

A `sandbox/` directory is available for manually testing components in a live Vue app. Edit `sandbox/src/App.vue` to experiment — it's gitignored so your changes won't show up in diffs.

Dependencies are installed automatically via the pnpm workspace. To start the sandbox:

```bash
cd sandbox
pnpm dev
```

This gives you a Vite + Vue dev server where you can import and render any mailpeek component to visually verify your changes.

### Running the docs site

The docs site is a good way to see components in context:

```bash
pnpm docs:dev
```

This starts VitePress at `http://localhost:5173` with hot reload.

## Pull requests

- Keep PRs focused on a single change
- Add tests for new features
- Make sure existing tests pass before submitting

## Issues

Found a bug or have a feature request? Open an issue on GitHub.
