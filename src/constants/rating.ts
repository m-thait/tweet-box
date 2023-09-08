import { TreeSelectOption } from "@models/index";
import {
  getAllChild,
  treeNodeWrapper,
} from "@components/Table/components/TreeSelect";

export const WR_RATING = "WR";

export const RATING_TREE: TreeSelectOption[] = [
  {
    id: "investment_grade",
    name: "Investment Grade",
    children: [
      { id: "Aaa", name: "Aaa" },
      {
        id: "Aa",
        name: "Aa",
        children: [
          { id: "Aa1", name: "Aa1" },
          { id: "Aa2", name: "Aa2" },
          { id: "Aa3", name: "Aa3" },
        ],
      },
      {
        id: "A",
        name: "A",
        children: [
          { id: "A1", name: "A1" },
          { id: "A2", name: "A2" },
          { id: "A3", name: "A3" },
        ],
      },
      {
        id: "Baa",
        name: "Baa",
        children: [
          { id: "Baa1", name: "Baa1" },
          { id: "Baa2", name: "Baa2" },
          { id: "Baa3", name: "Baa3" },
        ],
      },
    ],
  },
  {
    id: "speculative_grade",
    name: "Speculative Grade",
    children: [
      {
        id: "Ba",
        name: "Ba",
        children: [
          { id: "Ba1", name: "Ba1" },
          { id: "Ba2", name: "Ba2" },
          { id: "Ba3", name: "Ba3" },
        ],
      },
      {
        id: "B",
        name: "B",
        children: [
          { id: "B1", name: "B1" },
          { id: "B2", name: "B2" },
          { id: "B3", name: "B3" },
        ],
      },
      {
        id: "Caa",
        name: "Caa",
        children: [
          { id: "Caa1", name: "Caa1" },
          { id: "Caa2", name: "Caa2" },
          { id: "Caa3", name: "Caa3" },
        ],
      },
      { id: "Ca", name: "Ca" },
      { id: "C", name: "C" },
    ],
  },
  { id: "WR", name: WR_RATING, children: [] },
];

const { children } = getAllChild(treeNodeWrapper(RATING_TREE));
const ratingFacetsCount = children.length * 2 + 1;
children.push(null);
export const RATING_FACETS = children;
export const RATING_FACETS_COUNT = ratingFacetsCount;
