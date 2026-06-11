import {
  type CV,
  type Position,
  type Role,
  cvSchema
} from "./schemas";
import { calculateCompanyDuration, compareYearMonth, formatDateRange } from "./duration";

export type PositionViewModel = Position & {
  dateRange: string;
  isCurrent: boolean;
};

export type RoleViewModel = Omit<Role, "positions"> & {
  positions: PositionViewModel[];
  duration: string;
};

export type CvViewModel = {
  person: CV["person"];
  summary: string;
  roles: RoleViewModel[];
  education: CV["education"];
  interests?: string;
};

export function parseCv(data: unknown): CV {
  return cvSchema.parse(data);
}

export function resolveCv(data: unknown, today = new Date()): CvViewModel {
  const cv = parseCv(data);

  return {
    person: cv.person,
    summary: cv.summary,
    roles: cv.roles.map((role) => resolveRole(role, today)),
    education: cv.education,
    interests: cv.interests
  };
}

function resolveRole(role: Role, today: Date): RoleViewModel {
  return {
    ...role,
    positions: role.positions
      .map((position) => ({
        ...position,
        dateRange: formatDateRange(position.start, position.end),
        isCurrent: !position.end
      }))
      .sort((a, b) => compareYearMonth(b.start, a.start)),
    duration: calculateCompanyDuration(role.positions, today)
  };
}
