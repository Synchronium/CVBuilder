# CV Builder

[![CI](https://github.com/Synchronium/CVBuilder/actions/workflows/ci.yml/badge.svg)](https://github.com/Synchronium/CVBuilder/actions/workflows/ci.yml)

Your career data lives in one JSON file. Claude Code skills handle the rest: extracting your existing CV, reviewing content quality, generating targeted variants for specific roles, and writing cover letters. Multiple visual templates, all print-to-PDF ready.

## What you need

- [Claude Code](https://claude.ai/code) — desktop app or CLI
- Node.js 18+
- Your current CV as a PDF, Word doc, or plain text

## Getting started

### 1. Clone and install

```sh
git clone https://github.com/Synchronium/CVBuilder.git
cd CVBuilder
npm install
```

### 2. Drop in your existing CV

Copy your CV into `data/original/`. Any format works — PDF, `.docx`, or plain text. This folder is gitignored, so it never gets committed.

### 3. Extract and set up

Open the project in Claude Code and run:

```
/cv-onboard
```

This walks you through the full setup interactively: extracting your career history into the structured JSON format, filling in anything that's missing, choosing a template, and reviewing the result. By the end you'll have a working CV rendering in the browser.

### 4. Start the preview

```sh
npm run dev
```

Open `http://localhost:5173`. You'll see your CV live in the browser. Changes to your data file are reflected immediately.

Switch templates using the dropdown in the top bar, or via the URL: `?template=divided`, `?template=classic`, `?template=two-column`, `?template=vivid`.

### 5. Review and improve the content

```
/cv-report
```

Runs a talent-acquisition review of your CV. It flags weak bullets, vague claims, missing metrics, and things that should be cut — and suggests specific improvements. Run it as many times as you like as you iterate.

To compare two versions (base vs. a variant, or before and after edits):

```
/cv-compare <file1> <file2>
```

### 6. Create targeted variants for specific roles

When applying for a role, create a focused version of your CV rather than sending the same one everywhere:

```
/cv-variant
```

Describe the role, company, or job listing and the skill will create a tailored copy — adjusting emphasis, reordering bullets, and tightening the summary for that specific context. Variants are saved to `data/variants/` (gitignored) and use the same templates as your base CV.

### 7. Generate your PDF

Open `http://localhost:5173/?template=divided` in Chrome or Edge (other browsers may produce slightly different output). Press **Ctrl+P** (Windows) or **Cmd+P** (Mac) and set:

- Destination: **Save as PDF**
- Paper size: **A4**
- Margins: **Default**

The templates are designed for two A4 pages. If your content runs long, ask Claude to help you tighten bullets or mark older roles as `condensed` to reduce their print footprint. Or, ask how you can save space by tweaking the design. Or ask for a completely new template!

### 8. Write a cover letter

```
/cv-coverletter <job-url-or-description>
```

Pass a job listing URL or paste the description. The skill fetches the listing, researches the company, analyses fit against your CV, asks a few quick questions, then writes a targeted letter. It saves as a self-contained HTML file you can open directly in Chrome and print to PDF the same way as the CV.

---

## Templates

| ID | Description |
|----|-------------|
| `classic` | Clean single-column layout — safe for any context |
| `two-column` | Sidebar with contact details and skills on the left |
| `divided` | Split left/right within each role, strong typographic structure |
| `vivid` | Bold, colourful, editorial style |

To add a new template from a style description:

```
/make-template
```

---

## Reference

### Commands

```sh
npm run dev            # start the preview server
npm run build          # type-check + production build
npm run lint           # ESLint
npm test               # Vitest (single run)
npm run test:watch     # Vitest (watch mode)
npm run test:coverage  # Vitest with coverage report
npm run test:visual         # visual regression — compare templates to baselines
npm run test:visual:update  # regenerate baselines after an intended visual change
```

Visual regression runs locally on demand (not in CI). A failure means a
template's rendering changed: inspect the diff under `test-results/`, then either
fix the regression or, if the change is intended, run `test:visual:update` and
commit the new baselines. See [ADR 0010](docs/adr/0010-local-visual-regression-testing.md).

### Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs `lint`, `build`, and
`test` on every push to `main` and on pull requests targeting `main`. Visual
regression is not part of CI (its baselines are platform-specific — see ADR 0010).

### Data model

Your CV data lives in `data/base.cv.json`. The schema is defined in `src/data/schemas.ts` and validated with Zod on every load.

Roles are grouped by company. Each role has:

- `company` — name, optional description, optional websites
- `positions` — one or more titles with start/end dates (no `end` = current role)
- `bullets` — evidence points; support `*bold*` inline formatting
- `tech` — technology list
- `interactive` — optional web-only context (hidden in print)
- `condensed` — flag to suppress company description and tech in print for older roles

Company duration is always derived from position dates — never stored manually.

### Key files

| Path | Purpose |
|------|---------|
| `data/base.cv.example.json` | Working example with fictional data |
| `data/base.cv.json` | Your CV data (gitignored — created by `/cv-onboard`) |
| `src/data/schemas.ts` | Zod schemas |
| `src/data/resolveCv.ts` | Resolver: raw data → view model |
| `src/templates/registry.ts` | Template registration |
| `src/templates/_shared/` | Shared template primitives (see ADR 0009) |
| `visual/` | Visual-regression specs and committed baselines (see ADR 0010) |
| `scripts/screenshot.ts` | Playwright screenshot utility (`npm run screenshot`) |
| `docs/adr/` | Architectural decision records |

### Architecture

```
data/base.cv.json
        ↓
  Zod schema validation
        ↓
  resolver → CvViewModel
        ↓
  React template component
        ↓
  interactive HTML / print / PDF
```

Components receive only a fully resolved view model — no raw data, no calculations in templates.

### Architectural decisions

| ADR | Decision |
|-----|----------|
| [0001 — Canonical JSON data](docs/adr/0001-use-canonical-json-data.md) | Career facts live in a single validated JSON file with stable IDs |
| [0002 — Company roles with position history](docs/adr/0002-use-company-roles-with-position-history.md) | Experience is grouped by company, with multiple positions per entry |
| [0003 — Resolve before rendering](docs/adr/0003-resolve-before-rendering.md) | A resolver transforms raw data into a view model; components do no logic |
| [0004 — Variants as full copies](docs/adr/0004-variants-as-full-copies.md) | Variants are standalone JSON files, not diff overlays |
| [0005 — Variants vs output modes](docs/adr/0005-separate-variants-from-output-modes.md) | Content selection and presentation format are independent concerns |
| [0006 — Runtime preview first](docs/adr/0006-runtime-preview-then-static-artifacts.md) | Start with a live Vite app; static generation comes later |
| [0007 — Named template registry](docs/adr/0007-named-template-registry.md) | Templates registered by stable ID; switched via URL param |
| [0008 — Inline bold syntax](docs/adr/0008-inline-bold-syntax.md) | Bullet text uses `*bold*` for emphasis; no other Markdown is supported |
| [0009 — Composable templates from shared primitives](docs/adr/0009-composable-templates-from-shared-primitives.md) | Templates compose shared `_shared/` primitives styled per template via `cv-*` classes |
| [0010 — Local visual regression testing](docs/adr/0010-local-visual-regression-testing.md) | Playwright snapshot tests run locally on demand, not in CI |
| [0011 — Snapshot shared primitives only](docs/adr/0011-snapshot-shared-primitives-only.md) | Markup snapshots cover the `_shared/` primitives' class contract; not whole templates or composites |
