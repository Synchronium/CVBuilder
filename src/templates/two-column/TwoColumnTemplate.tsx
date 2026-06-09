import "./two-column.css";
import type { TemplateProps } from "../types";
import { TwoColumnSidebar } from "./TwoColumnSidebar";
import { TwoColumnExperience } from "./TwoColumnExperience";

export function TwoColumnTemplate({ cv }: TemplateProps) {
  return (
    <article
      className="cv-document template template-two-column"
      aria-label="Curriculum vitae"
    >
      <TwoColumnSidebar
        person={cv.person}
        summary={cv.summary}
        education={cv.education}
        interests={cv.interests}
      />

      <div className="template-main">
        <TwoColumnExperience roles={cv.roles} />
      </div>
    </article>
  );
}
