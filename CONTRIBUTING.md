# Contributing

Thank you for your interest in contributing to **passfather**! This guide will help you set up the project and understand the workflow.

## Prerequisites

- Node.js **20.x** or **22.x**
- npm

## Getting Started

1. Fork and clone the repository:

```bash
git clone https://github.com/<your-username>/passfather.git
cd passfather
```

2. Install all dependencies (build + test):

```bash
npm run install-all
```

## Project Structure

```
passfather/
├── src/                  # Source code
│   ├── passfather.js     # Main module
│   ├── utils.js          # Utility functions
│   ├── validatingOptions.js
│   ├── seed.js
│   ├── index.js          # CJS entry point
│   ├── index.mjs         # ESM entry point
│   ├── index.d.ts        # TypeScript declarations
│   ├── externals/        # Environment-specific crypto init
│   └── PRNGs/            # Pseudo-random number generators
├── build/                # Rollup build configuration
├── dist/                 # Built output (generated)
│   ├── esm/              # ES Module bundle
│   └── umd/              # UMD bundle
├── test/
│   ├── jest/             # Unit tests (Jest)
│   ├── playwright/       # Browser tests (Playwright)
│   └── integration/      # Integration tests (CJS, ESM, TypeScript, React)
└── example/              # Usage examples
```

## Building

Build the UMD and ESM bundles:

```bash
npm run build
```

This runs Rollup and outputs minified bundles to `dist/`.

## Testing

Run the full test suite (build + jest + playwright + integration):

```bash
npm test
```

Or run individual test suites:

```bash
cd test

# Unit tests
npm run test:jest

# Browser tests (requires Playwright browsers installed)
npm run test:playwright

# Integration tests (CJS, ESM, TypeScript, React)
npm run test:integration
```

### Installing Playwright Browsers

If running browser tests for the first time:

```bash
cd test
npx playwright install --with-deps
```

## Making Changes

### Source Code

- Source files are in `src/`.
- The project has **zero runtime dependencies** — keep it that way.
- Exported constants (`CHAR_RANGES`, `DEFAULT_OPTIONS`) are frozen with `Object.freeze` — do not remove this.

### Tests

- **Unit tests** go in `test/jest/`. The test files import source from `src/` and the built bundle from `dist/`.
- **Integration tests** live in `test/integration/` — each in its own directory (`cjs/`, `esm/`, `ts/`, `react/`) with a dedicated `package.json`.
- Always run `npm run build` before running tests (this happens automatically via `pretest`).

### Code Style

- No external linter is configured — follow the existing code style.
- Use `const` over `let` where possible.
- Use CommonJS (`require`/`module.exports`) in `src/` files (except `index.mjs` and `externals/index.mjs`).

## Submitting a Pull Request

1. Create a feature branch from `main`:

```bash
git checkout -b my-feature
```

2. Make your changes and ensure all tests pass:

```bash
npm test
```

3. Update `CHANGELOG.md` with a summary of your changes under a new or existing version section.

4. Push your branch and open a pull request against `main`.

## Reporting Bugs

Open an issue at [github.com/vyushin/passfather/issues](https://github.com/vyushin/passfather/issues).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
