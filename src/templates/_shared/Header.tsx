/* eslint-disable react-refresh/only-export-components -- compound component: parts are exported via the `Header` namespace object, not as standalone modules. */
import type { Person } from "../../data/schemas";

/**
 * Compound header primitives. Each part renders a semantic `cv-*` class that
 * templates style by scoping under their root (e.g. `.template-vivid .cv-name`).
 * Templates compose these in whatever order/structure they need.
 */

function Name({ name }: { name: string }) {
  return <h1 className="cv-name">{name}</h1>;
}

function Headline({ headline }: { headline: string }) {
  return <p className="cv-headline">{headline}</p>;
}

function Summary({ summary }: { summary: string }) {
  return <p className="cv-summary">{summary}</p>;
}

function Contact({ person }: { person: Person }) {
  const { email, phone, linkedin, address } = person.contact;

  return (
    <address className="cv-contact">
      <span className="cv-contact__item">
        <a href={`mailto:${email}`}>{email}</a>
      </span>
      <span className="cv-contact__item">
        <a href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a>
      </span>
      {linkedin && (
        <span className="cv-contact__item">
          <a href={linkedin}>LinkedIn</a>
        </span>
      )}
      <span className="cv-contact__item">
        {address.locality}, {address.region}, {address.country}
      </span>
      <span className="cv-contact__item">{person.workAuthorisation}</span>
    </address>
  );
}

export const Header = { Name, Headline, Summary, Contact };
