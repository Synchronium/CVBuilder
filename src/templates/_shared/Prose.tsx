/** Plain paragraph for free-text blocks (summary, interests). Styled per template. */
import { parseInline } from "../../utils/parseInline";

export function Prose({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className ? `cv-prose ${className}` : "cv-prose"}>{parseInline(text)}</p>
  );
}
