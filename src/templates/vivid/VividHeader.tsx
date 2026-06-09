import type { Person } from "../../data/schemas";
import { Header } from "../_shared/Header";
import { Prose } from "../_shared/Prose";

type VividHeaderProps = {
  person: Person;
  summary: string;
};

export function VividHeader({ person, summary }: VividHeaderProps) {
  return (
    <header className="vivid-header">
      <Header.Name name={person.name} />
      <div className="vivid-rule" />
      <div className="vivid-header-meta">
        <Header.Headline headline={person.headline} />
        <Header.Contact person={person} />
      </div>
      <Prose text={summary} className="vivid-summary" />
    </header>
  );
}
