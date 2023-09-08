import { Box } from "@mui/system";
import { Checkbox, FormControlLabel } from "@mui/material";
import { clsx } from "clsx";
import React from "react";
import styles from "@components/Table/Filters/BaseFilter/BaseFilter.module.scss";
import { SelectAllProps } from "@components/Table/Filters/BaseFilter/BaseFilter.types";

export const SelectAll = ({
  filteredValues,
  selectedIndices,
  handleSelectAllChange,
  selectAll,
}: SelectAllProps) => {
  return filteredValues.length === 0 ? (
    <span data-testid="no-matches-text">No Matches</span>
  ) : (
    <li>
      <Box
        data-testid="base-filter-checkbox-select-all-container"
        className={clsx(styles.content, styles.label)}
      >
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              disableRipple
              indeterminate={!selectAll && selectedIndices.length !== 0}
              checked={selectAll}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleSelectAllChange(event);
              }}
              data-testid={"base-filter-checkbox-select-all"}
              classes={{
                root: styles.root,
                checked: styles.checked,
                indeterminate: styles.checked,
              }}
            />
          }
          label="Select All"
          key="select-all"
          data-testid="base-filter-select-all"
          classes={{ label: styles.selectAll }}
        />
      </Box>
    </li>
  );
};
