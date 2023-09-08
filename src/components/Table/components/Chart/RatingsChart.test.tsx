import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { RatingChartType } from "@models/chart.types";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { screenerChartviewDropdown } from "@services/analytics/Avo";
import { RatingsChart, ratingChartNames } from "./RatingsChart";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("RatingsChart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render RatingsChart with data", () => {
    const { render } = mockReduxStore();

    render(
      <RatingsChart
        data={{
          ratings: {
            A1: {
              DEV: "1",
              NEG: "68",
              NOO: "8",
            },
          },
          bankRatings: {
            A1: {
              DEV: "1",
              NEG: "68",
              NOO: "8",
            },
          },
        }}
        type={RatingChartType.BANK_LT_RATINGS}
      />
    );

    const ratingChart = screen.getByTestId(`ratings-chart`);
    expect(ratingChart).toBeInTheDocument();
  });

  it("should render RatingsChart with empty data", () => {
    const { render } = mockReduxStore();

    render(<RatingsChart data={{}} type={RatingChartType.BANK_LT_RATINGS} />);

    const ratingChart = screen.getByTestId(`ratings-chart`);
    expect(ratingChart).toBeInTheDocument();
  });

  it("should fire avo events when drop down changes", async () => {
    const { render } = mockReduxStore();

    render(<RatingsChart data={{}} type={RatingChartType.LT_RATINGS} />);

    const select = screen.getByTestId(`ratings-chart-select`);
    await waitFor(() => expect(select).toBeInTheDocument());
    fireEvent.change(select.childNodes[1], {
      target: { value: RatingChartType.BANK_LT_RATINGS },
    });
    await waitFor(() => {
      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        eventDetails: {
          ...defaultEventDetails,
          depth: ratingChartNames[RatingChartType.BANK_LT_RATINGS],
        },
        fn: screenerChartviewDropdown,
      });
    });
  });
});
