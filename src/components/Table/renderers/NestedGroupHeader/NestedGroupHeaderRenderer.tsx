import React, { useEffect, useState } from "react";
import { IHeaderGroupParams } from "ag-grid-enterprise";
import { IconButton } from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import styles from "./NestedGroupHeaderRenderer.module.scss";

export const NestedGroupHeader = ({
  params,
}: {
  params: IHeaderGroupParams;
}) => {
  const [isExpanded, setExpandState] = useState(false);
  const { columnGroup, setExpanded } = params;
  const groupId = columnGroup.getGroupId();
  const groupChildren = columnGroup.getLeafColumns();
  const canExpand = groupChildren?.length !== 1;
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

  if (!canExpand) return null;
  return (
    <div
      className={`${styles.nestedWrapper} ${
        isExpanded ? styles.headerBracket : ""
      }`}
    >
      <IconButton
        onClick={expandOrCollapse}
        disableRipple={true}
        data-testid={`group-header-${groupId}-${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        {isExpanded ? (
          <RemoveOutlined className={styles.removeIcon} />
        ) : (
          <AddOutlined className={styles.addIcon} />
        )}
      </IconButton>
    </div>
  );
};

export const NestedGroupHeaderRenderer = // eslint-disable-next-line react/display-name
  () => (params: IHeaderGroupParams) => <NestedGroupHeader params={params} />;
