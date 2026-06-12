import type { Bullet } from "../../data/schemas";
import { parseInline } from "../../utils/parseInline";

type BulletListProps = {
  bullets: Bullet[];
};

export function BulletList({ bullets }: BulletListProps) {
  if (bullets.length === 0) return null;

  return (
    <ul className="bullet-list">
      {bullets.map((bullet) => (
        <li key={bullet.id}>
          <p>{parseInline(bullet.text)}</p>
        </li>
      ))}
    </ul>
  );
}
