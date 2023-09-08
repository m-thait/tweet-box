import { taxonomyApi, userTypeApi, aemDrawerInfoApi } from "@services/api";
import { RootState } from "./store";

// Ui States
export const selectUiState = (state: RootState) => state.ui;
export const getDrawerType = (state: RootState) =>
  getDrawerState(state).drawerType;
export const getDrawerState = (state: RootState) => selectUiState(state).drawer;
export const getDrawerNodeData = (state: RootState) =>
  getDrawerState(state).nodeData;
export const getCisAccordionData = (state: RootState) =>
  getDrawerState(state).cisAccordionData;
export const getIpsAccordionData = (state: RootState) =>
  getDrawerState(state).ipsAccordionData;
export const getUiTableState = (state: RootState) => selectUiState(state).table;
export const getUserType = (state: RootState) => selectUiState(state).userType;
export const getActiveChartType = (state: RootState) =>
  selectUiState(state).chart.activeChartType;
export const getActiveRatingChartType = (state: RootState) =>
  selectUiState(state).chart.activeRatingChartType;
export const getTableView = (state: RootState) =>
  selectUiState(state).table.view;

// Table States
export const selectTableState = (state: RootState) => state.table;
export const getEntityCount = (state: RootState) => state.table.entityCount;
export const getHasOOSValues = (state: RootState) => state.table.hasOOSValues;
export const getSidePanelState = (state: RootState) =>
  getUiTableState(state).sidePanel;
export const getSidePanelSource = (state: RootState) =>
  getSidePanelState(state).source;
export const getChartState = (state: RootState) => selectUiState(state).chart;
export const getColumnState = (state: RootState) => state.table.columnState;
export const getColumnGroupState = (state: RootState) =>
  state.table.columnGroupState;
export const getIsChartOpenState = (state: RootState) =>
  getChartState(state).isChartOpen;
export const getPagination = (state: RootState) => state.table.pagination;
export const getColumnMapping = (state: RootState) => state.table.columnMapping;
export const getCurrentFilterModel = (state: RootState) =>
  state.table.filterModel.current;
export const getFilterModel = (state: RootState) => state.table.filterModel;
export const getSubSectorFilterModel = (state: RootState) =>
  state.table.subSectorFilterModel;
export const getCountryFilterModel = (state: RootState) =>
  state.table.countryFilterModel;
export const getLTRatingFilterModel = (state: RootState) =>
  state.table.ltRatingFilterModel;
export const getSubSectorFacets =
  taxonomyApi.endpoints.fetchSubSectorFacets.select();
export const getCountryFacets =
  taxonomyApi.endpoints.fetchCountryFacets.select();
export const getLTRatingFacets =
  taxonomyApi.endpoints.fetchLTRatingFacets.select();
export const getTaxonomy = taxonomyApi.endpoints.fetchTaxonomyInfo.select();
export const getTaxonomyData = (state: RootState) => {
  const { data: taxonomyInfo } = getTaxonomy(state);
  return taxonomyInfo;
};
export const getSubSectorTaxonomy = (state: RootState) => {
  const { data: taxonomyInfo } = getTaxonomy(state);
  return taxonomyInfo?.marketSegment?.taxonomy;
};
export const getSubSectorTaxonomySeoMap = (state: RootState) => {
  const { data: taxonomyInfo } = getTaxonomy(state);
  return taxonomyInfo?.marketSegment?.seoLabelMap;
};
export const getRegionTaxonomySeoMap = (state: RootState) => {
  const { data: taxonomyInfo } = getTaxonomy(state);
  return taxonomyInfo?.region?.seoLabelMap;
};
export const getUserResponse =
  userTypeApi.endpoints.fetchUserType.select(undefined);
export const getChartData = (state: RootState) => state.table.chartData;
export const getToolTips =
  aemDrawerInfoApi.endpoints.fetchEsgTooltipInfo.select();
