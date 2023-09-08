import React, { useCallback, useRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { TreeSelectOption, TreeSelectProps } from "@models/index";
import { SearchBox } from "./SearchBox";
import { useTreeSelectEvents } from "./TreeSelect.hooks";
import styles from "./TreeSelect.module.scss";

// eslint-disable-next-line complexity
export const TreeSelect = ({
  label,
  options,
  selected,
  selectAll = true,
  onChange,
  showSearch = true,
  "data-testid": dataTestId,
  initialExpandedFields = [],
}: TreeSelectProps) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const {
    handleSearchTextChange,
    handleDropdownButtonClick,
    handleSearchClear,
    handleClearFilterClick,
    handleToggle,
    handleSelectAllChange,
    treeData,
    checked,
    indeterminate,
    expanded,
    open,
  } = useTreeSelectEvents({
    options,
    selected,
    onChange,
    dropdownRef,
    buttonRef,
    initialExpandedFields,
  });
  const filterActive = checked.length > 0 || (selected?.length ?? 0) > 0;
  const renderTree = useCallback(
    (nodes: TreeSelectOption[]) =>
      nodes.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id as string}
          classes={{ label: styles.label, content: styles.content }}
          className={styles.treeItem}
          data-testid={`tree-item-${node.id}`}
          label={
            <FormControlLabel
              control={
                <Checkbox
                  className={styles.checkbox}
                  disableRipple
                  indeterminate={indeterminate.some((item) => item === node.id)}
                  checked={
                    selectAll || checked.some((item) => item === node.id)
                  }
                  onChange={(event) => {
                    if (onChange) {
                      onChange(event.currentTarget.checked, node);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ pointerEvents: "auto" }}
                  data-testid={`tree-item-checkbox-${node.id}`}
                />
              }
              style={{ pointerEvents: "none" }}
              label={node.name}
              key={node.id}
            />
          }
        >
          {Array.isArray(node.children)
            ? node.children.map((n) => renderTree([n]))
            : null}
        </TreeItem>
      )),
    [checked, indeterminate, onChange, selectAll]
  );

  const renderSelectAll = (
    <TreeItem
      key="select-all"
      nodeId="select-all"
      classes={{ label: styles.label, content: styles.content }}
      className={`${styles.treeItem} ${styles.treeItemAll}`}
      data-testid="tree-item-select-all"
      label={
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              disableRipple
              indeterminate={
                (!selectAll && checked.length !== 0) ||
                (checked.length === 0 && selected?.some((s) => s === null))
              }
              checked={selectAll}
              onChange={handleSelectAllChange}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
              data-testid={`tree-item-checkbox-select-all`}
            />
          }
          style={{ pointerEvents: "none" }}
          label="Any"
          key="select-all"
        />
      }
    />
  );

  return (
    <Box data-testid={dataTestId ?? "tree-select"} className={styles.filterRow}>
      <Typography>{label}</Typography>
      <Box className={styles.filterRowRight}>
        {open && (
          <Paper
            ref={dropdownRef}
            elevation={5}
            className={styles.paperContainer}
            data-testid={
              dataTestId ? `${dataTestId}-dropdown` : `tree-select-dropdown`
            }
          >
            {showSearch && (
              <Box className={styles.searchBoxContainer}>
                <SearchBox
                  onChange={handleSearchTextChange}
                  onClear={handleSearchClear}
                />
              </Box>
            )}
            {treeData?.[0] ? (
              <Box className={styles.treeViewContainer}>
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  onNodeToggle={handleToggle}
                  expanded={(expanded as string[]) ?? []}
                >
                  {renderSelectAll}
                  {renderTree(treeData)}
                </TreeView>
              </Box>
            ) : (
              <Box className={styles.noOptionsContainer}>No Options</Box>
            )}
          </Paper>
        )}
        <Button
          variant="outlined"
          ref={buttonRef}
          onClick={handleDropdownButtonClick}
          endIcon={<ArrowDropDownIcon />}
          className={styles.filterSelect}
          data-testid="dropdown-toggle"
        >
          Any
        </Button>

        <IconButton
          aria-label="clear search text"
          onClick={handleClearFilterClick}
          className={styles.resetIcon}
          disabled={!filterActive}
          disableTouchRipple
          data-testid="tree-select-search-box-clear"
        >
          <RestartAltIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
