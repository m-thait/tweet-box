import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { LeftOptions } from "./LeftOptions";

describe("LeftOptions of ToolBar", () => {
  it("should render left options on the top bar", async () => {
    const { render } = mockReduxStore();

    render(<LeftOptions gridApi={{} as GridApi} />);

    const filtersButton = await screen.findByTestId(
      "top-bar-filters-button-container"
    );
    expect(filtersButton).toBeInTheDocument();

    const viewTabs = await screen.findByTestId("view-tabs");
    expect(viewTabs).toBeInTheDocument();
  });
});
