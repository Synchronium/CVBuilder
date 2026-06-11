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

/**
 * A complete, render-ready CV for component/template/a11y tests. Self-contained
 * so tests do not depend on the real data/base.cv.example.json file (which the
 * app deliberately tolerates being absent). Mirrors the example's shape: a
 * current role with two positions, a condensed older role, education, interests.
 *
 * Resolved with `new Date(Date.UTC(2026, 4, 23))`, the Clockwork duration is
 * "6 yrs" and its current position date range is "Mar 2022 - Present".
 */
export function makeFullCv(): CV {
  return makeCv({
    person: makePerson({
      id: "alex-morgan",
      name: "Alex Morgan",
      headline: "Engineering Manager | Technical Leader",
      contact: {
        email: "alex.morgan@example.com",
        phone: "+44 7700 900123",
        linkedin: "https://www.linkedin.com/in/alex-morgan-example/",
        address: {
          line1: "1 Example Street",
          locality: "Bristol",
          region: "Bristol",
          postcode: "BS1 1AA",
          country: "UK"
        }
      }
    }),
    summary: "Engineering leader with a decade of experience building teams and shipping software.",
    roles: [
      makeRole({
        id: "clockwork-software",
        company: {
          name: "Clockwork Software Ltd",
          description: "A field service management platform.",
          websites: []
        },
        positions: [
          { id: "clockwork-engineering-manager", title: "Engineering Manager", start: "2022-03", scope: "" },
          { id: "clockwork-senior-engineer", title: "Senior Software Engineer", start: "2020-06", end: "2022-02", scope: "" }
        ],
        bullets: [{ id: "cw-1", text: "Manage *two cross-functional product teams* across the platform." }],
        tech: ["TypeScript", "React", "Node.js"]
      }),
      makeRole({
        id: "foundry-analytics",
        company: { name: "Foundry Analytics", description: "A data analytics company.", websites: [] },
        positions: [
          { id: "foundry-senior", title: "Senior Full Stack Engineer", start: "2019-01", end: "2020-05", scope: "" },
          { id: "foundry-fullstack", title: "Full Stack Engineer", start: "2017-04", end: "2018-12", scope: "" }
        ],
        bullets: [{ id: "fa-1", text: "Designed and built the connector framework." }],
        tech: ["Python", "Django"]
      }),
      makeRole({
        id: "pixel-and-paper",
        condensed: true,
        company: { name: "Pixel & Paper Ltd", description: "A digital agency.", websites: [] },
        positions: [
          { id: "pp-web", title: "Web Developer", start: "2014-09", end: "2017-03", scope: "" }
        ],
        bullets: [{ id: "pp-1", text: "Delivered web projects for clients across sectors." }],
        tech: ["JavaScript", "PHP"]
      })
    ],
    education: [
      makeEducationItem({
        id: "bristol",
        qualification: "BSc Computer Science",
        grade: "First Class Honours",
        institution: "University of Bristol"
      })
    ],
    interests: "Open source, trail running, woodworking."
  });
}
