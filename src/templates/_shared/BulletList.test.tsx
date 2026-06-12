import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BulletList } from "./BulletList";
import type { Bullet } from "../../data/schemas";

describe("BulletList", () => {
  it("renders bullet text", () => {
    const bullets: Bullet[] = [{ id: "b1", text: "Shipped the thing" }];
    render(<BulletList bullets={bullets} />);

    expect(screen.getByText("Shipped the thing")).toBeInTheDocument();
  });

  it("renders nothing when there are no bullets", () => {
    const { container } = render(<BulletList bullets={[]} />);
    expect(container.querySelector(".bullet-list")).toBeNull();
  });
});
