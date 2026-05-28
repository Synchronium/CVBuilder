import "./classic.css";
import { EducationBlock } from "../../components/EducationBlock";
import { EmploymentSection } from "../../components/EmploymentSection";
import { InterestsBlock } from "../../components/InterestsBlock";
import { ProfileHeader } from "../../components/ProfileHeader";
import type { TemplateProps } from "../types";

export function ClassicTemplate({ cv }: TemplateProps) {
  return (
    <article
      className="cv-document template template-classic"
      aria-label="Curriculum vitae"
    >
      <ProfileHeader person={cv.person} summary={cv.summary} />
      <EmploymentSection roles={cv.roles} />

      <div className="cv-section-grid">
        <EducationBlock education={cv.education} />
        <InterestsBlock interests={cv.interests} />
      </div>
    </article>
  );
}
