import type { Person } from "../../data/schemas";
import { Header } from "../_shared/Header";
import { Prose } from "../_shared/Prose";

type DividedHeaderProps = {
  person: Person;
  summary: string;
};

export function DividedHeader({ person, summary }: DividedHeaderProps) {
  return (
    <header className="divided-header">
      <Header.Name name={person.name} />
      <div className="divided-meta-row">
        <Header.Headline headline={person.headline} />
        <Header.Contact person={person} />
      </div>
      <Prose text={summary} className="divided-summary" />
    </header>
  );
}
