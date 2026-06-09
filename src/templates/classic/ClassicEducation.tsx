import type { EducationItem } from "../../data/schemas";
import { Section } from "../_shared/Section";
import { Education } from "../_shared/Education";

type ClassicEducationProps = {
  education: EducationItem[];
};

export function ClassicEducation({ education }: ClassicEducationProps) {
  return (
    <Section title="Education">
      {education.map((item) => (
        <div className="education-item" key={item.id}>
          <Education.Qualification qualification={item.qualification} />
          <Education.Detail item={item} />
        </div>
      ))}
    </Section>
  );
}
