// Loads the base CV at runtime, preferring the user's real CV over the bundled
// example, and tolerating either (or neither) being present. A static import
// would make a missing file a hard build error; a glob does not.
//
// Precedence: data/base.cv.json (the user's CV) → data/base.cv.example.json
// (the sample) → none (App shows the empty/onboarding state).
const baseModules = import.meta.glob(
  ["../../data/base.cv.json", "../../data/base.cv.example.json"],
  { import: "default" }
) as Record<string, () => Promise<unknown>>;

const PRECEDENCE = [
  "../../data/base.cv.json",
  "../../data/base.cv.example.json"
] as const;

/** True if any base CV file is available to load. */
export function hasBaseCv(): boolean {
  return PRECEDENCE.some((path) => path in baseModules);
}

/**
 * Loads the highest-precedence base CV that exists. Returns `null` when neither
 * file is present, so the caller can render an onboarding empty state instead
 * of throwing.
 */
export async function loadBaseCv(): Promise<unknown | null> {
  for (const path of PRECEDENCE) {
    const load = baseModules[path];
    if (load) return load();
  }
  return null;
}
