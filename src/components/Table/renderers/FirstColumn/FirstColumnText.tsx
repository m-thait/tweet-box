import { clsx } from "clsx";
import React, { ReactNode } from "react";
import { Link } from "@mui/material";
import { ICellRendererParams } from "ag-grid-enterprise";
import {
  getValueByDotSyntax,
  getCreditRatingPageUrl,
} from "@moodys/mdc-table.utils.string";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { getBaseUrl } from "app/AppConfig";
import styles from "@components/Table/renderers/FirstColumn/FirstColumnRenderer.module.scss";

interface FirstColumnTextProps {
  params: ICellRendererParams;
  children: ReactNode;
  showCloseIcon: boolean;
  isRowPinned?: boolean;
}

export const FirstColumnText = ({
  params,
  children,
  showCloseIcon,
  isRowPinned,
}: FirstColumnTextProps) => {
  const orgId = getValueByDotSyntax(
    params.data,
    ESGColumnFields.ORG_ID.fieldName
  ) as string;
  const issuerName = getValueByDotSyntax(
    params.data,
    ESGColumnFields.ORG_ISSUER_NAME.fieldName
  ) as string;

  const organizationLink = getCreditRatingPageUrl(
    getBaseUrl(),
    issuerName,
    orgId
  );

  if (isRowPinned || !orgId || !issuerName) {
    return (
      <span
        data-testid={`row-value-${params.rowIndex}`}
        className={clsx(styles.textContainer, styles.fontWeight500)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={organizationLink}
      target="_blank"
      data-testid={`row-value-link-${params.rowIndex}`}
      className={clsx({
        [styles.textContainer]: true,
        [styles.hyperlink]: true,
        [styles.underline]: showCloseIcon,
      })}
    >
      {children}
    </Link>
  );
};
