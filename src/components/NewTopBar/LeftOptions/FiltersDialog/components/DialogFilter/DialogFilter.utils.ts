import { TreeSelectOption } from "@models/tree-select.types";

export const getAllTreeSelectOptionIds = (options?: TreeSelectOption[]) => {
  if (!options) {
    return [];
  }
  let ids: string[] = [];
  options.forEach((option) => {
    if (option.children && option.children.length > 0) {
      ids = ids.concat(getAllTreeSelectOptionIds(option.children));
    } else if (option.id) {
      ids.push(option.id);
    }
  });
  return ids;
};

export const idArray = (id: string, facets: string[], prefix?: string) => {
  const result = [id];
  if (prefix && facets.includes(`${prefix}${id}`)) {
    result.push(`${prefix}${id}`);
  }
  return result;
};

export const getAllNodeChildren = (
  node: TreeSelectOption,
  facets: string[],
  prefix?: string
) => {
  let result: string[] = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      result = result.concat(getAllNodeChildren(child, facets, prefix));
    });
  } else {
    result = node.id ? idArray(node.id, facets, prefix) : [];
  }
  return result;
};
