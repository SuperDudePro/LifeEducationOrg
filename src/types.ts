export type Domain = {
  slug: string;
  title: string;
  number: string;
  coreOutcomes: string[];
  competencies: string[];
  evidence: string;
};

// Per-domain Floor content. Source: LifeEducation_Floor_v1_4 (Drive), Domain sections.
export type FloorByDomain = {
  slug: string;
  number: string;
  canDo: string[];      // "The floor-complete 18-year-old can:"
  notOnFloor: string[]; // "What's NOT on the floor:"
};

// Per-domain age-band scaffolding. Source: Age_Band_Scaffolding_v0_4 (Drive).
export type AgeBand = {
  band: string;        // e.g. "Early Childhood (18 months – 5 years)"
  onTrack: string[];
  redFlags: string[];
  building: string;    // "What's Building" summary line
};

export type AgeBandByDomain = {
  slug: string;
  number: string;
  runwayNote: string;  // the italic runway descriptor under the domain heading
  bands: AgeBand[];    // four bands, early childhood → adolescence
};

export type RichSectionContent = {
  heading: string;
  body?: string[];
  bullets?: string[];
  footer?: string;
};

export type RichSectionData = RichSectionContent;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string; level?: number }
  | { type: "list"; items: string[] };

export type StructuredSection = {
  id: string;
  heading: string;
  blocks: ContentBlock[];
};
