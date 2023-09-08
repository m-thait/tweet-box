import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { screen } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { mockTaxonomyStoreState } from "@services/redux/mocks";
import { LeftOptions } from "@components/Table/components/TopBar";

describe("Sector Filter", () => {
  it("should render sector chip", () => {
    const { render } = mockReduxStore();

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const sectorChip = screen.getByTestId(
      `${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select`
    );
    expect(sectorChip).toBeInTheDocument();
  });

  it("should not render sector chip", () => {
    const { render } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.badSubSectorFacetsResponse,
      loadSuccessfulTaxonomyCalls: false,
    });

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const sectorChip = screen.queryByTestId(
      `${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select`
    );
    expect(sectorChip).not.toBeInTheDocument();
  });
});
