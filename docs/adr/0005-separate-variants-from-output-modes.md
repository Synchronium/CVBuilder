# ADR 0005: Separate Variants from Output Modes

## Status

Accepted

## Context

The same CV story may need to be presented as an interactive web page, a print preview, or a generated PDF. These are presentation concerns that should not be entangled with content-selection concerns.

## Decision

Variant and output mode are separate concepts.

- **Variant** answers: what story are we telling? (which bullets, which framing, which summary)
- **Output mode** answers: how is it presented? (interactive, print, PDF)

Supported output modes:

- `interactive` — full web CV with tag filters, expandable role scope and context
- `print` — browser print view with web-only detail hidden via the `.web-only` CSS class
- `pdf` — PDF generated from the print view via browser print-to-PDF

Web-only fields (`scope` on positions, `interactive.context` on roles) are present in the data but hidden in print by the `.web-only` CSS utility class.

## Consequences

- A single variant can be rendered in any output mode without data changes.
- Print and PDF styling does not leak into content selection logic.
- Interactive-only fields are hidden in print output automatically via CSS, with no renderer logic required.
