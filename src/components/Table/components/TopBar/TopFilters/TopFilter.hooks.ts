import { useEffect } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { isArrayEqual } from "@root/src/pre-bit/array.utils";
import { AgGridFilterModelValue, AgGridFilterType } from "@root/src/models";
import {
  getFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";

export const useSyncFilterModels = (
  field: string,
  topFilterModel: AgGridFilterModelValue | null,
  saveTopFilterModel: ActionCreatorWithPayload<unknown>
) => {
  const filterModel = useAppSelector(getFilterModel);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line complexity
  useEffect(() => {
    const currentFilterModel = filterModel.current;
    const previousFilterModel = filterModel.previous;
    if (currentFilterModel && field in currentFilterModel) {
      const previousFilterModelValues =
        previousFilterModel?.[field]?.values ?? [];
      const currentFilterModelValues =
        currentFilterModel?.[field]?.values ?? [];
      const topFilterModelValues = topFilterModel?.values ?? [];
      if (!isArrayEqual(currentFilterModelValues, topFilterModelValues)) {
        if (
          currentFilterModelValues.length > previousFilterModelValues?.length
        ) {
          // checked
          const newCheckedItems = currentFilterModelValues.filter(
            (d) => !previousFilterModelValues.includes(d)
          );
          const newTopFilterModel = {
            filterType: AgGridFilterType.SET,
            values: [...topFilterModelValues, ...newCheckedItems],
          };
          dispatch(saveTopFilterModel(newTopFilterModel));
        } else {
          // unchecked
          const newUncheckedItems = previousFilterModelValues.filter(
            (d) => !currentFilterModelValues.includes(d)
          );
          const newSubSectorFilterModel = {
            filterType: AgGridFilterType.SET,
            values: topFilterModelValues.filter(
              (s) => !newUncheckedItems.includes(s)
            ),
          };
          dispatch(saveTopFilterModel(newSubSectorFilterModel));
        }
      }
    } else if (previousFilterModel && field in previousFilterModel) {
      dispatch(saveTopFilterModel(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterModel]);
};
