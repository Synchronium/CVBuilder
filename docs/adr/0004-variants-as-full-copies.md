# ADR 0004: Variants are Full Standalone Copies

## Status

Accepted

## Context

Different CV versions need different summaries, bullet selection, ordering and wording — for example, targeting a startup CTO role versus a senior EM position at an enterprise.

An overlay approach — where a variant file contains only the delta from base — keeps shared content centralised and avoids duplication, but introduces real complexity: the resolver must merge two files, broken ID references fail silently, and the rendered output is hard to reason about without holding both files in mind simultaneously. In practice a user is unlikely to maintain more than a handful of variants, so the duplication cost is low and the complexity cost is not worth paying.

## Decision

Variants are full standalone copies of `data/base.cv.json`, edited to target a specific role, company stage, or job listing.

- Variants live in `data/variants/<name>.cv.json`.
- They use the same Zod schema and resolver as the base file — no merge step required.
- Drift between base and variants is managed manually, assisted by the `/cv-compare` skill.
- Users should finalise the base CV before creating variants to minimise propagation work.

## Consequences

- The resolver stays simple — load a file, validate, resolve.
- Variant files are self-contained and easy to read and edit directly.
- Improvements to `data/base.cv.json` must be manually propagated to any variants.
- `/cv-compare` provides a practical tool for spotting drift between versions.
