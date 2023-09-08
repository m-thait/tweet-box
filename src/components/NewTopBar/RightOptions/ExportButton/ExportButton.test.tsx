import React from "react";
import { fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockReduxStore } from "@services/redux/mocks";
import { ExportButton } from "./ExportButton";

describe("ExportButton", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();
  const init = (
    totalRows = 5000,
    onClick = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return;
    }
  ) => {
    render(
      <Provider store={store}>
        <ExportButton totalRows={totalRows} onClick={onClick} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should render new button and no popover", () => {
    init();

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-export-xls-button-container"
    );
    const popoverEle = screen.queryByTestId("export-popover");

    expect(newBtnEleContainer).toBeInTheDocument();
    expect(popoverEle).not.toBeInTheDocument();
  });

  it("hovering on button should open popover, message should indicate you can export data and button should be enabled", () => {
    init();

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-export-xls-button-container"
    );
    expect(newBtnEleContainer).toBeInTheDocument();

    const newBtnEle = screen.getByTestId("top-bar-export-xls-button");
    expect(newBtnEle).toBeEnabled();

    fireEvent.mouseOver(newBtnEleContainer);

    const popoverEle = screen.getByTestId("export-popover");
    expect(popoverEle).toBeInTheDocument();
    const text = screen.getByTestId("export-popover-text");
    expect(text).toHaveTextContent("Export all data");
  });

  it("hovering on button should open popover, message should indicate export is to large and button should be disabled.", () => {
    init(5001);

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-export-xls-button-container"
    );

    const newBtnEle = screen.getByTestId("top-bar-export-xls-button");
    expect(newBtnEle).toBeDisabled();

    expect(newBtnEleContainer).toBeInTheDocument();

    fireEvent.mouseOver(newBtnEleContainer);

    const popoverEle = screen.getByTestId("export-popover");
    expect(popoverEle).toBeInTheDocument();
    const text = screen.getByTestId("export-popover-text");
    expect(text).toHaveTextContent("Data exceeds the limit.");
  });

  it("loader should appear while export is in progress and disappear when complete", async () => {
    init();
    const newBtnEle = screen.getByTestId("top-bar-export-xls-button");
    expect(newBtnEle).toBeEnabled();
    fireEvent.click(newBtnEle);
    const loaderEle = screen.getByTestId("top-bar-export-xls-loading-spinner");
    expect(loaderEle).toBeInTheDocument();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3500));
    });
    expect(loaderEle).not.toBeInTheDocument();
  });

  it("snackbar opens when export has an error", async () => {
    init(5000, async () => {
      throw new Error();
    });
    const newBtnEle = screen.getByTestId("top-bar-export-xls-button");
    expect(newBtnEle).toBeEnabled();
    fireEvent.click(newBtnEle);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    const snackbar = screen.getByTestId("top-bar-export-xls-error-snackbar");
    expect(snackbar).toBeInTheDocument();
  });
});
