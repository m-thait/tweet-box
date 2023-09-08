import React, { FC } from "react";
import { Box, Skeleton, Typography, Link } from "@mui/material";
import { OrgInfoOpenApi } from "@models/api.types";
import styles from "./CompanyDetailsInfo.module.scss";

export interface CompanyDetailsInfoProps {
  orgId: string;
  orgInfo?: OrgInfoOpenApi;
  loaded: boolean;
}

export const CompanyDetailsInfo: FC<CompanyDetailsInfoProps> = ({
  orgId,
  orgInfo,
  loaded,
}) => {
  const specs: { [key: string]: string } = {
    sector: "Sector",
    ticker: "Ticker",
    founded: "Founded",
    headquarter: "Headquarter",
    fullTimeEmployees: "Full Time Employees",
  };

  return (
    <Box data-testid={`company-details-info-box-${orgId}`}>
      {loaded ? (
        <Box>
          {orgInfo && orgInfo.overview && (
            <Box className={styles.companyDetails}>
              <Typography className={styles.companyDetailsTitle}>
                About The Company
              </Typography>
              {renderSpecs(specs, orgInfo)}
              {orgInfo.overview && (
                <Typography
                  className={styles.companyDetailsDescription}
                  data-testid="company-details-description"
                >
                  {orgInfo.overview}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box
          className={styles.analystContainer}
          data-testid="drawer-score-loading"
        >
          <Typography component="h3" className={styles.sectionTitle}>
            <Skeleton variant="text" />
          </Typography>
          <Typography component="p" className={styles.sectionContent}>
            <Skeleton variant="rectangular" height={200} />
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const renderSpecs = (
  specs: { [key: string]: string },
  orgInfo: OrgInfoOpenApi
) => {
  return (
    <Box
      className={styles.companyDetailsSpecs}
      data-testid="company-details-specs"
    >
      {Object.keys(specs)
        .filter((key) => orgInfo[key as keyof OrgInfoOpenApi] as string)
        .map((key, index, keys) => {
          const value = orgInfo[key as keyof OrgInfoOpenApi] as string;
          return value ? (
            <Box className={styles.companyDetailsBox} key={key}>
              <Typography
                className={styles.companyDetailsSpecsProp}
                data-testid={`company-details-specs-${key}`}
              >
                {`${specs[key]}: `}
              </Typography>
              <Typography
                className={styles.companyDetailsSpecsPropValue}
                data-testid={`company-details-specs-${key}-value`}
              >
                {value}
              </Typography>
              {keys.length != index + 1 ? (
                <Typography className={styles.companyDetailsSpecsSeparator}>
                  {" | "}
                </Typography>
              ) : null}
            </Box>
          ) : null;
        })}
      {orgInfo.website && (
        <Box className={styles.companyDetailsBox}>
          <Typography className={styles.companyDetailsSpecsSeparator}>
            {" | "}
          </Typography>
          <Typography
            className={styles.companyDetailsSpecsProp}
            data-testid={"company-details-specs-website"}
          >
            {`Website: `}
          </Typography>
          <Typography className={styles.companyDetailsSpecsPropValue}>
            <Link
              className={styles.companyDetailsSpecWebsite}
              href={
                orgInfo.website.startsWith("https://") ||
                orgInfo.website.startsWith("http://")
                  ? orgInfo.website
                  : `https://${orgInfo.website}`
              }
              target="_blank"
              data-testid="company-details-website-link"
            >
              {orgInfo.website}
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
