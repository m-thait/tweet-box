import React from "react";
import { Box, Skeleton } from "@mui/material";

import styles from "./TopBarLoader.module.scss";

export const TopBarLoader = () => {
  return (
    <Box className={styles.topBarContainer} data-testid="top-bar-loader">
      <Box className={styles.leftContainer}>
        <Skeleton variant="text" className={styles.iconSkeleton} />
        {Array.from(new Array(5).keys()).map((i) => (
          <Skeleton
            variant="text"
            className={styles.chipsSkeleton}
            key={`mui-chips-${i}`}
          />
        ))}
      </Box>
      <Box className={styles.rightContainer}>
        {Array.from(new Array(2).keys()).map((i) => (
          <Skeleton
            variant="text"
            className={styles.iconButtonSkeleton}
            key={`mui-icon-button-${i}`}
          />
        ))}
      </Box>
    </Box>
  );
};
