import { createElement, type ReactNode } from "react";

/**
 * Inline markup for CV free text: `*bold*` and `[label](url)`.
 *
 * Segments are emitted with the same boundary semantics as `String.split` on
 * the bold pattern (empty strings at the start/end and between adjacent
 * matches), so the output shape is unchanged for bold-only text.
 */
const INLINE = /\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(INLINE)) {
    const [token, bold, label, url] = match;
    nodes.push(text.slice(cursor, match.index));
    nodes.push(
      bold !== undefined
        ? createElement("strong", { key: key++ }, bold)
        : createElement("a", { key: key++, href: url }, label)
    );
    cursor = match.index + token.length;
  }

  if (nodes.length === 0) return text;
  nodes.push(text.slice(cursor));
  return nodes;
}
