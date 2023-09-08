import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { IssuerOutlook } from "@moodys/mdc-table.schemas.screener";
import { IssuerOutlookCellRenderer } from "./IssuerOutlookCellRenderer";

describe("IssuerOutlookCellRenderer", () => {
  afterEach(cleanup);

  it("renders the value passed in props", () => {
    Object.entries(IssuerOutlook).map((rating) => {
      const [key, value] = rating;
      const props = {
        valueFormatted: key,
      } as ICellRendererParams;
      render(<IssuerOutlookCellRenderer {...props} />);
      const cell = screen.getByTestId("issuer-outlook-cell");
      expect(cell).toHaveTextContent(value);
      cleanup();
    });
  });
});
