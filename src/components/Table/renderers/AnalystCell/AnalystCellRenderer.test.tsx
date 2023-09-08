import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { AnalystCellRenderer } from "./AnalystCellRenderer";

describe("AnalystCellRenderer", () => {
  afterEach(cleanup);
  const mockElement = document.createElement("div");
  const props = {
    value: "Some Analyst",
    rowIndex: 1,
    eGridCell: mockElement as HTMLElement,
    data: { orgId: "132", orgName: "orgName" },
  } as ICellRendererParams;
  it("renders the AnalystRenderer", () => {
    render(<AnalystCellRenderer {...props} />);

    const renderer = screen.queryByTestId("analyst-cell-renderer-1");
    expect(renderer).toBeInTheDocument();
    const link = screen.queryByTestId("analyst-link-1");
    expect(link).toBeInTheDocument();
  });

  it("if sector US Public Finance, does not render the analyst name as a link", () => {
    const props2 = {
      value: "Some Analyst",
      rowIndex: 1,
      eGridCell: mockElement as HTMLElement,
      data: {
        orgId: "132",
        orgName: "orgName",
        marketSegment: "US_Public_Finance",
      },
    } as ICellRendererParams;
    render(<AnalystCellRenderer {...props2} />);

    const renderer = screen.queryByTestId("analyst-cell-renderer-1");
    expect(renderer).toBeInTheDocument();
    const link = screen.queryByTestId("analyst-link-1");
    expect(link).not.toBeInTheDocument();
  });

  it("if value is blank space, does not render link", () => {
    const props3 = {
      value: BLANK_SPACES,
      rowIndex: 1,
      eGridCell: mockElement as HTMLElement,
      data: {
        orgId: "132",
        orgName: "orgName",
      },
    } as ICellRendererParams;
    render(<AnalystCellRenderer {...props3} />);

    const renderer = screen.queryByTestId("analyst-cell-renderer-1");
    expect(renderer).toBeInTheDocument();
    const link = screen.queryByTestId("analyst-link-1");
    expect(link).not.toBeInTheDocument();
  });
});
