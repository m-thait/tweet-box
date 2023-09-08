import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import React, { useCallback, useState } from "react";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import { LoadingStates } from "@constants/filter";
import { fetchFacetValues } from "@components/Table/utils";

export const useBaseFilterEvents = (props: IFilterParams) => {
  const [baseFilterSelectedIndices, setBaseFilterSelectedIndices] = useState<
    (string | null | undefined)[]
  >([]);
  const [baseFilterSelectAll, setBaseFilterSelectAll] =
    useState<boolean>(false);
  const [baseFilterFilteredValues, setBaseFilterFilteredValues] = useState<
    (string | null | undefined)[]
  >([]);
  const [filteredColumn, setFilteredColumn] = useState<string>("");
  const [isBaseFilterLoading, setIsBaseFilterLoading] = useState<LoadingStates>(
    LoadingStates.LOADING
  );

  const [baseFilterDisableResetButton, setBaseFilterDisableResetButton] =
    useState<boolean>(true);

  /*
   * TODO: Something to note in Base Table docs when component is migrated to mdc-table in Bit -
   * This useEffect should instead get added in consuming apps' hooks file
   * useEffect(() => props?.filterChangedCallback(), [props, selectedIndices]);
   */

  const getFacetValues = useCallback(async () => {
    const { column } = props;
    return fetchFacetValues(column.getColId(), props.api.getFilterModel());
  }, [props]);

  const fetchFilterValues = useCallback(async () => {
    const filteredCol = props.column.getId();
    setFilteredColumn(filteredCol);

    const facetValues: (string | number)[] = await getFacetValues();
    let values: string[] = facetValues.map((val) => String(val) ?? "");
    values = Array.from(new Set(values));
    setBaseFilterFilteredValues(values);
    setIsBaseFilterLoading(LoadingStates.LOADED);
  }, [getFacetValues, props.column]);

  const baseFilterClearSelectedFilter = useCallback((): void => {
    setBaseFilterSelectedIndices([]);
    setBaseFilterSelectAll(false);
  }, []);

  const baseFilterHandleChange = useCallback((checked: boolean, id: string) => {
    if (checked) {
      setBaseFilterSelectedIndices((prevState) => [...prevState, id]);
    } else {
      setBaseFilterSelectedIndices((prevState) =>
        prevState.filter((e) => e !== id)
      );
    }
  }, []);

  const checkIfAllIndicesSelected = useCallback(
    (
      arr: (string | null | undefined)[],
      target: (string | null | undefined)[]
    ) => {
      if (
        arr.length > 0 &&
        target.length > 0 &&
        target.every((v) => !!v && arr.includes(v))
      ) {
        setBaseFilterSelectAll(true);
      } else {
        setBaseFilterSelectAll(false);
      }
    },
    []
  );

  const baseFilterIsFilterActive = (): boolean => {
    checkIfAllIndicesSelected(
      baseFilterSelectedIndices,
      baseFilterFilteredValues
    );
    const output =
      baseFilterSelectedIndices && baseFilterSelectedIndices.length > 0;
    setBaseFilterDisableResetButton(!output);
    return output;
  };

  const baseFilterHandleSelectAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked) {
        setBaseFilterSelectedIndices(baseFilterFilteredValues);
        checkIfAllIndicesSelected(
          baseFilterSelectedIndices,
          baseFilterFilteredValues
        );
      } else {
        baseFilterClearSelectedFilter();
      }
    },
    [
      checkIfAllIndicesSelected,
      baseFilterClearSelectedFilter,
      baseFilterSelectedIndices,
      baseFilterFilteredValues,
    ]
  );

  const baseFilterDoesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      const fieldName = props?.colDef?.field;

      const val = getValueByDotSyntax(params.data, fieldName as string);

      return (
        baseFilterSelectedIndices?.length > 0 &&
        baseFilterSelectedIndices.includes(val)
      );
    },
    [props?.colDef?.field, baseFilterSelectedIndices]
  );

  const baseFilterAfterGuiAttached = () => {
    fetchFilterValues();
  };

  return {
    baseFilterClearSelectedFilter,
    baseFilterSelectedIndices,
    setBaseFilterSelectedIndices,
    baseFilterHandleChange,
    baseFilterSelectAll,
    baseFilterHandleSelectAllChange,
    baseFilterFilteredValues,
    baseFilterDoesFilterPass,
    fetchFilterValues,
    setFilteredColumn,
    filteredColumn,
    setBaseFilterFilteredValues,
    checkIfAllIndicesSelected,
    baseFilterIsFilterActive,
    baseFilterAfterGuiAttached,
    isBaseFilterLoading,
    baseFilterDisableResetButton,
  };
};
