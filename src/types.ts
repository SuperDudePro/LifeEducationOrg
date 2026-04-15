export type Domain = {
  slug: string;
  title: string;
  emoji: string;
  coreOutcomes: string[];
  competencies: string[];
  evidence: string;
};

export type RichSectionData = {
  heading: string;
  body?: string[];
  bullets?: string[];
  footer?: string;
};
