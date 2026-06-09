/* eslint-disable react-refresh/only-export-components -- compound component: parts are exported via the `Role` namespace object, not as standalone modules. */
import type { PositionViewModel } from "../../data/resolveCv";

/**
 * Compound role primitives. Templates compose these inside their own role
 * wrapper, arranging and styling via `cv-role*` classes scoped to the template.
 */

function Company({ name }: { name: string }) {
  return <h3 className="cv-role__company">{name}</h3>;
}

function Product({ product }: { product?: string }) {
  if (!product) return null;
  return <p className="cv-role__product">{product}</p>;
}

function Duration({ duration }: { duration: string }) {
  return <p className="cv-role__duration">{duration}</p>;
}

function Description({ description }: { description?: string }) {
  if (!description) return null;
  return <p className="cv-role__description">{description}</p>;
}

function Positions({ positions }: { positions: PositionViewModel[] }) {
  return (
    <ol className="cv-positions">
      {positions.map((position) => (
        <li
          key={position.id}
          className={
            position.isCurrent ? "cv-positions__item cv-positions__item--current" : "cv-positions__item"
          }
        >
          <div className="cv-positions__row">
            <span className="cv-positions__title">{position.title}</span>
            <span className="cv-positions__date">{position.dateRange}</span>
          </div>
          {position.scope ? (
            <details className="web-only cv-positions__scope">
              <summary>Scope</summary>
              <p>{position.scope}</p>
            </details>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Context({ context }: { context?: string }) {
  if (!context) return null;
  return (
    <details className="web-only cv-role__context">
      <summary>Role context</summary>
      <p>{context}</p>
    </details>
  );
}

function Tech({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;
  return <p className="cv-role__tech">{tech.join(", ")}</p>;
}

export const Role = { Company, Product, Duration, Description, Positions, Context, Tech };
