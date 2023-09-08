import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getCreditRatingPageUrl } from "@moodys/mdc-table.utils.string";
import { OpenInNew } from "@mui/icons-material";
import { getBaseUrl } from "app/AppConfig";
import styles from "./CompanyDetailsTitle.module.scss";

export interface CompanyDetailsTitleProps {
  orgId: string;
  orgName: string;
}

export const CompanyDetailsTitle: FC<CompanyDetailsTitleProps> = ({
  orgId,
  orgName,
}) => {
  const organizationLink = getCreditRatingPageUrl(getBaseUrl(), orgName, orgId);

  return (
    <Box
      data-testid={`company-title-box-${orgId}`}
      className={styles.companyTitleBox}
    >
      <Typography className={styles.companyTitle}>{orgName}</Typography>
      <Button
        variant="outlined"
        endIcon={<OpenInNew />}
        data-testid="company-page-button"
        className={styles.companyButton}
        onClick={() => {
          window.open(organizationLink, "_blank");
        }}
      >
        <Typography className={styles.companyButtonText}>
          Company Page
        </Typography>
      </Button>
    </Box>
  );
};
