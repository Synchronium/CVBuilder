import type { Person } from "../data/schemas";

type ContactDetailsProps = {
  person: Person;
};

export function ContactDetails({ person }: ContactDetailsProps) {
  const address = person.contact.address;

  return (
    <address className="contact-details">
      <a href={`mailto:${person.contact.email}`}>{person.contact.email}</a>
      <a href={`tel:${person.contact.phone.replaceAll(" ", "")}`}>
        {person.contact.phone}
      </a>
      {person.contact.linkedin && (
        <a href={person.contact.linkedin} className="web-only">LinkedIn</a>
      )}
      <span>
        {address.locality}, {address.region}, {address.country}
      </span>
      <span>{person.workAuthorisation}</span>
    </address>
  );
}
