import React, { useState } from "react";
import { Box, Container, Popover, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { valueWithCommas } from "@moodys/mdc-table.utils.string";
import styles from "./ChartStat.module.scss";

export const ChartStat = ({
  text,
  number,
  popover,
}: {
  text: string;
  number: number;
  popover?: string;
}) => {
  const numberWithCommas = valueWithCommas(number);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={styles.statContainer}>
      {popover && (
        <>
          <IconButton
            className={styles.infoIcon}
            color="primary"
            data-testid={`info-icon-ratings`}
            disableRipple
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <InfoIcon />
          </IconButton>

          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
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
            onClose={handlePopoverClose}
            disableRestoreFocus
            disableScrollLock
          >
            <Box className={styles.popoverContainer}>
              <Typography variant="body2">{popover}</Typography>
            </Box>
          </Popover>
        </>
      )}
      <Typography variant="caption" className={styles.text}>
        {text}: {numberWithCommas}
      </Typography>
    </Container>
  );
};
