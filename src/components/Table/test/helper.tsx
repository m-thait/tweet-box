import { ColDef, ColGroupDef } from "ag-grid-enterprise";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import { ColumnGroup } from "@moodys/mdc-table.schemas.screener";
import {
  DETAILS_COLUMN_WIDTH,
  PINNED_NAME_COLUMN_WIDTH,
} from "@constants/index";
import { FirstColumnRenderer } from "@components/Table/renderers";
import { ScreenerFilter } from "../Filters/ScreenerFilter/ScreenerFilter";

export const cisFilterModel = {
  cisScore: { filterType: "set", values: ["3"] },
};

export const firstColumnDef = (
  field: string,
  name: string,
  otherParams?: Partial<ColDef>,
  disableTooltip = false
): ColDef => {
  const colDef: ColDef = {
    field,
    filter: ScreenerFilter,
    headerName: name,
    cellRenderer: FirstColumnRenderer,
    pinned: "left",
    suppressColumnsToolPanel: true,
    lockPinned: true,
    valueFormatter: expect.any(Function),
    minWidth: PINNED_NAME_COLUMN_WIDTH,
    sort: "asc",
    sortable: true,
    suppressFiltersToolPanel: false,
    suppressMenu: false,
    filterParams: {
      buttons: ["reset"],
      refreshValuesOnOpen: true,
      defaultToNothingSelected: true,
      valueFormatter: expect.any(Function),
    },
    columnGroupShow: undefined,
    ...otherParams,
  };

  if (!disableTooltip && !colDef.headerTooltip) {
    colDef.headerTooltip = [name] as unknown as string;
  }

  return colDef;
};

export const columnDef = (
  field: string,
  name: string,
  otherParams?: Partial<ColDef>,
  disableTooltip = false
): ColDef => {
  const colDef: ColDef = {
    columnGroupShow: "open",
    field: field,
    filter: ScreenerFilter,
    headerName: name,
    valueFormatter: expect.any(Function),
    minWidth: DETAILS_COLUMN_WIDTH,
    sortable: true,
    suppressFiltersToolPanel: false,
    suppressMenu: false,
    filterParams: {
      buttons: ["reset"],
      refreshValuesOnOpen: true,
      defaultToNothingSelected: true,
      valueFormatter: expect.any(Function),
    },
    ...otherParams,
  };

  if (!disableTooltip) {
    colDef.headerTooltip = [name] as unknown as string;
  }

  return colDef;
};

export const columnGroup = (
  group: ColumnGroup,
  children: ColDef[]
): ColGroupDef[] => [
  {
    children,
    columnGroupShow: undefined,
    headerName: group.templateName,
    headerGroupComponent: expect.any(Function),
    marryChildren: true,
    openByDefault: true,
    groupId: replaceSpaceWithDash(group.templateName),
  },
];

export const setPresetFilterQueryParams = (param?: string) => {
  Object.defineProperty(window, "location", {
    value: {
      search: param ? `?sector=${param}` : undefined,
    },
    writable: true,
  });
};
