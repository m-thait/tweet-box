/* eslint-disable complexity */
/* eslint-disable react/no-unknown-property */
import React, { useCallback, useEffect, useState } from "react";
import { IHeaderGroupParams } from "ag-grid-enterprise";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { TOP4SCORE_GROUPS } from "@constants/schema";
import { openDrawer, useAppDispatch } from "@services/redux";
import { screenerIIcon } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import styles from "./GroupHeaderRenderer.module.scss";

interface GroupHeaderProps {
  params: IHeaderGroupParams;
  isFirstGroup?: boolean;
}
export const GroupHeader = ({
  params,
  isFirstGroup = false,
}: GroupHeaderProps) => {
  const [isExpanded, setExpandState] = useState(true);
  const { columnGroup, displayName, setExpanded } = params;
  const groupChildren = columnGroup.getLeafColumns();
  const canExpand = groupChildren?.length !== 1 || isFirstGroup;
  const dispatch = useAppDispatch();

  const expandOrCollapse = () => {
    const currentState = columnGroup.getProvidedColumnGroup().isExpanded();
    setExpanded(!currentState);
  };

  useEffect(() => {
    const syncExpandButtons = () => {
      setExpandState(columnGroup.getProvidedColumnGroup().isExpanded());
    };

    columnGroup
      .getProvidedColumnGroup()
      .addEventListener("expandedChanged", syncExpandButtons);
    syncExpandButtons();

    return () => {
      columnGroup
        .getProvidedColumnGroup()
        .removeEventListener("expandedChanged", syncExpandButtons);
    };
  }, [columnGroup]);

  const onInfoIconClick = useCallback(() => {
    const groupId = columnGroup.getGroupId();
    dispatch(openDrawer({ isDrawerOpen: true, drawerType: groupId }));
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerIIcon,
      eventDetails: {
        ...defaultEventDetails,
        name: groupId,
      },
    });
  }, [columnGroup, dispatch]);

  if (columnGroup.getPinned() === null && isFirstGroup) {
    return null;
  }

  return (
    <div className="ag-header-group-cell-label" role="presentation">
      <span className="ag-header-group-text" role="presentation">
        {TOP4SCORE_GROUPS.includes(displayName as ESGGroupNames) && (
          <IconButton
            className={styles.infoIcon}
            color="primary"
            onClick={onInfoIconClick}
            data-testid={`info-icon-${columnGroup.getGroupId()}`}
            disableRipple
          >
            <InfoIcon />
          </IconButton>
        )}
        {params.displayName}
      </span>
      {canExpand && (
        <span
          className={`ag-header-icon ag-header-expand-icon ${
            isExpanded
              ? "ag-header-expand-icon-expanded"
              : "ag-header-expand-icon-collapsed"
          }`}
          onClick={expandOrCollapse}
          role="button"
          data-testid="group-header-icon"
        >
          <span
            className={`ag-icon ${
              isExpanded ? "ag-icon-expanded" : "ag-icon-contracted"
            }`}
            unselectable="on"
            role="presentation"
          />
        </span>
      )}
    </div>
  );
};

export const GroupHeaderRenderer =
  // eslint-disable-next-line react/display-name
  (isFirstGroup?: boolean) => (params: IHeaderGroupParams) =>
    <GroupHeader params={params} isFirstGroup={isFirstGroup} />;
