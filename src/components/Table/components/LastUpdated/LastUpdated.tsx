import React from "react";
import { Box, Divider, IconButton } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { getRefreshDateAndTime } from "@moodys/mdc-table.utils.date";
import styles from "./LastUpdated.module.scss";

export const LastUpdated = () => {
  return (
    <Box className={styles.container}>
      <Divider
        className={styles.divider}
        orientation="vertical"
        variant="middle"
      />
      <Box data-testid="last-updated-date-and-time">
        Last Updated: {getRefreshDateAndTime(new Date())}
      </Box>
      <IconButton
        data-testid="last-updated-refresh-icon"
        className={styles.refreshIcon}
        onClick={() => window.location.reload()}
      >
        <RefreshOutlined fontSize="small" />
      </IconButton>
    </Box>
  );
};
