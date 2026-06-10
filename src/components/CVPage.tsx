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
  variantError: string | null;
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
  variantError,
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

      {variantError ? (
        <p className="page-notice page-notice--error web-only" role="alert">
          {variantError}
        </p>
      ) : null}

      {/* Visible only in on-screen preview; hidden in the real printed PDF so it
          never appears in the output. Lets a ?print=1 link be dismissed even
          though the main toolbar is hidden in preview. */}
      {printMode ? (
        <button
          type="button"
          className="print-preview-exit"
          onClick={() => onPrintModeChange(false)}
        >
          Exit preview
        </button>
      ) : null}

      <Template cv={cv} />
    </main>
  );
}
