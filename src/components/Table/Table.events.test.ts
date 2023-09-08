import { act, waitFor } from "@testing-library/react";
import {
  ColumnApi,
  ColumnGroupOpenedEvent,
  ColumnMovedEvent,
  ColumnVisibleEvent,
  FilterChangedEvent,
  FilterOpenedEvent,
  FirstDataRenderedEvent,
  GridApi,
  PaginationChangedEvent,
  SortChangedEvent,
  AgGridEvent,
  ToolPanelVisibleChangedEvent,
} from "ag-grid-community";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { mockReduxStore } from "@services/redux/mocks";
import * as HttpClient from "@services/http";
import { EsgUserType } from "@models/api.types";
import {
  AVO_ADDED,
  AVO_CLOSED,
  AVO_OPENED,
  AVO_REMOVED,
  defaultEventDetails,
} from "@services/analytics/avoConstants";
import {
  screenerEditColumns,
  screenerFilterOpened,
  screenerFilterSelected,
  screenerGroupedColumns,
  screenerPage,
  screenerRowsPerPage,
  screenerSort,
} from "@services/analytics/Avo";
import {
  AgGridFilterLocation,
  AgGridSidePanel,
  TableViewType,
} from "@models/index";
import {
  getIsChartOpenState,
  getSidePanelState,
  toggleChart,
} from "@services/redux";
import { useTableEvents } from "./Table.events";
import { LIST_MEDIAN_NAME } from "./Table.constants";

const mockSetState = jest.fn();

