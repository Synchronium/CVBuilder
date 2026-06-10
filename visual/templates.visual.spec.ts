import { test, expect } from "@playwright/test";

const templates = ["classic", "two-column", "divided", "vivid"] as const;

/**
 * One baseline per template per media mode. The base CV (no variant) is used so
 * baselines do not depend on gitignored variant files.
 */
for (const template of templates) {
  test(`${template} — screen`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1600 });
    // domcontentloaded (not the default "load"): the Google Fonts request can
    // keep the page from firing "load" under some network conditions. The SPA
    // mounts client-side, so we wait explicitly for the document and fonts.
    await page.goto(`/?template=${template}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".cv-document");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${template}-screen.png`, {
      fullPage: true
    });
  });

  test(`${template} — print`, async ({ page }) => {
    await page.emulateMedia({ media: "print" });
    await page.setViewportSize({ width: 794, height: 1123 });
    // domcontentloaded (not the default "load"): the Google Fonts request can
    // keep the page from firing "load" under some network conditions. The SPA
    // mounts client-side, so we wait explicitly for the document and fonts.
    await page.goto(`/?template=${template}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".cv-document");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${template}-print.png`, {
      fullPage: true
    });
  });
}
