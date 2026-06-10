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

  it("renders an expandable detail only for bullets that have one", () => {
    const bullets: Bullet[] = [
      { id: "with", text: "Has detail", detail: "The fuller story" },
      { id: "without", text: "No detail" }
    ];
    const { container } = render(<BulletList bullets={bullets} />);

    // One <details> for the single bullet that carries detail.
    const details = container.querySelectorAll("details.bullet-detail");
    expect(details).toHaveLength(1);
    expect(screen.getByText("More detail")).toBeInTheDocument();
    expect(screen.getByText("The fuller story")).toBeInTheDocument();
  });
});
