import React, { useCallback } from "react";
import { GridApi } from "ag-grid-enterprise";
import { clsx } from "clsx";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import { Box, Button, Divider, Switch, FormControlLabel } from "@mui/material";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import {
  getSidePanelSource,
  getEntityCount,
  useAppSelector,
  getIsChartOpenState,
  toggleChart,
  useAppDispatch,
} from "@services/redux";
import { AgGridSidePanel } from "@models/table.types";
import { screenerChartview } from "@services/analytics/Avo";
import {
  AVO_CLOSED,
  AVO_OPENED,
  defaultEventDetails,
} from "@services/analytics/avoConstants";
import { ExportButton } from "@components/NewTopBar/RightOptions/ExportButton";
import { ShareLinkButton } from "@components/NewTopBar/RightOptions/ShareLinkButton";
import styles from "./TopBar.module.scss";

interface RightOptionsProps {
  gridApi: GridApi;
  onExportClick?: {
    handler: () => Promise<void>;
  };
}

export const RightOptions = ({ gridApi, onExportClick }: RightOptionsProps) => {
  const sidePanelSource = useAppSelector(getSidePanelSource);
  const isChartOpen = useAppSelector(getIsChartOpenState);
  const dispatch = useAppDispatch();
  const totalRows = parseInt(useAppSelector(getEntityCount));
  const handleEditColumnsClick = useCallback(() => {
    if (sidePanelSource === AgGridSidePanel.COLUMNS) {
      gridApi.closeToolPanel();
    } else {
      gridApi.openToolPanel(AgGridSidePanel.COLUMNS);
    }
  }, [gridApi, sidePanelSource]);

  const handleSwitchClicked = () => {
    dispatch(toggleChart());
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerChartview,
      eventDetails: {
        ...defaultEventDetails,
        depth: isChartOpen ? AVO_CLOSED : AVO_OPENED,
      },
    });
  };

  return (
    <Box className={styles.rightContainer} data-testid="top-bar-right-options">
      <ShareLinkButton />
      <ExportButton onClick={onExportClick?.handler} totalRows={totalRows} />
      <Divider orientation="vertical" flexItem className={styles.divider} />
      <Button
        variant="text"
        size="small"
        className={clsx({
          [styles.buttonFocused]: sidePanelSource === AgGridSidePanel.COLUMNS,
        })}
        onClick={handleEditColumnsClick}
        startIcon={<ViewColumnOutlinedIcon />}
        data-testid="top-bar-edit-columns-button"
      >
        Edit Columns
      </Button>
      <Divider orientation="vertical" flexItem className={styles.divider} />

      <FormControlLabel
        control={
          <Switch
            size="small"
            onClick={handleSwitchClicked}
            data-testid="top-bar-chart-toggle"
            checked={isChartOpen}
            color="secondary"
          />
        }
        data-testid="top-bar-chart-label"
        label="Chart View"
      />
    </Box>
  );
};
