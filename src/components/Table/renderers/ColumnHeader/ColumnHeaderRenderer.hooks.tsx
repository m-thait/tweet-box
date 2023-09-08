import { MouseEvent, useCallback, useEffect, useState } from "react";
import { IHeaderParams } from "ag-grid-enterprise";
import { AgGridColumnType, AgGridSortOrder } from "@models/index";

export const useColumnHeaderRendererEvents = ({
  column,
  setSort,
  displayName,
}: Partial<IHeaderParams>) => {
  const [isRightAligned, setIsRightAligned] = useState<boolean>(false);
  const [sortOrderIndex, setSortOrderIndex] = useState<number>(2);
  const [sortOrder, setSortOrder] = useState<(string | null)[]>([
    AgGridSortOrder.ASC,
    AgGridSortOrder.DESC,
    null,
  ]);

  const setSortOrderFn = useCallback(() => {
    let sortIndex = sortOrder.indexOf(null);
    if (column?.isSortAscending())
      sortIndex = sortOrder.indexOf(AgGridSortOrder.ASC);
    if (column?.isSortDescending())
      sortIndex = sortOrder.indexOf(AgGridSortOrder.DESC);
    setSortOrderIndex(sortIndex);
  }, [column, sortOrder]);

  useEffect(() => {
    column?.addEventListener("sortChanged", setSortOrderFn);
    setSortOrderFn();
    return () => {
      column?.removeEventListener("sortChanged", setSortOrderFn);
    };
  }, [column, setSortOrderFn]);

  useEffect(() => {
    const { type, sortingOrder } = column?.getColDef() ?? {};
    if (
      type === AgGridColumnType.NUMERIC_COLUMN ||
      type === AgGridColumnType.RIGHT_ALIGNED
    ) {
      setIsRightAligned(true);
    }
    if (sortingOrder) {
      setSortOrder(sortingOrder);
    }
  }, [column]);

  const onSortChanged = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const columnName = target.innerText ?? target.textContent;
      if (columnName === displayName || target.id === "sort-icon") {
        const nextIndex = sortOrderIndex === 2 ? 0 : sortOrderIndex + 1;
        setSortOrderIndex(nextIndex);
        const order = sortOrder[nextIndex] as AgGridSortOrder;
        if (setSort) {
          setSort(order, event.shiftKey);
        }
      }
    },
    [displayName, setSort, sortOrder, sortOrderIndex]
  );

  return {
    onSortChanged,
    isRightAligned,
    sortOrderIndex,
    sortOrder,
  };
};
