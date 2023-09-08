import {
  ColumnFieldNames,
  SUB_FACTOR_SCORE_FIELDS,
  SortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel, SortParams } from "@moodys/mdc-table.table";
import { ColumnApi } from "ag-grid-community";
import { EsgUserType } from "./api.types";

export enum TaxonomySectorLabels {
  BANKING = "banking",
  US_PUBLIC_FINANCE = "us-public-finance",
  SOVEREIGN_AND_SUPRANATIONAL = "sovereign-and-supranational",
  SUB_SOVEREIGN = "sub-sovereign",
  CORPORATES = "corporates",
  DEFAULT = "default",
}

export type MatchedColumn = Record<string, boolean>;

export type SubFactorFieldMap = MatchedColumn;

export type MatchedSectorsSorts = {
  [key: string]: SortParams;
};

export interface GenerateColumnComposition {
  columnCompositionMap: ColumnCompositionMap;
  columnComposition: ColumnComposition;
  filterModel: AgGridFilterModel;
  columnApi: ColumnApi;
  userType: EsgUserType;
}

export interface GeneratedColumnMap {
  columnComposition: ColumnComposition;
  matchedColumns: MatchedColumn;
}

export interface ColGroupVisibilityState {
  groupId: string;
  open: boolean;
}

export interface ColumnComposition {
  label: TaxonomySectorLabels;
  hiddenColumns: {
    [column: string]: boolean;
  };
  shownColumns: {
    [column: string]: boolean;
  };
  sort: SortParams;
}

export interface ColumnCompositionMap {
  [key: string]: ColumnComposition;
}

export const defaultSectorMap = {
  label: TaxonomySectorLabels.DEFAULT,
  hiddenColumns: {
    [ColumnFieldNames.SOCIAL_DEMOGRAPHICS]: false,
    [ColumnFieldNames.SOCIAL_LABOR_AND_INCOME]: false,
    [ColumnFieldNames.SOCIAL_EDUCATION]: false,
    [ColumnFieldNames.SOCIAL_HOUSING]: false,
    [ColumnFieldNames.SOCIAL_HEALTH_AND_SAFETY_PRIVATE]: false,
    [ColumnFieldNames.SOCIAL_ACCESS_TO_BASIC_SERVICES]: false,
    [ColumnFieldNames.GOV_INSTITUTIONAL_STRUCTURE]: false,
    [ColumnFieldNames.GOV_POLICY_CREDIBILITY_AND_EFFECTIVENESS]: false,
    [ColumnFieldNames.GOV_BUDGET_MANAGEMENT]: false,
    [ColumnFieldNames.GOV_TRANSPARENCY_AND_DISCLOSURE]: false,
  },
  shownColumns: {
    [ColumnFieldNames.LT_RATING]: true,
    [ColumnFieldNames.LT_RATING_CLASS]: true,
    [ColumnFieldNames.LT_RATING_LAST_ACTION]: true,
    [ColumnFieldNames.LT_RATING_DATE]: true,
    [ColumnFieldNames.LT_RATING_SPARKLINE]: true,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING]: true,
    [ColumnFieldNames.LT_BANK_RATING_SPARKLINE]: true,
  },
  sort: {
    keyword: ColumnFieldNames.ORG_ISSUER_NAME,
    order: SortOrder.ASCENDING,
  },
};

export const corporatesSectorMap = {
  label: TaxonomySectorLabels.CORPORATES,
  hiddenColumns: {
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING]: false,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_ACTION]: false,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_CLASS]: false,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_DATE]: false,
    [ColumnFieldNames.LT_BANK_RATING_SPARKLINE]: false,
    [ColumnFieldNames.SOCIAL_DEMOGRAPHICS]: false,
    [ColumnFieldNames.SOCIAL_LABOR_AND_INCOME]: false,
    [ColumnFieldNames.SOCIAL_EDUCATION]: false,
    [ColumnFieldNames.SOCIAL_HOUSING]: false,
    [ColumnFieldNames.SOCIAL_HEALTH_AND_SAFETY_PRIVATE]: false,
    [ColumnFieldNames.SOCIAL_ACCESS_TO_BASIC_SERVICES]: false,
    [ColumnFieldNames.GOV_INSTITUTIONAL_STRUCTURE]: false,
    [ColumnFieldNames.GOV_POLICY_CREDIBILITY_AND_EFFECTIVENESS]: false,
    [ColumnFieldNames.GOV_BUDGET_MANAGEMENT]: false,
    [ColumnFieldNames.GOV_TRANSPARENCY_AND_DISCLOSURE]: false,
  },
  shownColumns: {
    [ColumnFieldNames.LT_RATING]: true,
    [ColumnFieldNames.LT_RATING_CLASS]: true,
    [ColumnFieldNames.LT_RATING_LAST_ACTION]: true,
    [ColumnFieldNames.LT_RATING_DATE]: true,
    [ColumnFieldNames.LT_RATING_SPARKLINE]: true,
  },
  sort: {
    keyword: ColumnFieldNames.LT_RATING_DATE,
    order: SortOrder.DESCENDING,
  },
};

