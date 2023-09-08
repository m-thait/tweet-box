import React from "react";
import { screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { ChartType } from "@models/chart.types";
import { saveActiveChartType, saveChartData } from "@services/redux";
import { Chart } from "./Chart";

const data = {
  ratings: {
    A1: {
      DEV: "1",
      NEG: "68",
      NOO: "8",
      POS: "33",
      RUR: "1",
      RWR: "2",
      STA: "380",
    },
    A2: {
      NEG: "51",
      NOO: "15",
      POS: "28",
      RUR: "10",
      RWR: "1",
      STA: "482",
    },
  },

  scores: {
    "CIS-1": "18",
    "CIS-2": "55",
    "CIS-3": "20",
    "CIS-4": "5",
    "CIS-5": "1",
  },
};

describe("Chart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Ratings Chart", () => {
    const { render, store } = mockReduxStore();
    store.dispatch(saveActiveChartType(ChartType.LT_RATINGS));
    store.dispatch(saveChartData(data));
    render(<Chart />);
    const RatingsChart = screen.queryByTestId("ratings-chart");
    expect(RatingsChart).toBeInTheDocument();
    const ScoresCharts = screen.queryByTestId("scores-charts");
    expect(ScoresCharts).not.toBeInTheDocument();
  });

  it("should render Scores Charts", () => {
    const { render, store } = mockReduxStore();
    store.dispatch(saveActiveChartType(ChartType.SCORES));
    store.dispatch(saveChartData(data));
    render(<Chart />);
    const RatingsChart = screen.queryByTestId("ratings-chart");
    expect(RatingsChart).not.toBeInTheDocument();
    const ScoresCharts = screen.queryByTestId("scores-charts");
    expect(ScoresCharts).toBeInTheDocument();
  });
});
