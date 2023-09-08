import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { screen, waitFor } from "@testing-library/react";
import {
  ESGColumnFields,
  ColumnFieldNames,
} from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { AgGridFilterType } from "@models/index";
import { mockTaxonomyStoreState } from "@services/redux/mocks";
import { ESG_VIEWS_TABS_FLAG } from "@services/splitIO/splitIO.flags";
import { LeftOptions } from "./LeftOptions";
import * as hooks from "./LeftOptions.hooks";

describe("LeftOptions of ToolBar", () => {
  it("should render left options on the top bar", () => {
    const { render } = mockReduxStore();

    render(<LeftOptions gridApi={{} as GridApi} />);

    const sectorChip = screen.getByTestId(
      `${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select`
    );
    expect(sectorChip).toBeInTheDocument();

    const countryChip = screen.getByTestId(
      `${ColumnFieldNames.ORG_COUNTRY}-tree-select`
    );
    expect(countryChip).toBeInTheDocument();

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const ltRatingChip = screen.getByTestId(
      `${ColumnFieldNames.LT_RATING}-tree-select`
    );
    expect(ltRatingChip).toBeInTheDocument();
  });

  it("should not render sector and country chip", () => {
    const { render } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.badTaxonomyResponse,
      loadSuccessfulTaxonomyCalls: false,
    });

    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftOptions = screen.getByTestId("top-bar-left-options");
    expect(leftOptions).toBeInTheDocument();

    const sectorChip = screen.queryByTestId(
      `${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select`
    );
    expect(sectorChip).not.toBeInTheDocument();

    const countryChip = screen.queryByTestId(
      `${ColumnFieldNames.ORG_COUNTRY}-tree-select`
    );
    expect(countryChip).not.toBeInTheDocument();

    const ltRatingChip = screen.getByTestId(
      `${ColumnFieldNames.LT_RATING}-tree-select`
    );
    expect(ltRatingChip).toBeInTheDocument();
  });

  it("should display applied filter chips", () => {
    const { render } = mockReduxStore({
      updatedInitialState: {
        table: {
          columnMapping: {
            [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]:
              "Credit Impact Score",
          },
          columnState: [],
          filterModel: {
            previous: {},
            current: {
              [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]: {
                values: [null, "1", "2", "3", "4", "5"],
                filterType: AgGridFilterType.SET,
              },
            },
          },
        },
      },
    });
    render(<LeftOptions gridApi={{} as GridApi} />);

    const appliedFilters = screen.getAllByTestId("top-bar-applied-filters");
    expect(appliedFilters.length).toBe(1);
  });

  it("should display right and left scroll icons", async () => {
    jest.spyOn(hooks, "useLeftOptionsEvents").mockReturnValue({
      handleMoreFiltersClick: jest.fn(),
      handleClearAllClick: jest.fn(),
      handleDelete: jest.fn(),
      onLeftClick: jest.fn(),
      onRightClick: jest.fn(),
      appliedFilters: {},
      isOverflowing: true,
      treeFilters: [],
    });

    const { render } = mockReduxStore();
    render(<LeftOptions gridApi={{} as GridApi} />);

    const leftScrollIcon = screen.getByTestId("top-bar-filters-left-scroll");
    expect(leftScrollIcon).toBeInTheDocument();

    const rightScrollIcon = screen.getByTestId("top-bar-filters-right-scroll");
    expect(rightScrollIcon).toBeInTheDocument();
  });
});

describe("Top Bar with flag on", () => {
  const { render, store, RESET_ACTION } = mockReduxStore({
    features: {
      [ESG_VIEWS_TABS_FLAG]: "on",
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should show ViewTabs when feature flag is on", async () => {
    render(<LeftOptions gridApi={{} as GridApi} />);
    const viewTabs = await screen.findByTestId("view-tabs");
    expect(viewTabs).toBeInTheDocument();
  });
});

describe("Top Bar with flag off", () => {
  const { render, store, RESET_ACTION } = mockReduxStore({
    features: {
      [ESG_VIEWS_TABS_FLAG]: "off",
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should not show ViewTabs when feature flag is off", async () => {
    render(<LeftOptions gridApi={{} as GridApi} />);
    await waitFor(() =>
      expect(screen.queryByTestId("view-tabs")).not.toBeInTheDocument()
    );
  });
});
