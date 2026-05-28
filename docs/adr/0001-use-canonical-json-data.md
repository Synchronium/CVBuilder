# ADR 0001: Store Canonical CV Data as JSON

## Status

Accepted

## Context

The CV needs to support multiple outputs, templates and variants without duplicating shared career facts. The first source of truth was an existing PDF CV, but future edits should be made in a structured format that code can validate and render.

## Decision

Store canonical CV facts in `data/base.cv.json`.

This file contains stable IDs for roles, positions, bullets and education items. It is validated against a Zod schema before rendering. Variants are full copies of this file, edited to target a specific role or audience.

## Consequences

- CV content is validated before rendering, with clear errors pointing to data problems rather than UI bugs.
- Multiple variants can be created from the same base and compared with tooling.
- Stable IDs matter — bullets and roles should not be renamed casually once variants exist, as that breaks any downstream comparisons or references.
- Hand-editing JSON is less ergonomic than a purpose-built editor, but it is simple, explicit, and works well with AI-assisted editing.
