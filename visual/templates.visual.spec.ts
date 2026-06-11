import { test, expect } from "@playwright/test";
import { TEMPLATE_IDS } from "../src/templates/templateIds";

const templates = TEMPLATE_IDS;

/**
 * One baseline per template per media mode. `?cv=example` forces the bundled
 * example CV, so the committed baselines contain no personal data and stay
 * stable regardless of the user's own data/base.cv.json.
 */
for (const template of templates) {
  test(`${template} — screen`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1600 });
    // domcontentloaded (not the default "load"): the Google Fonts request can
    // keep the page from firing "load" under some network conditions. The SPA
    // mounts client-side, so we wait explicitly for the document and fonts.
    await page.goto(`/?template=${template}&cv=example`, { waitUntil: "domcontentloaded" });
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
    await page.goto(`/?template=${template}&cv=example`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".cv-document");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${template}-print.png`, {
      fullPage: true
    });
  });
}
