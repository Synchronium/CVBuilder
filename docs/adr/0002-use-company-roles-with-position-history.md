# ADR 0002: Model Experience as Company Roles with Position History

## Status

Accepted

## Context

Engineers and managers often hold multiple titles at the same company over time. A flat list of positions would lose the company-tenure context and make it harder to show progression within an organisation.

## Decision

Each entry in `roles` represents a company-level experience. Titles and dates live inside `positions` within that role.

- A position without an `end` property is current.
- Company duration is derived from the earliest position start to the latest position end, or today when a current position exists.
- Each position can carry a `scope` field of extra detail. (This is retained in the data but not currently rendered — see ADR 0005.)
- Roles have a `condensed` boolean flag. When true, templates suppress company description and tech stack in print, reducing space used by older or less important roles.
- Company websites are stored as an array of `{ label, url }` objects to support multiple URLs per company.

## Consequences

- Company duration is always derived, never manually maintained.
- The `condensed` flag gives editorial control over print density without removing data.
- Date utilities must handle year-only (`"2016"`) and year-month (`"2022-06"`) values consistently.