jest.mock("@services/http");
jest.mock("react", () => {
  const actualReact = jest.requireActual("react");

  return {
    ...actualReact,
    useState: (initial: unknown) => [initial, mockSetState],
  };
});
jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("useTableEvents", () => {
  describe("onFetchSuccess", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function and default pinned row", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onFetchSuccess, topPinnedRow } = result.current;
      expect(typeof onFetchSuccess).toBe("function");
      expect(topPinnedRow).toStrictEqual([LIST_MEDIAN_NAME]);
    });
    it("should dispatch save entity count and set list medians", async () => {
      const mockListMedians = [
        {
          cisScore: 2,
          environmentalExposure: 3,
          columnFieldNam: "List Median",
        },
      ];
      const response = {
        rowCount: "2",
        userType: EsgUserType.ESG_PREMIUM,
        data: [
          {
            orgId: "10400",
            orgName: "Caixa Geral de Depositos, S.A.",
          },
          {
            orgId: "104225",
            orgName: "Best Buy Co., Inc.",
          },
        ],
      };
      const responsePayload = { filters: [], offset: 0 };
      const postMock = (
        HttpClient.axiosClient.post as jest.Mock
      ).mockResolvedValue({
        data: {
          listMedians: mockListMedians,
        },
        status: 200,
      });
      const { renderHook, store } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFetchSuccess } = result.current;

      act(() => {
        onFetchSuccess(response, responsePayload, {} as AgGridEvent);
      });

      expect(store.getState().table.entityCount).toBe("2");
      expect(postMock).toHaveBeenCalledWith("/esg-list-median", {
        filters: [],
      });
      await waitFor(() => {
        expect(mockSetState).toHaveBeenCalledWith(mockListMedians);
      });
    });
    it("should reset list medians if response is empty", async () => {
      const response = {
        rowCount: "0",
        data: [],
      };
      const responsePayload = { filters: [], offset: 0 };
      const postMock = (
        HttpClient.axiosClient.post as jest.Mock
      ).mockResolvedValue({
        data: {
          listMedians: [],
        },
        status: 200,
      });
      const { renderHook, store } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFetchSuccess } = result.current;

      act(() => {
        onFetchSuccess(response, responsePayload, {} as AgGridEvent);
      });

      expect(store.getState().table.entityCount).toBe("0");
      expect(postMock).toHaveBeenCalledWith("/esg-list-median", {
        filters: [],
      });
      await waitFor(() => {
        expect(mockSetState).toHaveBeenCalledWith([LIST_MEDIAN_NAME]);
      });
    });
    it("should fetch sparkline data", async () => {
      const response = {
        rowCount: "0",
        data: [{ orgId: "123" }],
      };
      const responsePayload = { filters: [], offset: 100 };
      const postMockSparklines = (
        HttpClient.axiosClient.post as jest.Mock
      ).mockResolvedValueOnce({
        data: {
          listMedians: [],
        },
        status: 200,
      });
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFetchSuccess } = result.current;

      act(() => {
        onFetchSuccess(response, responsePayload, {} as AgGridEvent);
      });

      expect(postMockSparklines).toHaveBeenCalledWith("/lt-rating-sparklines", {
        orgIds: ["123"],
      });
    });
  });
  describe("onFetchFailure", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onFetchFailure } = result.current;
      expect(typeof onFetchFailure).toBe("function");
    });
    it("should set fetch error", () => {
      const error = new Error("error");
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFetchFailure } = result.current;

      act(() => {
        onFetchFailure(error);
      });

      expect(mockSetState).toHaveBeenCalledWith(error);
    });
  });
  describe("onFirstDataRendered", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onFirstDataRendered } = result.current;
      expect(typeof onFirstDataRendered).toBe("function");
    });
    it("should set grid api", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFirstDataRendered } = result.current;

      const params: FirstDataRenderedEvent = {
        firstRow: 0,
        lastRow: 100,
        context: undefined,
        type: "noType",
        api: {
          sizeColumnsToFit: jest.fn(),
          setGroupHeaderHeight: jest.fn(),
        } as unknown as GridApi,
        columnApi: {} as ColumnApi,
      };

      onFirstDataRendered(params);

      expect(mockSetState).toHaveBeenCalledWith(params.api);
    });
  });

  describe("onPaginationPropChange", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onPaginationPropChange } = result.current;
      expect(typeof onPaginationPropChange).toBe("function");
    });
    it("should emit analytics screenerRowsPerPage", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onPaginationPropChange } = result.current;
      const page = 0;
      const rowsPerPage = 100;

      onPaginationPropChange(page, rowsPerPage);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        eventDetails: {
          ...defaultEventDetails,
          name: `${rowsPerPage}`,
        },
        fn: screenerRowsPerPage,
      });
    });
  });

  describe("onSortChanged", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onSortChanged } = result.current;
      expect(typeof onSortChanged).toBe("function");
    });
    it("should emit analytics screenerRowsPerPage", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onSortChanged } = result.current;
      const colId = "marketSegment";
      const sort = "asc";
      const columnState = [
        {
          colId,
          sort,
          width: 112,
        },
      ];

      const params = {
        columnApi: {
          getColumnState: jest.fn().mockReturnValue(columnState),
        } as unknown as ColumnApi,
      } as SortChangedEvent;

      onSortChanged(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerSort,
        eventDetails: {
          ...defaultEventDetails,
          id: `${sort}`,
          name: colId,
        },
      });
    });
  });
  describe("onPaginationChanged", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onPaginationChanged } = result.current;
      expect(typeof onPaginationChanged).toBe("function");
    });
    it("should emit analytics screenerPage", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onPaginationChanged } = result.current;

      const currentPage = 2;

      const params = {
        api: {
          paginationGetCurrentPage: jest.fn().mockReturnValue(2),
        } as unknown as GridApi,
        newPage: true,
      } as PaginationChangedEvent;

      onPaginationChanged(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerPage,
        eventDetails: {
          ...defaultEventDetails,
          name: `${currentPage}`,
        },
      });
    });
  });
  describe("onColumnVisible", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onColumnVisible } = result.current;
      expect(typeof onColumnVisible).toBe("function");
    });
    it("should emit analytics screenerEditColumns with added", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnVisible } = result.current;

      const colId = "testId";
      const source = "toolPanelUi";
      const params = {
        columns: [
          {
            getColId: jest.fn().mockReturnValue(colId),
            isVisible: jest.fn().mockReturnValue(true),
          },
        ],
        source,
        columnApi: {
          getColumnState: jest.fn().mockReturnValue({}),
        },
      } as unknown as ColumnVisibleEvent;

      onColumnVisible(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerEditColumns,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_ADDED,
          name: colId,
        },
      });
    });

    it("should emit analytics screenerEditColumns with removed", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnVisible } = result.current;

      const colId = "testId2";
      const source = "toolPanelUi";
      const params = {
        columns: [
          {
            getColId: jest.fn().mockReturnValue(colId),
            isVisible: jest.fn().mockReturnValue(false),
          },
        ],
        source,
        columnApi: {
          getColumnState: jest.fn().mockReturnValue({}),
        },
      } as unknown as ColumnVisibleEvent;

      onColumnVisible(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerEditColumns,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_REMOVED,
          name: colId,
        },
      });
    });

    it("should not emit analytics screenerEditColumns when triggered by api", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnVisible } = result.current;

      const colId = "testId";
      const source = "api";
      const params = {
        columns: [
          {
            getColId: jest.fn().mockReturnValue(colId),
            isVisible: jest.fn().mockReturnValue(true),
          },
        ],
        source,
        columnApi: {
          getColumnState: jest.fn().mockReturnValue({}),
        },
      } as unknown as ColumnVisibleEvent;

      onColumnVisible(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledTimes(0);
    });
  });
  describe("onColumnGroupOpened", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onColumnGroupOpened } = result.current;
      expect(typeof onColumnGroupOpened).toBe("function");
    });
    it("should emit analytics screenerGroupedColumns with opened", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnGroupOpened } = result.current;

      const groupId = "groupTestId";
      const params = {
        columnGroup: {
          isExpanded: jest.fn().mockReturnValue(true),
          getGroupId: jest.fn().mockReturnValue(groupId),
        },
        columnApi: {
          getColumnState: jest.fn().mockReturnValue({}),
        },
      } as unknown as ColumnGroupOpenedEvent;

      onColumnGroupOpened(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerGroupedColumns,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_OPENED,
          name: groupId,
        },
      });
    });

    it("should emit analytics screenerGroupedColumns with close", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnGroupOpened } = result.current;
      const groupId = "groupTestId";
      const params = {
        columnGroup: {
          isExpanded: jest.fn().mockReturnValue(false),
          getGroupId: jest.fn().mockReturnValue(groupId),
        },
      } as unknown as ColumnGroupOpenedEvent;

      onColumnGroupOpened(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerGroupedColumns,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_CLOSED,
          name: groupId,
        },
      });
    });
  });
  describe("onFilterOpened", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onFilterOpened } = result.current;
      expect(typeof onFilterOpened).toBe("function");
    });
    it("should emit analytics screenerFilterOpened", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFilterOpened } = result.current;

      const sourceId = "COLUMN_MENU";
      const params = {
        source: sourceId,
      } as FilterOpenedEvent;

      onFilterOpened(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerFilterOpened,
        eventDetails: {
          ...defaultEventDetails,
          depth: AgGridFilterLocation[sourceId],
        },
      });
    });
  });

  describe("onFilterChanged", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onFilterChanged } = result.current;
      expect(typeof onFilterChanged).toBe("function");
    });
    it("should emit analytics screenerFilterSelected", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onFilterChanged } = result.current;

      const colId = "filterTestId";
      const params = {
        api: {
          getFilterModel: jest.fn().mockReturnValue([]),
          getColumnDefs: jest.fn().mockReturnValue([]),
        },
        columnApi: {
          setColumnGroupState: jest.fn(),
          setColumnsVisible: jest.fn(),
          applyColumnState: jest.fn(),
        } as unknown as ColumnApi,
        columns: [
          {
            getColId: jest.fn().mockReturnValue(colId),
          },
        ],
      } as unknown as FilterChangedEvent;

      onFilterChanged(params);

      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        fn: screenerFilterSelected,
        eventDetails: {
          ...defaultEventDetails,
          name: colId,
          depth: "",
        },
      });
    });
  });
  describe("onExportClick", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onExportClick } = result.current;
      expect(typeof onExportClick).toBe("function");
    });
    it("should set handler function", () => {
      const { renderHook } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onExportClick } = result.current;

      act(() => {
        onExportClick();
      });

      expect(mockSetState).toHaveBeenCalledWith({
        handler: expect.any(Function),
      });
    });
  });
  describe("onToolPanelVisibleChanged", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onToolPanelVisibleChanged } = result.current;
      expect(typeof onToolPanelVisibleChanged).toBe("function");
    });

    it("should close chart container when filter panel is opened", () => {
      const { renderHook, store } = mockReduxStore();
      const { result } = renderHook(() => {
        const { onToolPanelVisibleChanged } = useTableEvents();
        return { onToolPanelVisibleChanged };
      });
      act(() => {
        store.dispatch(toggleChart());
      });
      const params = {
        source: AgGridSidePanel.FILTERS,
        api: {
          isToolPanelShowing: () => true,
        },
      } as unknown as ToolPanelVisibleChangedEvent;

      act(() => {
        result.current.onToolPanelVisibleChanged(params);
      });

      const sidePanel = getSidePanelState(store.getState());
      const isChartOpen = getIsChartOpenState(store.getState());
      expect(sidePanel).toStrictEqual({
        source: AgGridSidePanel.FILTERS,
        isToolPanelShowing: true,
      });
      expect(isChartOpen).toBeFalsy();
    });

    it("should close chart container when edit columns panel is opened", () => {
      const { renderHook, store } = mockReduxStore();
      const { result } = renderHook(() => {
        const { onToolPanelVisibleChanged } = useTableEvents();
        return { onToolPanelVisibleChanged };
      });
      act(() => {
        store.dispatch(toggleChart());
      });
      const params = {
        source: AgGridSidePanel.COLUMNS,
        api: {
          isToolPanelShowing: () => true,
        },
      } as unknown as ToolPanelVisibleChangedEvent;

      act(() => {
        result.current.onToolPanelVisibleChanged(params);
      });

      const sidePanel = getSidePanelState(store.getState());
      const isChartOpen = getIsChartOpenState(store.getState());
      expect(sidePanel).toStrictEqual({
        source: AgGridSidePanel.COLUMNS,
        isToolPanelShowing: true,
      });
      expect(isChartOpen).toBeFalsy();
    });
  });

  describe("onColumnMoved", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a function", () => {
      const { renderHook } = mockReduxStore();

      const { result } = renderHook(() => useTableEvents());

      const { onColumnMoved } = result.current;
      expect(typeof onColumnMoved).toBe("function");
    });

    it("should use getColumnState and dispatch value to store", () => {
      const { renderHook, store } = mockReduxStore();
      const { result } = renderHook(() => useTableEvents());
      const { onColumnMoved } = result.current;
      const mockColumn = {
        colId: "mock",
        width: 112,
        hide: false,
        pinned: null,
        sort: null,
        sortIndex: null,
        aggFunc: null,
        rowGroup: false,
        rowGroupIndex: null,
        pivot: false,
        pivotIndex: null,
        flex: null,
      };
      const mockGetColumnState = jest.fn().mockReturnValue([mockColumn]);
      const columnApi = {
        getColumnState: mockGetColumnState,
      };
      act(() => {
        onColumnMoved({ columnApi } as unknown as ColumnMovedEvent);
      });
      const { table } = store.getState();
      expect(mockGetColumnState).toHaveBeenCalled();
      expect(table.columnState[TableViewType.OVERVIEW].length).toStrictEqual(1);
      expect(table.columnState[TableViewType.OVERVIEW][0]).toStrictEqual(
        mockColumn
      );
    });
  });
});
