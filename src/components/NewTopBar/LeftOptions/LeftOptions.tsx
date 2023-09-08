import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { Box, Button, Divider } from "@mui/material";
import styles from "../TopBar.module.scss";
import { ViewTabs } from "./ViewTabs/ViewTabs";
import { useLeftOptionsEvents } from "./LeftOptions.hooks";
import { FiltersButton } from "./FiltersButton";

interface LeftOptionsProps {
  gridApi: GridApi;
}

export const LeftOptions = ({ gridApi }: LeftOptionsProps) => {
  const { handleClearAllClick, appliedFilters } = useLeftOptionsEvents({
    gridApi,
  });

  const appliedFiltersCount = Object.keys(appliedFilters).length;

  return (
    <Box className={styles.leftContainer} data-testid="top-bar-left-options">
      <Box className={styles.buttonContainer}>
        {/* TODO: Entity Button will eventually be added here */}
        <FiltersButton appliedFilters={appliedFilters} gridApi={gridApi} />
        {appliedFiltersCount > 0 && (
          <Button
            variant="text"
            size="small"
            className={styles.clearButton}
            onClick={handleClearAllClick}
          >
            <Box className={styles.buttonText}>Reset</Box>
          </Button>
        )}
      </Box>
      <Divider orientation="vertical" flexItem className={styles.divider} />
      <ViewTabs />,
    </Box>
  );
};
