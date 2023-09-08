import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { act, fireEvent, screen } from "@testing-library/react";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { AgGridSidePanel } from "@models/index";
import { mockReduxStore } from "@services/redux/mocks";
import { setSidePanel, getIsChartOpenState } from "@services/redux";
import {
  AVO_OPENED,
  defaultEventDetails,
} from "@services/analytics/avoConstants";
import { screenerChartview } from "@services/analytics/Avo";
import { RightOptions } from "./RightOptions";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("RightOptions of ToolBar", () => {
  const openToolPanel = jest.fn();
  const closeToolPanel = jest.fn();
  const { render, store } = mockReduxStore();
  const init = () => {
    render(
      <RightOptions
        gridApi={{ openToolPanel, closeToolPanel } as unknown as GridApi}
        onExportClick={{
          handler: async () => {
            return;
          },
        }}
      />
    );
  };

  it("should render right options on the top bar", () => {
    init();

    const rightOptions = screen.getByTestId("top-bar-right-options");
    expect(rightOptions).toBeInTheDocument();
  });

  it("should trigger open tool panel event of grid api on edit columns clicks", () => {
    init();

    const editButton = screen.getByTestId("top-bar-edit-columns-button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(openToolPanel).toHaveBeenCalledWith(AgGridSidePanel.COLUMNS);
  });

  it("should trigger close tool panel event of grid api on edit columns clicks", () => {
    init();

    act(() => {
      store.dispatch(
        setSidePanel({
          source: AgGridSidePanel.COLUMNS,
          isToolPanelShowing: true,
        })
      );
    });

    const editButton = screen.getByTestId("top-bar-edit-columns-button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(closeToolPanel).toHaveBeenCalledTimes(1);
  });
});

describe("Toggle Switch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const openToolPanel = jest.fn();
  const closeToolPanel = jest.fn();
  const { render, store } = mockReduxStore();

  const init = () =>
    render(
      <RightOptions
        gridApi={{ openToolPanel, closeToolPanel } as unknown as GridApi}
        onExportClick={{
          handler: async () => {
            return;
          },
        }}
      />
    );

  it("should show toggle switch", async () => {
    init();
    const toggleSwitch = await screen.findByTestId("top-bar-chart-label");
    expect(toggleSwitch).toBeInTheDocument();
  });

  it("should toggle chart switch on and off", async () => {
    init();

    await screen.findByTestId("top-bar-chart-label");

    const chartToggle = screen.getByTestId("top-bar-chart-label");
    fireEvent.click(chartToggle);

    expect(getIsChartOpenState(store.getState())).toBeTruthy();
    fireEvent.click(chartToggle);
    expect(getIsChartOpenState(store.getState())).toBeFalsy();
  });

  it("should fire analytics event on click", async () => {
    init();

    await screen.findByTestId("top-bar-chart-label");

    const chartToggle = screen.getByTestId("top-bar-chart-label");
    fireEvent.click(chartToggle);
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: {
        ...defaultEventDetails,
        depth: AVO_OPENED,
      },
      fn: screenerChartview,
    });
  });
});
