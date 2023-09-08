export const CIS_HEADER_TEXT = "Credit Impact Score";
export const IPS_HEADER_TEXT = "Issuer Profile Scores";
export const SCORE_COMMENTS_HEADER_TEXT = "ESG Credit Impact Score";
export const ANALYST_COMMENTS_DRAWER_TYPE = "esgScores.comments";

export type accordionItems = {
  titles: string[];
  score: number;
  content: string | null;
  description?: string | null;
};

export enum ScorecardDefinitionKey {
  CIS = "cis_definition",
  IPS = "ips_definition",
}

export const errorMessage =
  "An error occurred while fetching the data, please try again at a later time.";

export const CIS_ANALYST_COMMENT = "esgScoresCisAnalystComments";
export const ENV_IPS_ANALYST_COMMENT = "esgScoresIpsAnalystComments";
export const SOCIAL_IPS_ANALYST_COMMENT = "esgScoresSocialAnalystComments";
export const GOV_IPS_ANALYST_COMMENT = "esgScoresGovAnalystComments";
