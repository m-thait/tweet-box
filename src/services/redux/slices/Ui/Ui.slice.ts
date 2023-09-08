import { createSlice } from "@reduxjs/toolkit";
import { RowNode } from "ag-grid-enterprise";
import { accordionItems } from "@constants/drawer";
import {
  AgGridSidePanel,
  EsgUserType,
  ChartType,
  RatingChartType,
  TableViewType,
} from "@root/src/models";
import {
  formatCisAccordionData,
  formatIpsAccordionData,
} from "@components/InfoDrawer/drawer.utils";
import { scoreDefinitionApi, userTypeApi } from "@services/api";

export interface UiState {
  error: string | null;
  chart: {
    isChartOpen: boolean;
    activeChartType: ChartType;
    activeRatingChartType: RatingChartType;
  };
  table: {
    sidePanel: {
      source: AgGridSidePanel;
      isToolPanelShowing: boolean;
    };
    view: TableViewType;
  };
  drawer: {
    isDrawerOpen: boolean;
    cisAccordionData?: accordionItems[];
    ipsAccordionData?: accordionItems[];
    drawerType?: string;
    nodeData?: RowNode["data"];
    fieldName?: string;
  };
  userType: EsgUserType;
}

export const uiInitialState: UiState = {
  error: null,
  chart: {
    isChartOpen: false,
    activeChartType: ChartType.LT_RATINGS,
    activeRatingChartType: RatingChartType.LT_RATINGS,
  },
  table: {
    sidePanel: {
      source: AgGridSidePanel.NONE,
      isToolPanelShowing: false,
    },
    view: TableViewType.OVERVIEW,
  },
  drawer: { isDrawerOpen: false },
  userType:
    process.env?.BYPASS_OKTA === "true"
      ? EsgUserType.ESG_PREMIUM
      : EsgUserType.ESG_NONE,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    uiError: (state, { payload }) => {
      state.error = payload;
    },
    setSidePanel: (
      state,
      {
        payload: { source, isToolPanelShowing },
      }: { payload: { source: AgGridSidePanel; isToolPanelShowing: boolean } }
    ) => {
      state.table = {
        ...state.table,
        sidePanel: {
          source,
          isToolPanelShowing,
        },
      };
    },
    openDrawer: (state, { payload }) => {
      state.drawer = { ...state.drawer, ...payload };
    },
    closeDrawer: (state) => {
      state.drawer = { ...state.drawer, isDrawerOpen: false };
    },
    toggleChart: (state) => {
      state.chart.isChartOpen = !state.chart.isChartOpen;
    },
    saveUserType: (state, action) => {
      state.userType = action.payload;
    },
    saveActiveChartType: (state, action) => {
      state.chart.activeChartType = action.payload;
    },
    saveActiveRatingChartType: (state, action) => {
      state.chart.activeRatingChartType = action.payload;
    },
    saveTableView: (state, action) => {
      state.table.view = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        scoreDefinitionApi.endpoints.fetchScoreDefinition.matchFulfilled,
        (state, action) => {
          state.drawer.cisAccordionData = formatCisAccordionData(
            action.payload
          );
          state.drawer.ipsAccordionData = formatIpsAccordionData(
            action.payload
          );
        }
      )
      .addMatcher(
        userTypeApi.endpoints.fetchUserType.matchFulfilled,
        (state, action) => {
          state.userType = action.payload;
        }
      );
  },
});

export const {
  uiError,
  setSidePanel,
  openDrawer,
  closeDrawer,
  toggleChart,
  saveUserType,
  saveActiveChartType,
  saveActiveRatingChartType,
  saveTableView,
} = uiSlice.actions;
export default uiSlice.reducer;
