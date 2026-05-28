import { ClassicTemplate } from "./classic/ClassicTemplate";
import { DividedTemplate } from "./divided/DividedTemplate";
import { TwoColumnTemplate } from "./two-column/TwoColumnTemplate";
import { VividTemplate } from "./vivid/VividTemplate";
import type { CvTemplate } from "./types";

export const templates = {
  classic: {
    id: "classic",
    label: "Classic",
    Component: ClassicTemplate
  },
  "two-column": {
    id: "two-column",
    label: "Two Column",
    Component: TwoColumnTemplate
  },
  divided: {
    id: "divided",
    label: "Divided",
    Component: DividedTemplate
  },
  vivid: {
    id: "vivid",
    label: "Vivid",
    Component: VividTemplate
  }
} satisfies Record<string, CvTemplate>;

export type TemplateId = keyof typeof templates;

export const defaultTemplateId: TemplateId = "classic";

export function getTemplate(templateId: string | null): CvTemplate {
  if (templateId && templateId in templates) {
    return templates[templateId as TemplateId];
  }

  return templates[defaultTemplateId];
}

export function getTemplateOptions(): CvTemplate[] {
  return Object.values(templates);
}
