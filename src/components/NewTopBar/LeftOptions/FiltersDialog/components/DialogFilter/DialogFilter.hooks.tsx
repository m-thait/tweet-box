import { useCallback, useEffect, useState } from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { TreeSelectOption } from "@models/tree-select.types";
import { AgGridFilterType } from "@models/table.types";
import { getAllNodeChildren } from "./DialogFilter.utils";
export interface TopFilterProps {
  dialogFilterModel: AgGridFilterModel;
  setDialogFilterModel: (filterModel: AgGridFilterModel) => void;
  fieldName: ColumnFieldNames;
  facets: string[];
}

export const useMarketSegmentTreeSelectEvents = ({
  dialogFilterModel,
  setDialogFilterModel,
  fieldName,
  facets,
}: TopFilterProps) => {
  const [sectorSelectAll, setSectorSelectAll] = useState<boolean>(false);
  const ids =
    dialogFilterModel[fieldName] &&
    Array.isArray(dialogFilterModel[fieldName].values)
      ? (dialogFilterModel[fieldName].values as string[])
      : [];

  // triggered when FilterDialog clears the filter
  useEffect(() => {
    if (!dialogFilterModel[fieldName]) {
      setSectorSelectAll(false);
    }
  }, [dialogFilterModel, fieldName]);

  const sectorTreeSelectOnChange = useCallback(
    // eslint-disable-next-line complexity
    (checked: boolean, node: TreeSelectOption | null) => {
      const newFilterModel = { ...dialogFilterModel };
      if (!node) {
        // triggered when node is null (i.e.) selectAll is checked
        if (checked) {
          setSectorSelectAll(true);
          newFilterModel[fieldName] = {
            filterType: AgGridFilterType.SET,
            values: facets,
          };
        }
        // triggered when node is null (i.e.) selectAll is unchecked
        else {
          delete newFilterModel?.[fieldName];
          setSectorSelectAll(false);
        }
      }
      // triggered when node has values (i.e.) an option other than
      // selectAll is checked or unchecked
      else {
        const nodeIds = getAllNodeChildren(
          node,
          facets,
          fieldName === ColumnFieldNames.LT_RATING ? "(P)" : undefined
        );
        if (checked) {
          newFilterModel[fieldName] = {
            filterType: AgGridFilterType.SET,
            values: [...ids, ...(node.id ? nodeIds : [])],
          };
        } else {
          newFilterModel[fieldName] = {
            filterType: AgGridFilterType.SET,
            values: ids.filter((id) => !nodeIds.includes(id)),
          };
          setSectorSelectAll(false);
        }
      }
      const values = (newFilterModel[fieldName]?.values as string[]) ?? [];
      if (values.length === facets.length) {
        setSectorSelectAll(true);
      }
      if (
        newFilterModel[fieldName] &&
        Array.isArray(newFilterModel[fieldName].values) &&
        values.length === 0
      ) {
        delete newFilterModel[fieldName];
      }
      setDialogFilterModel(newFilterModel);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dialogFilterModel, setDialogFilterModel]
  );

  return {
    sectorSelectAll,
    sectorTreeSelectOnChange,
  };
};
