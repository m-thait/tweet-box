import { act } from "@testing-library/react";
import { LOCAL_STORAGE_KEY } from "@constants/index";
import {
  restoreFromSessionStorage,
  tableActions,
  tableInitialState,
  uiInitialState,
} from "@services/redux";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { AgGridFilterType, TableViewType } from "@models/index";

describe("table events listener", () => {
  const columnState = [{ colId: "column3", sort: "asc" }];
  const columnGroupState = {
    esg: null,
    overview: null,
  };
  const filterModel = {
    previous: {},
    current: {
      column1: {
        values: ["ABED"],
        filterType: AgGridFilterType.SET,
      },
    },
  };
  const subSectorFilterModel = {
    values: ["Multi_Line"],
    filterType: AgGridFilterType.SET,
  };
  const countryFilterModel = {
    values: ["Tunisia", "Zambia"],
    filterType: AgGridFilterType.SET,
  };
  const ltRatingFilterModel = {
    values: ["ABED"],
    filterType: AgGridFilterType.SET,
  };

  const spySetItem = jest.spyOn(Storage.prototype, "setItem");
  const spyGetItem = jest.spyOn(Storage.prototype, "getItem");

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("onTableEvents", () => {
    it("should listen to table events", () => {
      const { store, render } = mockReduxStore();
      render();

      act(() => {
        // table event 1
        store.dispatch(
          tableActions.saveColumnState({
            [TableViewType.OVERVIEW]: columnState,
          })
        );
      });

      const { table: newState1 } = store.getState();

      expect(newState1.columnState[TableViewType.OVERVIEW]).toStrictEqual(
        columnState
      );
      expect(spySetItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          filterModel: {
            previous: {},
            current: {},
          },
          subSectorFilterModel: null,
          countryFilterModel: null,
          ltRatingFilterModel: null,
          pagination: {},
          columnState: {
            [TableViewType.OVERVIEW]: columnState,
            [TableViewType.ESG]: null,
          },
          columnGroupState: tableInitialState.columnGroupState,
        })
      );

      act(() => {
        // table event 2
        store.dispatch(tableActions.saveFilterModel(filterModel.current));
      });

      const { table: newState2 } = store.getState();

      const tableState2 = {
        ...tableInitialState,
        columnState: {
          [TableViewType.OVERVIEW]: columnState,
          [TableViewType.ESG]: null,
        },
        filterModel,
      };

      expect(newState2).toStrictEqual(tableState2);
      expect(spySetItem).toHaveBeenLastCalledWith(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          filterModel,
          subSectorFilterModel: null,
          countryFilterModel: null,
          ltRatingFilterModel: null,
          pagination: {},
          columnState: {
            [TableViewType.OVERVIEW]: columnState,
            [TableViewType.ESG]: null,
          },
          columnGroupState: tableInitialState.columnGroupState,
        })
      );
    });
  });

  describe("restore from session storage", () => {
    it("should not restore table state from session storage if empty", () => {
      const { render } = mockReduxStore();
      render();

      expect(spyGetItem).not.toHaveBeenCalled();
    });

    it("should restore table state from session storage if available", () => {
      const tableState = {
        columnState,
        columnGroupState,
        filterModel,
        subSectorFilterModel,
        countryFilterModel,
        ltRatingFilterModel,
      };
      const pagination = { page: 2, rowsPerPage: 200 };
      spyGetItem.mockReturnValue(
        JSON.stringify({
          columnState,
          columnGroupState,
          filterModel,
          subSectorFilterModel,
          countryFilterModel,
          ltRatingFilterModel,
          pagination,
        })
      );

      const appState = restoreFromSessionStorage();

      expect(appState).toStrictEqual({
        table: { ...tableInitialState, ...tableState, pagination },
        ui: uiInitialState,
      });
    });
  });
});
