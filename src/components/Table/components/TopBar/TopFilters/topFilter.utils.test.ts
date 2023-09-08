import { getAgGridFilterModelValues } from "@components/Table/components/TopBar/TopFilters/TopFilter.utils";
import { AgGridFilterModelValue } from "@root/src/models";

describe("getAgGridFilterModelValues", () => {
  it("should return values when checked", () => {
    const checked = true;
    const parent = {
      id: "Sovereign_and_Supranational",
      name: "Sovereign & Supranational",
      children: [
        {
          id: "Supranational_Sovereigns",
          name: "Supranational",
          children: [],
        },
        {
          id: "Central_Government_Agency",
          name: "Central Government Agency",
          children: [],
        },
        {
          id: "Sovereign_sov",
          name: "Sovereign",
          children: [],
        },
      ],
    };
    const filterModel = {} as AgGridFilterModelValue;
    const fieldName = "subSector";
    const agGridFilterValues = [
      "Advertising",
      "Agricultural_Commodities",
      "Agriculture_chem",
      "Supranational_Sovereigns",
      "Central_Government_Agency",
      "Sovereign_sov",
    ];

    const values = getAgGridFilterModelValues(
      checked,
      parent,
      filterModel,
      fieldName,
      agGridFilterValues
    );
    expect(values).toStrictEqual([
      "Supranational_Sovereigns",
      "Central_Government_Agency",
      "Sovereign_sov",
      "Sovereign_and_Supranational",
    ]);
  });

  it("should return values when unchecked", () => {
    const checked = false;
    const parent = {
      id: "Supranational_Sovereigns",
      name: "Supranational",
      children: [],
    };
    const filterModel = {
      values: [
        "Supranational_Sovereigns",
        "Central_Government_Agency",
        "Sovereign_sov",
      ],
      filterType: "set",
    } as AgGridFilterModelValue;
    const fieldName = "subSector";
    const agGridFilterValues = [
      "Advertising",
      "Agricultural_Commodities",
      "Agriculture_chem",
      "Supranational_Sovereigns",
      "Central_Government_Agency",
      "Sovereign_sov",
    ];

    const values = getAgGridFilterModelValues(
      checked,
      parent,
      filterModel,
      fieldName,
      agGridFilterValues
    );
    expect(values).toStrictEqual([
      "Central_Government_Agency",
      "Sovereign_sov",
    ]);
  });
});
