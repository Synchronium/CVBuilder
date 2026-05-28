type SummaryBlockProps = {
  text: string;
};

export function SummaryBlock({ text }: SummaryBlockProps) {
  return <p className="summary">{text}</p>;
}
