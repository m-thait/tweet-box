export enum AgGridSidePanel {
  COLUMNS = "columns",
  FILTERS = "filters",
  NONE = "none",
}

export enum AgGridSortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum AgGridColumnType {
  NUMERIC_COLUMN = "numericColumn",
  RIGHT_ALIGNED = "rightAligned",
}

export enum AgGridColumnEventType {
  SORT_CHANGED = "sortChanged",
  COLUMN_VISIBLE = "columnVisible",
}

export enum AgGridAggregation {
  ALPHA_NUMERIC_LIST_MEDIAN = "alphaNumericListMedian",
}

export enum AgGridMenuItem {
  PIN_SUB_MENU = "pinSubMenu",
  SEPARATOR = "separator",
  AUTO_SIZE_THIS = "autoSizeThis",
  RESET_COLUMNS = "resetColumns",
  COPY = "copy",
  COPY_WITH_HEADERS = "copyWithHeaders",
  COPY_WITH_GROUP_HEADERS = "copyWithGroupHeaders",
  PASTE = "paste",
  EXCEL_EXPORT = "excelExport",
}

export interface AgGridFilterModelValue {
  filterType: AgGridFilterType;
  values: string[];
}

export interface AgGridFilterModel {
  [key: string]: AgGridFilterModelValue;
}

export interface AgGridPagination {
  page?: number;
  rowsPerPage?: number;
}

export enum AgGridFilterType {
  SET = "set",
  TEXT = "text",
}

export enum AgGridFilterLocation {
  NO_UI = "Top toolbar key filter",
  COLUMN_MENU = "Column header filter",
  TOOLBAR = "Side bar filter",
}

export enum AgGridExcelExportLocation {
  TOP_BAR = "Top toolbar",
  SIDE_BAR = "Sidebar",
  RIGHT_CLICK = "Right click",
}

export enum MethodologyDocument {
  SOCIAL = "social",
  ENVIRONMENTAL = "environmental",
  CIS_IPS = "cis_ips",
}

export type MethodologyLink = {
  signedUri: string;
};

export enum SideBarOpenLocation {
  TOP_BAR = '"Edit columns" at the top toolbar',
  SIDE_BAR = '"Edit columns" label on the sidebar',
}

export enum SideBarFilterLocation {
  TOP_BAR = '"More Filters" at the top toolbar',
  SIDE_BAR = '"Filter" label on the sidebar',
}
