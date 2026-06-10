#!/usr/bin/env node
// Usage: npx tsx scripts/screenshot.ts [template] [output] [--print] [--variant=<name>]
//   template  Template name: classic, divided, two-column, vivid (default: divided)
//   output    Output path (default: /tmp/cv-screenshot.png)
//   --print   Emulate print media (default: screen)
//   --variant=<name>  Render a named variant instead of the base CV
//
// Assumes the dev server is already running on http://localhost:5173
// Start it with: npm run dev

import { chromium } from "playwright";

const args = process.argv.slice(2);
const printMode = args.includes("--print");
const variantArg = args.find((a) => a.startsWith("--variant="));
const variant = variantArg ? variantArg.split("=")[1] : null;
const positional = args.filter((a) => !a.startsWith("--"));

const template = positional[0] ?? "divided";
const output = positional[1] ?? "/tmp/cv-screenshot.png";
const variantParam = variant ? `&variant=${variant}` : "";
const url = `http://localhost:5173/?template=${template}${variantParam}`;

async function main(): Promise<void> {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  if (printMode) {
    await page.emulateMedia({ media: "print" });
    await page.setViewportSize({ width: 794, height: 1123 });
  } else {
    await page.setViewportSize({ width: 1280, height: 900 });
  }

  await page.goto(url);
  await page.waitForSelector("h1");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: output, fullPage: true });
  await browser.close();

  console.log(
    `Screenshot saved: ${output} (template=${template}, mode=${printMode ? "print" : "screen"})`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
