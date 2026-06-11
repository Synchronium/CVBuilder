# ADR 0012: Two-Layer Accessibility Testing

## Status

Accepted

## Context

A CV is consumed by people using assistive technology and by automated systems
(ATS, screen readers), so the rendered templates need to be accessible, not just
good-looking. Until now nothing checked this automatically: accessibility issues
were found by hand, one at a time (e.g. the Divided section headings in ADR 0010's
work), which does not scale across four templates and two media modes (screen and
print).

Two kinds of accessibility problem matter here, and they need different tooling:

- **Structural** — heading order, landmarks, accessible names, ARIA correctness.
  These can be evaluated from the DOM, so they work in jsdom.
- **Colour contrast** — requires the *rendered* colours, which jsdom does not
  compute. It can only be checked in a real browser. For a set of visually
  distinct, colour-led templates (Vivid especially), contrast is the most likely
  real issue.

## Decision

Test accessibility in **two layers**, each matched to its strength.

1. **Structural checks in the unit suite** (`src/templates/templates.a11y.test.tsx`)
   using `jest-axe`. One `axe` run per template against the rendered DOM, asserting
   no violations. The `color-contrast` rule is **disabled here** because jsdom
   cannot compute rendered colours. These run on every `npm test` and in CI, so
   structural regressions block merges.

2. **Contrast (and full) checks in the browser** (`visual/templates.a11y.spec.ts`)
   using `@axe-core/playwright` against the production build, one run per template
   under the WCAG 2.0/2.1 A and AA rule tags. This catches the colour-contrast
   rules the unit layer cannot. It runs locally with the visual-regression suite
   (`npm run test:visual`), **not in CI** — same rationale as ADR 0010 (the
   browser run is local/on-demand).

Both layers derive their template list from `templateIds.ts` (ADR 0009 / the
dynamic-IDs change), so a new template is covered automatically.

### Contrast remediation standard

Fixing the violations the browser layer surfaced established the standard all
templates now meet (WCAG AA, 4.5:1 for normal text), screen and print:

- Muted secondary text uses `#6b7280` (4.83:1 on white), not the lighter
  `#9ca3af` (2.53:1) used previously.
- De-emphasis of older/secondary positions is done with an explicit AA-compliant
  grey plus reduced font weight, **not `opacity`** (opacity multiplies against the
  background and pushes contrast below the threshold).
- Vivid's accent splits into two custom properties: `--accent` (the bright orange,
  used only for decorative elements like the rule bar and section underlines,
  which are exempt from text-contrast rules) and `--accent-text` (a darker orange
  that meets AA for accent-coloured text).
- The app toolbar text was darkened to meet AA on the page background.

## Consequences

- Structural accessibility is guarded on every test run and in CI; contrast is
  guarded locally before changes ship, alongside visual regression.
- New templates inherit both checks automatically via `templateIds.ts`. A template
  that introduces a failing colour will fail `npm run test:visual` locally.
- The contrast standard above is now a constraint on template CSS: muted text at
  `#6b7280` or darker, no opacity-based text de-emphasis, and accent colours that
  meet AA wherever they are used as text. The `make-template` skill should keep new
  templates within it.
- Contrast is verified in a real browser only, so like visual-regression baselines
  it is not enforced in CI. If accessibility ever needs to gate merges, the browser
  layer would have to move into CI (with the same environment caveats as ADR 0010).
- The split between a jsdom structural layer and a browser contrast layer mirrors
  the split between the unit tests and visual regression (ADR 0010): fast,
  CI-friendly checks for what jsdom can see; on-demand browser checks for what it
  cannot.
