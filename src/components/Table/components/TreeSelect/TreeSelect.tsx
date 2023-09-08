import React, { useCallback, useRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
} from "@mui/material";

import { clsx } from "clsx";
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
  const chipRef = useRef(null);
  const {
    handleSearchTextChange,
    handleChipClick,
    handleSearchClear,
    handleExpandClick,
    handleClearFilterClick,
    handleToggle,
    handleSelectAllChange,
    handleBlanksChange,
    treeData,
    checked,
    indeterminate,
    expanded,
    expandAll,
    open,
  } = useTreeSelectEvents({
    options,
    selected,
    onChange,
    dropdownRef,
    chipRef,
    initialExpandedFields,
  });
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
      className={styles.treeItem}
      data-testid="tree-item-select-all"
      label={
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              disableRipple
              indeterminate={
                (!selectAll && checked.length !== 0) ||
                (checked.length === 0 && selected?.some((s) => s.id === null))
              }
              checked={selectAll}
              onChange={handleSelectAllChange}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
              data-testid={`tree-item-checkbox-select-all`}
            />
          }
          style={{ pointerEvents: "none" }}
          label="Select All"
          key="select-all"
        />
      }
    />
  );

  const renderBlanks = (
    <TreeItem
      key="blanks"
      nodeId="blanks"
      classes={{ label: styles.label, content: styles.content }}
      className={styles.treeItem}
      data-testid="tree-item-blanks"
      label={
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              disableRipple
              checked={selected?.some((s) => s.id === null)}
              onChange={handleBlanksChange}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
              data-testid={`tree-item-checkbox-blanks`}
            />
          }
          style={{ pointerEvents: "none" }}
          label="-- (No data)"
          key="blanks"
        />
      }
    />
  );

  return (
    <Box data-testid={dataTestId ?? "tree-select"}>
      <Chip
        ref={chipRef}
        label={label}
        variant="outlined"
        className={
          checked.length > 0 || (selected?.length ?? 0) > 0
            ? styles.filterChip
            : styles.dropdownChip
        }
        onClick={handleChipClick}
        onDelete={
          checked.length > 0 || (selected?.length ?? 0) > 0
            ? handleClearFilterClick
            : undefined
        }
        data-testid={dataTestId ? `${dataTestId}-chip` : `tree-select-chip`}
      />
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
            <>
              <Box
                className={clsx({
                  [styles.expandAllButton]: true,
                  [styles.noSearch]: !showSearch,
                })}
                onClick={handleExpandClick}
              >
                {expandAll ? (
                  <span>Expand All </span>
                ) : (
                  <span>Collapse All </span>
                )}
              </Box>
              <Box className={styles.treeViewContainer}>
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  onNodeToggle={handleToggle}
                  expanded={(expanded as string[]) ?? []}
                >
                  {renderSelectAll}
                  {renderTree(treeData)}
                  {renderBlanks}
                </TreeView>
              </Box>
            </>
          ) : (
            <Box className={styles.noOptionsContainer}>No Options</Box>
          )}
          <Box className={styles.clearButtonContainer}>
            <Button
              variant="text"
              className={styles.clearButton}
              onClick={handleClearFilterClick}
            >
              <Box className={styles.buttonText}>Reset</Box>
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
