import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { LIST_MEDIAN_POPOVER_TEXT } from "@constants/index";
import { MedianCellRenderer } from "./MedianCellRenderer";

describe("MedianCellRenderer", () => {
  afterEach(cleanup);

  const props = {
    value: "List Median",
  } as ICellRendererParams;
  it("renders the value passed in props", () => {
    render(<MedianCellRenderer {...props} />);
    const median = screen.getByTestId("list-median-cell");
    expect(median).toHaveTextContent("List Median");
  });

  it("renders a link to open the popover", () => {
    render(<MedianCellRenderer {...props} />);
    const link = screen.getByTestId("list-median-popover-link");
    expect(link).toBeInTheDocument();
  });

  it("renders the popover when the link is clicked", () => {
    render(<MedianCellRenderer {...props} />);
    const link = screen.getByTestId("list-median-popover-link");
    fireEvent.click(link);
    const popover = screen.getByTestId("list-median-popover");
    expect(popover).toBeInTheDocument();
  });

  it("renders the text in the popover", () => {
    render(<MedianCellRenderer {...props} />);
    const link = screen.getByTestId("list-median-popover-link");
    fireEvent.click(link);
    const popoverText = screen.getByTestId("list-median-text");
    expect(popoverText).toHaveTextContent(LIST_MEDIAN_POPOVER_TEXT);
  });

  it("closes the popover when the close button is clicked", async () => {
    render(<MedianCellRenderer {...props} />);
    const link = screen.getByTestId("list-median-popover-link");
    fireEvent.click(link);
    const closeButton = screen.getByTestId("list-median-popover-close");
    fireEvent.click(closeButton);
    const popoverText = screen.queryByTestId("list-median-text");
    await waitFor(() => expect(popoverText).not.toBeInTheDocument());
  });
});
