import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { AnalystsList } from "@components/AnalystList/AnalystsList";
import { useGetOrgInfo } from "./CompanyDetailsContent.hooks";
import { CompanyDetailsInfo } from "./CompanyDetailsInfo";
import styles from "./CompanyDetailsContent.module.scss";

export interface CompanyDetailsContentProps {
  orgId: string;
}

export const CompanyDetailsContent: FC<CompanyDetailsContentProps> = ({
  orgId,
}) => {
  const { orgInfo, orgInfoLoaded, errorMessage } = useGetOrgInfo(orgId);

  return (
    <Box data-testid={`company-details-content-${orgId}`}>
      {errorMessage && (
        <Box className={styles.companyContentContainer}>
          <Typography fontWeight="600">{errorMessage}</Typography>
        </Box>
      )}
      <CompanyDetailsInfo
        orgId={orgId}
        orgInfo={orgInfo}
        loaded={orgInfoLoaded}
      />
      <AnalystsList
        orgId={orgId}
        loaded={orgInfoLoaded}
        analysts={orgInfo?.analysts ?? []}
      />
    </Box>
  );
};
