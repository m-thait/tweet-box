import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { act, screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks";
import { getIsChartOpenState, toggleChart } from "@services/redux";
import { TopBar } from "./TopBar";

describe("Top Bar", () => {
  const openToolPanel = jest.fn();
  const closeToolPanel = jest.fn();
  const { render, store, RESET_ACTION } = mockReduxStore();

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  const init = () => {
    render(
      <TopBar
        gridApi={{ openToolPanel, closeToolPanel } as unknown as GridApi}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onExportClick={{ handler: async () => {} }}
      />
    );
  };

  it("should render the filter bar and chart even when closed", () => {
    init();

    const filterBar = screen.getByTestId("app-top-filter-bar");
    expect(filterBar).toBeInTheDocument();
    const isChartOpen = getIsChartOpenState(store.getState());

    expect(isChartOpen).toBeFalsy();
    const chartContainer = screen.queryByTestId("app-top-chart-view");
    expect(chartContainer).toBeInTheDocument();
  });

  it("should render chart header when chart view is opened", () => {
    init();

    act(() => {
      store.dispatch(toggleChart());
    });

    const isChartOpen = getIsChartOpenState(store.getState());

    expect(isChartOpen).toBeTruthy();
    const chartContainer = screen.queryByTestId("app-top-chart-view");
    expect(chartContainer).toBeInTheDocument();
  });
});
