# ADR 0007: Custom Inline Bold Syntax in Bullet Text

## Status

Accepted

## Context

CV bullet text needs to support emphasis — typically to highlight numbers, achievements, or key claims. Options considered: plain text only, HTML tags embedded in JSON strings, full Markdown, or a minimal custom syntax.

HTML tags in JSON are fragile to edit by hand and bleed presentation into data. Full Markdown brings a parser dependency and a broader formatting surface than the data model needs. Plain text loses the ability to highlight what matters in a bullet.

## Decision

Bullet text supports a single inline construct: `*text*` renders as bold (`<strong>`). Parsing is handled by `src/utils/parseInline.ts`, which is called at render time by components — not by the resolver. The resolver passes raw strings; formatting is a presentation concern.

Only `strong` emphasis is supported. No other Markdown constructs are recognised.

## Consequences

- No Markdown library is required.
- The data format has a deliberately constrained formatting vocabulary.
- Components that render bullet text must call `parseInline` rather than rendering raw strings.
- The syntax is intentionally minimal — adding further inline formatting would require extending `parseInline` and updating all templates.
