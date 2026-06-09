import "./vivid.css";
import type { TemplateProps } from "../types";
import { Section } from "../_shared/Section";
import { VividHeader } from "./VividHeader";
import { VividRole } from "./VividRole";
import { VividEducation } from "./VividEducation";
import { VividInterests } from "./VividInterests";

export function VividTemplate({ cv }: TemplateProps) {
  return (
    <article className="cv-document template template-vivid" aria-label="Curriculum vitae">
      <VividHeader person={cv.person} summary={cv.summary} />

      <Section title="Experience" className="vivid-section">
        <div className="vivid-role-list">
          {cv.roles.map((role) => (
            <VividRole key={role.id} role={role} />
          ))}
        </div>
      </Section>

      <div className="vivid-lower">
        <VividEducation education={cv.education} />
        <VividInterests interests={cv.interests} />
      </div>
    </article>
  );
}
