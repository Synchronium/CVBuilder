import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";
import { Role } from "./Role";
import { Education } from "./Education";
import { Section } from "./Section";
import { Prose } from "./Prose";
import { BulletList } from "./BulletList";
import { resolveCv } from "../../data/resolveCv";
import {
  makeCv,
  makeEducationItem,
  makePerson,
  makeRole
} from "../../data/resolveCv.fixtures";

/**
 * Markup snapshots of the SHARED primitives only (see ADR 0010). Their rendered
 * element structure and `cv-*` class names are a contract that every template's
 * CSS depends on (ADR 0008). A snapshot diff here forces an intentional review
 * when that contract changes — a rename behavioural tests would not catch.
 *
 * Scope is deliberately the leaf primitives, not whole templates (covered by
 * visual regression, ADR 0009) and not composites like StandardRole (covered by
 * its own behavioural test).
 */

const person = makePerson();
// A resolved role gives realistic position view models (dateRange, isCurrent).
const role = resolveCv(makeCv({ roles: [makeRole()] })).roles[0]!;
const eduItem = makeEducationItem();

describe("shared primitive markup contract", () => {
  it("Header.Name", () => {
    expect(render(<Header.Name name="Ada Lovelace" />).asFragment()).toMatchSnapshot();
  });

  it("Header.Headline", () => {
    expect(render(<Header.Headline headline="Engineer" />).asFragment()).toMatchSnapshot();
  });

  it("Header.Summary", () => {
    expect(render(<Header.Summary summary="A summary." />).asFragment()).toMatchSnapshot();
  });

  it("Header.Contact", () => {
    expect(render(<Header.Contact person={person} />).asFragment()).toMatchSnapshot();
  });

  it("Role.Company", () => {
    expect(render(<Role.Company name="Test Co" />).asFragment()).toMatchSnapshot();
  });

  it("Role.Product", () => {
    expect(render(<Role.Product product="Flagship" />).asFragment()).toMatchSnapshot();
  });

  it("Role.Duration", () => {
    expect(render(<Role.Duration duration="3 yrs" />).asFragment()).toMatchSnapshot();
  });

  it("Role.Description", () => {
    expect(render(<Role.Description description="Does things." />).asFragment()).toMatchSnapshot();
  });

  it("Role.Positions", () => {
    expect(render(<Role.Positions positions={role.positions} />).asFragment()).toMatchSnapshot();
  });

  it("Role.Tech", () => {
    expect(render(<Role.Tech tech={["TypeScript", "React"]} />).asFragment()).toMatchSnapshot();
  });

  it("Education.Qualification", () => {
    expect(
      render(<Education.Qualification qualification={eduItem.qualification} />).asFragment()
    ).toMatchSnapshot();
  });

  it("Education.Institution", () => {
    expect(
      render(<Education.Institution institution={eduItem.institution} />).asFragment()
    ).toMatchSnapshot();
  });

  it("Education.Grade", () => {
    expect(render(<Education.Grade grade={eduItem.grade} />).asFragment()).toMatchSnapshot();
  });

  it("Education.Years", () => {
    expect(
      render(<Education.Years start={eduItem.start} end={eduItem.end} />).asFragment()
    ).toMatchSnapshot();
  });

  it("Education.Detail", () => {
    expect(render(<Education.Detail item={eduItem} />).asFragment()).toMatchSnapshot();
  });

  it("Section (heading variant)", () => {
    expect(
      render(<Section title="Experience">child</Section>).asFragment()
    ).toMatchSnapshot();
  });

  it("Section (label variant)", () => {
    expect(
      render(
        <Section title="Experience" variant="label">
          child
        </Section>
      ).asFragment()
    ).toMatchSnapshot();
  });

  it("Prose", () => {
    expect(render(<Prose text="Body." />).asFragment()).toMatchSnapshot();
  });

  it("BulletList", () => {
    expect(render(<BulletList bullets={role.bullets} />).asFragment()).toMatchSnapshot();
  });
});
