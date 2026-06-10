import { describe, expect, it, vi } from "vitest";
import {
  loadVariant,
  variantNameFromPath,
  variantNames,
  type VariantModules
} from "./variants";

describe("variantNameFromPath", () => {
  it("extracts the variant name from a Vite glob path", () => {
    expect(variantNameFromPath("../../data/variants/startup-cto.cv.json")).toBe("startup-cto");
  });

  it("handles hyphenated names", () => {
    expect(variantNameFromPath("../../data/variants/senior-em-enterprise.cv.json")).toBe(
      "senior-em-enterprise"
    );
  });

  it("falls back to the raw path when the pattern does not match", () => {
    expect(variantNameFromPath("unexpected")).toBe("unexpected");
  });
});

// A stand-in for what import.meta.glob produces, so these tests do not depend on
// the gitignored data/variants/ directory.
const modules: VariantModules = {
  "../../data/variants/startup-cto.cv.json": () => Promise.resolve({ id: "cto" }),
  "../../data/variants/enterprise-em.cv.json": () => Promise.resolve({ id: "em" })
};

describe("variantNames", () => {
  it("maps each module path to its variant name", () => {
    expect(variantNames(modules)).toEqual(["startup-cto", "enterprise-em"]);
  });

  it("returns an empty list when there are no variants", () => {
    expect(variantNames({})).toEqual([]);
  });
});

describe("loadVariant", () => {
  it("loads the data for a known variant", async () => {
    await expect(loadVariant(modules, "enterprise-em")).resolves.toEqual({ id: "em" });
  });

  it("invokes only the matching loader", async () => {
    const cto = vi.fn(() => Promise.resolve({ id: "cto" }));
    const em = vi.fn(() => Promise.resolve({ id: "em" }));
    const spied: VariantModules = {
      "../../data/variants/startup-cto.cv.json": cto,
      "../../data/variants/enterprise-em.cv.json": em
    };

    await loadVariant(spied, "startup-cto");

    expect(cto).toHaveBeenCalledOnce();
    expect(em).not.toHaveBeenCalled();
  });

  it("throws for an unknown variant", () => {
    expect(() => loadVariant(modules, "does-not-exist")).toThrow(
      'Variant "does-not-exist" not found'
    );
  });
});
