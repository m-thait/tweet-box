import React from "react";
import { screen, fireEvent, act } from "@testing-library/react";
import { GridApi } from "ag-grid-community";
import { Provider } from "react-redux";
import { mockReduxStore } from "@services/redux/mocks";
import * as api from "@services/api";
import { FiltersButton } from "./FiltersButton";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchEsgInfo: jest.fn(),
  };
});

const mockAppliedFilters = {
  "LT Rating": "ltRating",
  Country: "country",
  "Sub-sector": "subSector",
};

describe("FiltersButton", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();
  const init = (appliedFilters = {}) => {
    render(
      <Provider store={store}>
        <FiltersButton
          appliedFilters={appliedFilters}
          gridApi={{} as GridApi}
        />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should render new filter button and the filter count badge should be hidden", () => {
    init();

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-filters-button-container"
    );
    const newBtnElement = screen.queryByTestId("top-bar-filters-button");
    const filterCountBadgeElement = screen.queryByTestId(
      "top-bar-filters-button-count"
    );

    expect(newBtnEleContainer).toBeInTheDocument();
    expect(newBtnElement).toBeInTheDocument();
    expect(filterCountBadgeElement).not.toBeInTheDocument();
  });

  it("should render new filter button and the filter count badge should be shown when filter is applied", () => {
    const appliedFilters = mockAppliedFilters;
    init(appliedFilters);

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-filters-button-container"
    );
    const newBtnElement = screen.queryByTestId("top-bar-filters-button");
    const filterCountBadgeElement = screen.queryByTestId(
      "top-bar-filters-button-count"
    );

    expect(newBtnEleContainer).toBeInTheDocument();
    expect(newBtnElement).toBeInTheDocument();
    expect(filterCountBadgeElement).toBeInTheDocument();
    expect(filterCountBadgeElement?.textContent).toContain(
      Object.keys(appliedFilters).length.toString()
    );
  });

  it("should render new filter button and open the filter dialog when clicked", async () => {
    jest.spyOn(api, "fetchEsgInfo").mockReturnValue(
      Promise.resolve({
        rowCount: 1,
        userType: "ESG_PREMIUM",
        data: [],
        hasUnauthorizedData: false,
      })
    );
    const appliedFilters = mockAppliedFilters;
    init(appliedFilters);
    const newBtnElement = screen.queryByTestId(
      "top-bar-filters-button"
    ) as HTMLElement;
    let filtersDialogElement = screen.queryByTestId(
      "top-bar-filters-modal-content"
    ) as HTMLElement;

    expect(filtersDialogElement).not.toBeInTheDocument();
    expect(newBtnElement).toBeEnabled();

    fireEvent.click(newBtnElement);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    filtersDialogElement = screen.queryByTestId(
      "top-bar-filters-modal-content"
    ) as HTMLElement;

    expect(filtersDialogElement).toBeInTheDocument();
  });
});
