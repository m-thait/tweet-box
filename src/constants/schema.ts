import {
  ColumnFieldNames,
  ESGColumnFields,
  ESGGroupNames,
} from "@moodys/mdc-table.schemas.screener";

export const DRAWER_FIELDS = [
  ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
  ESGColumnFields.ENV_IPS_SCORE.fieldName,
  ESGColumnFields.SOCIAL_IPS_SCORE.fieldName,
  ESGColumnFields.GOV_IPS_SCORE.fieldName,
];

export const SCORE_FIELDS = [
  ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
  ESGColumnFields.ENV_IPS_SCORE.fieldName,
  ESGColumnFields.SOCIAL_IPS_SCORE.fieldName,
  ESGColumnFields.GOV_IPS_SCORE.fieldName,
  ESGColumnFields.CTA_SCORE.fieldName,
];

export const TOP4SCORE_GROUPS = [
  ESGGroupNames.ESG_SCORES_MIS,
  ESGGroupNames.ENVIRONMENTAL_SCORES_MIS,
  ESGGroupNames.SOCIAL_SCORES_MIS,
  ESGGroupNames.GOVERNANCE_SCORES_MIS,
];

export const PROVISIONAL_RATINGS = [
  ESGColumnFields.LT_RATING.fieldName,
  ESGColumnFields.LT_BANK_SUMMARY_RATING.fieldName,
];

export const RATING_ACTION_FIELDS = [
  ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
  ESGColumnFields.LT_BANK_SUMMARY_RATING.fieldName,
  ESGColumnFields.LT_ISSUER_RATING_LAST_ACTION.fieldName,
  ESGColumnFields.SENIORMOST_TAX_BACKED_LAST_ACTION.fieldName,
  ESGColumnFields.SENIORMOST_REVENUE_BACKED_ACTION.fieldName,
];

export const TAXONOMY_FIELDS = [
  ColumnFieldNames.ORG_COUNTRY,
  ColumnFieldNames.ORG_MARKET_SEGMENT,
  ColumnFieldNames.ORG_INDUSTRY,
];

export const RATINGS_FILTER_FIELDS = [
  ESGColumnFields.LT_RATING.fieldName,
  ESGColumnFields.LT_ISSUER_RATING.fieldName,
  ESGColumnFields.LT_BANK_SUMMARY_RATING.fieldName,
  ESGColumnFields.SENIORMOST_TAX_BACKED.fieldName,
  ESGColumnFields.SENIORMOST_REVENUE_BACKED.fieldName,
];

export const SEARCH_FILTER_FIELDS = [
  ESGColumnFields.ORG_ANALYST_NAME.fieldName,
  ESGColumnFields.ORG_COUNTRY.fieldName,
  ESGColumnFields.ORG_ISSUER_NAME.fieldName,
  ESGColumnFields.ORG_ID.fieldName,
  ESGColumnFields.ORG_LEI.fieldName,
  ESGColumnFields.ORG_MARKET_SEGMENT.fieldName,
  ESGColumnFields.ORG_INDUSTRY.fieldName,
  ESGColumnFields.ORG_ESG_SECTOR_MIS.fieldName,
];
