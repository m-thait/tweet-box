import { TableViewType } from "@moodys/mdc-table.schemas.screener";
import { ColumnState } from "ag-grid-community";
import { updateViewSorts } from "./Table.utils";

const columnState: ColumnState[] = [
  {
    colId: "marketSegment",
    width: 112,
    hide: true,
    pinned: null,
    sort: null,
    sortIndex: null,
    aggFunc: null,
    rowGroup: false,
    rowGroupIndex: null,
    pivot: false,
    pivotIndex: null,
    flex: null,
  },
  {
    colId: "subSector",
    width: 112,
    hide: false,
    pinned: null,
    sort: "asc",
    sortIndex: 0,
    aggFunc: null,
    rowGroup: false,
    rowGroupIndex: null,
    pivot: false,
    pivotIndex: null,
    flex: null,
  },
];

const sortedColumn: ColumnState = {
  colId: "marketSegment",
  width: 112,
  hide: true,
  pinned: null,
  sort: "asc",
  sortIndex: null,
  aggFunc: null,
  rowGroup: false,
  rowGroupIndex: null,
  pivot: false,
  pivotIndex: null,
  flex: null,
};

const columnStates = {
  [TableViewType.OVERVIEW]: columnState,
  [TableViewType.ESG]: columnState,
};

describe("updateViewSorts", () => {
  it("should update sorts for all columnViews", () => {
    const result = updateViewSorts(columnStates, sortedColumn);
    expect(
      result[TableViewType.OVERVIEW]
        ? result[TableViewType.OVERVIEW][0]["sort"]
        : ""
    ).toStrictEqual("asc");
    expect(
      result[TableViewType.OVERVIEW]
        ? result[TableViewType.OVERVIEW][1]["sort"]
        : ""
    ).toBeNull();
    expect(
      result[TableViewType.ESG] ? result[TableViewType.ESG][0]["sort"] : ""
    ).toStrictEqual("asc");
  });
});
