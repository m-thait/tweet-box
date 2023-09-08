import React from "react";
import { GridApi } from "ag-grid-enterprise";
import { Box, Collapse } from "@mui/material";
import { Chart } from "@components/Table/components/Chart/Chart";
import { LeftOptions } from "@components/NewTopBar/LeftOptions";
import { RightOptions } from "@components/NewTopBar/RightOptions";
import { getIsChartOpenState, useAppSelector } from "@services/redux";
import { Tabs } from "@components/Tabs/Tabs";
import styles from "./TopBar.module.scss";

interface TopBarProps {
  gridApi: GridApi;
  onExportClick?: {
    handler: () => Promise<void>;
  };
}

export const TopBar = ({ gridApi, onExportClick }: TopBarProps) => {
  const isChartOpen = useAppSelector(getIsChartOpenState);
  return (
    <div>
      <Box className={styles.toolBarContainer} data-testid="app-top-filter-bar">
        <LeftOptions gridApi={gridApi} />
        <RightOptions gridApi={gridApi} onExportClick={onExportClick} />
      </Box>

      <Collapse in={isChartOpen}>
        <Box className={styles.chartContainer} data-testid="app-top-chart-view">
          <Tabs />
          <Chart />
        </Box>
      </Collapse>
    </div>
  );
};
