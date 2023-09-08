import React from "react";
import { Box } from "@mui/material";
import { createBaseFilterObj } from "@components/Table/Filters/BaseFilter/BaseFilter.helpers";
import {
  BaseFilterInfiniteScrollProps,
  BaseFilterLoadedProps,
  FilterListOptionsProps,
} from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { renderFilterOptions } from "@components/Table/Filters/BaseFilter/FilterOptions";
import { BaseFilterInfiniteScroll } from "@components/Table/Filters/BaseFilter/BaseFilterInfiniteScroll/InfiniteScroll";

// eslint-disable-next-line complexity
export const BaseFilterLoaded = ({
  fieldName,
  filteredValues,
  selectedIndices,
  createBaseFilterObjProp,
  handleChange,
  lockedOrgIds,
  filterSortOrder,
  setColorForFieldsProp,
  setInfiniteScroll,
  infiniteScrollFields,
  infiniteScrollHasMore,
  setInfiniteScrollHasMore,
}: BaseFilterLoadedProps) => {
  let isInfiniteScrollField = false;
  if (setInfiniteScroll && infiniteScrollFields) {
    isInfiniteScrollField = infiniteScrollFields.includes(fieldName ?? "");
  }

  const infiniteScrollProps: BaseFilterInfiniteScrollProps = {
    fieldName: fieldName,
    filteredValues: filteredValues,
    selectedIndices: selectedIndices,
    handleChange: handleChange,
    lockedOrgIds: lockedOrgIds,
    createBaseFilterObj:
      createBaseFilterObjProp ??
      createBaseFilterObj(filteredValues, fieldName ?? ""),
    filterSortOrder: filterSortOrder,
    setColorForFieldsProp: setColorForFieldsProp,
    infiniteScrollHasMore: infiniteScrollHasMore,
    setInfiniteScrollHasMore: setInfiniteScrollHasMore,
  };

  return (
    <Box data-testid="base-filter-loaded-container">
      {isInfiniteScrollField ? (
        <Box data-testid="base-filter-loaded-infinite-scroll-container">
          {BaseFilterInfiniteScroll(infiniteScrollProps)}
        </Box>
      ) : (
        <Box data-testid="base-filter-loaded-render-filter-options-container">
          {(
            createBaseFilterObjProp ??
            createBaseFilterObj(filteredValues, fieldName ?? "")
          ).map((filter, index) => {
            const filterListOptionsObj: FilterListOptionsProps = {
              filter,
              index,
              selectedIndices,
              handleChange,
              lockedOrgIds,
              fieldName,
              filterSortOrder,
            };
            return renderFilterOptions(
              filterListOptionsObj,
              setColorForFieldsProp
            );
          })}
        </Box>
      )}
    </Box>
  );
};
