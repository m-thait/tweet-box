import {
  getChildNodeFromTreeSelectOptions,
  sortTaxonomyChildren,
} from "./tree-select.utils";
const item1 = { id: "id1", name: "name1" };

const child1 = { id: "id2", name: "name2" };
const item2 = { id: "id3", name: "name3", children: [child1] };

const taxonomy = [
  {
    OwlID: "Corporates",
    Name: "Market_Segment",
    Path: [["0~Corporates"]],
    EnglishLabel: "Corporates",
    Parent: null,
    SeoLabel: "corporates",
    Children: [
      {
        OwlID: "Pharmaceuticals_corp",
        Name: "Market_Segment",
        Path: [["0~Corporates", "1~Pharmaceuticals_corp"]],
        EnglishLabel: "Pharmaceuticals",
        Parent: null,
        SeoLabel: "pharmaceuticals-corp",
        Children: [
          {
            OwlID: "Wholesale_Distribution_Healthcare",
            Name: "Market_Segment",
            Path: [
              [
                "0~Corporates",
                "1~Pharmaceuticals_corp",
                "2~Wholesale_Distribution_Healthcare",
              ],
            ],
            EnglishLabel: "Wholesale Distribution: Healthcare",
            Parent: null,
            SeoLabel: "wholesale-distribution-healthcare",
            Children: null,
          },
          {
            OwlID: "Pharmaceuticals_General_and_Specialty",
            Name: "Market_Segment",
            Path: [
              [
                "0~Corporates",
                "1~Pharmaceuticals_corp",
                "2~Pharmaceuticals_General_and_Specialty",
              ],
            ],
            EnglishLabel: "Pharmaceuticals - General & Specialty",
            Parent: null,
            SeoLabel: "pharmaceuticals-general-and-specialty",
            Children: null,
          },
        ],
      },
      {
        OwlID: "Services_corp",
        Name: "Market_Segment",
        Path: [["0~Corporates", "1~Services_corp"]],
        EnglishLabel: "Services",
        Parent: null,
        SeoLabel: "services-corp",
        Children: null,
      },
    ],
  },
];

describe("use tree-select utils", () => {
  it("process single item", () => {
    const childNode = getChildNodeFromTreeSelectOptions([item1]);
    const keys = childNode ? Object.keys(childNode) : [];
    expect(keys[0]).toStrictEqual(item1.id);
  });
  it("process item with child", () => {
    const childNode = getChildNodeFromTreeSelectOptions([item2]);
    const keys = childNode ? Object.keys(childNode) : [];
    expect(keys[0]).toStrictEqual(item2.id);
    expect(keys[1]).toStrictEqual(child1.id);
  });
  it("process null", () => {
    const childNode = getChildNodeFromTreeSelectOptions(null);
    expect(childNode).toBeNull();
  });
  it("sortTaxonomyItemChildren", () => {
    const sortedTaxonomy = sortTaxonomyChildren(taxonomy);
    const name1 =
      sortedTaxonomy[0] && sortedTaxonomy[0].Children
        ? sortedTaxonomy[0].Children[0]?.EnglishLabel
        : null;
    const name2 =
      sortedTaxonomy[0] &&
      sortedTaxonomy[0].Children &&
      sortedTaxonomy[0].Children[0].Children
        ? sortedTaxonomy[0].Children[0].Children[0].EnglishLabel
        : null;
    expect(name1).toStrictEqual("Pharmaceuticals");
    expect(name2).toStrictEqual("Pharmaceuticals - General & Specialty");
  });
});
