import React, { useState } from "react";
import { Button, Box, Badge } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { GridApi } from "ag-grid-enterprise";
import { FiltersDialog } from "../FiltersDialog";
import styles from "./FiltersButton.module.scss";

interface FiltersButtonProps {
  appliedFilters: Record<string, string>;
  gridApi: GridApi;
}

const FilterButton = ({
  setOpenFiltersDialog,
}: {
  setOpenFiltersDialog: (value: boolean) => void;
}) => {
  return (
    <Button
      variant="outlined"
      size="small"
      data-testid="top-bar-filters-button"
      startIcon={<FilterListIcon />}
      onClick={() => setOpenFiltersDialog(true)}
    >
      Filters
    </Button>
  );
};

export const FiltersButton = ({
  appliedFilters,
  gridApi,
}: FiltersButtonProps) => {
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const appliedFiltersCount = Object.keys(appliedFilters).length;
  return (
    <Box
      aria-haspopup="true"
      data-testid="top-bar-filters-button-container"
      className={styles.filterButton}
    >
      <FiltersDialog
        open={openFiltersDialog}
        onClose={() => setOpenFiltersDialog(false)}
        gridApi={gridApi}
      />
      {appliedFiltersCount > 0 ? (
        <Badge
          badgeContent={appliedFiltersCount}
          color="primary"
          data-testid="top-bar-filters-button-count"
        >
          <FilterButton setOpenFiltersDialog={setOpenFiltersDialog} />
        </Badge>
      ) : (
        <FilterButton setOpenFiltersDialog={setOpenFiltersDialog} />
      )}
    </Box>
  );
};
