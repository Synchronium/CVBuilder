import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  /**
   * `heading` renders a standard `<h2>` inside a `<section>` (Classic, TwoColumn, Vivid).
   * `label` renders an inline banner label with no section wrapper (Divided's inverted bar).
   */
  variant?: "heading" | "label";
  className?: string;
  children?: ReactNode;
};

const slug = (title: string) => `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

export function Section({ title, variant = "heading", className, children }: SectionProps) {
  if (variant === "label") {
    return (
      <>
        <span className="cv-section-label">{title}</span>
        {children}
      </>
    );
  }

  const headingId = slug(title);
  const sectionClass = className ? `cv-section ${className}` : "cv-section";

  return (
    <section className={sectionClass} aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {children}
    </section>
  );
}
