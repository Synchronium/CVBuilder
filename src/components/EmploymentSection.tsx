import type { RoleViewModel } from "../data/resolveCv";
import { RoleGroup } from "./RoleGroup";

type EmploymentSectionProps = {
  roles: RoleViewModel[];
};

export function EmploymentSection({ roles }: EmploymentSectionProps) {
  return (
    <section className="cv-section" aria-labelledby="employment-heading">
      <h2 id="employment-heading">Employment</h2>
      <div className="role-list">
        {roles.map((role) => (
          <RoleGroup key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
