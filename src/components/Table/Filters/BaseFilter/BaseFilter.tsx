import React, { forwardRef, useImperativeHandle } from "react";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";
import { useBaseFilterEvents } from "@components/Table/Filters/BaseFilter/BaseFilter.hooks";
import styles from "@components/Table/Filters/BaseFilter/BaseFilter.module.scss";
import { AG_GRID_POPUP_CLASS_NAME } from "@constants/table";
import { BaseFilterProps } from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { ResetButton } from "@components/Table/Filters/BaseFilter/ResetButton";
import { SearchBox } from "@components/Table/Filters/BaseFilter/SearchBox";
import { LoadingStates } from "@constants/filter";
import { SelectAll } from "@components/Table/Filters/BaseFilter/SelectAll";
import { BaseFilterSkeletonLoader } from "@components/Table/Filters/BaseFilter/BaseFilterSkeletonLoader";
import { BaseFilterLoaded } from "@components/Table/Filters/BaseFilter/BaseFilterLoaded";
/* eslint-disable complexity */
export const BaseFilterComponent = (
  {
    refNew,
    fieldNameProp,
    miniFilter = false,
    lockedOrgIds,
    filteredValuesProp,
    selectedIndicesProp,
    handleChangeProp,
    clearSelectedProp,
    selectAllProp,
    handleSelectAllChangeProp,
    handleSearchTextChangeProp,
    handleSearchClearProp,
    afterGuiAttachedProp,
    isFilterActiveProp,
    doesFilterPassProp,
    getModelProp,
    setModelProp,
    createBaseFilterObjProp,
    filterSortOrder,
    setColorForFieldsProp,
    isLoadingProp,
    disableResetButtonProp,
    setInfiniteScroll = false,
    infiniteScrollFields,
    infiniteScrollHasMore,
    setInfiniteScrollHasMore,
    ...restProps
  }: BaseFilterProps,
  _ref: React.Ref<unknown>
) => {
  const {
    baseFilterClearSelectedFilter,
    baseFilterHandleChange,
    baseFilterSelectedIndices,
    baseFilterSelectAll,
    baseFilterHandleSelectAllChange,
    baseFilterFilteredValues,
    baseFilterIsFilterActive,
    baseFilterDoesFilterPass,
    baseFilterAfterGuiAttached,
    isBaseFilterLoading,
    baseFilterDisableResetButton,
  } = useBaseFilterEvents(restProps);

  // optional local-state values to be overridden
  const fieldName = fieldNameProp ?? restProps?.colDef?.field;
  const isFilterLoading = isLoadingProp ?? isBaseFilterLoading;
  const filteredValues = filteredValuesProp ?? baseFilterFilteredValues;
  const selectedIndices = selectedIndicesProp ?? baseFilterSelectedIndices;
  const selectAll = selectAllProp ?? baseFilterSelectAll;
  // optional handle state functions to be overridden
  const handleChange = handleChangeProp ?? baseFilterHandleChange;
  const clearSelectedFilter =
    clearSelectedProp ?? baseFilterClearSelectedFilter;
  const handleSelectAllChange =
    handleSelectAllChangeProp ?? baseFilterHandleSelectAllChange;
  const disableResetButton =
    disableResetButtonProp ?? baseFilterDisableResetButton;

  // optional ag-grid filter life cycle methods
  const afterGuiAttached = afterGuiAttachedProp ?? baseFilterAfterGuiAttached;
  const isFilterActive = isFilterActiveProp ?? baseFilterIsFilterActive;
  const doesFilterPass = doesFilterPassProp ?? baseFilterDoesFilterPass;
  const getModel = getModelProp;
  const setModel = setModelProp;

  /** React hook which is used when our parent component wants to reach down to the child component to get the
   data originating in the child component for its own use. Here the ref is passed down from the parent component
   Reference: https://www.ag-grid.com/react-data-grid/component-filter/#simple-filter*/
  useImperativeHandle(refNew, () => {
    return {
      isFilterActive,
      doesFilterPass,
      getModel,
      setModel,
      afterGuiAttached,
    };
  });

  return (
    <Box
      className={AG_GRID_POPUP_CLASS_NAME}
      data-testid="base-filter-container"
    >
      {miniFilter ? (
        <Box className={styles.searchBoxContainer}>
          <SearchBox
            onChange={handleSearchTextChangeProp}
            onClear={handleSearchClearProp}
            isFilterLoading={isFilterLoading}
          />
        </Box>
      ) : null}
      <ul
        className={styles.filterOptionsList}
        data-testid="base-filter-list-items-container"
      >
        {isFilterLoading === LoadingStates.LOADED ? (
          <>
            <SelectAll
              filteredValues={filteredValues}
              selectedIndices={selectedIndices}
              handleSelectAllChange={handleSelectAllChange}
              selectAll={selectAll}
            />
            <BaseFilterLoaded
              fieldName={fieldName}
              filteredValues={filteredValues}
              selectedIndices={selectedIndices}
              createBaseFilterObjProp={createBaseFilterObjProp}
              handleChange={handleChange}
              lockedOrgIds={lockedOrgIds}
              filterSortOrder={filterSortOrder}
              setColorForFieldsProp={setColorForFieldsProp}
              setInfiniteScroll={setInfiniteScroll}
              infiniteScrollFields={infiniteScrollFields}
              infiniteScrollHasMore={infiniteScrollHasMore}
              setInfiniteScrollHasMore={setInfiniteScrollHasMore}
            />
          </>
        ) : (
          <BaseFilterSkeletonLoader />
        )}
      </ul>
      <Divider data-testid="base-filter-divider-container" />
      <ResetButton
        onClickHandler={clearSelectedFilter}
        disableButton={disableResetButton}
      />
    </Box>
  );
};

export const BaseFilter = forwardRef(BaseFilterComponent);
BaseFilter.displayName = "BaseFilter";
