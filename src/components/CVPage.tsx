import type { CvViewModel } from "../data/resolveCv";
import { PrintControls } from "./PrintControls";
import { TemplateSwitcher } from "./TemplateSwitcher";
import { VariantSwitcher } from "./VariantSwitcher";
import type { CvTemplate } from "../templates/types";

type CVPageProps = {
  cv: CvViewModel;
  template: CvTemplate;
  templateOptions: CvTemplate[];
  selectedTemplateId: string;
  variantNames: string[];
  selectedVariantId: string | null;
  printMode: boolean;
  onTemplateChange: (templateId: string) => void;
  onVariantChange: (variantId: string | null) => void;
  onPrintModeChange: (enabled: boolean) => void;
};

export function CVPage({
  cv,
  template,
  templateOptions,
  selectedTemplateId,
  variantNames,
  selectedVariantId,
  printMode,
  onTemplateChange,
  onVariantChange,
  onPrintModeChange
}: CVPageProps) {
  const Template = template.Component;

  return (
    <main className={printMode ? "app is-print-preview" : "app"}>
      <div className="page-tools">
        <div className="page-tool-actions">
          <TemplateSwitcher
            templates={templateOptions}
            selectedTemplateId={selectedTemplateId}
            onTemplateChange={onTemplateChange}
          />
          <VariantSwitcher
            variantNames={variantNames}
            selectedVariantId={selectedVariantId}
            onVariantChange={onVariantChange}
          />
          <PrintControls
            printMode={printMode}
            onPrintModeChange={onPrintModeChange}
          />
        </div>
      </div>

      <Template cv={cv} />
    </main>
  );
}
