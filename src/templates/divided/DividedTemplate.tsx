import "./divided.css";
import { BulletList } from "../../components/BulletList";
import type { RoleViewModel } from "../../data/resolveCv";
import type { TemplateProps } from "../types";

export function DividedTemplate({ cv }: TemplateProps) {
  const { person } = cv;
  const address = person.contact.address;

  return (
    <article
      className="cv-document template template-divided"
      aria-label="Curriculum vitae"
    >
      <header className="divided-header">
        <h1>{person.name}</h1>
        <div className="divided-meta-row">
          <p className="headline">{person.headline}</p>
          <div className="divided-contact">
            <span className="divided-contact-item">
              <a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>
            </span>
            <span className="divided-contact-item">
              <a href={`tel:${person.contact.phone.replaceAll(" ", "")}`}>
                {person.contact.phone}
              </a>
            </span>
            {person.contact.linkedin && (
              <span className="divided-contact-item web-only">
                <a href={person.contact.linkedin}>LinkedIn</a>
              </span>
            )}
            <span className="divided-contact-item">
              {address.locality}, {address.region}
            </span>
            <span className="divided-contact-item">{person.workAuthorisation}</span>
          </div>
        </div>
        <p className="divided-summary">{cv.summary}</p>
      </header>

      <span className="section-label">Experience</span>

      {cv.roles.map((role) => (
        <DividedRole key={role.id} role={role} />
      ))}

      <span className="section-label">Education</span>

      {cv.education.map((item) => (
        <div key={item.id} className="divided-education">
          <div className="divided-education-meta">
            <div>{item.institution}</div>
            <div className="divided-education-years">
              {item.start}–{item.end}
            </div>
          </div>
          <div className="divided-education-detail">
            <h3>{item.qualification}</h3>
            <p>{item.grade}</p>
          </div>
        </div>
      ))}

      {cv.interests && (
        <>
          <span className="section-label">Interests</span>
          <div className="divided-interests">
            <div />
            <p>{cv.interests}</p>
          </div>
        </>
      )}
    </article>
  );
}

function DividedRole({ role }: { role: RoleViewModel }) {
  return (
    <div className={role.condensed ? "divided-role divided-role--condensed" : "divided-role"}>
      <div className="divided-role-meta">
        <h3>{role.company.name}</h3>
        <p className="divided-role-duration">{role.duration}</p>
        <ol className="divided-positions">
          {role.positions.map((position) => (
            <li key={position.id}>
              <strong>{position.title}</strong>
              <span>{position.dateRange}</span>
            </li>
          ))}
        </ol>
        {role.company.description && (
          <p className="divided-role-description">{role.company.description}</p>
        )}
        {role.interactive?.context && (
          <details className="web-only role-context">
            <summary>Role context</summary>
            <p className="divided-role-context-text">{role.interactive.context}</p>
          </details>
        )}
      </div>
      <div className="divided-role-content">
        <BulletList bullets={role.bullets} />
        {role.tech.length > 0 && (
          <p className="divided-tech">{role.tech.join(", ")}</p>
        )}
      </div>
    </div>
  );
}
