import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import React, { useCallback, useEffect, useState } from "react";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import {
  ColumnFieldNames,
  FilterSortOrder,
  IssuerOutlook,
} from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { RATINGS_FILTER_FIELDS } from "@constants/schema";
import { LoadingStates } from "@constants/filter";
import { AgGridFilterType } from "@models/table.types";
import { pendingRating } from "@components/Table/components/TopBar/TopFilters/LTRating/LTRating.utils";
import { fetchFacetValues } from "@components/Table/utils";
import {
  addSortOrder,
  getFilterSortOrder,
  getFormatterVal,
  mapFalsyValues,
} from "./ScreenerFilter.utils";

export const useScreenerFilterEvents = (props: IFilterParams) => {
  const [selectedIndices, setSelectedIndices] = useState<(string | null)[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [filteredValues, setFilteredValues] = useState<(string | null)[]>([""]);
  const [searchedValues, setSearchedValues] = useState<
    (string | null | undefined)[]
  >([]);
  const [formatterVal, setFormatterVal] = useState<string>("");
  const [filterSortOrder, setFilterSortOrder] = useState<
    FilterSortOrder | string
  >("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredColumn, setFilteredColumn] = useState<string>("");
  const [isLoading, setIsLoading] = useState<LoadingStates>(
    LoadingStates.LOADING
  );

  const [disableResetButton, setDisableResetButton] = useState<boolean>(true);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const colId = props?.column?.getId();

  useEffect(() => {
    if (selectedIndices && selectedIndices.length === 0 && isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    props.filterChangedCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndices]);

  const getFacetValues = useCallback(async () => {
    return fetchFacetValues(colId, props.api.getFilterModel());
  }, [props, colId]);

  const fetchFilterValues = useCallback(async () => {
    setFilteredColumn(colId);
    const formatter = getFormatterVal(colId);
    setFormatterVal(formatter);

    const facetValues: (string | number)[] = await getFacetValues();
    let values: (string | null)[] = facetValues.map((val) =>
      val ? String(val) : null
    );
    values = Array.from(new Set(values));
    const filterSortOrder = getFilterSortOrder(colId ?? "");
    values = addSortOrder(values, filterSortOrder);
    setFilterSortOrder(filterSortOrder);
    setFilteredValues(values);
    setIsLoading(LoadingStates.LOADED);
  }, [getFacetValues, colId]);

  const clearSelectedFilter = useCallback((): void => {
    setSelectedIndices([]);
    setSelectAll(false);
    setSearchTerm("");
  }, []);

  const handleChange = useCallback(
    (checked: boolean, id: string) => {
      const val: string | null = mapFalsyValues(id);

      if (checked) {
        if (
          RATINGS_FILTER_FIELDS.includes(filteredColumn as ColumnFieldNames)
        ) {
          setSelectedIndices((prevState) => [
            ...prevState,
            val,
            ...(val ? [`(P)${val}`] : []),
          ]);
        } else {
          setSelectedIndices((prevState) => [...prevState, val]);
        }
      } else {
        setSelectedIndices((prevState) =>
          prevState.filter((e) => e !== val && e !== `(P)${val}`)
        );
      }
    },
    [filteredColumn]
  );

  const checkIfAllIndicesSelected = useCallback(
    (arr: (string | null | undefined)[], target: (string | null)[]) => {
      target = target.map((val) => mapFalsyValues(val));
      arr = arr.map((val) => mapFalsyValues(val));
      if (
        arr.length > 0 &&
        target.length > 0 &&
        target.every((v) => arr.includes(v))
      ) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    },
    []
  );

  const isFilterActive = (): boolean => {
    checkIfAllIndicesSelected(selectedIndices, filteredValues);
    const output = selectedIndices && selectedIndices.length > 0;
    setDisableResetButton(!output);
    return output;
  };

  const handleSelectAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        const mappedFilteredValues = filteredValues.map((val) =>
          mapFalsyValues(val)
        );

        if (
          RATINGS_FILTER_FIELDS.includes(filteredColumn as ColumnFieldNames)
        ) {
          const mapProvisionalRatings = pendingRating(filteredValues);
          const selected = [...mappedFilteredValues, ...mapProvisionalRatings];
          setSelectedIndices(selected);
          checkIfAllIndicesSelected(selected, mappedFilteredValues);
        } else {
          setSelectedIndices(mappedFilteredValues);
          checkIfAllIndicesSelected(selectedIndices, mappedFilteredValues);
        }
      } else {
        clearSelectedFilter();
      }
    },
    [
      checkIfAllIndicesSelected,
      clearSelectedFilter,
      filteredColumn,
      selectedIndices,
      filteredValues,
    ]
  );

  /* eslint-disable complexity */
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      const fieldName = props?.colDef?.field;
      const val = getValueByDotSyntax(params.data, fieldName as string);

      if (!val || val === "0") {
        return (
          (selectedIndices?.length > 0 && selectedIndices.includes(null)) ||
          (selectedIndices?.length > 0 && selectedIndices.includes("")) ||
          (selectedIndices?.length > 0 && selectedIndices.includes("0"))
        );
      }

      return selectedIndices?.length > 0 && selectedIndices.includes(val);
    },
    [props.colDef.field, selectedIndices]
  );

  const getModel = () => {
    if (selectedIndices.length === 0) {
      return undefined;
    }
    const indices: (string | null)[] = [];
    selectedIndices.forEach((index) => {
      const outlookKeys = Object.keys(IssuerOutlook).filter(
        (k) => IssuerOutlook[k] === index
      );
      if (outlookKeys.length > 0) {
        outlookKeys.forEach((key) => {
          if (!indices.includes(key)) {
            indices.push(key);
          }
        });
      } else {
        indices.push(index === BLANK_SPACES ? null : index);
      }
    });
    return {
      values: indices,
      filterType: AgGridFilterType.SET,
    };
  };

  const setModel = (
    model: { values: (string | undefined | null)[] } | null | undefined
  ): void => {
    if (!model) {
      clearSelectedFilter();
    } else {
      const updatedValues: (string | null)[] = [];
      model.values.forEach((v) => {
        const value = !v || v === "0" ? null : String(v);
        const outlook = IssuerOutlook[value?.toUpperCase() as string];
        if (outlook) {
          if (updatedValues.indexOf(outlook) === -1) {
            updatedValues.push(outlook);
          }
        } else {
          updatedValues.push(value);
        }
      });
      setSelectedIndices(updatedValues);
    }
  };

  const afterGuiAttached = () => {
    fetchFilterValues();
  };

  const handleSearchTextChange = useCallback(
    (term: string) => {
      if (term) {
        setSearchTerm(term);
        const termSplit = term.split(" ");
        const values = filteredValues.filter((item) => {
          return termSplit.every((el) => {
            return item
              ? item.toLowerCase().indexOf(el.toLowerCase()) >= 0
              : false;
          });
        });
        setSearchedValues(values);
      }
    },
    [filteredValues]
  );

  const handleSearchClear = useCallback(() => {
    setSelectAll(false);
    setSearchTerm("");
    setSearchedValues([]);
    setHasMore(true);
  }, []);

  return {
    clearSelectedFilter,
    selectedIndices,
    setSelectedIndices,
    handleChange,
    selectAll,
    handleSelectAllChange,
    filteredValues,
    formatterVal,
    handleSearchTextChange,
    handleSearchClear,
    searchTerm,
    doesFilterPass,
    fetchFilterValues,
    checkIfAllIndicesSelected,
    getFacetValues,
    setSearchTerm,
    setFilteredColumn,
    filteredColumn,
    setFilteredValues,
    filterSortOrder,
    getModel,
    setModel,
    isFilterActive,
    afterGuiAttached,
    searchedValues,
    isLoading,
    disableResetButton,
    hasMore,
    setHasMore,
  };
};
