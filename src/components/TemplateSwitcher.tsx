import type { CvTemplate } from "../templates/types";

type TemplateSwitcherProps = {
  templates: CvTemplate[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
};

export function TemplateSwitcher({
  templates,
  selectedTemplateId,
  onTemplateChange
}: TemplateSwitcherProps) {
  return (
    <label className="template-switcher">
      Template
      <select
        value={selectedTemplateId}
        onChange={(event) => onTemplateChange(event.currentTarget.value)}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.label}
          </option>
        ))}
      </select>
    </label>
  );
}
