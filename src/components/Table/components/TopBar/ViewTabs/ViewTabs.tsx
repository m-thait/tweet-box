import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Tabs, Tab } from "@moodys/mdc-frontend.navigation.app-tabs";
import { useNavigate } from "react-router-dom";
import { TableViewType } from "@models/chart.types";
import { isLocalDevelopment } from "@constants/environment";
import { TAB_NAMES } from "@constants/table";
import styles from "./ViewTabs.module.scss";
import { useGetTableView } from "./ViewTabs.hooks";

export const ViewTabs = () => {
  const navigate = useNavigate();
  const { tableView } = useGetTableView();
  const [selectedTab, setSelectedTab] = useState(tableView);

  useEffect(() => {
    if (tableView !== selectedTab) {
      setSelectedTab(tableView);
    }
  }, [selectedTab, tableView]);

  const onClickAction = (value: TableViewType) => {
    const tabValue = value === Object.keys(TAB_NAMES)[0] ? "" : value;
    navigate(`/${isLocalDevelopment ? tabValue : `screener/${tabValue}`}`);
  };

  return (
    <Box className={styles.container} data-testid="view-tabs">
      <Tabs value={selectedTab}>
        {Object.entries(TAB_NAMES).map(([key, value]) => (
          <Tab
            key={value}
            value={key}
            label={value}
            className={`${styles.tab} ${
              key === selectedTab ? "" : styles.pointer
            }`}
            disabled={key === selectedTab}
            onClick={() => onClickAction(key as TableViewType)}
          />
        ))}
      </Tabs>
    </Box>
  );
};
