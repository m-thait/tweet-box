import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { Button, Typography, Popover, Box } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LinkIcon from "@mui/icons-material/Link";
import { LoadingSpinner } from "@moodys/gravity-base-ui.ui.loading-spinner";
import { Snackbar } from "@moodys/mdc-frontend.overlays.snackbar";
import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import {
  defaultEventDetails,
  AVO_SUCCESS,
  AVO_FAILED,
} from "@services/analytics/avoConstants";
import { screenerCustomUrl } from "@services/analytics/Avo";
import { useAppSelector, getFilterModel } from "@services/redux";
import { saveShareLinkFilterModel } from "@services/api";
import styles from "./ShareLinkButton.module.scss";

export const ShareLinkButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [linkIsLoading, setLinkIsLoading] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [hasError, setHasError] = useState(false);
  const filterModel = useAppSelector(getFilterModel);
  const open = Boolean(anchorEl);
  const popOverTextTestId = "share-link-popover-text";
  const isDisabled = isEmpty(filterModel.current);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareLink = async () => {
    setHasError(false);
    setLinkIsLoading(true);
    const start = Date.now();
    try {
      const id = await saveShareLinkFilterModel(filterModel.current);
      copy(
        `${window.location.origin}${window.location.pathname}?share-link=${id}`
      );
      const duration = (Date.now() - start) / 1000;
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerCustomUrl,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_SUCCESS,
          depth: Math.ceil(duration).toFixed(2),
        },
      });
    } catch (ex) {
      setHasError(true);
      const duration = (Date.now() - start) / 1000;
      emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
        fn: screenerCustomUrl,
        eventDetails: {
          ...defaultEventDetails,
          id: AVO_FAILED,
          depth: Math.ceil(duration).toFixed(2),
        },
      });
    }
    setOpenSnackBar(true);
    setLinkIsLoading(false);
  };

  return (
    <Box
      aria-haspopup="true"
      data-testid="top-bar-share-link-button-container"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={styles.shareLinkButton}
    >
      <Snackbar
        data-testid="top-bar-share-link-snackbar"
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={100000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className={hasError ? styles.SnackBarError : styles.SnackBar}
      >
        {hasError ? (
          <>
            <InfoOutlined
              data-testid="top-bar-share-link-snackbar-error"
              className={styles.SnackBarIconError}
            />
            {" Failed to create a link. Please try again."}
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon
              data-testid="top-bar-share-link-snackbar-success"
              className={styles.SnackBarIcon}
            />
            {" Link Copied"}
          </>
        )}
      </Snackbar>
      <Button
        variant="outlined"
        size="small"
        onClick={handleShareLink}
        data-testid="top-bar-share-link-button"
        disabled={linkIsLoading || isDisabled}
      >
        {linkIsLoading ? (
          <Box
            data-testid="top-bar-share-link-loading-spinner"
            className={styles.LoadingSpinner}
          >
            <LoadingSpinner />
          </Box>
        ) : (
          <LinkIcon />
        )}
      </Button>
      <Popover
        className={styles.shareLinkPopover}
        data-testid="share-link-popover"
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
          <Typography data-testid={popOverTextTestId}>
            {linkIsLoading
              ? "Getting link..."
              : "Share link to the current view"}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};
