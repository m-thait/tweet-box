import {
  AnyAction,
  isAnyOf,
  ListenerEffectAPI,
  Unsubscribe,
} from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "@constants/index";
import {
  AppDispatch,
  AppStartListening,
  RootState,
  saveColumnState,
  saveCountryFilterModel,
  saveFilterModel,
  saveLTRatingFilterModel,
  savePagination,
  saveSubSectorFilterModel,
  selectTableState,
  tableInitialState,
  TableState,
  uiInitialState,
  saveColumnGroupState,
  saveColumnSortState,
} from "@services/redux";
import { logError } from "@utils/error.utils";

export const onReduxStateChange = (
  action: AnyAction,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  const newState = listenerApi.getState() as RootState;
  const tableState = selectTableState(newState);
  const {
    filterModel,
    subSectorFilterModel,
    countryFilterModel,
    ltRatingFilterModel,
    columnState,
    pagination,
    columnGroupState,
  } = tableState;
  sessionStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      filterModel,
      subSectorFilterModel,
      countryFilterModel,
      ltRatingFilterModel,
      pagination,
      columnState,
      columnGroupState,
    })
  );
};

/**
 * Restores redux state from session storage.
 */
export const restoreFromSessionStorage = () => {
  try {
    if (sessionStorage?.getItem(LOCAL_STORAGE_KEY)) {
      const localState: TableState = JSON.parse(
        sessionStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
      );
      const {
        filterModel,
        subSectorFilterModel,
        countryFilterModel,
        ltRatingFilterModel,
        columnState,
        columnGroupState,
        pagination,
      } = localState;
      return {
        table: {
          ...tableInitialState,
          filterModel,
          subSectorFilterModel,
          countryFilterModel,
          ltRatingFilterModel,
          columnState,
          columnGroupState,
          pagination,
        } as TableState,
        ui: uiInitialState,
      };
    }
  } catch (error) {
    logError(error, "restoreFromSessionStorage");
  }
};

/**
 * Subscribes event listeners and returns a `teardown` function.
 */
export const setupTableEventsListeners = (
  startListening: AppStartListening
): Unsubscribe => {
  const unsubscribe = startListening({
    matcher: isAnyOf(
      saveColumnState,
      saveFilterModel,
      saveSubSectorFilterModel,
      saveCountryFilterModel,
      saveLTRatingFilterModel,
      savePagination,
      saveColumnGroupState,
      saveColumnSortState
    ),
    effect: onReduxStateChange,
  });

  return () => {
    unsubscribe();
  };
};
