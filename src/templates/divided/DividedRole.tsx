import type { RoleViewModel } from "../../data/resolveCv";
import { BulletList } from "../_shared/BulletList";
import { Role } from "../_shared/Role";

type DividedRoleProps = {
  role: RoleViewModel;
};

export function DividedRole({ role }: DividedRoleProps) {
  return (
    <div className={role.condensed ? "divided-role divided-role--condensed" : "divided-role"}>
      <div className="divided-role-meta">
        <Role.Company name={role.company.name} />
        <Role.Duration duration={role.duration} />
        <Role.Positions positions={role.positions} />
        <Role.Description description={role.company.description} />
      </div>
      <div className="divided-role-content">
        <BulletList bullets={role.bullets} />
        <Role.Tech tech={role.tech} />
      </div>
    </div>
  );
}
