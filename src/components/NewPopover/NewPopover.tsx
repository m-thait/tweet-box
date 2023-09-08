import React, { useState, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Popover,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EsgUserType } from "@models/api.types";
import * as popoverConst from "@constants/popover";
import { getUserType, useAppSelector } from "@services/redux";
import styles from "./NewPopover.module.scss";

export const NewPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const elRef = useRef(null);
  const userType = useAppSelector(getUserType);

  const handleClick = () => {
    setAnchorEl(elRef.current);
    setIsPopperOpen(!isPopperOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };

  const getContentEle = (userType: EsgUserType) => {
    switch (userType) {
      case EsgUserType.ESG_CORE:
        return (
          <>
            <Typography
              component="p"
              variant="body2"
              className={styles.content}
            >
              {popoverConst.NEW_POPOVER_CORE_CONTENT}
            </Typography>
            <Typography display="block" className={styles.footnote}>
              {popoverConst.NEW_POPOVER_CORE_FOOTNOTE}
              <Link
                href="https://www.moodys.com/Pages/contactus.aspx"
                target={"_blank"}
                data-testid="new-popover-link"
              >
                {popoverConst.NEW_POPOVER_CORE_LINK}
              </Link>
            </Typography>
          </>
        );
      case EsgUserType.ESG_PREMIUM:
        return (
          <>
            <Typography
              component="p"
              variant="body2"
              className={styles.content}
            >
              {popoverConst.NEW_POPOVER_CORE_CONTENT}
            </Typography>
            <Typography display="block" className={styles.footnote}>
              {popoverConst.NEW_POPOVER_PREMIUM_FOOTNOTE}
              <Link
                href="https://www.moodys.com/Pages/contactus.aspx"
                target={"_blank"}
                data-testid="new-popover-link"
              >
                {popoverConst.NEW_POPOVER_PREMIUM_LINK}
              </Link>
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  const getPopoverEle = () => {
    if (
      userType === EsgUserType.ESG_CORE ||
      userType === EsgUserType.ESG_PREMIUM
    ) {
      return (
        <Box className={styles.newPopoverBox}>
          <Popover
            open={isPopperOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            className={styles.newPopover}
            onClose={handleClose}
            data-testid="new-popover"
            elevation={4}
          >
            <Box className={styles.childContainer}>
              <Box data-testid="new-popover-content">
                {getContentEle(userType)}
              </Box>
              <Box className={styles.closeContainer}>
                <IconButton
                  onClick={handleClose}
                  size="small"
                  data-testid="new-popover-close"
                >
                  <CloseIcon className={styles.closeIcon} />
                </IconButton>
              </Box>
            </Box>
          </Popover>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={handleClick}
        ref={elRef}
        className={styles.newButton}
        data-testid="new-btn"
      >
        NEW
      </Button>
      {getPopoverEle()}
    </>
  );
};
