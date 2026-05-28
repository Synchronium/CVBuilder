import type { CvViewModel } from "../data/resolveCv";
import type { ReactElement } from "react";

export type TemplateProps = {
  cv: CvViewModel;
};

export type CvTemplate = {
  id: string;
  label: string;
  Component: (props: TemplateProps) => ReactElement;
};
