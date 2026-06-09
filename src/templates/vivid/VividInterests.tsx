import { Section } from "../_shared/Section";
import { Prose } from "../_shared/Prose";

type VividInterestsProps = {
  interests?: string;
};

export function VividInterests({ interests }: VividInterestsProps) {
  if (!interests) return null;

  return (
    <Section title="Interests" className="vivid-section">
      <Prose text={interests} className="vivid-interests" />
    </Section>
  );
}
