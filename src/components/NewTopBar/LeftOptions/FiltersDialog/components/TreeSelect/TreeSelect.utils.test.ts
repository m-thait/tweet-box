import { treeNodeWrapper } from "./TreeSelect.utils";

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
});
