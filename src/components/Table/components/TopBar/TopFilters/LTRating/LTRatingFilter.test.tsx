import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { screen } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { LeftOptions } from "@components/Table/components/TopBar";
import { mockTaxonomyStoreState } from "@services/redux/mocks";

describe("LTRating Filter", () => {
  it("should render lt-rating chip", () => {
    const { render } = mockReduxStore();

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const ltRatingChip = screen.getByTestId(
      `${ColumnFieldNames.LT_RATING}-tree-select`
    );
    expect(ltRatingChip).toBeInTheDocument();
  });

  it("should not render lt-rating chip", () => {
    const { render } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.badLTRatingFacetsResponse,
      loadSuccessfulTaxonomyCalls: false,
    });

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const countryChip = screen.queryByTestId(
      `${ColumnFieldNames.LT_RATING}-tree-select`
    );
    expect(countryChip).not.toBeInTheDocument();
  });
});
