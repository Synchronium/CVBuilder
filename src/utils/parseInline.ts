import { createElement, type ReactNode } from "react";

export function parseInline(text: string): ReactNode {
  const parts = text.split(/\*([^*]+)\*/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? createElement("strong", { key: i }, part) : part));
}
