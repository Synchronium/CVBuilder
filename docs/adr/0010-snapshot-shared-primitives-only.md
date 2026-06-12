# ADR 0010: Snapshot the Shared Primitives, Not Templates or Components Broadly

## Status

Accepted

## Context

With composable templates (ADR 0008), the shared primitives in
`src/templates/_shared/` render semantic `cv-*` classes and a fixed element
structure that **every template's CSS depends on** by scoping under its root
(e.g. `.template-divided .cv-positions__item`). Renaming a class or changing an
element in a primitive does not break the component — it still renders — and
behavioural tests (which assert roles, text, and behaviour) do not notice. But
it silently breaks the CSS of all templates at once.

Visual regression (ADR 0009) would catch this, but it is local and on demand,
not part of the fast unit suite. We wanted that contract guarded in the unit
run too. The question was how much to snapshot.

Snapshot testing has a well-known failure mode: large or broad snapshots become
noise that everyone reflexively updates with `--update` without reading the
diff, at which point they stop catching anything. We considered three scopes:

1. **Whole-template HTML snapshots** — large, and largely duplicate visual
   regression (a structural change that matters almost always changes pixels).
   High rot risk, low marginal value.
2. **Broad component snapshots** (including composites like `StandardRole`) —
   composites are effectively mini-templates; snapshotting them drifts toward
   option 1, and their behaviour is already covered by their own behavioural
   tests.
3. **Leaf shared-primitive snapshots only** — small, readable, and target
   exactly the class/structure contract that nothing else in the unit suite
   guards.

## Decision

Snapshot **only the leaf shared primitives** in `src/templates/_shared/`
(`Header.*`, `Role.*`, `Education.*`, `Section`, `Prose`, `BulletList`), in
`src/templates/_shared/primitives.snapshot.test.tsx`.

Each snapshot renders one primitive in isolation and captures its rendered
markup (element + `cv-*` classes + structure). The snapshots are intentionally
tiny, so a failing diff is a few self-explanatory lines (e.g. a renamed class),
making "is this change intentional?" obvious rather than something to rubber-stamp.

Explicitly **not** snapshotted:

- **Whole templates** — covered by visual regression (ADR 0009).
- **`StandardRole`** and other composites — covered by behavioural tests; it is a
  composition, not a leaf contract.
- **App/UI components** (`CVPage`, switchers, etc.) — covered by behavioural
  tests asserting intent.

## Consequences

- A change to a shared primitive's class names or element structure fails fast
  in the unit suite with a small, readable diff — the contract that ADR 0008's
  templates rely on is now pinned.
- Intended primitive changes require regenerating the snapshot
  (`vitest -u`) and committing it; because the snapshots are small, reviewing
  that diff is meaningful rather than rote.
- Scope is deliberately narrow to avoid snapshot rot. If snapshots are ever
  added more broadly, this ADR should be revisited — broad snapshots that get
  blindly updated are worse than none.
- There is intentional overlap with visual regression for class/structure
  changes; the snapshots add value by living in the fast unit suite (run on
  every `npm test`) rather than the on-demand visual run.
