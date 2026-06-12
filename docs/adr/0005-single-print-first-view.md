# ADR 0005: Single Print-First View

## Status

Accepted

## Context

An earlier iteration of this project treated the CV as having multiple output
modes — an interactive web page (with tag filters and expandable role
scope/context detail), a print preview, and a generated PDF — and planned a
phased roadmap toward generating static HTML and PDF artifacts.

In practice the only way the app is actually used is: edit the data, look at the
rendered page, and print to PDF. The interactive web layer (web-only expandable
detail, a screen-vs-print toggle, responsive reflow) and the static-generation
roadmap were speculative and added complexity without being used. Maintaining
two presentations of every template (an on-screen web view and a print view)
doubled the surface area for little benefit.

## Decision

The app has **one view**, designed for print/PDF output.

- The on-screen view *is* the print preview: a fixed A4-width document on a
  coloured background, mirroring what the PDF will look like. It is not
  responsive — it stays A4-width at any viewport.
- There are no "web-only" elements and no screen-vs-print mode toggle. The
  on-screen chrome is limited to controls (template switcher, variant switcher,
  a print button); these are the only things hidden from the printed output, via
  `@media print` — analogous to a preview toolbar that never prints.
- PDFs are produced by the browser's print-to-PDF. There is no static HTML/PDF
  generation pipeline; that roadmap is dropped.
- Variant (which story to tell) remains an independent concept from presentation,
  but presentation is now a single target.

The data schema still carries fields that were previously web-only
(`position.scope`, `bullet.detail`, `role.interactive.context`). These are
retained but no longer rendered; they may be woven into the printed templates
later rather than discarded.

## Consequences

- One template presentation to build, style, and test per template, not two.
- No `.web-only` utility, no print-preview mode, no responsive breakpoints.
- The visual-regression and accessibility suites test the single page in screen
  and print media (the print media still tightens sizing for A4).
- Cover letters remain self-contained HTML styled to match a template, printed
  to PDF the same way.
- The retained-but-unrendered data fields are slightly "dead" until a future
  template change surfaces them.
