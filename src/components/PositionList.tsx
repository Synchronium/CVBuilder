import type { PositionViewModel } from "../data/resolveCv";

type PositionListProps = {
  positions: PositionViewModel[];
};

export function PositionList({ positions }: PositionListProps) {
  return (
    <ol className="position-list">
      {positions.map((position) => (
        <li key={position.id}>
          <div className="position-row">
            <strong>{position.title}</strong>
            <span>{position.dateRange}</span>
          </div>
          {position.scope ? (
            <details className="web-only position-scope">
              <summary>Scope</summary>
              <p>{position.scope}</p>
            </details>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
