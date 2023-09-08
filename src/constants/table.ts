import { TableViewType } from "@moodys/mdc-table.schemas.screener";

// width
const TABLE_SIDE_PANEL_WIDTH = 380;
const PINNED_NAME_COLUMN_WIDTH = 247;
const DETAILS_COLUMN_WIDTH = 112;
const SUB_FACTOR_COLUMN_WIDTH = 92;
// blanks
const NO_DATA = "-- (No data)";
// Ag grid custom class name
const AG_GRID_POPUP_CLASS_NAME = "ag-custom-component-popup";
// median rows
const PINNED_ROW_LIST_MEDIAN_KEY = {
  organization: { issuerName: "List Median" },
  esgScores: {},
  creditRating: {},
};
const PINNED_ROW_SECTOR_MEDIAN_KEY = {
  organization: { issuerName: "Sector Median" },
};
const LIST_MEDIAN_LABEL = "List Median";
const INVESTMENT_GRADE = "investment_grade";
const SPECULATIVE_GRADE = "speculative_grade";
// add entity background class name
const AG_GRID_ADD_ENTITY_CLASS_NAME = "ag-grid-add-entity";
const AG_GRID_PINNED_ROW_CLASS = "ag-row-pinned";
const enum SCORE_LABELS {
  "CIS" = "CIS-",
  "ENV_IPS" = "E-",
  "SOCIAL_IPS" = "S-",
  "GOV_IPS" = "G-",
  "CTA" = "CT-",
}

const enum MENU_LABELS {
  ENTITY_PAGE = "Entity Page",
  COMPANY_PAGE = "Company Page",
  ESG_PAGE = "ESGView Page",
}

//SectorList
const SECTOR_LIST = [
  "sovereign_and_supranational",
  "sub-sovereign",
  "us_public_finance",
];

//pending Rating
const PENDING_RATING = "(P)";

//Tab Names
const TAB_NAMES = {
  [TableViewType.OVERVIEW]: "Overview",
  [TableViewType.ESG]: "ESG",
};

export {
  TABLE_SIDE_PANEL_WIDTH,
  PINNED_NAME_COLUMN_WIDTH,
  DETAILS_COLUMN_WIDTH,
  SUB_FACTOR_COLUMN_WIDTH,
  NO_DATA,
  PINNED_ROW_LIST_MEDIAN_KEY,
  PINNED_ROW_SECTOR_MEDIAN_KEY,
  LIST_MEDIAN_LABEL,
  SCORE_LABELS,
  AG_GRID_POPUP_CLASS_NAME,
  AG_GRID_ADD_ENTITY_CLASS_NAME,
  AG_GRID_PINNED_ROW_CLASS,
  INVESTMENT_GRADE,
  SPECULATIVE_GRADE,
  PENDING_RATING,
  SECTOR_LIST,
  MENU_LABELS,
  TAB_NAMES,
};
