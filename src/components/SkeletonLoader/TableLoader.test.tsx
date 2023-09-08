import React from "react";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { mockReduxStore } from "@services/redux/mocks";
import { TableRowsLoader } from "./TableLoader";

describe("TableRowsLoader", () => {
  const init = () => {
    const { store } = mockReduxStore();
    render(
      <Provider store={store}>
        <TableRowsLoader />
      </Provider>
    );
  };
  it("should render table rows loader", () => {
    init();
    const tableRowsLoader = screen.getByTestId("table-loader");

    expect(tableRowsLoader).toBeInTheDocument();
  });
});
