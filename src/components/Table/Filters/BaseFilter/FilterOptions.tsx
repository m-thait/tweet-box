import { Box } from "@mui/system";
import React from "react";
import { clsx } from "clsx";
import { ListItem, FormControlLabel, Checkbox } from "@mui/material";
import {
  ColumnFieldNames,
  FilterSortOrder,
} from "@moodys/mdc-table.schemas.screener";
import styles from "@components/Table/Filters/BaseFilter/BaseFilter.module.scss";
import {
  BaseFilterOption,
  FilterListOptionsProps,
} from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { SCORE_FIELDS } from "@constants/schema";
import { setColorForFields } from "@components/Table/Filters/BaseFilter/BaseFilter.helpers";
import { Label } from "@components/Table/Filters/BaseFilter/Label";
// eslint-disable-next-line complexity
export const renderFilterOptions = (
  filterListOptionsObj: FilterListOptionsProps,
  setColorForFieldsProp?: (
    filter: BaseFilterOption,
    filterSortOrder: FilterSortOrder | string
  ) => string
): JSX.Element => {
  const {
    filter,
    index,
    selectedIndices,
    handleChange,
    lockedOrgIds,
    fieldName,
    filterSortOrder,
  } = filterListOptionsObj;

  return filter.value === "0" ? (
    <Box
      data-testid={"filter-options-object-null"}
      key={"filter-options-object-null"}
    ></Box>
  ) : (
    <ListItem
      disablePadding
      data-testid={`base-filter-render-list-item-${index}`}
      key={`base-filter-render-list-item-${index}`}
    >
      <Box
        data-testid={`base-filter-render-filter-options-container-${index}`}
        key={`base-filter-render-filter-options-container-${index}`}
        className={clsx(styles.content, styles.label)}
      >
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              disableRipple
              checked={selectedIndices.some((item) => {
                return (
                  (filter.value === "" && item === undefined) ||
                  item === filter.value
                );
              })}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.currentTarget.checked, filter.value ?? "");
              }}
              data-testid={`base-filter-checkbox-${index}`}
              key={`base-filter-checkbox-${index}`}
              classes={{ root: styles.root, checked: styles.checked }}
            />
          }
          style={{
            pointerEvents: "none",
            color: setColorForFieldsProp
              ? setColorForFieldsProp(filter, filterSortOrder ?? "")
              : setColorForFields(),
            marginRight: "0",
          }}
          label={Label(filter, lockedOrgIds ?? [])}
          classes={{
            label: SCORE_FIELDS.includes(fieldName as ColumnFieldNames)
              ? styles.scoreLabel
              : styles.label,
          }}
          data-testid={`base-filter-name-${index}`}
          key={`base-filter-name-${index}`}
        />
      </Box>
    </ListItem>
  );
};
