import React from "react";
import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { GridApi } from "ag-grid-community";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks";
import {
  saveFilterModel,
  getFilterModel,
  saveColumnMapping,
} from "@services/redux";
import * as api from "@services/api";
import { FiltersDialog } from "@components/NewTopBar/LeftOptions/FiltersDialog/FiltersDialog";
import { Footer } from "./Footer";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchEsgInfo: jest.fn(),
  };
});

const mockColumnMapping = {
  ltRating: "LT Rating",
  country: "Country",
  subSector: "Sub-sector",
};

const mockAppliedFilters = {
  "LT Rating": "ltRating",
  Country: "country",
  "Sub-sector": "subSector",
};

const mockFilterModelInStore = {
  ltRating: {
    filterType: "set",
    values: ["1111", "2222"],
  },
  country: {
    filterType: "set",
    values: ["United_states"],
  },
  subSector: {
    filterType: "set",
    values: ["Banking"],
  },
};

describe("FilterDialog Footer", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();
  const onClose = jest.fn();
  const gridApi = {
    setFilterModel: jest.fn(),
  } as unknown as GridApi;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const setDialogFilterModel = (filterModel: AgGridFilterModel) => {
    return;
  };

  const init = (
    appliedFilters: Record<string, string>,
    dialogFilterModel: AgGridFilterModel
  ) => {
    jest.spyOn(api, "fetchEsgInfo").mockReturnValue(
      Promise.resolve({
        rowCount: Object.keys(appliedFilters).length,
        userType: "ESG_PREMIUM",
        data: [],
        hasUnauthorizedData: false,
      })
    );
    render(
      <Provider store={store}>
        <Footer
          appliedFilters={appliedFilters}
          onClose={onClose}
          gridApi={gridApi}
          dialogFilterModel={dialogFilterModel}
          setDialogFilterModel={setDialogFilterModel}
        />
      </Provider>
    );
  };

  // State modified in footer is housed in dialog
  // so dialog is needed for some unit tests
  const initWithDialog = (appliedFilters: Record<string, string>) => {
    jest.spyOn(api, "fetchEsgInfo").mockReturnValue(
      Promise.resolve({
        rowCount: Object.keys(appliedFilters).length,
        userType: "ESG_PREMIUM",
        data: [],
        hasUnauthorizedData: false,
      })
    );
    render(
      <Provider store={store}>
        <FiltersDialog open={true} onClose={onClose} gridApi={gridApi} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("footer should render with no applied filter section if no filters are applied", () => {
    init({}, {});

    const footerElement = screen.queryByTestId("filter-dialog-footer");
    const appliedFiltersSection = screen.queryByTestId(
      "footer-applied-filters-section"
    );
    const resetAllBtn = screen.queryByTestId("footer-reset-filters-button");
    const cancelBtn = screen.queryByTestId("footer-cancel-filters-button");
    const submitFilterDialogBtn = screen.queryByTestId(
      "footer-apply-filters-button"
    );

    expect(footerElement).toBeInTheDocument();
    expect(appliedFiltersSection).not.toBeInTheDocument();
    expect(resetAllBtn).toBeInTheDocument();
    expect(resetAllBtn).toBeDisabled();
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toBeEnabled();
    expect(submitFilterDialogBtn).toBeInTheDocument();
    expect(cancelBtn).toBeEnabled();
  });

  it("footer should render applied filter section if filters are applied", () => {
    init(mockAppliedFilters, {});

    const footerElement = screen.queryByTestId("filter-dialog-footer");
    const appliedFiltersSection = screen.queryByTestId(
      "footer-applied-filters-section"
    );
    const resetAllBtn = screen.queryByTestId("footer-reset-filters-button");
    const cancelBtn = screen.queryByTestId("footer-cancel-filters-button");
    const submitFilterDialogBtn = screen.queryByTestId(
      "footer-apply-filters-button"
    );

    expect(footerElement).toBeInTheDocument();
    expect(appliedFiltersSection).toBeInTheDocument();
    expect(resetAllBtn).toBeInTheDocument();
    expect(resetAllBtn).toBeEnabled();
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toBeEnabled();
    expect(submitFilterDialogBtn).toBeInTheDocument();
    expect(cancelBtn).toBeEnabled();
  });

  it("footer should remove filter when a chip is clicked and persist changes to redux when primary button is clicked.", async () => {
    await act(async () => {
      store.dispatch(saveFilterModel(mockFilterModelInStore));
      store.dispatch(saveColumnMapping(mockColumnMapping));
    });
    initWithDialog(mockAppliedFilters);

    const filterDialogElement = screen.getByTestId(
      "top-bar-filters-modal-content"
    );
    expect(filterDialogElement).toBeInTheDocument();

    const footerElement = screen.queryByTestId("filter-dialog-footer");
    const appliedFiltersSection = screen.queryByTestId(
      "footer-applied-filters-section"
    );
    let ltRatingFilterChipBtn = screen.queryByTestId(
      `filter-dialog-footer-chip-${ColumnFieldNames.LT_RATING}-btn`
    );
    const submitFilterDialogBtn = screen.queryByTestId(
      "footer-apply-filters-button"
    );

    expect(footerElement).toBeInTheDocument();
    expect(appliedFiltersSection).toBeInTheDocument();
    expect(ltRatingFilterChipBtn).toBeInTheDocument();
    expect(submitFilterDialogBtn).toBeInTheDocument();

    const currentFilterModel = getFilterModel(store.getState());
    expect(Object.keys(currentFilterModel.current).length).toBe(3);

    fireEvent.click(ltRatingFilterChipBtn as HTMLElement);
    await waitFor(() => {
      ltRatingFilterChipBtn = screen.queryByTestId(
        `filter-dialog-footer-chip-${ColumnFieldNames.LT_RATING}-btn`
      );
      expect(ltRatingFilterChipBtn).not.toBeInTheDocument();
    });

    fireEvent.click(submitFilterDialogBtn as HTMLElement);
    await waitFor(() => {
      const updatedFilterModel = getFilterModel(store.getState());
      expect(Object.keys(updatedFilterModel.current).length).toBe(2);
    });
  });

  it("footer should clear all filters when reset button is clicked and changes should persis to redux when primary btn is clicked.", async () => {
    await act(async () => {
      store.dispatch(saveFilterModel(mockFilterModelInStore));
    });
    initWithDialog(mockAppliedFilters);

    const filterDialogElement = screen.getByTestId(
      "top-bar-filters-modal-content"
    );
    expect(filterDialogElement).toBeInTheDocument();

    const footerElement = screen.queryByTestId("filter-dialog-footer");
    let appliedFiltersSection = screen.queryByTestId(
      "footer-applied-filters-section"
    );
    const resetAllBtn = screen.queryByTestId("footer-reset-filters-button");
    const submitFilterDialogBtn = screen.queryByTestId(
      "footer-apply-filters-button"
    );

    expect(footerElement).toBeInTheDocument();
    expect(appliedFiltersSection).toBeInTheDocument();
    expect(resetAllBtn).toBeInTheDocument();
    expect(resetAllBtn).toBeEnabled();
    expect(submitFilterDialogBtn).toBeInTheDocument();

    fireEvent.click(resetAllBtn as HTMLElement);
    await waitFor(() => {
      appliedFiltersSection = screen.queryByTestId(
        "footer-applied-filters-section"
      );
      expect(appliedFiltersSection).not.toBeInTheDocument();
    });

    fireEvent.click(submitFilterDialogBtn as HTMLElement);
    await waitFor(() => {
      const updatedFilterModel = getFilterModel(store.getState());
      expect(Object.keys(updatedFilterModel.current).length).toBe(0);
    });
  });
});
