import React, { FC } from "react";
import { Box, StyledEngineProvider } from "@mui/material";
import { AppSubHeader } from "@components/Header";
import styles from "./AppContent.module.scss";
import { AppRoutes } from "./AppRoutes";

export const AppContent: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Box data-testid="app-layout">
        <>
          <AppSubHeader />
          <Box className={styles.container}>
            <AppRoutes />
          </Box>
        </>
      </Box>
    </StyledEngineProvider>
  );
};
