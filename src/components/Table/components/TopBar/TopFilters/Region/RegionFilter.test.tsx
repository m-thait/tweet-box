import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { screen } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { mockTaxonomyStoreState } from "@services/redux/mocks";
import { LeftOptions } from "@components/Table/components/TopBar";

describe("Country Filter", () => {
  it("should render country chip", () => {
    const { render } = mockReduxStore();

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const countryChip = screen.getByTestId(
      `${ColumnFieldNames.ORG_COUNTRY}-tree-select`
    );
    expect(countryChip).toBeInTheDocument();
  });

  it("should not render country chip", () => {
    const { render } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.badCountryFacetsResponse,
      loadSuccessfulTaxonomyCalls: false,
    });

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const countryChip = screen.queryByTestId(
      `${ColumnFieldNames.ORG_COUNTRY}-tree-select`
    );
    expect(countryChip).not.toBeInTheDocument();
  });
});
