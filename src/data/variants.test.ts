import { describe, expect, it } from "vitest";
import { variantNameFromPath } from "./variants";

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
