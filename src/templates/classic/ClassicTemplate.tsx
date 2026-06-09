import "./classic.css";
import type { TemplateProps } from "../types";
import { ClassicHeader } from "./ClassicHeader";
import { ClassicExperience } from "./ClassicExperience";
import { ClassicEducation } from "./ClassicEducation";
import { ClassicInterests } from "./ClassicInterests";

export function ClassicTemplate({ cv }: TemplateProps) {
  return (
    <article
      className="cv-document template template-classic"
      aria-label="Curriculum vitae"
    >
      <ClassicHeader person={cv.person} summary={cv.summary} />
      <ClassicExperience roles={cv.roles} />

      <div className="cv-section-grid">
        <ClassicEducation education={cv.education} />
        <ClassicInterests interests={cv.interests} />
      </div>
    </article>
  );
}
