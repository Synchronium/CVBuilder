import { describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { parseInline } from "./parseInline";

type StrongEl = { type: string; props: { children: string }; key: string | null };
type ParseResult = Array<string | StrongEl>;

function asArray(result: ReactNode): ParseResult {
  return result as unknown as ParseResult;
}

describe("parseInline", () => {
  it("returns plain text unchanged as a string (not an array)", () => {
    expect(parseInline("hello world")).toBe("hello world");
  });

  it("returns an empty string unchanged", () => {
    expect(parseInline("")).toBe("");
  });

  it("returns plain text with no asterisks as a raw string, not an array", () => {
    expect(typeof parseInline("no formatting here")).toBe("string");
  });

  it("wraps a single marked segment in a strong element", () => {
    const result = asArray(parseInline("grew by *more than 50%* last year"));
    expect(result[0]).toBe("grew by ");
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("more than 50%");
    expect(result[2]).toBe(" last year");
  });

  it("handles bold at the start of the string", () => {
    // split("*Bold* start") → ["", "Bold", " start"]
    const result = asArray(parseInline("*Bold* start"));
    expect(result[0]).toBe("");
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("Bold");
    expect(result[2]).toBe(" start");
  });

  it("handles bold at the end of the string", () => {
    // split("ends with *emphasis*") → ["ends with ", "emphasis", ""]
    const result = asArray(parseInline("ends with *emphasis*"));
    expect(result[0]).toBe("ends with ");
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("emphasis");
    expect(result[2]).toBe("");
  });

  it("handles multiple bold segments", () => {
    // split("*a* and *b* and *c*") → ["", "a", " and ", "b", " and ", "c", ""]
    const result = asArray(parseInline("*a* and *b* and *c*"));
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("a");
    expect(result[2]).toBe(" and ");
    expect((result[3] as StrongEl).type).toBe("strong");
    expect((result[3] as StrongEl).props.children).toBe("b");
    expect(result[4]).toBe(" and ");
    expect((result[5] as StrongEl).type).toBe("strong");
    expect((result[5] as StrongEl).props.children).toBe("c");
  });

  it("handles adjacent bold segments with no text between them", () => {
    // split("*one**two*") → ["", "one", "", "two", ""]
    const result = asArray(parseInline("*one**two*"));
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("one");
    expect(result[2]).toBe("");
    expect((result[3] as StrongEl).type).toBe("strong");
    expect((result[3] as StrongEl).props.children).toBe("two");
  });

  it("treats an unclosed asterisk as plain text", () => {
    expect(parseInline("hello *world")).toBe("hello *world");
  });

  it("treats a lone asterisk as plain text", () => {
    expect(parseInline("price: $5 * 2")).toBe("price: $5 * 2");
  });

  it("matches the first valid asterisk pair when asterisks are unbalanced", () => {
    // "*one *two* three" — regex matches *one * (content: "one "), not the whole span
    const result = asArray(parseInline("*one *two* three"));
    expect((result[1] as StrongEl).type).toBe("strong");
    expect((result[1] as StrongEl).props.children).toBe("one ");
    expect(result[2]).toBe("two* three");
  });

  it("assigns a unique key to each element in the output", () => {
    const result = asArray(parseInline("*a* and *b*"));
    const elements = result.filter((r): r is StrongEl => typeof r === "object");
    const keys = elements.map((el) => el.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
