import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount and clear the DOM after every test. Important now that suites can
// share a single process (pool: "forks", singleFork) — without this, renders
// from earlier tests leak into later `screen` queries.
afterEach(() => {
  cleanup();
});
