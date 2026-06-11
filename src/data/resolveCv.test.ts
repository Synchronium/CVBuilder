import { describe, expect, it } from "vitest";
import { parseCv, resolveCv } from "./resolveCv";
import { makeCv, makeFullCv, makeRoleWithStarts } from "./resolveCv.fixtures";

// Loaded via glob (not a static import) so a developer temporarily moving the
// example aside does not break compilation of the test suite.
const exampleModules = import.meta.glob("../../data/base.cv.example.json", {
  import: "default",
  eager: true
}) as Record<string, unknown>;
const exampleCv = Object.values(exampleModules)[0];

describe("base.cv.example.json", () => {
  // The committed example is a tracked CV data file. This guard fails loudly
  // (with a Zod error) if it ever drifts out of sync with the schema. It is
  // skipped if the file is absent, so it never blocks the build.
  it.runIf(exampleCv !== undefined)("is valid against the CV schema", () => {
    expect(() => parseCv(exampleCv)).not.toThrow();
  });

  it.runIf(exampleCv !== undefined)("resolves without throwing", () => {
    expect(() => resolveCv(exampleCv)).not.toThrow();
  });
});

describe("resolveCv", () => {
  it("resolves base data into a view model", () => {
    const cv = resolveCv(makeFullCv(), new Date(Date.UTC(2026, 4, 23)));

    expect(cv.person.name).toBe("Alex Morgan");
    expect(typeof cv.summary).toBe("string");
    expect(cv.roles).toHaveLength(3);
  });

  it("orders positions newest-first chronologically", () => {
    const cv = resolveCv(
      makeCv({
        roles: [
          makeRoleWithStarts([
            { id: "earliest", start: "2017" },
            { id: "middle", start: "2017-04" },
            { id: "latest", start: "2019-11" }
          ])
        ]
      }),
      new Date(Date.UTC(2026, 4, 23))
    );

    expect(cv.roles[0]!.positions.map((p) => p.id)).toEqual([
      "latest",
      "middle",
      "earliest"
    ]);
  });

  it("treats a bare year as that year's January, not as ordering before a same-year month", () => {
    // "2020" means Jan 2020, so it is the EARLIEST of these three and must sort
    // last (newest-first). A lexical string sort would instead place "2020"
    // before "2020-01"/"2020-08" because "2020" < "2020-01" as strings.
    const cv = resolveCv(
      makeCv({
        roles: [
          makeRoleWithStarts([
            { id: "bare-year", start: "2020" },
            { id: "january", start: "2020-01" },
            { id: "august", start: "2020-08" }
          ])
        ]
      }),
      new Date(Date.UTC(2026, 4, 23))
    );

    // august (Aug) newest; bare-year and january are both Jan 2020 (equal), so
    // their relative order is the stable input order.
    expect(cv.roles[0]!.positions.map((p) => p.id)).toEqual([
      "august",
      "bare-year",
      "january"
    ]);
  });

  it("moves current state and date display onto positions", () => {
    const cv = resolveCv(makeFullCv(), new Date(Date.UTC(2026, 4, 23)));
    const clockwork = cv.roles.find((role) => role.id === "clockwork-software");

    expect(clockwork?.duration).toBe("6 yrs");
    expect(clockwork?.positions[0]).toMatchObject({
      id: "clockwork-engineering-manager",
      isCurrent: true,
      dateRange: "Mar 2022 - Present"
    });
  });
});
