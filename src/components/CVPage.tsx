import type { CvViewModel } from "../data/resolveCv";
import { PrintButton } from "./PrintButton";
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
  onTemplateChange: (templateId: string) => void;
  onVariantChange: (variantId: string | null) => void;
};

export function CVPage({
  cv,
  template,
  templateOptions,
  selectedTemplateId,
  variantNames,
  selectedVariantId,
  variantError,
  onTemplateChange,
  onVariantChange
}: CVPageProps) {
  const Template = template.Component;

  return (
    <main className="app">
      {/* On-screen controls. Hidden in the actual print/PDF output (see base.css
          @media print), like a print-preview toolbar that never prints. */}
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
          <PrintButton />
        </div>
      </div>

      {variantError ? (
        <p className="page-notice page-notice--error" role="alert">
          {variantError}
        </p>
      ) : null}

      <Template cv={cv} />
    </main>
  );
}
