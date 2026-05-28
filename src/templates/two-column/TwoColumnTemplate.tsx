import "./two-column.css";
import { ContactDetails } from "../../components/ContactDetails";
import { EducationBlock } from "../../components/EducationBlock";
import { EmploymentSection } from "../../components/EmploymentSection";
import { InterestsBlock } from "../../components/InterestsBlock";
import { SummaryBlock } from "../../components/SummaryBlock";
import type { TemplateProps } from "../types";

export function TwoColumnTemplate({ cv }: TemplateProps) {
  return (
    <article
      className="cv-document template template-two-column"
      aria-label="Curriculum vitae"
    >
      <aside className="template-sidebar">
        <header className="sidebar-header">
          <h1>{cv.person.name}</h1>
          <p className="headline">{cv.person.headline}</p>
        </header>
        <ContactDetails person={cv.person} />
        <section className="cv-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <SummaryBlock text={cv.summary} />
        </section>
        <EducationBlock education={cv.education} />
        <InterestsBlock interests={cv.interests} />
      </aside>

      <div className="template-main">
        <EmploymentSection roles={cv.roles} />
      </div>
    </article>
  );
}
