import { describe, expect, it } from "vitest";
import {
  calculateCompanyDuration,
  formatDate,
  formatDateRange,
  formatDuration,
  monthsBetweenInclusive,
  parseYearMonth
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

  it("formats durations with singular and floor units", () => {
    expect(formatDuration(1)).toBe("1 mo"); // singular month
    expect(formatDuration(13)).toBe("1 yr 1 mo"); // singular year + singular month
    expect(formatDuration(0)).toBe("1 mo"); // floor: never shows "0 mo"
  });

  it("rejects malformed and out-of-range dates", () => {
    expect(() => parseYearMonth("not-a-date")).toThrow("Invalid date value");
    expect(() => parseYearMonth("2022-13")).toThrow("Invalid month");
    expect(() => parseYearMonth("2022-00")).toThrow("Invalid month");
  });

  it("returns an empty string when there are no positions", () => {
    expect(calculateCompanyDuration([])).toBe("");
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
