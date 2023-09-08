import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LastUpdated } from "./LastUpdated";

describe("LastUpdated", () => {
  it("should render LastUpdated", () => {
    render(<LastUpdated />);
    const lastUpdated = screen.getByTestId("last-updated-date-and-time");
    expect(lastUpdated).toBeInTheDocument();
  });

  it("should render LastUpdated time, date, and year", () => {
    render(<LastUpdated />);
    const lastUpdated = screen.getByTestId("last-updated-date-and-time");
    expect(lastUpdated).toHaveTextContent(/(1|2*\d:\d{2}\sA|PM)+/);
    expect(lastUpdated).toHaveTextContent(/\d{1,2}\s\d{4}$/);
  });

  it("should reload on icon click", () => {
    render(<LastUpdated />);
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
    const reloadIconButton = screen.getByTestId("last-updated-refresh-icon");
    fireEvent.click(reloadIconButton);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
