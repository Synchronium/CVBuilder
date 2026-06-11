import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { resolveCv } from "../data/resolveCv";
import { getTemplateOptions } from "./registry";
import exampleCv from "../../data/base.cv.example.json";

expect.extend(toHaveNoViolations);

const cv = resolveCv(exampleCv, new Date(Date.UTC(2026, 4, 23)));
const templates = getTemplateOptions();

/**
 * Structural accessibility checks (jsdom). Catches heading order, landmarks,
 * names/labels, ARIA misuse. Colour-contrast rules need a real browser and are
 * checked separately in the Playwright run (see ADR 0012); they are disabled
 * here because jsdom cannot compute rendered colours.
 */
describe.each(templates)("$label template accessibility", ({ Component }) => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("has no structural axe violations", async () => {
    const { container } = render(<Component cv={cv} />);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } }
    });
    expect(results).toHaveNoViolations();
  });
});
