import {
  ColumnFieldNames,
  SortParams,
  SortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel } from "./table.types";

// These are the query param values that will be used.
export enum PresetFilterQueryParams {
  FINANCIAL_INSTITUIONS = "financialinstitutions",
  OIL_GAS = "oil-gas",
  CORPORATES = "corporates",
  SOVEREIGNS = "sovereigns",
  BANKS = "banks",
}
export interface PresetFilterModelMap {
  [key: string]: PresetFilterModelMapItem;
}

export interface PresetFilterModelMapItem {
  sectors: string[];
  sortParam: SortParams;
}

// This is to map the above values to taxonomy IDs
export const PresetFilterModelMaps: PresetFilterModelMap = {
  [PresetFilterQueryParams.FINANCIAL_INSTITUIONS]: {
    sectors: ["Financial_Institutions", "Insurance_fin", "Managed_Investments"],
    sortParam: {
      keyword: ColumnFieldNames.LT_RATING_DATE,
      order: SortOrder.DESCENDING,
    },
  },
  [PresetFilterQueryParams.OIL_GAS]: {
    sectors: ["Oil_and_Gas_corp"],
    sortParam: {
      keyword: ColumnFieldNames.LT_RATING_DATE,
      order: SortOrder.DESCENDING,
    },
  },
  [PresetFilterQueryParams.CORPORATES]: {
    sectors: ["Corporates"],
    sortParam: {
      keyword: ColumnFieldNames.LT_RATING_DATE,
      order: SortOrder.DESCENDING,
    },
  },
  [PresetFilterQueryParams.SOVEREIGNS]: {
    sectors: ["Sovereign_and_Supranational"],
    sortParam: {
      keyword: ColumnFieldNames.LT_RATING_DATE,
      order: SortOrder.DESCENDING,
    },
  },
  [PresetFilterQueryParams.BANKS]: {
    sectors: ["Banking"],
    sortParam: {
      keyword: ColumnFieldNames.LT_BANK_SUMMARY_RATING_DATE,
      order: SortOrder.DESCENDING,
    },
  },
};

export interface PresetFilterHookResponse {
  isSuccess: boolean;
  filterModel: AgGridFilterModel | undefined;
}
