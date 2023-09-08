import { isEmpty } from "@moodys/mdc-table.utils.object";
import { TreeSelectOption } from "@models/tree-select.types";
import { getAllChild } from "@components/Table/components/TreeSelect";
import { AgGridFilterModelValue } from "@root/src/models";

// build ag-grid filter model values based on the selected node in the tree select
export const getAgGridFilterModelValues = (
  checked: boolean,
  parent: TreeSelectOption,
  filterModelValue: AgGridFilterModelValue | null,
  fieldName: string,
  agGridFilters: string[]
) => {
  const { children, parents } = getAllChild(parent);
  if (checked) {
    if (isEmpty(filterModelValue)) {
      return [...children, ...parents];
    } else {
      return [
        ...(filterModelValue?.values as string[]),
        ...children,
        ...parents,
      ];
    }
  } else {
    if (isEmpty(filterModelValue)) {
      return agGridFilters.filter(
        (e) => !(children.includes(e) || parents.includes(e))
      );
    } else {
      return filterModelValue?.values.filter(
        (e) => !(children.includes(e) || parents.includes(e))
      );
    }
  }
};
