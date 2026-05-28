import type { RoleViewModel } from "../data/resolveCv";
import { PositionList } from "./PositionList";
import { BulletList } from "./BulletList";

type RoleGroupProps = {
  role: RoleViewModel;
};

export function RoleGroup({ role }: RoleGroupProps) {
  return (
    <section className={role.condensed ? "role-group role-group--condensed" : "role-group"}>
      <header className="role-header">
        <div>
          <h3>{role.company.name}</h3>
          {role.product ? <p className="muted">{role.product}</p> : null}
        </div>
        <p className="duration">{role.duration}</p>
      </header>

      {role.company.description ? (
        <p className="company-description">{role.company.description}</p>
      ) : null}

      <PositionList positions={role.positions} />

      {role.interactive?.context ? (
        <details className="web-only role-context">
          <summary>Role context</summary>
          <p>{role.interactive.context}</p>
        </details>
      ) : null}

      <BulletList bullets={role.bullets} />
    </section>
  );
}
