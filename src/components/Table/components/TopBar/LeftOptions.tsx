import React, { useRef } from "react";
import { GridApi } from "ag-grid-enterprise";
import { clsx } from "clsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Chip } from "@mui/material";
import { SplitWrapper } from "@moodys/mdc-frontend.services.split";
import { AgGridSidePanel } from "@models/index";
import { getSidePanelSource, useAppSelector } from "@services/redux";
import { ESG_VIEWS_TABS_FLAG } from "@services/splitIO/splitIO.flags";
import { useLeftOptionsEvents } from "./LeftOptions.hooks";
import { MarketSegmentTreeSelect } from "./TopFilters/MarketSegment";
import { RegionTreeSelect } from "./TopFilters/Region";
import { LTRatingTreeSelect } from "./TopFilters/LTRating";
import styles from "./TopBar.module.scss";
import { ViewTabs } from "./ViewTabs/ViewTabs";

interface LeftOptionsProps {
  gridApi: GridApi;
}

export const LeftOptions = ({ gridApi }: LeftOptionsProps) => {
  const chipsContainer = useRef(null);
  const sidePanelSource = useAppSelector(getSidePanelSource);

  const {
    handleMoreFiltersClick,
    handleClearAllClick,
    handleDelete,
    onLeftClick,
    onRightClick,
    appliedFilters,
    isOverflowing,
    treeFilters,
  } = useLeftOptionsEvents({
    gridApi,
    chipsContainer,
  });

  return (
    <Box className={styles.leftContainer} data-testid="top-bar-left-options">
      <Box className={styles.label}>
        <FilterListIcon className={styles.filterIcon} />
      </Box>
      {isOverflowing && (
        <ChevronLeftIcon
          className={styles.chevronIcon}
          onClick={onLeftClick}
          data-testid="top-bar-filters-left-scroll"
        />
      )}
      <Box className={styles.chips} ref={chipsContainer}>
        <MarketSegmentTreeSelect gridApi={gridApi} />
        <RegionTreeSelect gridApi={gridApi} />
        <LTRatingTreeSelect gridApi={gridApi} />
        {Object.keys(appliedFilters).map((filterName) =>
          !treeFilters.includes(filterName) ? (
            <Chip
              key={filterName}
              label={filterName}
              variant="outlined"
              className={styles.filterChip}
              onDelete={handleDelete(filterName)}
              data-testid="top-bar-applied-filters"
            />
          ) : null
        )}
      </Box>
      {isOverflowing && (
        <ChevronRightIcon
          className={styles.chevronIcon}
          onClick={onRightClick}
          data-testid="top-bar-filters-right-scroll"
        />
      )}
      <Box className={styles.buttonContainer}>
        {Object.keys(appliedFilters).length > 0 && (
          <Button
            variant="text"
            size="small"
            className={styles.clearButton}
            onClick={handleClearAllClick}
          >
            <Box className={styles.buttonText}>Reset</Box>
          </Button>
        )}
        <Button
          variant="text"
          size="small"
          onClick={handleMoreFiltersClick}
          className={clsx({
            [styles.buttonFocused]: sidePanelSource === AgGridSidePanel.FILTERS,
          })}
          data-testid="more-filters"
        >
          More Filters
        </Button>
      </Box>
      <SplitWrapper
        splitName={ESG_VIEWS_TABS_FLAG}
        treatmentElementMap={{
          on: <ViewTabs />,
        }}
      />
    </Box>
  );
};
