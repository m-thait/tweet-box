import React from "react";
import { render, screen, within } from "@testing-library/react";

import { Provider } from "react-redux";
import { screenerTitle } from "@constants/header";
import { mockReduxStore } from "@services/redux/mocks";
import { AppSubHeader } from "./Header";

describe("App Sub Header", () => {
  const init = () => {
    const { store } = mockReduxStore();
    render(
      <Provider store={store}>
        <AppSubHeader />
      </Provider>
    );
  };
  it("should render app header", () => {
    init();
    const appSubHeader = screen.getByTestId("app-sub-header");
    const { getByText } = within(screen.getByTestId("app-header-title"));

    expect(appSubHeader).toBeInTheDocument();
    expect(getByText(screenerTitle)).toBeInTheDocument();
  });

  it("should render new button", () => {
    init();
    const newBtnEle = screen.getByTestId("new-btn");

    expect(newBtnEle).toBeInTheDocument();
  });
});
