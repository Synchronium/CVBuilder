import type { EducationItem } from "../data/schemas";
import { formatDate } from "../data/duration";

type EducationBlockProps = {
  education: EducationItem[];
};

export function EducationBlock({ education }: EducationBlockProps) {
  return (
    <section className="cv-section" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      {education.map((item) => (
        <div className="education-item" key={item.id}>
          <h3>{item.qualification}</h3>
          <p>
            {item.grade}, {item.institution}, {formatDate(item.start)} to {formatDate(item.end)}
          </p>
        </div>
      ))}
    </section>
  );
}
