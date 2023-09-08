import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { ColumnApi, ColDef } from "ag-grid-community";
import {
  TaxonomySectorLabels,
  GenerateColumnComposition,
  ColGroupVisibilityState,
} from "@models/column-compositions.types";
import { EsgUserType } from "@models/api.types";
import { AgGridFilterModel, AgGridFilterType } from "@models/table.types";
import { taxonomyMockResponse } from "@services/redux/mocks";
import { SeoLabelMap } from "@models/taxonomy.types";
import {
  getValuesFromTaxonomyLabelMap,
  buildColumnCompositionMaps,
  subFactorScoreCheck,
  generateColumnComposition,
  configureColumnGroupsForComposition,
  processColumnGroupChild,
} from "./column-compositions.utils";
import { columnDefinitions } from "./mocks/columnDefinitions";

const seoLablMap = taxonomyMockResponse.marketSegment
  .seoLabelMap as SeoLabelMap;

describe("getValuesFromTaxonomyLabelMap", () => {
  it("should return an empty array when invalid values are passed", async () => {
    const sectors = getValuesFromTaxonomyLabelMap(
      seoLablMap,
      "BadValue" as TaxonomySectorLabels
    );
    expect(sectors.length).toBe(0);
  });
  it("should return array of strings when valid values are passed", async () => {
    const sectors = getValuesFromTaxonomyLabelMap(
      seoLablMap,
      TaxonomySectorLabels.BANKING
    );
    expect(sectors.length).toBe(6);
  });
});

describe("buildColumnCompositionMaps", () => {
  it("can build the composition map using the seoLabelMap from taxonomy response", async () => {
    const map = buildColumnCompositionMaps(seoLablMap);
    const mapKeys = Object.keys(map);
    expect(mapKeys.length).toBe(265);
    const defaultMap = map[mapKeys[0]];
    const defaultHideColumns = Object.keys(defaultMap.hiddenColumns);
    const defaultShowColumns = Object.keys(defaultMap.shownColumns);
    expect(mapKeys[0]).toBe("default");
    expect(defaultHideColumns.length).toBe(10);
    expect(defaultShowColumns.length).toBe(7);
  });
});

describe("subFactorScoreCheck", () => {
  it("returns true if column field is not a subfactor score", async () => {
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const canShowSubfactorScore = subFactorScoreCheck(
      ColumnFieldNames.CTA_SCORE,
      userType
    );
    expect(canShowSubfactorScore).toBe(true);
  });
  it("returns true if column field is a subfactor score and userType is not core", async () => {
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const canShowSubfactorScore = subFactorScoreCheck(
      ColumnFieldNames.GOV_BOARD_STRUCTURE_AND_POLICIES,
      userType
    );
    expect(canShowSubfactorScore).toBe(true);
  });
  it("returns false if column field is a subfactor score and userType is core", async () => {
    const userType: EsgUserType = EsgUserType.ESG_CORE;
    const canShowSubfactorScore = subFactorScoreCheck(
      ColumnFieldNames.GOV_BOARD_STRUCTURE_AND_POLICIES,
      userType
    );
    expect(canShowSubfactorScore).toBe(false);
  });
});

