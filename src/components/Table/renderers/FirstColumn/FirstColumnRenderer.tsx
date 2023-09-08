import React, { useState } from "react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { Box } from "@mui/material";
import { AG_GRID_PINNED_ROW_CLASS } from "@constants/table";
import { FirstColumnText } from "./FirstColumnText";
import styles from "./FirstColumnRenderer.module.scss";
import { CloseIcon } from "./CloseIcon";

// eslint-disable-next-line complexity
export const FirstColumnRenderer = (params: ICellRendererParams) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const cellValue = params.valueFormatted
    ? params.valueFormatted
    : params.value;

  const isRowPinnedOnHover = (event: React.MouseEvent<HTMLDivElement>) => {
    return event.currentTarget.parentElement?.parentElement?.classList.contains(
      AG_GRID_PINNED_ROW_CLASS
    );
  };

  const isRowPinned = params.eGridCell.parentElement?.classList.contains(
    AG_GRID_PINNED_ROW_CLASS
  );

  return (
    <Box
      className={styles.container}
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        // avoid showing close icon on pinned rows
        if (!isRowPinnedOnHover(event)) {
          setShowCloseIcon(true);
        }
      }}
      onMouseLeave={() => {
        setShowCloseIcon(false);
      }}
      data-testid={`first-column-renderer-${params.rowIndex}`}
    >
      <Box className={styles.lockContainer}>
        <FirstColumnText
          params={params}
          showCloseIcon={showCloseIcon}
          isRowPinned={isRowPinned}
        >
          {cellValue}
        </FirstColumnText>
      </Box>
      {showCloseIcon && !isRowPinned && <CloseIcon params={params} />}
    </Box>
  );
};
