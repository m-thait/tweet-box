import React from "react";
import { screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { ScoresCharts } from "./ScoresCharts";

describe("ScoresCharts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render ScoresCharts with data", () => {
    const { render } = mockReduxStore();

    render(
      <ScoresCharts
        data={{
          "CIS-1": "18",
          "CIS-2": "55",
          "CIS-3": "20",
          "CIS-4": "5",
          "CIS-5": "1",
        }}
      />
    );

    const scoresChartsContainer = screen.getByTestId(`scores-charts`);
    const title = screen.getByText("CIS and IPS Distribution");
    const images = screen.queryAllByRole("img");
    expect(scoresChartsContainer).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(images.length).toStrictEqual(4);
  });

  it("should render ScoresCharts with empty data", () => {
    const { render } = mockReduxStore();

    render(<ScoresCharts data={{}} />);

    const scoresChartsContainer = screen.getByTestId(`scores-charts`);
    const title = screen.getByText("CIS and IPS Distribution");
    const images = screen.queryAllByRole("img");
    expect(scoresChartsContainer).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(images.length).toStrictEqual(4);
  });
});
