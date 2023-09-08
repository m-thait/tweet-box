import { dfs } from "@moodys/mdc-table.utils.search";
import * as searchTypes from "@moodys/mdc-table.utils.search/search.types";
import { TaxonomyItem, TreeSelectOption } from "@models/index";
import { treeNodeWrapper } from "@components/Table/components/TreeSelect";

const toTreeSelectOption = ({ OwlID, EnglishLabel }: TaxonomyItem) => {
  return {
    id: OwlID,
    name: EnglishLabel,
  } as TreeSelectOption;
};

// converts Taxonomy information from dynamoDB to TreeSelectOptions
const convertToTreeSelectOptions = (
  data: TaxonomyItem[],
  withChildren: boolean
) => {
  return data.map((item) => {
    const option = toTreeSelectOption(item);
    if (withChildren && item?.Children) {
      const children = convertToTreeSelectOptions(item.Children, true);
      if (children) {
        option.children = children;
      }
    }
    return option;
  });
};

export const toTreeSelectOptions = (
  data: TaxonomyItem[],
  withChildren = true
) => {
  return data ? convertToTreeSelectOptions(data, withChildren) : [];
};

// find the child node of the TreeSelectOptions
export const getChildNodeFromTreeSelectOptions = (
  options: TreeSelectOption[] | null
) => {
  return (
    options?.reduce((acc, t) => {
      let node;
      if ((t.children?.length ?? 0) > 0) {
        const child = getChildNodeFromTreeSelectOptions(t.children ?? null);
        node = { [t.id as string]: t.name, ...child };
      } else {
        node = { [t.id as string]: t.name };
      }
      acc = { ...node, ...acc };
      return acc;
    }, {}) ?? null
  );
};

// remove the nodes from TreeSelectOptions that matches with IDs.
const traverseAndFilterTree = (
  data: TreeSelectOption[],
  matchedIDS: string[]
): TreeSelectOption[] => {
  return data
    .filter((item) => matchedIDS.indexOf(item?.id ?? "") > -1)
    .map((item) => ({
      ...item,
      children: item.children
        ? traverseAndFilterTree(item.children, matchedIDS)
        : [],
    }));
};

// remove the nodes from TreeSelectOptions comparing with the column facets
export const filterTreeSelectOptions = (
  treeSelectOptions: TreeSelectOption[],
  facets: (string | null)[]
) => {
  const countryMatchedIDS: string[] = [];
  const options = treeNodeWrapper(treeSelectOptions);
  dfs(
    options as searchTypes.TreeSelectOption,
    facets as string[],
    countryMatchedIDS
  );
  return traverseAndFilterTree(treeSelectOptions, countryMatchedIDS);
};

export const sortTaxonomyItemChildren = (
  taxonomy: TaxonomyItem
): TaxonomyItem => {
  const result = taxonomy;
  if (result.Children) {
    result.Children = result.Children.sort((a, b) => {
      if (a.EnglishLabel < b.EnglishLabel) {
        return -1;
      }
      if (a.EnglishLabel > b.EnglishLabel) {
        return 1;
      }
      return 0;
    });
    result.Children = result.Children.map((item) =>
      sortTaxonomyItemChildren(item)
    );
  }
  return result;
};

export const sortTaxonomyChildren = (
  taxonomy: TaxonomyItem[]
): TaxonomyItem[] => {
  return taxonomy.map((item) => sortTaxonomyItemChildren(item));
};
