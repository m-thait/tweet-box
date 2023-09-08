import React from "react";
import { render, screen } from "@testing-library/react";

import { Loader } from "./Loader";

describe("Loader", () => {
  it("should render app loader", () => {
    render(<Loader />);
    const topBarLoader = screen.getByTestId("top-bar-loader");
    const tableLoader = screen.getByTestId("table-loader");
    const tableFooterLoader = screen.getByTestId("table-footer-loader");
    expect(topBarLoader).toBeInTheDocument();
    expect(tableLoader).toBeInTheDocument();
    expect(tableFooterLoader).toBeInTheDocument();
  });
});
