import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolveCv } from "../data/resolveCv";
import { getTemplateOptions } from "./registry";
import { makeFullCv } from "../data/resolveCv.fixtures";

const cv = resolveCv(makeFullCv(), new Date(Date.UTC(2026, 4, 23)));
const templates = getTemplateOptions();

describe.each(templates)("$label template", ({ Component }) => {
  it("renders the person, a role, and a bullet", () => {
    render(<Component cv={cv} />);

    expect(
      screen.getByRole("heading", { name: "Alex Morgan" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Clockwork Software Ltd" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Manage/, { selector: ".bullet-list p" })
    ).toBeInTheDocument();
  });

  it("exposes the LinkedIn link from contact details", () => {
    render(<Component cv={cv} />);

    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/alex-morgan-example/"
    );
  });

  it("gives the experience region an accessible heading", () => {
    render(<Component cv={cv} />);

    // Every template (including Divided's banner-label variant) surfaces a
    // level-2 heading named "Experience" or "Employment".
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /Experience|Employment/
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("condensed roles", () => {
  it("are rendered, with the heading still present", () => {
    // Pixel & Paper Ltd is flagged condensed in the example data.
    const { container } = render(
      <div>{templates.map((t) => <t.Component key={t.id} cv={cv} />)}</div>
    );

    expect(
      within(container).getAllByRole("heading", { name: "Pixel & Paper Ltd" })
        .length
    ).toBe(templates.length);
  });
});
