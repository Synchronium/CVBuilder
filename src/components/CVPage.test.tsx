import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useState } from "react";
import { CVPage } from "./CVPage";
import { resolveCv } from "../data/resolveCv";
import { getTemplate, getTemplateOptions } from "../templates/registry";

function TestHarness() {
  const [printMode, setPrintMode] = useState(false);
  const [templateId, setTemplateId] = useState("classic");
  const cv = resolveCv(undefined, new Date(Date.UTC(2026, 4, 23)));
  const template = getTemplate(templateId);

  const handleTemplateChange = (nextTemplateId: string) => {
    const nextTemplate = getTemplate(nextTemplateId);
    const nextUrl = new URL(window.location.href);

    nextUrl.searchParams.set("template", nextTemplate.id);
    window.history.replaceState({}, "", nextUrl);
    setTemplateId(nextTemplate.id);
  };

  return (
    <CVPage
      cv={cv}
      template={template}
      templateOptions={getTemplateOptions()}
      selectedTemplateId={template.id}
      variantNames={[]}
      selectedVariantId={null}
      printMode={printMode}
      onTemplateChange={handleTemplateChange}
      onVariantChange={() => {}}
      onPrintModeChange={setPrintMode}
    />
  );
}

describe("CVPage", () => {
  it("renders the resolved CV", () => {
    render(<TestHarness />);

    expect(screen.getByRole("heading", { name: "Alex Morgan" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Clockwork Software Ltd" })).toBeInTheDocument();
    expect(screen.getByText("Mar 2022 - Present")).toBeInTheDocument();
  });

  it("switches templates and stores the choice in the URL", async () => {
    const user = userEvent.setup();

    window.history.replaceState({}, "", "/");
    render(<TestHarness />);

    await user.selectOptions(screen.getByLabelText("Template"), "two-column");

    expect(document.querySelector(".template-two-column")).toBeInTheDocument();
    expect(window.location.search).toBe("?template=two-column");
  });
});
