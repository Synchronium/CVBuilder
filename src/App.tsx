import { useEffect, useMemo, useState } from "react";
import { CVPage } from "./components/CVPage";
import { resolveCv } from "./data/resolveCv";
import { getVariantNames, loadVariantData } from "./data/variants";
import {
  defaultTemplateId,
  getTemplate,
  getTemplateOptions,
  type TemplateId
} from "./templates/registry";

export function App() {
  const variantNames = useMemo(() => getVariantNames(), []);
  const [variantId, setVariantId] = useState<string | null>(() =>
    getInitialVariantId(variantNames)
  );
  const [variantData, setVariantData] = useState<unknown | null>(null);
  const templateOptions = useMemo(() => getTemplateOptions(), []);
  const [printMode, setPrintMode] = useState(false);
  const [templateId, setTemplateId] = useState<TemplateId>(() =>
    getInitialTemplateId()
  );
  const template = getTemplate(templateId);

  useEffect(() => {
    if (variantId === null) {
      setVariantData(null);
      return;
    }
    loadVariantData(variantId).then(setVariantData).catch(console.error);
  }, [variantId]);

  const cv = useMemo(() => resolveCv(variantData ?? undefined), [variantData]);

  const handleTemplateChange = (nextTemplateId: string) => {
    const nextTemplate = getTemplate(nextTemplateId);
    setUrlParam("template", nextTemplate.id);
    setTemplateId(nextTemplate.id as TemplateId);
  };

  const handleVariantChange = (nextVariantId: string | null) => {
    if (nextVariantId === null) {
      removeUrlParam("variant");
    } else {
      setUrlParam("variant", nextVariantId);
    }
    setVariantId(nextVariantId);
  };

  return (
    <CVPage
      cv={cv}
      template={template}
      templateOptions={templateOptions}
      selectedTemplateId={template.id}
      variantNames={variantNames}
      selectedVariantId={variantId}
      printMode={printMode}
      onTemplateChange={handleTemplateChange}
      onVariantChange={handleVariantChange}
      onPrintModeChange={setPrintMode}
    />
  );
}

function getInitialVariantId(availableNames: string[]): string | null {
  const requested = new URLSearchParams(window.location.search).get("variant");
  if (!requested || !availableNames.includes(requested)) return null;
  return requested;
}

function getInitialTemplateId(): TemplateId {
  const requestedTemplate = new URLSearchParams(window.location.search).get(
    "template"
  );
  const template = getTemplate(requestedTemplate);

  if (requestedTemplate && template.id !== requestedTemplate) {
    setUrlParam("template", defaultTemplateId);
  }

  return template.id as TemplateId;
}

function setUrlParam(param: string, value: string) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set(param, value);
  window.history.replaceState({}, "", nextUrl);
}

function removeUrlParam(param: string) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete(param);
  window.history.replaceState({}, "", nextUrl);
}
