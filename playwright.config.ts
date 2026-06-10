import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression testing — runs locally and on demand (see ADR 0010), not in
 * CI, because font/anti-alias rendering differs between machines and would make
 * committed baselines brittle across environments.
 *
 * Snapshots are taken against the PRODUCTION build served by `vite preview`
 * (not the dev server) so output is deterministic — no HMR client, no
 * sourcemap injection.
 *
 *   npm run test:visual              # compare against committed baselines
 *   npm run test:visual:update       # accept current rendering as the baseline
 */
export default defineConfig({
  testDir: "./visual",
  fullyParallel: true,
  forbidOnly: true,
  reporter: "list",
  // Baselines are environment-specific; pin them to one platform so a single
  // contributor's committed snapshots are the reference.
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // Because baselines are generated on the same machine that compares them
      // (see ADR 0010), renders are near-identical. Keep the tolerance tight so
      // small-but-real changes (a recoloured headline, a shifted line) are
      // caught, while still absorbing a few pixels of anti-alias jitter.
      // `threshold` is per-pixel colour sensitivity; `maxDiffPixels` is the
      // absolute number of differing pixels allowed across the whole image.
      threshold: 0.2,
      maxDiffPixels: 100
    }
  },
  use: {
    baseURL: "http://localhost:4173",
    ...devices["Desktop Chrome"]
  },
  webServer: {
    // Build once, then serve the static output deterministically.
    command: "npm run build && npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: false,
    timeout: 120_000
  }
});
