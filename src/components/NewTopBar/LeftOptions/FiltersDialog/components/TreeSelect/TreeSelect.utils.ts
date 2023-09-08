import { TreeSelectOption } from "@models/index";

export const treeNodeWrapper = (
  children: TreeSelectOption[]
): TreeSelectOption => {
  return {
    children,
    id: "0",
    name: "Parent",
  };
};
