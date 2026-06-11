import { ClassicTemplate } from "./classic/ClassicTemplate";
import { DividedTemplate } from "./divided/DividedTemplate";
import { TwoColumnTemplate } from "./two-column/TwoColumnTemplate";
import { VividTemplate } from "./vivid/VividTemplate";
import type { TemplateId } from "./templateIds";
import type { CvTemplate } from "./types";

export type { TemplateId };

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
  // `satisfies Record<TemplateId, ...>` requires the registry to define exactly
  // the IDs in templateIds.ts — no more, no fewer — so the Node-only ID list
  // cannot drift from the component registry. Adding a template to one without
  // the other is a type error.
} satisfies Record<TemplateId, CvTemplate>;

/**
 * A registry entry with `id` narrowed to a known `TemplateId`. The `satisfies`
 * clause above widens the literal `id` values to `string`, so we re-narrow `id`
 * here using the (un-widened) object keys.
 */
export type RegisteredTemplate = Omit<(typeof templates)[TemplateId], "id"> & {
  id: TemplateId;
};

export const defaultTemplateId: TemplateId = "classic";

export function getTemplate(templateId: string | null): RegisteredTemplate {
  if (templateId && templateId in templates) {
    return templates[templateId as TemplateId] as RegisteredTemplate;
  }

  return templates[defaultTemplateId] as RegisteredTemplate;
}

export function getTemplateOptions(): RegisteredTemplate[] {
  return Object.values(templates) as RegisteredTemplate[];
}
