import { Section } from "../_shared/Section";
import { Prose } from "../_shared/Prose";

type DividedInterestsProps = {
  interests?: string;
};

export function DividedInterests({ interests }: DividedInterestsProps) {
  if (!interests) return null;

  return (
    <Section title="Interests" variant="label">
      <div className="divided-interests">
        <div />
        <Prose text={interests} />
      </div>
    </Section>
  );
}
