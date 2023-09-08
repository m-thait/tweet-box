import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { IssuerOutlook } from "@moodys/mdc-table.schemas.screener";

export const IssuerOutlookCellRenderer = ({
  valueFormatted,
}: ICellRendererParams) => {
  return (
    <span className="ag-cell-value" data-testid="issuer-outlook-cell">
      {IssuerOutlook[valueFormatted?.toUpperCase() as string] ?? valueFormatted}
    </span>
  );
};
