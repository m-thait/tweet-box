import React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { screenerTitle } from "@constants/header";
import { NewPopover } from "@components/NewPopover";
import styles from "./Header.module.scss";

export const AppSubHeader = () => {
  return (
    <AppBar
      position="static"
      className={styles.appBarContainer}
      data-testid="app-sub-header"
    >
      <Toolbar variant="dense">
        <Typography
          variant="h2"
          noWrap
          data-testid="app-header-title"
          className={styles.gap}
        >
          {screenerTitle}
        </Typography>
        <NewPopover />
      </Toolbar>
    </AppBar>
  );
};
