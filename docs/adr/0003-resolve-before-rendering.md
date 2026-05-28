# ADR 0003: Resolve CV Data Before Rendering

## Status

Accepted

## Context

The app supports base data, calculated durations, current-role detection, inline formatting, and multiple output modes. If components access raw data directly, presentation code accumulates business logic and becomes hard to test and reuse.

## Decision

Render template components from a resolved `CvViewModel` only.

The resolver is responsible for:

- Validating raw data against the Zod schema.
- Loading the correct file (base CV or a named variant).
- Calculating durations and formatting date ranges.
- Detecting current positions.
- Producing the exact shape that components need to render.

Components handle local UI state only — they do not calculate, infer, or transform data.

## Consequences

- Rendering stays simple and testable in isolation.
- Data logic can be unit-tested without React.
- The resolver is reusable from both runtime and any future static build path.
- The resolver is a key architectural boundary and should remain deliberately designed.
