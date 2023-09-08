import React, { FC } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { AnalystTile } from "@components/AnalystTile";
import { AnalystInfoOpenApi } from "@models/api.types";
import styles from "./AnalystsList.module.scss";

export interface AnalystsListsProps {
  orgId: string;
  analysts: AnalystInfoOpenApi[];
  loaded: boolean;
}

export const AnalystsList: FC<AnalystsListsProps> = ({
  orgId,
  analysts,
  loaded,
}) => {
  return (
    <Box data-testid={`analyst-list-${orgId}`}>
      {loaded ? (
        <Box mb={2}>
          {analysts && analysts.length > 0 && (
            <Box>
              <Typography fontWeight="600">Contact Analyst</Typography>
              <Box className={styles.analystContainer}>
                {analysts.map((analyst, index) => (
                  <AnalystTile
                    key={`analyst-${index}`}
                    id={index}
                    analyst={analyst}
                  />
                ))}
              </Box>
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
