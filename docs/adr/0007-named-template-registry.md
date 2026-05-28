# ADR 0007: Named Template Registry with URL Switching

## Status

Accepted

## Context

The CV needs to support multiple visual presentations for different audiences and purposes. The template system must be extensible without coupling presentation logic to data or routing logic, and templates must be independently styleable.

## Decision

Templates are registered by stable string ID in `src/templates/registry.ts`. Each template is a React component that:

- Accepts a single `CvViewModel` prop — no raw data, no variant logic
- Imports its own co-located CSS file (`src/templates/<id>/<id>.css`)
- Adds a `template-<id>` class to its root element for CSS scoping

The active template is selected via a `?template=<id>` URL parameter. Unrecognised IDs fall back to `classic`. Template IDs are stable public identifiers — renaming one is a breaking change.

## Consequences

- Adding a template means: one component, one CSS file, one registry entry.
- CSS is scoped by the template class, preventing style leakage between templates.
- Template IDs in URLs are durable — they should not be renamed casually.
- Cover letter HTML files embed template CSS inline to remain portable without the dev server; template ID stability matters there too.
