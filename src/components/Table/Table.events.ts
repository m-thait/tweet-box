import { useCallback, useState, useEffect } from "react";
import {
  AgGridMenuItem,
  FilterParams,
  ServerRequestPayload,
  ServerResponse,
  getValuesFromFilterModel,
  AxiosError,
  AgGridFilterModel,
} from "@moodys/mdc-table.table";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import {
  EsgListMedian,
  ColumnFieldNames,
} from "@moodys/mdc-table.schemas.screener";
import { getRefreshDateAndTime } from "@moodys/mdc-table.utils.date";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { useTreatments } from "@moodys/mdc-frontend.services.split";
import {
  getColumnState,
  getColumnGroupState,
  getCurrentFilterModel,
  saveEntityCount,
  saveFilterModel,
  savePagination,
  saveHasOOSValues,
  setSidePanel,
  toggleChart,
  getIsChartOpenState,
  useAppDispatch,
  useAppSelector,
  getEntityCount,
  getUserType,
  getSubSectorTaxonomySeoMap,
  saveColumnState,
  saveColumnGroupState,
  getTableView,
  saveColumnSortState,
} from "@services/redux";
import { LIST_MEDIAN_NAME } from "@components/Table/Table.constants";
import {
  AgGridFilterLocation,
  AgGridSidePanel,
  ExportResponse,
  SeoLabelMap,
} from "@root/src/models";
import {
  fetchListMedian,
  fetchExportLink,
  fetchLtRatingSparklines,
  useFetchEsgTooltipInfoQuery,
} from "@services/api";
import { downloadExport } from "@utils/downloadExport";
import {
  screenerFilterSelected,
  screenerRowsPerPage,
  screenerFilterOpened,
  screenerGroupedColumns,
  screenerEditColumns,
  screenerPage,
  screenerSort,
  screenerExport,
} from "@services/analytics/Avo";
import {
  AVO_ADDED,
  AVO_CLOSED,
  AVO_OPENED,
  AVO_REMOVED,
  defaultEventDetails,
} from "@services/analytics/avoConstants";
import { usePresetFilterModel } from "@hooks/presetFilter.hooks";
import {
  buildColumnCompositionMaps,
  generateColumnComposition,
  configureColumnGroupsForComposition,
} from "@utils/column-compositions.utils";
import { EsgInfoOpenApi } from "@models/api.types";
import {
  SparklineType,
  SparklineTypeToColumnFieldMap,
} from "@models/sparkline.types";
import { ESG_VIEWS_TABS_FLAG } from "@services/splitIO/splitIO.flags";
import { TAB_NAMES } from "@constants/table";
import { mapIssuerOutlookValues } from "./utils";
import { filterSparklineDataRanges } from "./utils/sparkline.utils";
import type { GridApi } from "ag-grid-enterprise";
import type {
  FirstDataRenderedEvent,
  FilterChangedEvent,
  ToolPanelVisibleChangedEvent,
  ColGroupDef,
  ColumnGroupOpenedEvent,
  ColumnMovedEvent,
  ColumnVisibleEvent,
  SortChangedEvent,
  PaginationChangedEvent,
  FilterOpenedEvent,
  AgGridEvent,
  ColumnApi,
} from "ag-grid-community";
export const useTableEvents = () => {
  const [gridApi, setGridApi] = useState({} as GridApi);
  const [columnApi, setColumnApi] = useState({} as ColumnApi);
  const [exportClickHandler, setExportClick] = useState<{
    handler: () => Promise<void>;
  }>();
  const [topPinnedRow, setTopPinnedRow] = useState<EsgListMedian[]>([
    LIST_MEDIAN_NAME,
  ]);
  const [fetchError, setFetchError] = useState<AxiosError | undefined>(
    undefined
  );
  const [filterSource, setFilterSource] = useState<string>("");
  const [presetFilterModelHasBeenSet, setPresetFilterModelHasBeenSet] =
    useState(false);
  const currentFilterModel = useAppSelector(getCurrentFilterModel);
  const currentColumnState = useAppSelector(getColumnState);
  const currentColumnGroupState = useAppSelector(getColumnGroupState);
  const currentTableView = useAppSelector(getTableView);
  const { isFetching } = useFetchEsgTooltipInfoQuery();
  const entityCount = useAppSelector(getEntityCount);
  const isChartOpen = useAppSelector(getIsChartOpenState);
  const taxonomyData = useAppSelector(
    getSubSectorTaxonomySeoMap
  ) as SeoLabelMap;
  const userType = useAppSelector(getUserType);
  const dispatch = useAppDispatch();
  const {
    isSuccess: presetFilterModelFetched,
    filterModel: presetFilterModel,
  } = usePresetFilterModel();
  const ColumnCompositions = buildColumnCompositionMaps(taxonomyData);
  const splitTreatment = useTreatments([ESG_VIEWS_TABS_FLAG]);
  const viewTabs = splitTreatment[ESG_VIEWS_TABS_FLAG];
  const viewTabsFeatureEnabled = viewTabs?.treatment === "on";

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (
      !isEmpty(gridApi) &&
      presetFilterModelFetched &&
      !presetFilterModelHasBeenSet
    ) {
      setPresetFilterModelHasBeenSet(true);
      if (!isEmpty(presetFilterModel)) {
        gridApi.setFilterModel(presetFilterModel);
      } else if (!isEmpty(currentFilterModel)) {
        gridApi.setFilterModel(currentFilterModel);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gridApi,
    presetFilterModelFetched,
    presetFilterModel,
    currentFilterModel,
    presetFilterModelHasBeenSet,
  ]);

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (
      !isEmpty(columnApi) &&
      currentColumnGroupState &&
      currentColumnState &&
      !isFetching
    ) {
      columnApi.setColumnGroupState(
        currentColumnGroupState[currentTableView] ?? []
      );
      columnApi.applyColumnState({
        state: currentColumnState[currentTableView] || undefined,
        applyOrder: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnApi, currentTableView, isFetching]);

  const onFirstDataRendered = useCallback(
    async (params: FirstDataRenderedEvent) => {
      setGridApi(params.api);
      setColumnApi(params.columnApi);
      params.api.sizeColumnsToFit();
      params.api.setGroupHeaderHeight(30);
    },
    []
  );

  const setColumnComposition = useCallback(
    (filterModel: AgGridFilterModel, columnApi: ColumnApi, api: GridApi) => {
      const { matchedColumns } = generateColumnComposition({
        columnCompositionMap: ColumnCompositions,
        columnComposition: JSON.parse(
          JSON.stringify(ColumnCompositions.default)
        ), // Required for deep clone so returned object is stored in new memory slot.
        filterModel,
        columnApi,
        userType,
      });

      const colDefs = api.getColumnDefs();
      configureColumnGroupsForComposition(
        colDefs as ColGroupDef[],
        matchedColumns,
        columnApi
      );
    },
    [userType, ColumnCompositions]
  );

  const onFilterChanged = useCallback(
    async ({ api, columnApi, columns }: FilterChangedEvent) => {
      const filterModel = api.getFilterModel();
      if (filterModel[ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK]) {
        const { values } =
          filterModel[ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK];
        const mappedIssuerOutlookValues = mapIssuerOutlookValues(values);
        filterModel[ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK].values =
          mappedIssuerOutlookValues;
      }

      setColumnComposition(filterModel, columnApi, api);

      dispatch(savePagination({ page: 0 }));
      dispatch(saveFilterModel(filterModel));
      const columnId = columns[0].getColId();
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerFilterSelected,
        eventDetails: {
          ...defaultEventDetails,
          name: columnId,
          depth: filterSource,
        },
      });
    },
    [dispatch, filterSource, setColumnComposition]
  );

  const onFetchSuccess = useCallback(
    async <T>(
      response: ServerResponse<T>,
      responsePayload: ServerRequestPayload,
      params: AgGridEvent
    ) => {
      const { data, rowCount, hasUnauthorizedData } =
        response as ServerResponse<EsgInfoOpenApi>;

      if (rowCount || rowCount === 0) {
        dispatch(saveEntityCount(rowCount));
      }

      dispatch(saveHasOOSValues(hasUnauthorizedData));

      const { filters, offset } = <{ filters: FilterParams[]; offset: number }>(
        responsePayload
      );
      if (offset === 0) {
        const { listMedians } = await fetchListMedian(filters);
        if (isEmpty(listMedians)) {
          setTopPinnedRow([LIST_MEDIAN_NAME]);
        }
        setTopPinnedRow(listMedians);
      }
      const orgIds = data.map((row) => row.orgId as string);
      const responseSpark = await fetchLtRatingSparklines(orgIds);

      if (params.api?.forEachNode) {
        params.api.forEachNode((rowNode) => {
          if (rowNode.data && rowNode.data.orgId) {
            const { orgId } = rowNode.data;
            const field =
              SparklineTypeToColumnFieldMap[
                responseSpark[orgId]?.type as SparklineType
              ];
            const data = {
              ...rowNode.data,
              ...(responseSpark[orgId] && {
                [field]: filterSparklineDataRanges(responseSpark[orgId]),
              }),
            };

            rowNode.setData(data);
          }
        });
      }
    },
    [dispatch]
  );

  const onFetchFailure = useCallback((error: unknown) => {
    setFetchError(error as AxiosError);
  }, []);

  const onPaginationPropChange = useCallback(
    (page: number, rowsPerPage: number) => {
      dispatch(savePagination({ page, rowsPerPage }));
      rowsPerPage &&
        emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
          fn: screenerRowsPerPage,
          eventDetails: {
            ...defaultEventDetails,
            name: `${rowsPerPage}`,
          },
        });
    },
    [dispatch]
  );

  const onPaginationChanged = useCallback(
    ({ newPage, api }: PaginationChangedEvent) => {
      if (newPage) {
        const currentPage = `${api.paginationGetCurrentPage()}`;
        emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
          fn: screenerPage,
          eventDetails: {
            ...defaultEventDetails,
            name: currentPage,
          },
        });
      }
    },
    []
  );

  const onToolPanelVisibleChanged = useCallback(
    // eslint-disable-next-line complexity
    (params: ToolPanelVisibleChangedEvent) => {
      switch (params.source) {
        case AgGridSidePanel.FILTERS:
          dispatch(
            setSidePanel({
              source: AgGridSidePanel.FILTERS,
              isToolPanelShowing: params.api.isToolPanelShowing(),
            })
          );
          isChartOpen &&
            params.api.isToolPanelShowing() &&
            dispatch(toggleChart());
          break;
        case AgGridSidePanel.COLUMNS:
          dispatch(
            setSidePanel({
              source: AgGridSidePanel.COLUMNS,
              isToolPanelShowing: params.api.isToolPanelShowing(),
            })
          );
          isChartOpen &&
            params.api.isToolPanelShowing() &&
            dispatch(toggleChart());
          break;
        default:
          dispatch(
            setSidePanel({
              source: AgGridSidePanel.NONE,
              isToolPanelShowing: params.api.isToolPanelShowing(),
            })
          );
      }
    },
    [dispatch, isChartOpen]
  );

  const getContextMenuItems = useCallback(
    () => [
      AgGridMenuItem.COPY,
      AgGridMenuItem.COPY_WITH_HEADERS,
      AgGridMenuItem.COPY_WITH_GROUP_HEADERS,
      AgGridMenuItem.PASTE,
    ],
    []
  );

  const onExportClick = useCallback(() => {
    const exportClickFunction = async () => {
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerExport,
        eventDetails: {
          ...defaultEventDetails,
          id: "started",
          name: entityCount,
        },
      });
      const columns =
        columnApi
          ?.getColumns()
          ?.filter((col) => col.isVisible())
          .map((col) => col.getColId() as ColumnFieldNames) ?? [];

      const filters = getValuesFromFilterModel(currentFilterModel);
      const timeStamp = getRefreshDateAndTime(new Date());
      const startTime = new Date();
      const exportLink = (await fetchExportLink(
        filters,
        columns,
        timeStamp,
        viewTabsFeatureEnabled ? TAB_NAMES[currentTableView] : undefined
      )) as ExportResponse;
      await downloadExport(exportLink.result, startTime, entityCount);
    };
    setExportClick({ handler: exportClickFunction });
  }, [
    columnApi,
    currentFilterModel,
    entityCount,
    currentTableView,
    viewTabsFeatureEnabled,
  ]);

  const onSortChanged = useCallback(
    ({ columnApi }: SortChangedEvent) => {
      dispatch(savePagination({ page: 0 }));
      const columnState = columnApi.getColumnState();
      const sortedColumn = columnState.find(({ sort }) => sort != null);
      dispatch(saveColumnSortState({ sortedColumn }));
      if (sortedColumn) {
        const { colId, sort } = sortedColumn;
        emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
          fn: screenerSort,
          eventDetails: {
            ...defaultEventDetails,
            id: `${sort}`,
            name: colId,
          },
        });
      }
    },
    [dispatch]
  );

  const onColumnMoved = useCallback(
    ({ columnApi }: ColumnMovedEvent) => {
      const columnState = columnApi.getColumnState();
      dispatch(saveColumnState({ [currentTableView]: columnState }));
    },
    [currentTableView, dispatch]
  );

  const onColumnVisible = useCallback(
    ({ columns, source, columnApi }: ColumnVisibleEvent) => {
      const columnState = columnApi.getColumnState();
      dispatch(saveColumnState({ [currentTableView]: columnState }));
      if (columns && columns[0] && source !== "api") {
        const colId = columns[0].getColId();
        const isVisible = columns[0].isVisible();

        emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
          fn: screenerEditColumns,
          eventDetails: {
            ...defaultEventDetails,
            id: isVisible ? AVO_ADDED : AVO_REMOVED,
            name: colId,
          },
        });
      }
    },
    [currentTableView, dispatch]
  );

  const onColumnGroupOpened = useCallback(
    ({ columnGroup }: ColumnGroupOpenedEvent) => {
      if (columnApi?.getColumnGroupState) {
        const groupState = columnApi?.getColumnGroupState();
        dispatch(saveColumnGroupState({ [currentTableView]: groupState }));
      }
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerGroupedColumns,
        eventDetails: {
          ...defaultEventDetails,
          id: columnGroup.isExpanded() ? AVO_OPENED : AVO_CLOSED,
          name: columnGroup.getGroupId(),
        },
      });
    },
    [columnApi, currentTableView, dispatch]
  );

  const onFilterOpened = useCallback(({ source }: FilterOpenedEvent) => {
    const filterSourceLocation = AgGridFilterLocation[source];
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerFilterOpened,
      eventDetails: {
        ...defaultEventDetails,
        depth: filterSourceLocation,
      },
    });
    setFilterSource(filterSourceLocation);
  }, []);

  return {
    exportClickHandler,
    gridApi,
    getContextMenuItems,
    onExportClick,
    onFirstDataRendered,
    onFilterChanged,
    onFetchSuccess,
    onPaginationPropChange,
    onSortChanged,
    onToolPanelVisibleChanged,
    topPinnedRow,
    onFetchFailure,
    fetchError,
    onPaginationChanged,
    onColumnVisible,
    onColumnGroupOpened,
    onFilterOpened,
    onColumnMoved,
  };
};
