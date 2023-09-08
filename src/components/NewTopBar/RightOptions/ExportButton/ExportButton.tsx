import React, { useState } from "react";
import { Button, Typography, Popover, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { LoadingSpinner } from "@moodys/gravity-base-ui.ui.loading-spinner";
import { Snackbar } from "@moodys/mdc-frontend.overlays.snackbar";
import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { useTreatments } from "@moodys/mdc-frontend.services.split";
import { screenerExport } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { ESG_VIEWS_TABS_FLAG } from "@services/splitIO/splitIO.flags";
import styles from "./ExportButton.module.scss";

interface ExportButtonProps {
  onClick?: () => Promise<void>;
  totalRows: number;
}

const MAXIMUM_EXPORT_SIZE = 5000;

export const ExportButton = ({
  onClick = async () => {
    return;
  },
  totalRows,
}: ExportButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [exportIsLoading, setExportIsLoading] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const splitTreatment = useTreatments([ESG_VIEWS_TABS_FLAG]);
  const viewTabs = splitTreatment[ESG_VIEWS_TABS_FLAG];
  const viewTabsFeatureEnabled = viewTabs?.treatment === "on";
  const open = Boolean(anchorEl);
  const exportDisabled = totalRows > MAXIMUM_EXPORT_SIZE;
  const popOverTextTestId = "export-popover-text";
  const popOverText = viewTabsFeatureEnabled
    ? "Export current tab"
    : "Export all data";

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async () => {
    setExportIsLoading(true);
    try {
      await onClick();
    } catch (ex) {
      setOpenSnackBar(true);
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerExport,
        eventDetails: {
          ...defaultEventDetails,
          id: "fail",
          name: `${totalRows}`,
        },
      });
    }

    setExportIsLoading(false);
  };

  return (
    <Box
      aria-haspopup="true"
      data-testid="top-bar-export-xls-button-container"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <Snackbar
        data-testid="top-bar-export-xls-error-snackbar"
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={100000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className={styles.SnackBar}
      >
        <InfoOutlined className={styles.SnackBarIcon} /> Export failed. Please
        try again.
      </Snackbar>
      <Button
        variant="outlined"
        size="small"
        onClick={handleExport}
        endIcon={
          exportIsLoading ? (
            <Box data-testid="top-bar-export-xls-loading-spinner">
              <LoadingSpinner />
            </Box>
          ) : (
            <DownloadIcon />
          )
        }
        data-testid="top-bar-export-xls-button"
        disabled={exportDisabled || exportIsLoading}
      >
        Export
      </Button>
      <Popover
        className={styles.exportPopover}
        data-testid="export-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: -8,
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
        disableRestoreFocus
        disableScrollLock
      >
        <Box className={styles.childContainer}>
          {exportDisabled ? (
            <Box className={styles.disabledMessage}>
              <InfoIcon />
              <Typography data-testid={popOverTextTestId}>
                Data exceeds the limit.
                <br />
                You can export up to 5,000 rows.
                <br />
                Please filter down the list.
              </Typography>
            </Box>
          ) : (
            <Typography data-testid={popOverTextTestId}>
              {exportIsLoading ? "Exporting data..." : popOverText}
            </Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};
