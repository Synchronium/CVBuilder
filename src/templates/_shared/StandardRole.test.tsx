import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StandardRole } from "./StandardRole";
import { resolveCv } from "../../data/resolveCv";
import { makeCv, makeRole } from "../../data/resolveCv.fixtures";

/** Resolves a raw role into a view model the way the app does. */
function resolvedRole(role = makeRole()) {
  const cv = resolveCv(makeCv({ roles: [role] }), new Date(Date.UTC(2026, 4, 23)));
  const resolved = cv.roles[0];
  if (!resolved) throw new Error("expected one resolved role");
  return resolved;
}

describe("StandardRole", () => {
  it("renders company, position and bullets", () => {
    render(<StandardRole role={resolvedRole()} />);

    expect(screen.getByRole("heading", { name: "Test Co" })).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("Did a thing.")).toBeInTheDocument();
  });

  it("does not render a tech line (the conventional layout omits it)", () => {
    const { container } = render(<StandardRole role={resolvedRole()} />);

    expect(container.querySelector(".cv-role__tech")).toBeNull();
  });

  it("omits the company description when empty", () => {
    const role = resolvedRole(makeRole({ company: { name: "No Desc Co", description: "", websites: [] } }));
    const { container } = render(<StandardRole role={role} />);

    expect(container.querySelector(".cv-role__description")).toBeNull();
  });

  it("renders the product line only when present", () => {
    const withProduct = resolvedRole(makeRole({ product: "Flagship App" }));
    expect(screen.queryByText("Flagship App")).not.toBeInTheDocument();

    render(<StandardRole role={withProduct} />);
    expect(screen.getByText("Flagship App")).toBeInTheDocument();
  });

  it("marks condensed roles with the modifier class", () => {
    const role = resolvedRole(makeRole({ condensed: true }));
    const { container } = render(<StandardRole role={role} />);

    expect(container.querySelector(".cv-role--condensed")).toBeInTheDocument();
  });
});