describe("generateColumnComposition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockColumnApi = {
    setColumnsVisible: jest.fn().mockImplementation(() => undefined),
    applyColumnState: jest.fn().mockImplementation(() => undefined),
    setColumnGroupState: jest.fn().mockImplementation(() => undefined),
  } as unknown as ColumnApi;
  it("can generate the default composition if a subsector that doesn't have a explic composition is in filter model", async () => {
    const spy = jest.spyOn(mockColumnApi, "setColumnsVisible");
    const spyTwo = jest.spyOn(mockColumnApi, "applyColumnState");
    const map = buildColumnCompositionMaps(seoLablMap);
    const filterModel: AgGridFilterModel = {
      [ColumnFieldNames.ORG_INDUSTRY]: {
        filterType: AgGridFilterType.SET,
        values: ["Insurance"],
      },
    };
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const params: GenerateColumnComposition = {
      columnCompositionMap: map,
      columnComposition: map.default,
      filterModel,
      columnApi: mockColumnApi,
      userType,
    };
    const generatedComposotion = generateColumnComposition(params);
    expect(generatedComposotion.columnComposition).toStrictEqual(map.default);
    expect(Object.keys(generatedComposotion.matchedColumns).length).toBe(8);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spyTwo).toHaveBeenCalledTimes(1);
  });

  it("can generate banking composition based on filter model containing a banking sector", async () => {
    const spy = jest.spyOn(mockColumnApi, "setColumnsVisible");
    const spyTwo = jest.spyOn(mockColumnApi, "applyColumnState");
    const map = buildColumnCompositionMaps(seoLablMap);
    const filterModel: AgGridFilterModel = {
      [ColumnFieldNames.ORG_INDUSTRY]: {
        filterType: AgGridFilterType.SET,
        values: ["Banking"],
      },
    };
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const params: GenerateColumnComposition = {
      columnCompositionMap: map,
      columnComposition: JSON.parse(JSON.stringify(map.default)),
      filterModel,
      columnApi: mockColumnApi,
      userType,
    };
    const generatedComposotion = generateColumnComposition(params);
    expect(
      Object.keys(generatedComposotion.columnComposition.hiddenColumns).length
    ).toBe(15);
    expect(
      Object.keys(generatedComposotion.columnComposition.shownColumns).length
    ).toBe(6);
    expect(
      generatedComposotion.columnComposition.shownColumns[
        ColumnFieldNames.LT_BANK_SUMMARY_RATING
      ]
    ).toBe(true);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spyTwo).toHaveBeenCalledTimes(1);
  });

  it("can generate mixed composition based on filter model containing a banking sector and a corporate sector", async () => {
    const spy = jest.spyOn(mockColumnApi, "setColumnsVisible");
    const spyTwo = jest.spyOn(mockColumnApi, "applyColumnState");
    const map = buildColumnCompositionMaps(seoLablMap);
    const filterModel: AgGridFilterModel = {
      [ColumnFieldNames.ORG_INDUSTRY]: {
        filterType: AgGridFilterType.SET,
        values: ["Banking", "Oil_and_Gas"],
      },
    };
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const params: GenerateColumnComposition = {
      columnCompositionMap: map,
      columnComposition: JSON.parse(JSON.stringify(map.default)),
      filterModel,
      columnApi: mockColumnApi,
      userType,
    };
    const generatedComposotion = generateColumnComposition(params);
    expect(
      Object.keys(generatedComposotion.columnComposition.hiddenColumns).length
    ).toBe(10);
    expect(
      Object.keys(generatedComposotion.columnComposition.shownColumns).length
    ).toBe(11);
    expect(
      generatedComposotion.columnComposition.shownColumns[
        ColumnFieldNames.LT_BANK_SUMMARY_RATING
      ]
    ).toBe(true);
    expect(
      generatedComposotion.columnComposition.shownColumns[
        ColumnFieldNames.LT_RATING
      ]
    ).toBe(true);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spyTwo).toHaveBeenCalledTimes(1);
  });
});

describe("configureColumnGroupsForComposition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockColumnApi = {
    setColumnsVisible: jest.fn().mockImplementation(() => undefined),
    setColumnGroupState: jest.fn().mockImplementation(() => undefined),
    applyColumnState: jest.fn().mockImplementation(() => undefined),
  } as unknown as ColumnApi;
  it("can properly configure column groups based on generated column composition", async () => {
    const spyOne = jest.spyOn(mockColumnApi, "setColumnsVisible");
    const spyTwo = jest.spyOn(mockColumnApi, "setColumnGroupState");
    const spyThree = jest.spyOn(mockColumnApi, "applyColumnState");
    const map = buildColumnCompositionMaps(seoLablMap);
    const filterModel: AgGridFilterModel = {
      [ColumnFieldNames.ORG_INDUSTRY]: {
        filterType: AgGridFilterType.SET,
        values: ["Banking", "Oil_and_Gas"],
      },
    };
    const userType: EsgUserType = EsgUserType.ESG_PREMIUM;
    const params: GenerateColumnComposition = {
      columnCompositionMap: map,
      columnComposition: JSON.parse(JSON.stringify(map.default)),
      filterModel,
      columnApi: mockColumnApi,
      userType,
    };
    const generatedComposotion = generateColumnComposition(params);
    configureColumnGroupsForComposition(
      columnDefinitions,
      generatedComposotion.matchedColumns,
      mockColumnApi
    );
    expect(spyOne).toHaveBeenCalledTimes(2);
    expect(spyTwo).toHaveBeenCalledTimes(11);
    expect(spyThree).toHaveBeenCalledTimes(1);
  });
});