export const bankingSectorsMap = {
  label: TaxonomySectorLabels.BANKING,
  hiddenColumns: {
    [ColumnFieldNames.LT_RATING]: false,
    [ColumnFieldNames.LT_RATING_CLASS]: false,
    [ColumnFieldNames.LT_RATING_LAST_ACTION]: false,
    [ColumnFieldNames.LT_RATING_DATE]: false,
    [ColumnFieldNames.LT_RATING_SPARKLINE]: false,
  },
  shownColumns: {
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING]: true,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_ACTION]: true,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_CLASS]: true,
    [ColumnFieldNames.LT_BANK_SUMMARY_RATING_DATE]: true,
    [ColumnFieldNames.LT_BANK_RATING_SPARKLINE]: true,
  },
  sort: {
    keyword: ColumnFieldNames.LT_BANK_SUMMARY_RATING_DATE,
    order: SortOrder.DESCENDING,
  },
};

export const usPublicFinanceSectorsMap = {
  label: TaxonomySectorLabels.US_PUBLIC_FINANCE,
  hiddenColumns: {},
  shownColumns: {
    [ColumnFieldNames.LT_RATING]: true,
    [ColumnFieldNames.LT_RATING_CLASS]: true,
    [ColumnFieldNames.LT_RATING_LAST_ACTION]: true,
    [ColumnFieldNames.LT_RATING_DATE]: true,
    [ColumnFieldNames.LT_RATING_SPARKLINE]: true,
    [ColumnFieldNames.SOCIAL_DEMOGRAPHICS]: true,
    [ColumnFieldNames.SOCIAL_LABOR_AND_INCOME]: true,
    [ColumnFieldNames.SOCIAL_EDUCATION]: true,
    [ColumnFieldNames.SOCIAL_HOUSING]: true,
    [ColumnFieldNames.SOCIAL_HEALTH_AND_SAFETY_PRIVATE]: true,
    [ColumnFieldNames.SOCIAL_ACCESS_TO_BASIC_SERVICES]: true,
    [ColumnFieldNames.GOV_INSTITUTIONAL_STRUCTURE]: true,
    [ColumnFieldNames.GOV_POLICY_CREDIBILITY_AND_EFFECTIVENESS]: true,
    [ColumnFieldNames.GOV_BUDGET_MANAGEMENT]: true,
    [ColumnFieldNames.GOV_TRANSPARENCY_AND_DISCLOSURE]: true,
  },
  sort: {
    keyword: ColumnFieldNames.ORG_ISSUER_NAME,
    order: SortOrder.ASCENDING,
  },
};

export const sovereignAndSupernationSectorsMaps = {
  ...usPublicFinanceSectorsMap,
  label: TaxonomySectorLabels.SOVEREIGN_AND_SUPRANATIONAL,
  sort: {
    keyword: ColumnFieldNames.LT_RATING_DATE,
    order: SortOrder.DESCENDING,
  },
};

export const subSovereignSectorsMaps = {
  ...usPublicFinanceSectorsMap,
  label: TaxonomySectorLabels.SUB_SOVEREIGN,
  sort: {
    keyword: ColumnFieldNames.LT_RATING_DATE,
    order: SortOrder.DESCENDING,
  },
};

export const subFactorFieldsMap = SUB_FACTOR_SCORE_FIELDS.reduce(
  (map: SubFactorFieldMap, field: string) => ((map[field] = true), map),
  {} as SubFactorFieldMap
);
