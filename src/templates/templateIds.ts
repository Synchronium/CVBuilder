/**
 * The ordered list of template IDs — the single source of truth.
 *
 * Kept deliberately free of any component or CSS imports so it can be consumed
 * from Node-only contexts (e.g. the Playwright visual/a11y specs, which cannot
 * load the templates' `.css` files). `registry.ts` builds the full component
 * registry from this list, so the two cannot drift.
 */
export const TEMPLATE_IDS = [
  "classic",
  "two-column",
  "divided",
  "vivid"
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];
