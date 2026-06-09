import type { RoleViewModel } from "../../data/resolveCv";
import { BulletList } from "./BulletList";
import { Role } from "./Role";

/**
 * The conventional role layout (company header, positions, bullets) shared by
 * the Classic and Two-Column templates, which render employment identically.
 * Templates with a distinct role layout (Divided, Vivid) compose `Role.*`
 * primitives themselves instead of using this.
 */
export function StandardRole({ role }: { role: RoleViewModel }) {
  return (
    <section className={role.condensed ? "cv-role cv-role--condensed" : "cv-role"}>
      <header className="role-header">
        <div>
          <Role.Company name={role.company.name} />
          <Role.Product product={role.product} />
        </div>
        <Role.Duration duration={role.duration} />
      </header>

      <Role.Description description={role.company.description} />
      <Role.Positions positions={role.positions} />
      <Role.Context context={role.interactive?.context} />
      <BulletList bullets={role.bullets} />
    </section>
  );
}
