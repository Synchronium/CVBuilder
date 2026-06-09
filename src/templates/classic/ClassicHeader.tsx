import type { Person } from "../../data/schemas";
import { Header } from "../_shared/Header";

type ClassicHeaderProps = {
  person: Person;
  summary: string;
};

export function ClassicHeader({ person, summary }: ClassicHeaderProps) {
  return (
    <header className="classic-header">
      <div>
        <Header.Name name={person.name} />
        <Header.Headline headline={person.headline} />
      </div>
      <Header.Contact person={person} />
      <Header.Summary summary={summary} />
    </header>
  );
}
