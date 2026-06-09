import { Section } from "../_shared/Section";
import { Prose } from "../_shared/Prose";

type ClassicInterestsProps = {
  interests?: string;
};

export function ClassicInterests({ interests }: ClassicInterestsProps) {
  if (!interests) return null;

  return (
    <Section title="Interests">
      <Prose text={interests} />
    </Section>
  );
}
