import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Tabs, Tab } from "@moodys/mdc-frontend.navigation.app-tabs";
import { useNavigate } from "react-router-dom";
import { TableViewType } from "@models/chart.types";
import { isLocalDevelopment } from "@constants/environment";
import styles from "./ViewTabs.module.scss";
import { useGetTableView } from "./ViewTabs.hooks";

const tabs = [
  { label: "Overview", value: TableViewType.OVERVIEW },
  { label: "ESG", value: TableViewType.ESG },
];

export const ViewTabs = () => {
  const navigate = useNavigate();
  const { tableView } = useGetTableView();
  const [selectedTab, setSelectedTab] = useState(tableView);

  useEffect(() => {
    setSelectedTab(tableView);
  }, [tableView]);

  const onClickAction = (value: TableViewType) => {
    const tabValue = value === tabs[0].value ? "" : value;
    navigate(`/${isLocalDevelopment ? tabValue : `screener/${tabValue}`}`);
  };

  return (
    <Box className={styles.container} data-testid="view-tabs">
      <Tabs value={selectedTab}>
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            value={tab.value}
            label={tab.label}
            className={`${styles.tab} ${
              tab.value === selectedTab ? "" : styles.pointer
            }`}
            disabled={tab.value === selectedTab}
            onClick={() => onClickAction(tab.value)}
          />
        ))}
      </Tabs>
    </Box>
  );
};
