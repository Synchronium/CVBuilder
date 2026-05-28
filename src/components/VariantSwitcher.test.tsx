import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { VariantSwitcher } from "./VariantSwitcher";

describe("VariantSwitcher", () => {
  it("renders nothing when no variants exist", () => {
    const { container } = render(
      <VariantSwitcher variantNames={[]} selectedVariantId={null} onVariantChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a select with Base option plus all variant names", () => {
    render(
      <VariantSwitcher
        variantNames={["startup-cto", "senior-em"]}
        selectedVariantId={null}
        onVariantChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Variant")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Base" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "startup-cto" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "senior-em" })).toBeInTheDocument();
  });

  it("calls onVariantChange with null when Base is selected", async () => {
    const user = userEvent.setup();
    const onVariantChange = vi.fn();
    render(
      <VariantSwitcher
        variantNames={["startup-cto"]}
        selectedVariantId="startup-cto"
        onVariantChange={onVariantChange}
      />
    );
    await user.selectOptions(screen.getByLabelText("Variant"), "Base");
    expect(onVariantChange).toHaveBeenCalledWith(null);
  });

  it("calls onVariantChange with the variant name when a variant is selected", async () => {
    const user = userEvent.setup();
    const onVariantChange = vi.fn();
    render(
      <VariantSwitcher
        variantNames={["startup-cto", "senior-em"]}
        selectedVariantId={null}
        onVariantChange={onVariantChange}
      />
    );
    await user.selectOptions(screen.getByLabelText("Variant"), "startup-cto");
    expect(onVariantChange).toHaveBeenCalledWith("startup-cto");
  });
});
