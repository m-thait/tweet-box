interface Score {
  score_desc: string;
  score_id: number;
}

export interface Definition {
  line_id: number | null;
  definition: string | null;
}

export interface Scorecard {
  cis_definition: Definition[];
  identifier: number;
  scores: Score[];
  description: string;
  ips_definition: Definition[];
}

export interface ScoreDescription {
  scoreDescription: string;
  scoreContent: string;
}
