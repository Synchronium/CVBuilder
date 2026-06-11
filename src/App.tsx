import { useEffect, useMemo, useState } from "react";
import { CVPage } from "./components/CVPage";
import { EmptyState } from "./components/EmptyState";
import { resolveCv } from "./data/resolveCv";
import { loadBaseCv } from "./data/baseCv";
import { getVariantNames, loadVariantData } from "./data/variants";
import {
  getTemplate,
  getTemplateOptions,
  type TemplateId
} from "./templates/registry";

export function App() {
  const variantNames = useMemo(() => getVariantNames(), []);
  const [variantId, setVariantId] = useState<string | null>(() =>
    getInitialVariantId(variantNames)
  );
  const [baseData, setBaseData] = useState<unknown | null>(null);
  const [baseLoaded, setBaseLoaded] = useState(false);
  const [variantData, setVariantData] = useState<unknown | null>(null);
  const [variantError, setVariantError] = useState<string | null>(null);
  const templateOptions = useMemo(() => getTemplateOptions(), []);
  const [printMode, setPrintMode] = useState<boolean>(() => getInitialPrintMode());
  const [templateId, setTemplateId] = useState<TemplateId>(() =>
    getInitialTemplateId()
  );
  const template = getTemplate(templateId);

  // If the URL requested an unknown template, getInitialTemplateId() fell back
  // to the default; reflect that correction in the URL (side effect kept out of
  // the render-path state initializer).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("template");
    if (requested && requested !== templateId) {
      setUrlParam("template", templateId);
    }
    // Run once on mount to reconcile the initial URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load the base CV once on mount (user's base.cv.json, else the example).
  useEffect(() => {
    let cancelled = false;
    loadBaseCv()
      .then((data) => {
        if (cancelled) return;
        setBaseData(data);
        setBaseLoaded(true);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error(error);
        setBaseData(null);
        setBaseLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (variantId === null) {
      setVariantData(null);
      setVariantError(null);
      return;
    }

    let cancelled = false;
    setVariantError(null);
    loadVariantData(variantId)
      .then((data) => {
        if (!cancelled) setVariantData(data);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error(error);
        setVariantData(null);
        setVariantError(
          `Could not load variant "${variantId}". Showing the base CV instead.`
        );
      });

    return () => {
      cancelled = true;
    };
  }, [variantId]);

  // Variant data (when selected and loaded) overrides the base CV.
  const activeData = variantData ?? baseData;
  const cv = useMemo(
    () => (activeData == null ? null : resolveCv(activeData)),
    [activeData]
  );

  const handleTemplateChange = (nextTemplateId: string) => {
    const nextTemplate = getTemplate(nextTemplateId);
    setUrlParam("template", nextTemplate.id);
    setTemplateId(nextTemplate.id);
  };

  const handleVariantChange = (nextVariantId: string | null) => {
    if (nextVariantId === null) {
      removeUrlParam("variant");
    } else {
      setUrlParam("variant", nextVariantId);
    }
    setVariantId(nextVariantId);
  };

  const handlePrintModeChange = (enabled: boolean) => {
    if (enabled) {
      setUrlParam("print", "1");
    } else {
      removeUrlParam("print");
    }
    setPrintMode(enabled);
  };

  // No CV data found once loading has settled: show onboarding instructions.
  if (baseLoaded && cv === null) {
    return <EmptyState />;
  }

  // Base CV still loading on first paint.
  if (cv === null) {
    return <main className="app" aria-busy="true" />;
  }

  return (
    <CVPage
      cv={cv}
      template={template}
      templateOptions={templateOptions}
      selectedTemplateId={template.id}
      variantNames={variantNames}
      selectedVariantId={variantId}
      variantError={variantError}
      printMode={printMode}
      onTemplateChange={handleTemplateChange}
      onVariantChange={handleVariantChange}
      onPrintModeChange={handlePrintModeChange}
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
  return getTemplate(requestedTemplate).id;
}

function getInitialPrintMode(): boolean {
  return new URLSearchParams(window.location.search).get("print") === "1";
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