describe("processColumnGroupChild", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockGroup = {
    headerName: "Bank LT Rating Group",
    groupId: "bank-lt-rating-group",
    openByDefault: false,
    marryChildren: true,
    children: [
      {
        filter: {},
        filterParams: {
          showTooltips: true,
          buttons: ["reset"],
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true,
        },
        sortable: true,
        width: 112,
        resizable: true,
        menuTabs: ["filterMenuTab", "generalMenuTab"],
        headerName: "Bank LT Rating",
        field: "ltBankSummaryRating",
        suppressFiltersToolPanel: false,
        suppressMenu: false,
        minWidth: 112,
        colId: "ltBankSummaryRating",
        rowGroup: false,
        rowGroupIndex: null,
        pivot: false,
        pivotIndex: null,
        aggFunc: null,
        pinned: null,
        sort: null,
        sortIndex: null,
      },
      {
        filter: {},
        filterParams: {
          showTooltips: true,
          buttons: ["reset"],
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true,
        },
        sortable: true,
        width: 112,
        resizable: true,
        menuTabs: ["filterMenuTab", "generalMenuTab"],
        headerName: "Bank LT Rating Description",
        field: "ltBankSummaryRatingClass",
        suppressFiltersToolPanel: false,
        suppressMenu: false,
        columnGroupShow: "open",
        minWidth: 112,
        colId: "ltBankSummaryRatingClass",
        rowGroup: false,
        rowGroupIndex: null,
        pivot: false,
        pivotIndex: null,
        aggFunc: null,
        pinned: null,
        sort: null,
        sortIndex: null,
      },
      {
        filter: {},
        filterParams: {
          showTooltips: true,
          buttons: ["reset"],
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true,
        },
        sortable: true,
        width: 112,
        resizable: true,
        menuTabs: ["filterMenuTab", "generalMenuTab"],
        headerName: "Last Bank LT Rating Action",
        field: "ltBankSummaryRatingAction",
        suppressFiltersToolPanel: false,
        suppressMenu: false,
        columnGroupShow: "open",
        minWidth: 112,
        colId: "ltBankSummaryRatingAction",
        rowGroup: false,
        rowGroupIndex: null,
        pivot: false,
        pivotIndex: null,
        aggFunc: null,
        pinned: null,
        sort: null,
        sortIndex: null,
      },
      {
        filter: {},
        filterParams: {
          showTooltips: true,
          buttons: ["reset"],
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true,
        },
        sortable: true,
        width: 112,
        resizable: true,
        menuTabs: ["filterMenuTab", "generalMenuTab"],
        headerClass: "ag-right-aligned-header",
        cellClass: "ag-right-aligned-cell",
        headerName: "Bank LT Rating Action Date",
        field: "ltBankSummaryRatingDate",
        suppressFiltersToolPanel: false,
        suppressMenu: false,
        columnGroupShow: "open",
        type: "rightAligned",
        minWidth: 112,
        sortingOrder: ["desc", "asc", null],
        colId: "ltBankSummaryRatingDate",
        rowGroup: false,
        rowGroupIndex: null,
        pivot: false,
        pivotIndex: null,
        aggFunc: null,
        pinned: null,
        sort: "desc",
        sortIndex: null,
      },
    ],
  };
  const mockVisibility = false;
  it("should return true when matching column definitions are found", async () => {
    const value = processColumnGroupChild(
      mockGroup as ColDef,
      "ltBankSummaryRating",
      mockVisibility,
      []
    );
    expect(value).toBe(true);
  });

  it("should return false when no matching column definitions are found", async () => {
    const value = processColumnGroupChild(
      mockGroup as ColDef,
      "ltRating",
      mockVisibility,
      []
    );
    expect(value).toBe(false);
  });

  it("should update array with nested groups that need updating.", async () => {
    const matchedSectors: ColGroupVisibilityState[] = [];
    const value = processColumnGroupChild(
      mockGroup as ColDef,
      "ltBankSummaryRating",
      mockVisibility,
      matchedSectors
    );
    expect(value).toBe(true);
    expect(matchedSectors.length).toBe(1);
  });
});
