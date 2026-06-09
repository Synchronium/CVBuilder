import type { EducationItem } from "../../data/schemas";
import { Section } from "../_shared/Section";
import { Education } from "../_shared/Education";

type VividEducationProps = {
  education: EducationItem[];
};

export function VividEducation({ education }: VividEducationProps) {
  return (
    <Section title="Education" className="vivid-section">
      {education.map((item) => (
        <div key={item.id} className="vivid-education-item">
          <div className="vivid-education-header">
            <Education.Institution institution={item.institution} />
            <Education.Years start={item.start} end={item.end} />
          </div>
          <Education.Qualification qualification={item.qualification} />
          <Education.Grade grade={item.grade} />
        </div>
      ))}
    </Section>
  );
}
