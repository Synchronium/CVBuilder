# ADR 0009: Local Visual Regression Testing

## Status

Accepted

## Context

Templates now share rendering primitives (ADR 0008), so a single change to a
shared component or `cv-*` class can alter every template at once. Unit and
component tests assert structure and data, but they cannot tell whether a
template still *looks* right — a CSS change can shift layout or colour without
breaking any assertion. Visual changes were previously verified by taking
screenshots by hand and eyeballing them on every template refactor.

Visual regression (VR) testing automates that: render each template, compare a
screenshot against a committed baseline, and fail on unexpected pixel
differences. The complication is that baselines are environment-specific — font
hinting and anti-aliasing differ between machines and CI runners, so a baseline
generated on one platform produces false failures on another.

## Decision

Add Playwright-based VR testing that runs **locally and on demand**, not in CI.

- Specs live in `visual/`, baselines in `visual/__screenshots__/` (committed).
- One baseline per template per media mode (screen + print) — eight in total,
  driven off the base CV so they do not depend on gitignored variant files.
- Snapshots are taken against the **production build** served by `vite preview`
  (Playwright's `webServer`), not the dev server, so output is deterministic
  (no HMR client, no sourcemaps).
- Two scripts: `npm run test:visual` (compare) and `npm run test:visual:update`
  (accept current rendering as the new baseline).
- Tolerance is deliberately tight (`threshold: 0.2`, `maxDiffPixels: 100`).
  Because baselines are generated on the same machine that compares them, renders
  are near-identical, so a loose ratio (an early `maxDiffPixelRatio: 0.01`) was
  found to silently miss small-but-real changes such as a recoloured headline. A
  small absolute pixel budget absorbs anti-alias jitter while still catching
  genuine differences.

VR is **not** wired into CI (ADR-pending) because committed baselines would not
match CI-runner rendering. If VR is ever promoted to CI, baselines must be
generated inside the CI environment (e.g. a pinned container), not locally.

## Consequences

- Shared-primitive changes (ADR 0008) have an automated safety net for visual
  ripple across all four templates, replacing manual screenshot review.
- The workflow requires a human in the loop: a VR failure means "pixels
  changed," not "something is wrong." The author inspects the diff image under
  `test-results/` and either fixes the regression or, if the change is intended,
  runs `test:visual:update` and commits the new baselines. The act of committing
  the updated PNG *is* the approval.
- Baseline PNGs are tracked in git; intended visual changes produce binary diffs
  in history. Playwright run artifacts (`test-results/`, reports) are gitignored.
- Baselines are platform-specific. A contributor on a different OS may see
  spurious failures and should regenerate baselines locally; this is the
  accepted cost of keeping VR out of CI for now.
- Requires `@playwright/test` (pinned to the installed `playwright` version to
  reuse the cached Chromium) and is excluded from the Vitest run so the two test
  frameworks do not collide.
