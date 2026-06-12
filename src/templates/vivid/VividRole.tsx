import type { RoleViewModel } from "../../data/resolveCv";
import { BulletList } from "../_shared/BulletList";
import { Role } from "../_shared/Role";

type VividRoleProps = {
  role: RoleViewModel;
};

export function VividRole({ role }: VividRoleProps) {
  return (
    <div className="vivid-role">
      <div className="vivid-role-header">
        <Role.Company name={role.company.name} />
        <Role.Duration duration={role.duration} />
      </div>
      <Role.Description description={role.company.description} />
      <Role.Positions positions={role.positions} />
      <BulletList bullets={role.bullets} />
      <Role.Tech tech={role.tech} />
    </div>
  );
}
