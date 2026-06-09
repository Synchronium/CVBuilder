import type { Person, EducationItem } from "../../data/schemas";
import { Header } from "../_shared/Header";
import { Section } from "../_shared/Section";
import { Education } from "../_shared/Education";
import { Prose } from "../_shared/Prose";

type TwoColumnSidebarProps = {
  person: Person;
  summary: string;
  education: EducationItem[];
  interests?: string;
};

export function TwoColumnSidebar({ person, summary, education, interests }: TwoColumnSidebarProps) {
  return (
    <aside className="template-sidebar">
      <header className="sidebar-header">
        <Header.Name name={person.name} />
        <Header.Headline headline={person.headline} />
      </header>
      <Header.Contact person={person} />
      <Section title="Summary">
        <Prose text={summary} />
      </Section>
      <Section title="Education">
        {education.map((item) => (
          <div className="education-item" key={item.id}>
            <Education.Qualification qualification={item.qualification} />
            <Education.Detail item={item} />
          </div>
        ))}
      </Section>
      {interests && (
        <Section title="Interests">
          <Prose text={interests} />
        </Section>
      )}
    </aside>
  );
}
