import type { EducationItem } from "../../data/schemas";
import { Section } from "../_shared/Section";
import { Education } from "../_shared/Education";

type DividedEducationProps = {
  education: EducationItem[];
};

export function DividedEducation({ education }: DividedEducationProps) {
  return (
    <Section title="Education" variant="label">
      {education.map((item) => (
        <div key={item.id} className="divided-education">
          <div className="divided-education-meta">
            <Education.Institution institution={item.institution} />
            <Education.Years start={item.start} end={item.end} />
          </div>
          <div className="divided-education-detail">
            <Education.Qualification qualification={item.qualification} />
            <Education.Grade grade={item.grade} />
          </div>
        </div>
      ))}
    </Section>
  );
}
