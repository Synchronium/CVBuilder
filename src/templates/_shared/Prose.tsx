/** Plain paragraph for free-text blocks (summary, interests). Styled per template. */
export function Prose({ text, className }: { text: string; className?: string }) {
  return <p className={className ? `cv-prose ${className}` : "cv-prose"}>{text}</p>;
}
