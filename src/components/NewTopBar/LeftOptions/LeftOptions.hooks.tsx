import { useCallback, useEffect, useState } from "react";
import { GridApi } from "ag-grid-enterprise";
import {
  getColumnMapping,
  getCurrentFilterModel,
  saveCountryFilterModel,
  saveLTRatingFilterModel,
  saveSubSectorFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";

export const useLeftOptionsEvents = ({ gridApi }: { gridApi: GridApi }) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(
    {}
  );
  const columnMapping = useAppSelector(getColumnMapping);
  const filterModel = useAppSelector(getCurrentFilterModel);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filters = Object.keys(filterModel).reduce((agg, k) => {
      return { ...agg, [columnMapping[k]]: k };
    }, {});
    setAppliedFilters(filters);
    return () => {
      setAppliedFilters({});
    };
  }, [columnMapping, filterModel]);

  const handleClearAllClick = useCallback(() => {
    gridApi.setFilterModel([]);
    dispatch(saveSubSectorFilterModel(null));
    dispatch(saveCountryFilterModel(null));
    dispatch(saveLTRatingFilterModel(null));
  }, [dispatch, gridApi]);

  return {
    handleClearAllClick,
    appliedFilters,
  };
};
