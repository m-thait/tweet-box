import { IFilterParams, IDoesFilterPassParams } from "ag-grid-community";
import React, { Ref } from "react";
import { FilterSortOrder } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterType } from "@models/table.types";
import { LoadingStates } from "@constants/filter";

export interface BaseFilterOption {
  score?: number;
  value?: string | null;
  label?: string;
  fieldName?: string;
}

export interface BaseFilterProps extends IFilterParams {
  refNew: Ref<unknown>;
  fieldNameProp?: string;
  miniFilter?: boolean;
  lockedOrgIds?: number[];
  isFilterActiveProp?: () => boolean;
  doesFilterPassProp?: (params: IDoesFilterPassParams<unknown>) => boolean;
  getModelProp?: () =>
    | {
        values: (string | null | undefined)[];
        filterType: AgGridFilterType;
      }
    | undefined;
  setModelProp?: (model: { values: string[] }) => void;
  afterGuiAttachedProp?: () => void;
  handleSelectAllChangeProp?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeProp?: (checked: boolean, id: string) => void;
  clearSelectedProp?: () => void;
  handleSearchTextChangeProp?: (term: string) => void;
  handleSearchClearProp?: () => void;
  filteredValuesProp?: (string | null | undefined)[];
  selectedIndicesProp?: (string | null | undefined)[];
  selectAllProp?: boolean;
  filterSortOrder?: FilterSortOrder | string;
  createBaseFilterObjProp?: BaseFilterOption[];
  setColorForFieldsProp?: (
    filter: BaseFilterOption,
    filterSortOrder: FilterSortOrder | string
  ) => string;
  isLoadingProp?: LoadingStates;
  disableResetButtonProp?: boolean;
  setInfiniteScroll?: boolean;
  infiniteScrollFields?: string[];
  infiniteScrollHasMore?: boolean;
  setInfiniteScrollHasMore?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterListOptionsProps {
  filter: BaseFilterOption;
  index: number;
  selectedIndices: (string | null | undefined)[];
  handleChange: (checked: boolean, id: string) => void;
  lockedOrgIds: number[] | undefined;
  fieldName: string | undefined;
  filterSortOrder?: FilterSortOrder | string;
}

export interface SelectAllProps {
  filteredValues: (string | null | undefined)[];
  selectedIndices: (string | null | undefined)[];
  handleSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectAll: boolean;
}

export interface BaseFilterLoadedProps {
  fieldName: string | undefined;
  filteredValues: (string | null | undefined)[];
  selectedIndices: (string | null | undefined)[];
  createBaseFilterObjProp: BaseFilterOption[] | undefined;
  handleChange: (checked: boolean, id: string) => void;
  lockedOrgIds: number[] | undefined;
  filterSortOrder?: FilterSortOrder | string;
  setColorForFieldsProp?: (
    filter: BaseFilterOption,
    filterSortOrder: FilterSortOrder | string
  ) => string;
  setInfiniteScroll?: boolean;
  infiniteScrollFields?: string[];
  infiniteScrollHasMore?: boolean;
  setInfiniteScrollHasMore?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BaseFilterInfiniteScrollProps {
  fieldName: string | undefined;
  filteredValues: (string | null | undefined)[];
  selectedIndices: (string | null | undefined)[];
  handleChange: (checked: boolean, id: string) => void;
  lockedOrgIds: number[] | undefined;
  createBaseFilterObj: BaseFilterOption[];
  filterSortOrder?: FilterSortOrder | string;
  setColorForFieldsProp?: (
    filter: BaseFilterOption,
    filterSortOrder: FilterSortOrder | string
  ) => string;
  infiniteScrollHasMore?: boolean;
  setInfiniteScrollHasMore?: React.Dispatch<React.SetStateAction<boolean>>;
}
