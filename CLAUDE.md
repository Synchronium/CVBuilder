# CV Builder

A code-based CV system that separates career data from presentation. Canonical data lives in `data/base.cv.json`, is validated with Zod, resolved into a `CvViewModel`, and rendered as an interactive React/Vite app with multiple templates, tag filtering, expandable detail, and print/PDF support.

## Stack

- **Vite + React 19 + TypeScript**
- **Zod** for schema validation
- **Vitest + Testing Library** for tests
- **ESLint** (flat config, `eslint.config.js`)

## Commands

```sh
npm install       # first time setup
npm run dev       # Vite dev server (hot reload)
npm run build     # tsc type-check + Vite build
npm run lint      # ESLint
npm test          # Vitest (single run)
npm run test:watch  # Vitest (watch mode)
```

## Architecture

```
data/base.cv.json (or variant)
        ↓
  schema validation (Zod)
        ↓
  resolver → CvViewModel
        ↓
  React template component
        ↓
  interactive HTML / print / PDF
```

Key constraint: **components receive only a fully resolved view model**. They must not merge variants, calculate durations, detect current roles, or read raw JSON.

## Key Files

| Path | Purpose |
|------|---------|
| `data/base.cv.json` | Canonical CV facts |
| `data/variants/` | Targeted variant copies (gitignored) |
| `data/original/` | Original CV documents (gitignored) |
| `src/data/schemas.ts` | Zod schemas for raw data |
| `src/data/resolveCv.ts` | Resolver: raw data → `CvViewModel` |
| `src/data/duration.ts` | Date formatting and duration calc |
| `src/utils/parseInline.ts` | Parses `*bold*` syntax in bullet text |
| `src/components/` | React components (render view model only) |
| `src/templates/` | Template registry and per-template CSS |
| `scripts/screenshot.js` | Playwright screenshot utility |
| `data/cover-letters/` | Generated cover letter HTML files (gitignored) |
| `.claude/commands/` | Claude Code slash command skills |
| `docs/adr/` | Architectural Decision Records |
| `PLAN.md` | Broader build plan and phase roadmap |
| `IDEAS.md` | Content ideas and deferred tasks |

## Data Model

Roles are grouped by company. Each company entry has:
- `company`: `{ name, description?, websites: [] }`
- `positions`: ordered positions with `title`, `start`, `end?` (no `end` = current)
- `bullets`: evidence points with stable IDs; support `*bold*` inline formatting via `parseInline`
- `tech`: technology list
- `interactive`: optional web-only context
- `condensed`: optional boolean — suppresses company description and tech in print for older roles

Company duration is derived from earliest position start → latest position end (or today for current roles). **Never store derived/calculated fields in the data.**

## Templates

Four templates are registered in `src/templates/registry.ts`:

| ID | Description |
|----|-------------|
| `classic` | Clean single-column layout |
| `two-column` | Sidebar with contact/skills on left |
| `divided` | Split left/right within each role |
| `vivid` | Bold, colourful, editorial style |

Switch templates via `?template=<id>` in the URL. Print styles in each template target two A4 pages.

## Variants

Variants are full standalone copies of `data/base.cv.json`, edited to target a specific role, company stage, or job listing. They live in `data/variants/<name>.cv.json` and use the same schema and resolver as the base file — no merge logic required.

**When working with the user on CV data edits:**
- If it's unclear which file they're referring to, ask: are they editing the base CV or a specific variant?
- If they make an edit to `base.cv.json` that is likely relevant to existing variants (e.g. fixing a bullet, improving phrasing), offer to carry the change across to the variants too.
- Variants are downstream of base. Encourage the user to get the base CV into a state they're fully happy with *before* creating variants — changes made to base after variants exist will need to be manually propagated.

## Cover Letters

Run `/cv-coverletter <job-url-or-description>` to generate a targeted cover letter. The skill fetches the job description, researches the company, analyses fit against the CV, asks a few clarifying questions, then writes the letter as a self-contained HTML file styled to match the CV template.

Generated files live in `data/cover-letters/<company-slug>.html` (gitignored). Open directly in Chrome; print to PDF via Ctrl+P.

Options:
- `--template=<name>` — template to style the letter after (default: `divided`)
- `--variant=<name>` — CV variant to draw from (default: `data/base.cv.json`)

## CV Copy Style

- **No em dashes** in bullet text or summaries. They read as AI-generated. Use commas, parentheses, or plain hyphens instead.
- Keep bullets direct and concrete. Vague claims ("established strategy", "drove outcomes") need a specific example or number to earn their place.

## Testing

- Unit tests for pure utilities (duration, resolver)
- Component tests for rendering and user interactions (filtering)
- Tests live alongside source files (`*.test.ts` / `*.test.tsx`)
- Test setup in `src/test/setup.ts`
