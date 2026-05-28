import { describe, expect, it } from "vitest";
import {
  calculateCompanyDuration,
  formatDate,
  formatDateRange,
  formatDuration,
  monthsBetweenInclusive
} from "./duration";
import type { Position } from "./schemas";

describe("duration utilities", () => {
  it("formats year-month values for display", () => {
    expect(formatDate("2022-06")).toBe("Jun 2022");
    expect(formatDate("2006")).toBe("2006");
  });

  it("formats open-ended date ranges as present", () => {
    expect(formatDateRange("2023-06")).toBe("Jun 2023 - Present");
  });

  it("calculates inclusive month ranges", () => {
    expect(monthsBetweenInclusive("2022-06", "2023-05")).toBe(12);
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(17)).toBe("1 yr 5 mos");
  });

  it("calculates company duration from first position to latest position", () => {
    const positions: Position[] = [
      {
        id: "current",
        title: "Manager",
        start: "2023-06",
        scope: ""
      },
      {
        id: "previous",
        title: "Lead",
        start: "2022-06",
        end: "2023-05",
        scope: ""
      }
    ];

    expect(calculateCompanyDuration(positions, new Date(Date.UTC(2026, 4, 23)))).toBe(
      "4 yrs"
    );
  });
});
