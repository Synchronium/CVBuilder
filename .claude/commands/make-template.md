Create a new CV template for the CVBuilder project.

If the user has not provided a style description in $ARGUMENTS, ask them to describe the visual style they want before proceeding. Examples: "sleek and typographic, lots of whitespace", "bold and colourful, shows personality", "minimal and recruiter-safe, no colour". Get a clear description before writing any code.

Once you have a description, implement the template.

## How templates work

Templates are **composed from shared primitives plus their own components** — they are not single hand-written HTML files. See `docs/adr/0009-composable-templates-from-shared-primitives.md` for the full rationale. The key rules:

- A template lives in `src/templates/<name>/` with a `<Name>Template.tsx` entry component, a `<name>.css` file, and as many small template-specific components as it needs (e.g. `<Name>Header.tsx`, `<Name>Role.tsx`, `<Name>Education.tsx`).
- **Main template files should contain no raw HTML walls** — they read as a composition of named components, like `src/templates/classic/ClassicTemplate.tsx` or `src/templates/divided/DividedTemplate.tsx`. Read both as reference for the pattern (not the design).
- All templates receive `TemplateProps` from `src/templates/types.ts` — read this.
- The resolved view model is in `src/data/resolveCv.ts` — read this to understand available data.
- **No template may import from another template.** Shared code lives in `src/templates/_shared/`; never reach into a sibling template directory.

### Shared primitives (`src/templates/_shared/`)

Compose these rather than re-writing their markup. Most are **compound components** — a namespace object whose parts you place individually:

- `Header` — `Header.Name`, `Header.Headline`, `Header.Contact`, `Header.Summary`
- `Role` — `Role.Company`, `Role.Product`, `Role.Duration`, `Role.Description`, `Role.Positions`, `Role.Context`, `Role.Tech`
- `Education` — `Education.Qualification`, `Education.Institution`, `Education.Grade`, `Education.Years`, `Education.Detail` (combined one-line)
- `Section` — section wrapper + heading; `variant="heading"` (default `<h2>`) or `variant="label"` (inline banner)
- `BulletList` — experience bullets (use this; do not re-implement)
- `Prose` — a styled paragraph for summary/interests
- `StandardRole` — the conventional company-header + positions + bullets role layout, shared by Classic and Two-Column. Use it if your template's roles follow that conventional shape; compose `Role.*` parts yourself if your layout differs (as Divided and Vivid do).

Primitives render **semantic `cv-*` classes** and carry no styling of their own. You style them by scoping under your template root (see CSS below). Anything genuinely unique to your template is a new component in your template's own directory.

## CSS requirements

- Import Google Fonts at the top of the CSS file if using custom typography.
- **Scope all styles under `.template-<name>`** to avoid leaking into other templates. This is also how you style the shared `cv-*` primitives — e.g. `.template-<name> .cv-contact { … }`, `.template-<name> .cv-positions__item { … }`.
- Include a `@media print` section that:
  - Sets `font-size: 9.5pt` as the base
  - Tightens spacing (margins, padding, gaps) to aim for **two A4 pages** of content
  - Suppresses detail for condensed roles (`role.condensed === true`) — e.g. hide company description and tech. Target whichever condensed modifier class your role wrapper uses (`.cv-role--condensed` if you used `StandardRole`, or your own `.<name>-role--condensed`).
  - `.web-only` hiding and `@page { size: A4; margin: 15mm 18mm }` are handled globally in `src/styles/base.css`; add template-specific print overrides only as needed.
- Use `className="web-only"` on anything that should be hidden in print (e.g. the LinkedIn link is already handled inside `Header.Contact`).

## After implementing

1. **Register** the new template in `src/templates/registry.ts`.
2. **Add the template ID to the visual-regression spec**: append it to the `templates` array in `visual/templates.visual.spec.ts`, or its baselines will never be generated or checked.
3. **Screenshot for review**: start the dev server with `npm run dev` (background), then:
   ```
   npm run screenshot -- <name> /tmp/cv-screen.png
   npm run screenshot -- <name> /tmp/cv-print.png --print
   ```
4. **Generate the visual-regression baselines** for the new template (see `docs/adr/0010-local-visual-regression-testing.md`):
   ```
   npm run test:visual:update
   ```
   This creates `visual/__screenshots__/<name>-screen.png` and `<name>-print.png`, which must be committed alongside the template. Then confirm a clean `npm run test:visual` passes.
5. **Verify nothing else broke**: `npm run lint`, `npm run build`, `npm test`.
6. Report what you built and show both screenshots.
