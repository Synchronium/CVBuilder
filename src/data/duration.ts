import type { Position } from "./schemas";

export type YearMonth = {
  year: number;
  month: number;
};

export function parseYearMonth(value: string): YearMonth {
  const match = /^(?<year>\d{4})(?:-(?<month>\d{2}))?$/.exec(value);

  if (!match?.groups) {
    throw new Error(`Invalid date value: ${value}`);
  }

  const year = Number(match.groups.year);
  const month = Number(match.groups.month ?? "01");

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month in date value: ${value}`);
  }

  return { year, month };
}

export function compareYearMonth(a: string, b: string): number {
  const first = parseYearMonth(a);
  const second = parseYearMonth(b);

  if (first.year !== second.year) {
    return first.year - second.year;
  }

  return first.month - second.month;
}

export function formatDate(value: string): string {
  const { year, month } = parseYearMonth(value);

  if (!value.includes("-")) {
    return String(year);
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric"
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateRange(start: string, end?: string): string {
  return `${formatDate(start)} - ${end ? formatDate(end) : "Present"}`;
}

export function monthIndex(value: string): number {
  const { year, month } = parseYearMonth(value);
  return year * 12 + month;
}

export function monthsBetweenInclusive(start: string, end: string): number {
  return monthIndex(end) - monthIndex(start) + 1;
}

export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years === 1) {
    parts.push("1 yr");
  } else if (years > 1) {
    parts.push(`${years} yrs`);
  }

  if (months === 1) {
    parts.push("1 mo");
  } else if (months > 1) {
    parts.push(`${months} mos`);
  }

  return parts.join(" ") || "1 mo";
}

export function calculateCompanyDuration(
  positions: Position[],
  today = new Date()
): string {
  const starts = positions.map((position) => position.start);
  const ends = positions.map((position) => {
    if (position.end) {
      return position.end;
    }

    return `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const sortedStarts = [...starts].sort(compareYearMonth);
  const sortedEnds = [...ends].sort(compareYearMonth);
  const firstStart = sortedStarts[0];
  const lastEnd = sortedEnds[sortedEnds.length - 1];

  if (!firstStart || !lastEnd) {
    return "";
  }

  return formatDuration(monthsBetweenInclusive(firstStart, lastEnd));
}
