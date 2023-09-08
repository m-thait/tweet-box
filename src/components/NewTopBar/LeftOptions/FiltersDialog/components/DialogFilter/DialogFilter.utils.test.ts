import {
  getAllTreeSelectOptionIds,
  idArray,
  getAllNodeChildren,
} from "./DialogFilter.utils";

const options = [
  {
    id: "investment_grade",
    name: "Investment Grade",
    children: [
      { id: "Aaa", name: "Aaa", children: [] },
      {
        id: "Aa",
        name: "Aa",
        children: [
          { id: "Aa1", name: "Aa1", children: [] },
          { id: "Aa2", name: "Aa2", children: [] },
          { id: "Aa3", name: "Aa3", children: [] },
        ],
      },
    ],
  },
  { id: "WR", name: "WR", children: [] },
];

describe("Filter.utils", () => {
  it("getAllTreeSelectOptionIds", () => {
    const ids = getAllTreeSelectOptionIds(options);
    expect(ids.length).toStrictEqual(5);
  });

  it("idArray does not add prefix if undefined", () => {
    const result1 = idArray("A", ["A", "(P)A"], undefined);
    expect(result1).toStrictEqual(["A"]);
  });
  it("idArray adds prefix if it's included and in facets", () => {
    const result2 = idArray("A", ["A", "(P)A"], "(P)");
    expect(result2).toStrictEqual(["A", "(P)A"]);
  });

  it("idArray does not add prefix if it's included but not in facets", () => {
    const result2 = idArray("A", ["A"], "(P)");
    expect(result2).toStrictEqual(["A"]);
  });

  it("getAllNodeChildren gets all children with no prefix", () => {
    const result1 = getAllNodeChildren(
      options[0],
      ["Aaa", "(P)Aaa", "Aa1", "(P)Aa1", "Aa2", "(P)Aa2", "Aa3", "(P)Aa3"],
      undefined
    );
    expect(result1).toStrictEqual(["Aaa", "Aa1", "Aa2", "Aa3"]);
  });
  it("getAllNodeChildren gets all children with prefix", () => {
    const result2 = getAllNodeChildren(
      options[0],
      ["Aaa", "(P)Aaa", "Aa1", "(P)Aa1", "Aa2", "(P)Aa2", "Aa3", "(P)Aa3"],
      "(P)"
    );
    expect(result2).toStrictEqual([
      "Aaa",
      "(P)Aaa",
      "Aa1",
      "(P)Aa1",
      "Aa2",
      "(P)Aa2",
      "Aa3",
      "(P)Aa3",
    ]);
  });

  it("getAllNodeChildren gets all children with prefix but not those outside of facets", () => {
    const result2 = getAllNodeChildren(
      options[0],
      ["Aaa", "(P)Aaa", "Aa1", "(P)Aa1", "Aa2", "(P)Aa2", "Aa3"],
      "(P)"
    );
    expect(result2).toStrictEqual([
      "Aaa",
      "(P)Aaa",
      "Aa1",
      "(P)Aa1",
      "Aa2",
      "(P)Aa2",
      "Aa3",
    ]);
  });
});
