import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { TEMPLATE_IDS } from "../src/templates/templateIds";

const templates = TEMPLATE_IDS;

/**
 * Accessibility checks against the real production build (see ADR 0012). Unlike
 * the jsdom unit checks, this runs in a real browser, so it covers colour
 * contrast — the rules jsdom cannot evaluate. Runs locally with the visual
 * suite (`npm run test:visual`), not in CI.
 */
for (const template of templates) {
  test(`${template} — no accessibility violations`, async ({ page }) => {
    await page.goto(`/?template=${template}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".cv-document");
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Surface a readable summary in the report when something fails.
    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help
    }));
    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}
