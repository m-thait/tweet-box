import { Box, Button } from "@mui/material";
import React from "react";
import styles from "./ResetButton.module.scss";

interface ResetButtonProps {
  onClickHandler: () => void;
  disableButton: boolean;
}

export const ResetButton = ({
  onClickHandler,
  disableButton,
}: ResetButtonProps) => {
  return (
    <Box
      className={styles.resetButtonContainer}
      data-testid="base-filter-reset-button-container"
    >
      <Button
        disableTouchRipple
        disabled={disableButton}
        className={styles.resetButton}
        variant="text"
        data-testid="base-filter-reset-button"
        onClick={() => {
          onClickHandler();
        }}
      >
        RESET
      </Button>
    </Box>
  );
};
