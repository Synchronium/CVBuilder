import "./vivid.css";
import { BulletList } from "../../components/BulletList";
import type { RoleViewModel } from "../../data/resolveCv";
import type { TemplateProps } from "../types";

export function VividTemplate({ cv }: TemplateProps) {
  const { person } = cv;
  const { address } = person.contact;

  return (
    <article className="cv-document template template-vivid" aria-label="Curriculum vitae">
      <header className="vivid-header">
        <h1>{person.name}</h1>
        <div className="vivid-rule" />
        <div className="vivid-header-meta">
          <p className="vivid-headline">{person.headline}</p>
          <div className="vivid-contact">
            <a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>
            <a href={`tel:${person.contact.phone.replaceAll(" ", "")}`}>{person.contact.phone}</a>
            {person.contact.linkedin && (
              <a href={person.contact.linkedin}>LinkedIn</a>
            )}
            <span>{address.locality}, {address.region}</span>
            <span>{person.workAuthorisation}</span>
          </div>
        </div>
        <p className="vivid-summary">{cv.summary}</p>
      </header>

      <section className="vivid-section">
        <h2>Experience</h2>
        <div className="vivid-role-list">
          {cv.roles.map((role) => (
            <VividRole key={role.id} role={role} />
          ))}
        </div>
      </section>

      <div className="vivid-lower">
        <section className="vivid-section">
          <h2>Education</h2>
          {cv.education.map((item) => (
            <div key={item.id} className="vivid-education-item">
              <div className="vivid-education-header">
                <h3>{item.institution}</h3>
                <span className="vivid-years">{item.start}–{item.end}</span>
              </div>
              <p className="vivid-qualification">{item.qualification}</p>
              <p className="vivid-grade">{item.grade}</p>
            </div>
          ))}
        </section>

        {cv.interests && (
          <section className="vivid-section">
            <h2>Interests</h2>
            <p className="vivid-interests">{cv.interests}</p>
          </section>
        )}
      </div>
    </article>
  );
}

function VividRole({ role }: { role: RoleViewModel }) {
  return (
    <div className="vivid-role">
      <div className="vivid-role-header">
        <h3>{role.company.name}</h3>
        <span className="vivid-duration">{role.duration}</span>
      </div>
      {role.company.description && (
        <p className="vivid-company-desc">{role.company.description}</p>
      )}
      <div className="vivid-positions">
        {role.positions.map((pos) => (
          <div key={pos.id} className={`vivid-position${pos.isCurrent ? " vivid-position--current" : ""}`}>
            <span className="vivid-position-title">{pos.title}</span>
            <span className="vivid-position-date">{pos.dateRange}</span>
          </div>
        ))}
      </div>
      {role.interactive?.context && (
        <details className="web-only role-context">
          <summary>Role context</summary>
          <p>{role.interactive.context}</p>
        </details>
      )}
      <BulletList bullets={role.bullets} />
      {role.tech.length > 0 && (
        <p className="vivid-tech">{role.tech.join(", ")}</p>
      )}
    </div>
  );
}
