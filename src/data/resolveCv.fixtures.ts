import type { CV } from "./schemas";

/**
 * Builds a minimal schema-valid CV for tests, with sensible defaults that
 * callers override per case. Keeps individual tests focused on the field(s)
 * under test rather than restating the whole document shape.
 */
export function makeCv(overrides: Partial<CV> = {}): CV {
  return {
    schemaVersion: "1",
    metadata: {
      source: { type: "test", file: "test", extractedAt: "2026-01-01" },
      defaultLocale: "en-GB",
      notes: []
    },
    person: {
      id: "person",
      name: "Test Person",
      headline: "Tester",
      contact: {
        email: "test@example.com",
        phone: "+44 0000 000000",
        address: {
          line1: "1 Test St",
          locality: "Testville",
          region: "Testshire",
          postcode: "TE1 1ST",
          country: "UK"
        }
      },
      workAuthorisation: "Full right to work in the UK"
    },
    summary: "A summary.",
    roles: [],
    education: [],
    ...overrides
  };
}

/** Builds a `Person` for tests, overridable per field. */
export function makePerson(overrides: Partial<CV["person"]> = {}): CV["person"] {
  return { ...makeCv().person, ...overrides };
}

/** Builds an `EducationItem` for tests, overridable per field. */
export function makeEducationItem(
  overrides: Partial<CV["education"][number]> = {}
): CV["education"][number] {
  return {
    id: "edu-1",
    qualification: "BSc Computer Science",
    grade: "First",
    institution: "Test University",
    start: "2010",
    end: "2013",
    ...overrides
  };
}

/** Builds a single role with one company and the given position starts. */
export function makeRoleWithStarts(
  starts: Array<{ id: string; start: string; end?: string }>
): CV["roles"][number] {
  return {
    id: "role",
    condensed: false,
    company: { name: "Test Co", description: "", websites: [] },
    positions: starts.map(({ id, start, end }) => ({
      id,
      title: id,
      start,
      end,
      scope: ""
    })),
    bullets: [],
    tech: []
  };
}

/** Builds a fully-formed role, overridable per field, for render tests. */
export function makeRole(overrides: Partial<CV["roles"][number]> = {}): CV["roles"][number] {
  return {
    id: "role",
    condensed: false,
    company: { name: "Test Co", description: "A test company.", websites: [] },
    positions: [
      { id: "pos-1", title: "Engineer", start: "2020-01", end: undefined, scope: "" }
    ],
    bullets: [{ id: "b-1", text: "Did a thing." }],
    tech: ["TypeScript", "React"],
    ...overrides
  };
}
