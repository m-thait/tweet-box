import { getAllChild, treeNodeWrapper } from "./TreeSelect.utils";

describe("TreeSelect Utility", () => {
  const nodes = [
    {
      id: "id1",
      name: "name1",
      children: [
        { id: "id2", name: "name2" },
        { id: "id3", name: "name3" },
      ],
    },
  ];
  describe("treeNodeWrapper", () => {
    it("should return tree select options wrapped with an parent object", () => {
      const result = treeNodeWrapper(nodes);
      expect(result).toStrictEqual({
        children: nodes,
        id: "0",
        name: "Parent",
      });
    });
  });

  describe("getAllChild", () => {
    it("should return all children and parents of tree select options", () => {
      const options = treeNodeWrapper(nodes);
      const { children, parents } = getAllChild(options);
      expect(children).toStrictEqual(["id2", "id3"]);
      expect(parents).toStrictEqual(["id1", "0"]);
    });
  });
});
