import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    // Unit/component tests only. Visual specs in `visual/` are Playwright tests
    // (they import @playwright/test) and must not be collected by Vitest.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // The WSL filesystem + coverage instrumentation can race vitest's default
    // threaded worker startup (intermittent "Timeout calling fetch"). A single
    // forked process serializes suites and runs reliably here.
    pool: "forks",
    poolOptions: {
      forks: { singleFork: true }
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/test/**",
        "**/*.test.{ts,tsx}",
        "**/*.fixtures.ts"
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70
      }
    }
  }
});
