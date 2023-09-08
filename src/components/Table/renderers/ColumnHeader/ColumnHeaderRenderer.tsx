import React, { useMemo, useRef, useState } from "react";
import { IHeaderParams } from "ag-grid-enterprise";
import { clsx } from "clsx";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Divider } from "@mui/material";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { valueWithCommas } from "@moodys/mdc-table.utils.string";
import { AgGridSortOrder } from "@moodys/mdc-table.constants";
import { getEntityCount, useAppSelector } from "@services/redux";
import { useColumnHeaderRendererEvents } from "./ColumnHeaderRenderer.hooks";
import styles from "./ColumnHeaderRenderer.module.scss";

// eslint-disable-next-line complexity
export const ColumnHeaderRenderer = ({
  column,
  displayName,
  showColumnMenu,
  setSort,
  api,
  enableSorting,
  enableMenu,
}: IHeaderParams) => {
  const [isMenuIconVisible, setMenuIconVisible] = useState<boolean>(false);
  const menuButtonRef = useRef(null);
  const { onSortChanged, isRightAligned, sortOrder, sortOrderIndex } =
    useColumnHeaderRendererEvents({ column, setSort, displayName, api });
  const entityCount = useAppSelector(getEntityCount);
  const isNameColumn =
    ESGColumnFields.ORG_ISSUER_NAME.fieldName === column.getColId();

  const menuIcon = useMemo(
    () => (
      <Box
        className={clsx({
          [styles.menuContainer]: enableMenu,
          [styles.autoWidth]: !isNameColumn && isRightAligned,
        })}
        ref={menuButtonRef}
      >
        {(column.isFilterActive() || isMenuIconVisible) && (
          <IconButton
            className={styles.icon}
            onClick={() => {
              if (menuButtonRef.current) {
                showColumnMenu(menuButtonRef.current);
              }
            }}
            data-testid={`menu-icon-${column.getColId()}`}
          >
            {column.isFilterActive() ? <FilterListIcon /> : <MoreVertIcon />}
          </IconButton>
        )}
      </Box>
    ),
    [
      column,
      isMenuIconVisible,
      isNameColumn,
      isRightAligned,
      enableMenu,
      showColumnMenu,
    ]
  );

  const sortIcon = useMemo(
    () => (
      <>
        {sortOrder[sortOrderIndex] === AgGridSortOrder.ASC && (
          <ArrowUpwardIcon
            className={styles.sortIcon}
            data-testid={`sort-icon-up-${column.getColId()}`}
            id="sort-icon"
          />
        )}
        {sortOrder[sortOrderIndex] === AgGridSortOrder.DESC && (
          <ArrowDownwardIcon
            className={styles.sortIcon}
            data-testid={`sort-icon-down-${column.getColId()}`}
            id="sort-icon"
          />
        )}
      </>
    ),
    [column, sortOrder, sortOrderIndex]
  );

  const totalCountElement = (
    <>
      <Divider
        className={styles.divider}
        orientation="vertical"
        flexItem
        variant="middle"
      />
      <span
        className={styles.rowCount}
        data-testid={`header-row-count-${column.getColId()}`}
      >{`${valueWithCommas(entityCount)}`}</span>
    </>
  );

  const getReverseClasses = (containerStyles: string) =>
    clsx({
      [containerStyles]: true,
      [styles.reverse]: isRightAligned,
    });

  const handleSortClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (enableSorting) {
      onSortChanged(event);
    }
  };

  const handleMouseEnter = () => {
    if (enableMenu) {
      setMenuIconVisible(true);
    }
  };

  return (
    <Box
      className={getReverseClasses(styles.cellContainer)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setMenuIconVisible(false)}
      data-testid={`column-header-renderer-${column.getColId()}`}
      onClick={handleSortClick}
    >
      <Box className={getReverseClasses(styles.textContainer)}>
        <Box
          className={clsx({
            [styles.text]: !isNameColumn,
            [styles.rightAlign]: isRightAligned,
          })}
          data-testid={`column-header-text-${column.getColId()}`}
        >
          <Box component="span" className={clsx("ag-header-cell-text")}>
            {displayName}
          </Box>
        </Box>
        {isNameColumn ? totalCountElement : null}
        {sortIcon}
      </Box>
      {menuIcon}
    </Box>
  );
};
