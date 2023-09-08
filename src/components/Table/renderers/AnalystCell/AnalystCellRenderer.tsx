import React, { useState } from "react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { Link, Box } from "@mui/material";
import { clsx } from "clsx";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { CompanyDetailsModal } from "@components/CompanyDetailsModal";
import styles from "./AnalystCellRenderer.module.scss";

// eslint-disable-next-line complexity
export const AnalystCellRenderer = (params: ICellRendererParams) => {
  const [showHover, setShowHover] = useState(false);
  const [open, setOpen] = useState(false);

  const cellValue = params.valueFormatted
    ? params.valueFormatted
    : params.value;

  const sector = getValueByDotSyntax(
    params.data,
    ESGColumnFields.ORG_MARKET_SEGMENT.fieldName
  ) as string;

  if (cellValue === BLANK_SPACES || sector === "US_Public_Finance") {
    return (
      <span
        className={clsx(styles.textContainer, styles.fontWeight500)}
        data-testid={`analyst-cell-renderer-${params.rowIndex}`}
      >
        {cellValue}
      </span>
    );
  }

  const orgId = getValueByDotSyntax(
    params.data,
    ESGColumnFields.ORG_ID.fieldName
  ) as string;
  const orgName = getValueByDotSyntax(
    params.data,
    ESGColumnFields.ORG_ISSUER_NAME.fieldName
  ) as string;

  return (
    <Box
      className={styles.container}
      onMouseEnter={() => {
        setShowHover(true);
      }}
      onMouseLeave={() => {
        setShowHover(false);
      }}
      data-testid={`analyst-cell-renderer-${params.rowIndex}`}
    >
      <Box className={styles.lockContainer}>
        <Link
          className={clsx({
            [styles.textContainer]: true,
            [styles.hyperlink]: true,
            [styles.underline]: showHover,
          })}
          onClick={() => {
            setOpen(true);
            setShowHover(false);
          }}
          data-testid={`analyst-link-${params.rowIndex}`}
        >
          {cellValue}
        </Link>
        <CompanyDetailsModal
          handleModalOpen={() => {
            setOpen(false);
            setShowHover(false);
          }}
          openModal={open}
          orgId={orgId}
          orgName={orgName}
        />
      </Box>
    </Box>
  );
};
