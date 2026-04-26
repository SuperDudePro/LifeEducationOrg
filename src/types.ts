
export type Domain = {
  slug: string;
  title: string;
  number: string;
  coreOutcomes: string[];
  competencies: string[];
  evidence: string;
};

export type RichSectionContent = {
  heading: string;
  body?: string[];
  bullets?: string[];
  footer?: string;
};
