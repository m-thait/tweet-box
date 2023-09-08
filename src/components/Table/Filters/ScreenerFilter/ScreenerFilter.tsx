import React, { forwardRef } from "react";
import { IFilterParams } from "ag-grid-community";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { BaseFilterComponent } from "@components/Table/Filters/BaseFilter/BaseFilter";
import { SEARCH_FILTER_FIELDS } from "@constants/schema";
import {
  createBaseFilterObj,
  setColorForFields,
} from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.helpers";
import { getFormatterVal } from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.utils";
import { useScreenerFilterEvents } from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.hooks";
import { InfiniteScrollFields } from "@constants/filter";

export const ScreenerFilterComponent = (
  filterParams: IFilterParams,
  ref: React.Ref<unknown>
) => {
  const {
    doesFilterPass,
    filteredValues,
    selectedIndices,
    clearSelectedFilter,
    handleChange,
    handleSelectAllChange,
    handleSearchTextChange,
    handleSearchClear,
    selectAll,
    filterSortOrder,
    isFilterActive,
    getModel,
    setModel,
    afterGuiAttached,
    searchedValues,
    searchTerm,
    isLoading,
    disableResetButton,
    hasMore,
    setHasMore,
  } = useScreenerFilterEvents(filterParams);

  let miniFilter = false;
  const fieldName: string = filterParams?.colDef?.field ?? "";
  const formatter = getFormatterVal(fieldName);
  if (SEARCH_FILTER_FIELDS.includes(fieldName as ColumnFieldNames)) {
    miniFilter = true;
  }

  const filterValues = searchTerm.length > 0 ? searchedValues : filteredValues;

  return (
    <BaseFilterComponent
      refNew={ref}
      miniFilter={miniFilter}
      filteredValuesProp={filterValues}
      selectedIndicesProp={selectedIndices}
      selectAllProp={selectAll}
      handleChangeProp={handleChange}
      clearSelectedProp={clearSelectedFilter}
      handleSelectAllChangeProp={handleSelectAllChange}
      handleSearchTextChangeProp={handleSearchTextChange}
      handleSearchClearProp={handleSearchClear}
      afterGuiAttachedProp={afterGuiAttached}
      doesFilterPassProp={doesFilterPass}
      isFilterActiveProp={isFilterActive}
      getModelProp={getModel}
      setModelProp={setModel}
      filterSortOrder={filterSortOrder}
      createBaseFilterObjProp={createBaseFilterObj(
        filterValues,
        fieldName ?? "",
        formatter
      )}
      setColorForFieldsProp={setColorForFields}
      isLoadingProp={isLoading}
      disableResetButtonProp={disableResetButton}
      setInfiniteScroll={true}
      infiniteScrollFields={InfiniteScrollFields}
      infiniteScrollHasMore={hasMore}
      setInfiniteScrollHasMore={setHasMore}
      {...filterParams}
    />
  );
};

export const ScreenerFilter = forwardRef(ScreenerFilterComponent);
ScreenerFilter.displayName = "ScreenerFilter";
