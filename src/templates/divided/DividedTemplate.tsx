import "./divided.css";
import type { TemplateProps } from "../types";
import { Section } from "../_shared/Section";
import { DividedHeader } from "./DividedHeader";
import { DividedRole } from "./DividedRole";
import { DividedEducation } from "./DividedEducation";
import { DividedInterests } from "./DividedInterests";

export function DividedTemplate({ cv }: TemplateProps) {
  return (
    <article
      className="cv-document template template-divided"
      aria-label="Curriculum vitae"
    >
      <DividedHeader person={cv.person} summary={cv.summary} />

      <Section title="Experience" variant="label">
        {cv.roles.map((role) => (
          <DividedRole key={role.id} role={role} />
        ))}
      </Section>

      <DividedEducation education={cv.education} />
      <DividedInterests interests={cv.interests} />
    </article>
  );
}
