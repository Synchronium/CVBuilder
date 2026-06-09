import type { RoleViewModel } from "../../data/resolveCv";
import { Section } from "../_shared/Section";
import { StandardRole } from "../_shared/StandardRole";

type ClassicExperienceProps = {
  roles: RoleViewModel[];
};

export function ClassicExperience({ roles }: ClassicExperienceProps) {
  return (
    <Section title="Employment">
      <div className="role-list">
        {roles.map((role) => (
          <StandardRole key={role.id} role={role} />
        ))}
      </div>
    </Section>
  );
}
