import React, { useRef, useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Box, IconButton, Link, Popover } from "@mui/material";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import CloseIcon from "@mui/icons-material/Close";
import { LIST_MEDIAN_POPOVER_TEXT } from "@constants/index";
import styles from "./MedianCellRenderer.module.scss";

export const MedianCellRenderer = ({ value }: ICellRendererParams) => {
  const [anchorEl, setAnchorEl] = useState<HTMLLinkElement | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const elRef = useRef(null);
  const dataTestId = replaceSpaceWithDash(value);

  const handleClick = () => {
    setAnchorEl(elRef.current);
    setIsPopperOpen(!isPopperOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };

  const getLinkEle = (
    <Link
      onClick={handleClick}
      className={styles.helperLink}
      data-testid={`${dataTestId}-popover-link`}
      ref={elRef}
    >
      How is this calculated?
    </Link>
  );

  const getPopoverEle = (
    <Popover
      open={isPopperOpen}
      anchorEl={anchorEl}
      className={styles.medianPopover}
      onClose={handleClose}
      data-testid={`${dataTestId}-popover`}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box className={styles.childContainer}>
        <Box>
          <Box data-testid={`${dataTestId}-text`} className={styles.content}>
            {LIST_MEDIAN_POPOVER_TEXT}
          </Box>
        </Box>
        <Box className={styles.closeContainer}>
          <IconButton
            onClick={handleClose}
            size="small"
            data-testid={`${dataTestId}-popover-close`}
          >
            <CloseIcon className={styles.closeIcon} />
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );

  return (
    <Box className={styles.container} data-testid={`${dataTestId}-cell`}>
      <Box className={styles.pinnedHeading} data-testid={`${dataTestId}-value`}>
        {value}
      </Box>
      <Box>
        {getLinkEle}
        {getPopoverEle}
      </Box>
    </Box>
  );
};
