import React from "react";
import { screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { ChartType } from "@models/chart.types";
import { ChartSkeleton } from "./ChartSkeleton";

describe("ChartSkeleton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Ratings ChartSkeleton", () => {
    const { render } = mockReduxStore();

    render(<ChartSkeleton chartType={ChartType.LT_RATINGS} />);

    const ratingChartSkeleton = screen.getByTestId(`ratings-chart-skeleton`);
    expect(ratingChartSkeleton).toBeInTheDocument();
  });

  it("should render Scores ChartSkeleton", () => {
    const { render } = mockReduxStore();

    render(<ChartSkeleton chartType={ChartType.SCORES} />);

    const scoresChartSkeleton = screen.getByTestId(`scores-chart-skeleton`);
    expect(scoresChartSkeleton).toBeInTheDocument();
  });
});
