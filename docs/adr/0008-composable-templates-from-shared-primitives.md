# ADR 0008: Composable Templates from Shared Primitives

## Status

Accepted

## Context

ADR 0006 established templates as independent components, each with its own CSS. As the number of templates grew, two of them (Divided, Vivid) were large blocks of hand-written JSX, while Classic and Two-Column already composed small named components. The same data (contact details, role positions, education facts, bullets) was rendered by duplicated markup in each template, so a fix or content change had to be applied in several places, and the templates that were "just HTML" were hard to read.

The goal was to make every template read declaratively (named components, no raw HTML walls) and to share rendering of the common pieces, while preserving each template's distinct layout and visual style.

## Decision

Templates are composed from **shared primitives** plus **template-specific components**.

- Shared primitives live in `src/templates/_shared/` and render the common CV pieces: `Header`, `Role`, `Education`, `Section`, `Prose`, `BulletList`, and `StandardRole` (the conventional role layout shared by Classic and Two-Column).
- Primitives with several parts are exposed as a **compound component** — a namespace object whose properties are the parts, e.g. `Header.Name`, `Header.Contact`, `Role.Positions`, `Education.Qualification`. A template composes the parts it needs, in its own order and wrapper markup.
- Primitives render **semantic `cv-*` classes** (`cv-contact`, `cv-positions__item`, `cv-role__duration`, …). They carry no template-specific styling. Each template styles the shared markup by **scoping under its root class** (`.template-divided .cv-contact { … }`), per ADR 0006.
- Anything genuinely specific to one template (its header wrapper, its section arrangement) lives in that template's own directory as a normal component.

Two rules keep the boundary clean:

1. **No template imports from another template.** Shared code goes in `_shared/`; template directories never reach into each other. (Classic and Two-Column share role rendering via `_shared/StandardRole`, not by importing each other.)
2. **Primitives express structure and data, not template style.** Visual differences are achieved in CSS by scoping, not by props or variants on the primitive — with rare exceptions where structure genuinely differs (e.g. `Section`'s `heading` vs `label` variant).

The compound-component files carry a scoped `eslint-disable react-refresh/only-export-components`, because exporting a namespace object of parts trips that lint rule by design; these leaf primitives do not rely on fast-refresh.

## Consequences

- Every template file reads as a short composition of named components; there are no raw-HTML walls.
- A change to a shared piece (e.g. adding a field to contact details) is made once and flows to all templates.
- Because primitives are unstyled and templates own their CSS, the same markup can look completely different per template without branching logic in the components.
- A new template is built by composing shared primitives and adding only what is unique to it, then styling `cv-*` classes under its root — consistent with the "one component, one CSS file, one registry entry" cost from ADR 0006.
- Shared markup is a contract: changing a primitive's element structure or `cv-*` class names can affect every template's CSS, so such changes are reviewed across all templates (visual regression — see ADR 0009 — guards this).
- The `_shared` boundary must be respected; reaching across template directories is a smell that should move shared code into `_shared/` instead.
