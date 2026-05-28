import { describe, expect, it } from "vitest";
import { resolveCv } from "./resolveCv";

describe("resolveCv", () => {
  it("resolves base data into a view model", () => {
    const cv = resolveCv(undefined, new Date(Date.UTC(2026, 4, 23)));

    expect(cv.person.name).toBe("Alex Morgan");
    expect(typeof cv.summary).toBe("string");
    expect(cv.roles).toHaveLength(3);
  });

  it("moves current state and date display onto positions", () => {
    const cv = resolveCv(undefined, new Date(Date.UTC(2026, 4, 23)));
    const clockwork = cv.roles.find((role) => role.id === "clockwork-software");

    expect(clockwork?.duration).toBe("6 yrs");
    expect(clockwork?.positions[0]).toMatchObject({
      id: "clockwork-engineering-manager",
      isCurrent: true,
      dateRange: "Mar 2022 - Present"
    });
  });
});
