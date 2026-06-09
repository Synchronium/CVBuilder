/* eslint-disable react-refresh/only-export-components -- compound component: parts are exported via the `Education` namespace object, not as standalone modules. */
import type { EducationItem } from "../../data/schemas";
import { formatDate } from "../../data/duration";

/**
 * Compound education primitives. The three templates arrange the same four
 * facts (qualification, grade, institution, dates) differently, so each part
 * is exposed separately for templates to compose.
 */

function Qualification({ qualification }: { qualification: string }) {
  return <h3 className="cv-education__qualification">{qualification}</h3>;
}

function Institution({ institution }: { institution: string }) {
  return <p className="cv-education__institution">{institution}</p>;
}

function Grade({ grade }: { grade: string }) {
  return <p className="cv-education__grade">{grade}</p>;
}

/** Raw start–end years (e.g. "2010–2013"), used by Divided/Vivid. */
function Years({ start, end }: { start: string; end: string }) {
  return (
    <span className="cv-education__years">
      {start}–{end}
    </span>
  );
}

/** Single combined detail line "grade, institution, formattedStart to formattedEnd". */
function Detail({ item }: { item: EducationItem }) {
  return (
    <p className="cv-education__detail">
      {item.grade}, {item.institution}, {formatDate(item.start)} to {formatDate(item.end)}
    </p>
  );
}

export const Education = { Qualification, Institution, Grade, Years, Detail };
