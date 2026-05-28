import type { Person } from "../data/schemas";
import { ContactDetails } from "./ContactDetails";
import { SummaryBlock } from "./SummaryBlock";

type ProfileHeaderProps = {
  person: Person;
  summary: string;
};

export function ProfileHeader({ person, summary }: ProfileHeaderProps) {
  return (
    <header className="profile-header">
      <div>
        <h1>{person.name}</h1>
        <p className="headline">{person.headline}</p>
      </div>
      <ContactDetails person={person} />
      <SummaryBlock text={summary} />
    </header>
  );
}
