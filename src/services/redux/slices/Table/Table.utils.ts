import { ColumnState } from "ag-grid-enterprise";
import { TableViewType } from "@models/index";

export const updateViewSorts = (
  columnStateObject: Record<TableViewType, ColumnState[] | null>,
  sortedColumn: ColumnState
): Record<TableViewType, ColumnState[] | null> => {
  const result = { ...columnStateObject };
  const views = Object.keys(columnStateObject) as TableViewType[];
  views.forEach((view) => {
    result[view] =
      result[view]?.map((column) => {
        if (sortedColumn && column.colId === sortedColumn.colId) {
          return { ...column, sort: sortedColumn.sort };
        }
        return { ...column, sort: null };
      }) ?? null;
  });
  return result;
};
