import React from "react";
import { screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { GridApi } from "ag-grid-community";
import { mockReduxStore } from "@services/redux/mocks";
import { FiltersDialog } from "./FiltersDialog";

describe("FilterDialog", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();
  const onClose = jest.fn();

  const init = (open = false, onClose: () => void) => {
    render(
      <Provider store={store}>
        <FiltersDialog open={open} onClose={onClose} gridApi={{} as GridApi} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("dialog should be closed if open is set to false", () => {
    init(false, onClose);

    const filterDialogElement = screen.queryByTestId(
      "top-bar-filters-modal-content"
    );

    expect(filterDialogElement).not.toBeInTheDocument();
  });

  it("dialog should be opened if open is set to true", () => {
    init(true, onClose);

    const filterDialogElement = screen.getByTestId(
      "top-bar-filters-modal-content"
    );

    expect(filterDialogElement).toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
