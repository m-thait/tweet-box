import { mockReduxStore } from "@services/redux/mocks";
import { TableViewType } from "@models/index";
import {
  savePagination,
  saveColumnState,
  saveColumnGroupState,
} from "./Table.slice";
describe("savePagination", () => {
  it("should update state with one value", () => {
    const { store } = mockReduxStore();
    store.dispatch(savePagination({ page: 1, rowsPerPage: 100 }));
    store.dispatch(savePagination({ page: 2 }));
    const { table } = store.getState();
    expect(table.pagination.page).toStrictEqual(2);
    expect(table.pagination.rowsPerPage).toStrictEqual(100);

    store.dispatch(savePagination({ rowsPerPage: 200 }));
    const { table: secondTable } = store.getState();
    expect(secondTable.pagination.page).toStrictEqual(2);
    expect(secondTable.pagination.rowsPerPage).toStrictEqual(200);
  });
  it("should update state with both values", () => {
    const { store } = mockReduxStore();
    store.dispatch(savePagination({ page: 1, rowsPerPage: 100 }));
    store.dispatch(savePagination({ page: 2, rowsPerPage: 200 }));
    const { table } = store.getState();
    expect(table.pagination.page).toStrictEqual(2);
    expect(table.pagination.rowsPerPage).toStrictEqual(200);
  });
});

describe("saveColumnState", () => {
  it("should update column state correctly", () => {
    const { store } = mockReduxStore();
    store.dispatch(
      saveColumnState({
        [TableViewType.OVERVIEW]: [
          {
            colId: "orgName",
            width: 247,
            hide: false,
            pinned: "left",
            sort: "asc",
            sortIndex: null,
            aggFunc: null,
            rowGroup: false,
            rowGroupIndex: null,
            pivot: false,
            pivotIndex: null,
            flex: null,
          },
        ],
      })
    );
    const { table } = store.getState();
    expect(table.columnState[TableViewType.OVERVIEW]).not.toBeNull();
    expect(table.columnState[TableViewType.ESG]).toBeNull();
    store.dispatch(
      saveColumnState({
        [TableViewType.ESG]: [
          {
            colId: "orgName",
            width: 247,
            hide: false,
            pinned: "left",
            sort: "asc",
            sortIndex: null,
            aggFunc: null,
            rowGroup: false,
            rowGroupIndex: null,
            pivot: false,
            pivotIndex: null,
            flex: null,
          },
        ],
      })
    );
    const { table: secondTable } = store.getState();
    expect(secondTable.columnState[TableViewType.OVERVIEW]).not.toBeNull();
    expect(secondTable.columnState[TableViewType.ESG]).not.toBeNull();
  });
});

describe("saveColumnGroupState", () => {
  it("should update column group state correctly", () => {
    const { store } = mockReduxStore();
    store.dispatch(
      store.dispatch(
        saveColumnGroupState({
          [TableViewType.OVERVIEW]: [
            {
              groupId: "entity-details",
              open: true,
            },
          ],
        })
      )
    );
    const { table } = store.getState();
    expect(table.columnGroupState[TableViewType.OVERVIEW]).not.toBeNull();
    expect(table.columnGroupState[TableViewType.ESG]).toBeNull();
    store.dispatch(
      saveColumnGroupState({
        [TableViewType.ESG]: [
          {
            groupId: "entity-details",
            open: true,
          },
        ],
      })
    );
    const { table: secondTable } = store.getState();
    expect(secondTable.columnGroupState[TableViewType.OVERVIEW]).not.toBeNull();
    expect(secondTable.columnGroupState[TableViewType.ESG]).not.toBeNull();
  });
});
