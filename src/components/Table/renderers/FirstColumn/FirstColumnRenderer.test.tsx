import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { FirstColumnRenderer } from "./FirstColumnRenderer";

describe("FirstColumnRenderer", () => {
  afterEach(cleanup);
  const mockElement = document.createElement("div");
  const props = {
    value: "List Median",
    rowIndex: 1,
    eGridCell: mockElement as HTMLElement,
    data: { orgId: "org", orgName: "orgName" },
  } as ICellRendererParams;
  it("renders the FirstColumnRenderer", () => {
    render(<FirstColumnRenderer {...props} />);
    const renderer = screen.queryByTestId("first-column-renderer-1");

    expect(renderer).toBeInTheDocument();
  });
});
