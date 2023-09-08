import React from "react";
import { Box } from "@mui/material";
import { AppTabs, AppTab } from "@moodys/mdc-frontend.navigation.app-tabs";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { saveActiveChartType, useAppDispatch } from "@services/redux";
import { ChartType } from "@root/src/models";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { screenerChartviewTabs } from "@services/analytics/Avo";
import styles from "./Tabs.module.scss";

type CustomTabOptions = {
  chartType: ChartType;
};

export const Tabs = () => {
  const dispatch = useAppDispatch();

  const tabs: AppTab<CustomTabOptions>[] = [
    {
      label: "Credit Rating Charts",
      options: {
        chartType: ChartType.LT_RATINGS,
      },
    },
    {
      label: "ESG Charts",
      options: {
        chartType: ChartType.SCORES,
      },
    },
  ];

  const onClickAction = (tab: AppTab<CustomTabOptions>) => {
    dispatch(saveActiveChartType(tab.options?.chartType));
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerChartviewTabs,
      eventDetails: {
        ...defaultEventDetails,
        depth: tab.label,
      },
    });
  };

  return (
    <Box className={styles.container} data-testid="app-tabs">
      <AppTabs
        onClickEvent={onClickAction}
        tabs={tabs}
        initialSelectedLabel={tabs[0].label}
        ariaId={"0"}
      />
    </Box>
  );
};
