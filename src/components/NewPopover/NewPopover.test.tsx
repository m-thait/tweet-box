import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockReduxStore } from "@services/redux/mocks";
import { saveUserType } from "@services/redux";
import * as popoverConst from "@constants/popover";
import { EsgUserType } from "@models/api.types";
import { NewPopover } from "./NewPopover";

describe("NewPopover", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();

  const init = () => {
    render(
      <Provider store={store}>
        <NewPopover />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should render new button and no popover", () => {
    init();

    const newBtnEle = screen.getByTestId("new-btn");
    const popoverEle = screen.queryByTestId("new-popover");

    expect(newBtnEle).toBeInTheDocument();
    expect(popoverEle).not.toBeInTheDocument();
  });

  it("clicking on button should open popover with ESG Premium content", () => {
    store.dispatch(saveUserType(EsgUserType.ESG_PREMIUM));
    init();

    const newBtnEle = screen.getByTestId("new-btn");

    expect(newBtnEle).toBeInTheDocument();

    fireEvent.click(newBtnEle);

    const popoverEle = screen.getByTestId("new-popover");
    const popoverLinkEle = screen.getByTestId("new-popover-link");

    expect(popoverEle).toBeInTheDocument();
    expect(popoverLinkEle).toBeInTheDocument();
    expect(popoverLinkEle).toHaveTextContent(
      popoverConst.NEW_POPOVER_PREMIUM_LINK
    );
  });

  it("clicking on button should open popover with ESG Core content", () => {
    store.dispatch(saveUserType(EsgUserType.ESG_CORE));
    init();

    const newBtnEle = screen.getByTestId("new-btn");
    expect(newBtnEle).toBeInTheDocument();

    fireEvent.click(newBtnEle);

    const popoverEle = screen.getByTestId("new-popover");
    const popoverLinkEle = screen.getByTestId("new-popover-link");

    expect(popoverEle).toBeInTheDocument();
    expect(popoverLinkEle).toBeInTheDocument();
    expect(popoverLinkEle).toHaveTextContent(
      popoverConst.NEW_POPOVER_CORE_LINK
    );
  });

  it("clicking on button should not open popover with ESG None content", () => {
    store.dispatch(saveUserType(EsgUserType.ESG_NONE));
    init();

    const popoverEle = screen.queryByTestId("new-popover");

    expect(popoverEle).not.toBeInTheDocument();
  });
});
