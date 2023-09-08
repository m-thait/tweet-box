import { ColumnState } from "ag-grid-enterprise";
import { createSlice } from "@reduxjs/toolkit";
import {
  AgGridFilterModel,
  AgGridFilterModelValue,
  AgGridPagination,
  TableViewType,
} from "@models/index";
import { updateViewSorts } from "./Table.utils";
export interface TableState {
  filterModel: {
    previous: AgGridFilterModel;
    current: AgGridFilterModel;
  };
  subSectorFilterModel: AgGridFilterModelValue | null;
  countryFilterModel: AgGridFilterModelValue | null;
  ltRatingFilterModel: AgGridFilterModelValue | null;
  pagination: AgGridPagination;
  columnMapping: Record<string, string>;
  entityCount: string;
  hasOOSValues: boolean;
  chartData: Record<
    string,
    Record<string, string | Record<string, string>>
  > | null;
  columnState: Record<TableViewType, ColumnState[] | null>;
  columnGroupState: Record<
    TableViewType,
    { groupId: string; open: boolean }[] | null
  >;
}

export const tableInitialState: TableState = {
  filterModel: {
    previous: {},
    current: {},
  },
  subSectorFilterModel: null,
  countryFilterModel: null,
  ltRatingFilterModel: null,
  pagination: {
    page: undefined,
    rowsPerPage: undefined,
  },
  columnMapping: {},
  entityCount: "0",
  hasOOSValues: false,
  chartData: null,
  columnState: {
    [TableViewType.OVERVIEW]: null,
    [TableViewType.ESG]: null,
  },
  columnGroupState: {
    [TableViewType.OVERVIEW]: null,
    [TableViewType.ESG]: null,
  },
};

export const tableSlice = createSlice({
  name: "table",
  initialState: tableInitialState,
  reducers: {
    saveFilterModel: (state, action) => {
      state.filterModel = {
        previous: state.filterModel.current,
        current: action.payload,
      };
    },
    saveSubSectorFilterModel: (state, action) => {
      state.subSectorFilterModel = action.payload;
    },
    saveCountryFilterModel: (state, action) => {
      state.countryFilterModel = action.payload;
    },
    saveLTRatingFilterModel: (state, action) => {
      state.ltRatingFilterModel = action.payload;
    },
    savePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    saveColumnMapping: (state, action) => {
      state.columnMapping = action.payload;
    },
    saveEntityCount: (state, action) => {
      state.entityCount = action.payload;
    },
    saveHasOOSValues: (state, action) => {
      state.hasOOSValues = action.payload;
    },
    saveChartData: (state, action) => {
      state.chartData = action.payload;
    },
    saveColumnStates: (state, action) => {
      state.columnState = action.payload;
    },
    saveColumnState: (state, action) => {
      state.columnState = { ...state.columnState, ...action.payload };
    },
    saveColumnSortState: (state, action) => {
      state.columnState = updateViewSorts(
        state.columnState,
        action.payload.sortedColumn
      );
    },
    saveColumnGroupStates: (state, action) => {
      state.columnGroupState = {
        [TableViewType.OVERVIEW]: action.payload,
        [TableViewType.ESG]: action.payload,
      };
    },
    saveColumnGroupState: (state, action) => {
      state.columnGroupState = { ...state.columnGroupState, ...action.payload };
    },
  },
});

export const tableActions = tableSlice.actions;
export const {
  saveFilterModel,
  saveSubSectorFilterModel,
  saveCountryFilterModel,
  saveLTRatingFilterModel,
  savePagination,
  saveColumnMapping,
  saveEntityCount,
  saveHasOOSValues,
  saveChartData,
  saveColumnStates,
  saveColumnState,
  saveColumnSortState,
  saveColumnGroupState,
  saveColumnGroupStates,
} = tableActions;
export default tableSlice.reducer;
