import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { screenerChartviewTabs } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { Tabs } from "./Tabs";

jest.mock("@mui/material/useMediaQuery", () => jest.fn());
const useMediaQuerySpy = useMediaQuery as jest.Mock;

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("Tabs", () => {
  const containerTestId = `app-tabs`;

  beforeAll(() => {
    useMediaQuerySpy.mockReturnValue(true);
  });

  it("should render", () => {
    const { render } = mockReduxStore();

    render(<Tabs />);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
  });

  it("change tab should change selected", () => {
    const { render } = mockReduxStore();

    render(<Tabs />);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    const ratingsTab = screen.getByTestId(`app-tabs-slider-item-0`);
    fireEvent.click(ratingsTab);
    expect(ratingsTab).toHaveClass("Mui-selected");
    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    const scoresTab = screen.getByTestId(`app-tabs-slider-item-1`);
    expect(scoresTab).not.toHaveClass("Mui-selected");
    fireEvent.click(scoresTab);
    expect(scoresTab).toHaveClass("Mui-selected");
  });

  it("fire analytics event on tab switch", () => {
    const { render } = mockReduxStore();

    render(<Tabs />);

    const ratingsTab = screen.getByTestId(`app-tabs-slider-item-0`);
    fireEvent.click(ratingsTab);
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      fn: screenerChartviewTabs,
      eventDetails: {
        ...defaultEventDetails,
        depth: "ESG Charts",
      },
    });
  });
});
