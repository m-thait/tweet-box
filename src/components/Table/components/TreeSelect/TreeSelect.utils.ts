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

export const getAllChild = (nodes: TreeSelectOption) => {
  const children: (string | null)[] = [];
  const parents: (string | null)[] = [];
  const getChildren = (ns: TreeSelectOption) => {
    if ((ns?.children?.length ?? 0) > 0) {
      ns.children?.forEach((n) => getChildren(n));
      parents.push(ns.id);
    } else {
      children.push(ns.id);
    }
    return { children, parents };
  };
  return getChildren(nodes);
};
