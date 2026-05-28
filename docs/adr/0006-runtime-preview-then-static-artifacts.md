# ADR 0006: Build Runtime Preview First, Then Static Artifacts

## Status

Accepted

## Context

The schema, resolver and UI need iteration. Runtime loading is useful while editing data and refining design. Shareable CVs should eventually be deterministic static artifacts, but investing in generation infrastructure before the renderer stabilises would be premature.

## Decision

Build in phases:

1. **Runtime preview** — Vite app that loads CV data at runtime and renders an interactive preview. ✅ Complete.
2. **Static HTML generation** — generate one static HTML output per variant once the renderer stabilises.
3. **PDF generation** — deterministic PDFs from the same rendered output.
4. **Variant support** — generate all configured variants automatically (see ADR 0004).

In the meantime, PDFs are produced manually via browser print-to-PDF (Cmd+P / Ctrl+P → Save as PDF).

## Consequences

- The first usable app was built quickly with no generation infrastructure.
- Data and design can be iterated before committing to a static build pipeline.
- The same resolver and components must remain reusable from both runtime and build-time paths — this constraint is enforced by ADR 0003.
- Until static generation is built, PDFs depend on the user's browser and manual steps.
