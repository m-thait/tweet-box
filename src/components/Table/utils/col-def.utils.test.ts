import { ColDef as AgGridColDef, ValueFormatterFunc } from "ag-grid-enterprise";
import {
  ColumnFieldNames,
  ColumnGroup,
  ColumnProps,
  ColumnSortOrder,
  ColumnWidthType,
  ESGColumnFields,
} from "@moodys/mdc-table.schemas.screener";
import { ValueFormatterParams } from "ag-grid-community/dist/lib/entities/colDef";
import color from "@moodys/mdc-frontend.theming.colors";
import { AgGridSortOrder } from "@moodys/mdc-table.constants";
import { RootState, store } from "@services/redux";
import { mockTaxonomyStoreState } from "@services/redux/mocks";
import { RatingActions } from "@components/Table/Table.constants";
import {
  DETAILS_COLUMN_WIDTH,
  SCORE_LABELS,
  SUB_FACTOR_COLUMN_WIDTH,
} from "@constants/index";
import { getFilterSortOrder } from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.utils";
import { AEMEsgTooltipInfo } from "@models/aem.types";
import { EsgUserType } from "@models/api.types";
import { AgGridColumnType } from "@models/table.types";
import { TableViewType } from "@models/chart.types";
import { columnDef, columnGroup, firstColumnDef } from "../test/helper";
import { ScreenerFilter } from "../Filters/ScreenerFilter/ScreenerFilter";
import {
  addColorToRatingAction,
  setRatingActionColors,
  getLabelBasedOnField,
  setColumnWidth,
  setFirstColumnProps,
  setSortOrder,
  setTaxonomyFormatter,
  setTooltip,
  generateAgGridColumnDefs,
  generateColumnGroupState,
  generateColumnStates,
  generateColumnState,
  flattenColumns,
  flattenGroups,
} from "./col-def.utils";

describe("Column Definition Utils", () => {
  jest.spyOn(store, "getState").mockImplementation(() => {
    return mockTaxonomyStoreState.goodResponse as unknown as RootState;
  });

  const screenerColumnGroupProps = [
    {
      templateName: "Entity",
      openByDefault: true,
      columns: [
        {
          groupName: "Entity",
          headerName: "Issuer Name",
          fieldName: "issuer_name",
          dataType: "text",
          sequence: 1,
          formatter: "first_letter_capital",
          sortOrder: "atoz",
          tooltip: "issuer_name",
          isFilter: true,
          isDefault: true,
          isHyperlink: true,
          isGroup: true,
          isMedianCol: false,
          columnWidthType: ColumnWidthType.NAME,
          tabIds: [TableViewType.OVERVIEW, TableViewType.ESG],
        },
      ],
    },
    {
      templateName: "Other",
      openByDefault: false,
      columns: [
        {
          groupName: "Other",
          headerName: "Premium Score 2",
          fieldName: ColumnFieldNames.SOCIAL_HUMAN_CAPITAL,
          dataType: "number",
          sequence: 5,
          sortOrder: "atoz",
          tooltip: ColumnFieldNames.SOCIAL_HUMAN_CAPITAL,
          isFilter: true,
          isDefault: true,
          isHyperlink: false,
          isGroup: true,
          isMedianCol: true,
          isPremium: true,
          columnWidthType: ColumnWidthType.SUB_FACTOR,
          tabIds: [TableViewType.OVERVIEW],
        },
      ],
    },
  ];

  describe("setTaxonomyFormatter", () => {
    it("should set taxonomy formatter for country field", () => {
      const columnDef = {
        field: ColumnFieldNames.ORG_COUNTRY,
        filterParams: {},
      } as AgGridColDef;
      setTaxonomyFormatter(columnDef);

      expect(columnDef.valueFormatter).toBeDefined();
      expect(columnDef.filterParams.valueFormatter).toBeDefined();

      const formatted = (columnDef.valueFormatter as ValueFormatterFunc)({
        value: "Sri_Lanka",
      } as ValueFormatterParams);
      expect(formatted).toBe("Sri Lanka");
    });

    it("should set taxonomy formatter for industry field", () => {
      const columnDef = {
        field: ColumnFieldNames.ORG_INDUSTRY,
        filterParams: {},
      } as AgGridColDef;
      setTaxonomyFormatter(columnDef);

      expect(columnDef.valueFormatter).toBeDefined();
      expect(columnDef.filterParams.valueFormatter).toBeDefined();

      const formatted = (columnDef.valueFormatter as ValueFormatterFunc)({
        value: "Commercial_Vehicles_auto",
      } as ValueFormatterParams);
      expect(formatted).toBe("Commercial Vehicles");
    });

    it("should set taxonomy formatter for market segment field", () => {
      const columnDef = {
        field: ColumnFieldNames.ORG_MARKET_SEGMENT,
        filterParams: {},
      } as AgGridColDef;
      setTaxonomyFormatter(columnDef);

      expect(columnDef.valueFormatter).toBeDefined();
      expect(columnDef.filterParams.valueFormatter).toBeDefined();

      const formatted = (columnDef.valueFormatter as ValueFormatterFunc)({
        value: "Project_Finance",
      } as ValueFormatterParams);
      expect(formatted).toBe("Project Finance");
    });

    it("should not set taxonomy formatter for other fields", () => {
      const columnDef = {
        field: ColumnFieldNames.ORG_ISSUER_NAME,
        filterParams: {},
      } as AgGridColDef;
      setTaxonomyFormatter(columnDef);

      expect(columnDef.valueFormatter).toBeUndefined();
      expect(columnDef.filterParams.valueFormatter).toBeUndefined();
    });
  });

  describe("setTooltip", () => {
    it("should set tooltip on column definition", () => {
      const columnDef = {} as AgGridColDef;
      const tooltipKeyMap = "subSector";
      const tooltipText = "This is a sample sub-sector tooltip";
      const esgTooltip = {
        subSector: {
          headerName: "SubSector",
          tooltip: tooltipText,
        },
      };
      setTooltip(columnDef, tooltipKeyMap, esgTooltip);
      expect(columnDef.headerTooltip).toBe(tooltipText);
    });

    it("should not set tooltip on column definition", () => {
      const columnDef = {} as AgGridColDef;
      const tooltipKeyMap = "country";
      const tooltipText = "This is a sample sub-sector tooltip";
      const esgTooltip = {
        subSector: {
          headerName: "SubSector",
          tooltip: tooltipText,
        },
      };
      setTooltip(columnDef, tooltipKeyMap, esgTooltip);
      expect(columnDef.headerTooltip).toBeUndefined();
    });
  });

  describe("setColumnWidth", () => {
    it("should set default to DETAILS_COLUMN_WIDTH", () => {
      const columnDef = {} as AgGridColDef;

      setColumnWidth(columnDef);

      expect(columnDef.minWidth).toBe(DETAILS_COLUMN_WIDTH);
    });
  });

  describe("getLabelBasedOnField", () => {
    it("incorrect labels should export empty string", () => {
      const label = getLabelBasedOnField("notAField");
      expect(label).toBe("");
    });
    it("included labels should export correct prefix", () => {
      const label = getLabelBasedOnField(
        ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName
      );
      expect(label).toBe(SCORE_LABELS.CIS);
    });
  });

  describe("addColorToRatingAction", () => {
    it("should add green color to rating action field if value is upgrade", () => {
      const value = RatingActions.UPGRADE;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalGreen500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add green color to rating action field if value is upgraded", () => {
      const value = RatingActions.UPGRADED;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalGreen500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add green color to rating action field if value is possible upgrade", () => {
      const value = RatingActions.POSSIBLE_UPGRADE;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalGreen500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add red color to rating action field if value is downgrade", () => {
      const value = RatingActions.DOWNGRADE;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalRed500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add red color to rating action field if value is downgraded", () => {
      const value = RatingActions.DOWNGRADED;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalRed500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add red color to rating action field if value is possible downgrade", () => {
      const value = RatingActions.POSSIBLE_DOWNGRADE;

      const result = addColorToRatingAction(value);

      const mockResult = color.globalRed500;
      expect(result).toStrictEqual(mockResult);
    });

    it("should add no color to rating action field if value is not downgrade/possible downgrade or upgrade/possible upgrade", () => {
      const value = "Affirmation";

      const result = addColorToRatingAction(value);

      const mockResult = null;
      expect(result).toStrictEqual(mockResult);
    });
  });

  describe("setRatingActionColors", () => {
    it("should add a cellStyle to the colDef if the column is a rating action field", () => {
      const colDef: AgGridColDef = {
        field: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
      };

      const updatedColDef: AgGridColDef = {
        field: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
        cellStyle: expect.any(Function),
      };
      const filterSortOrder = getFilterSortOrder(colDef.field ?? "");

      setRatingActionColors(colDef, filterSortOrder);

      expect(colDef).toStrictEqual(updatedColDef);
      expect(colDef.cellStyle).toBeDefined();
    });
  });

  describe("Generate AgGrid Column Definitions", () => {
    describe("Generate Column Definition by User Type", () => {
      const screenerColumnProps: (ColumnProps | ColumnGroup)[] = [
        {
          templateName: "Entity",
          openByDefault: true,
          columns: [
            {
              groupName: "Entity",
              headerName: "Issuer Name",
              fieldName: "issuer_name",
              dataType: "text",
              formatter: "first_letter_capital",
              sortOrder: "atoz",
              tooltip: "issuer_name",
              isFilter: true,
              isDefault: true,
              isHyperlink: true,
              isGroup: true,
              isMedianCol: false,
              columnWidthType: ColumnWidthType.NAME,
              tabIds: [TableViewType.OVERVIEW],
            },
            {
              groupName: "Entity",
              headerName: "Market Segment",
              fieldName: "market_segment",
              dataType: "text",
              formatter: "first_letter_capital",
              sortOrder: "atoz",
              tooltip: "market_segment",
              isFilter: true,
              isDefault: true,
              isHyperlink: false,
              isGroup: true,
              isMedianCol: false,
              columnWidthType: ColumnWidthType.DETAILS_COLUMN,
              tabIds: [TableViewType.OVERVIEW],
            },
            {
              groupName: "Entity",
              headerName: "Issuer Score",
              fieldName: "issuer_score",
              dataType: "number",
              sortOrder: "atoz",
              tooltip: "issuer_score",
              isFilter: true,
              isDefault: true,
              isHyperlink: false,
              isGroup: true,
              isMedianCol: true,
              columnWidthType: ColumnWidthType.DETAILS_COLUMN,
              tabIds: [TableViewType.OVERVIEW],
            },
            {
              groupName: "Entity",
              headerName: "Premium Score 1",
              fieldName: ColumnFieldNames.ENV_PHYSICAL_CLIMATE_RISKS,
              dataType: "number",
              sortOrder: "atoz",
              tooltip: ColumnFieldNames.ENV_PHYSICAL_CLIMATE_RISKS,
              isFilter: true,
              isDefault: true,
              isHyperlink: false,
              isGroup: true,
              isMedianCol: true,
              isPremium: true,
              columnWidthType: ColumnWidthType.SUB_FACTOR,
              tabIds: [TableViewType.OVERVIEW],
            },
            {
              groupName: "Entity",
              headerName: "Premium Score 2",
              fieldName: ColumnFieldNames.SOCIAL_HUMAN_CAPITAL,
              dataType: "number",
              sortOrder: "atoz",
              tooltip: ColumnFieldNames.SOCIAL_HUMAN_CAPITAL,
              isFilter: true,
              isDefault: true,
              isHyperlink: false,
              isGroup: true,
              isMedianCol: true,
              isPremium: true,
              columnWidthType: ColumnWidthType.SUB_FACTOR,
              tabIds: [TableViewType.OVERVIEW],
            },
          ],
        },
      ];

      const esgTooltipInfo: AEMEsgTooltipInfo[] = [
        {
          issuer_name: { headerName: "Issuer Name", tooltip: ["Issuer Name"] },
          market_segment: {
            headerName: "Market Segment",
            tooltip: ["Market Segment"],
          },
          issuer_score: {
            headerName: "Issuer Score",
            tooltip: ["Issuer Score"],
          },
          environmentalPhysicalClimateRisks: {
            headerName: "Premium Score 1",
            tooltip: ["Premium Score 1"],
          },
          socialHumanCapital: {
            headerName: "Premium Score 2",
            tooltip: ["Premium Score 2"],
          },
        },
      ];

      it("should generate ag-grid column definitions for premium user", () => {
        const expected = columnGroup(screenerColumnProps[0] as ColumnGroup, [
          firstColumnDef("issuer_name", "Issuer Name", {
            hide: false,
          }),
          columnDef("market_segment", "Market Segment", {
            hide: false,
          }),
          columnDef("issuer_score", "Issuer Score", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            hide: false,
          }),
          columnDef("environmentalPhysicalClimateRisks", "Premium Score 1", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            cellRenderer: expect.any(Function),
            cellRendererParams: {
              isSubFactorCell: true,
            },
            hide: false,
          }),
          columnDef("socialHumanCapital", "Premium Score 2", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            cellRenderer: expect.any(Function),
            cellRendererParams: {
              isSubFactorCell: true,
            },
            hide: false,
          }),
        ]);

        const agGridColumnDefs = generateAgGridColumnDefs(
          screenerColumnProps,
          esgTooltipInfo,
          EsgUserType.ESG_PREMIUM,
          TableViewType.OVERVIEW,
          true
        );

        expect(agGridColumnDefs).toStrictEqual(expected);
      });

      it("should generate ag-grid column definitions for core user", () => {
        const expected = columnGroup(screenerColumnProps[0] as ColumnGroup, [
          firstColumnDef("issuer_name", "Issuer Name", {
            hide: false,
          }),
          columnDef("market_segment", "Market Segment", {
            hide: false,
          }),
          columnDef("issuer_score", "Issuer Score", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            hide: false,
          }),
        ]);
        const agGridColumnDefs = generateAgGridColumnDefs(
          screenerColumnProps,
          esgTooltipInfo,
          EsgUserType.ESG_CORE,
          TableViewType.OVERVIEW
        );
        expect(agGridColumnDefs).toStrictEqual(expected);
      });

      it("should generate ag-grid column definitions for none user", () => {
        const expected = columnGroup(screenerColumnProps[0] as ColumnGroup, []);

        const agGridColumnDefs = generateAgGridColumnDefs(
          screenerColumnProps,
          esgTooltipInfo,
          EsgUserType.ESG_NONE,
          TableViewType.OVERVIEW
        );

        expect(agGridColumnDefs).toStrictEqual(expected);
      });

      it("should hide all column definitions for other view", () => {
        const expected = columnGroup(screenerColumnProps[0] as ColumnGroup, [
          firstColumnDef("issuer_name", "Issuer Name", {
            hide: true,
          }),
          columnDef("market_segment", "Market Segment", {
            hide: true,
          }),
          columnDef("issuer_score", "Issuer Score", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            hide: true,
          }),
          columnDef("environmentalPhysicalClimateRisks", "Premium Score 1", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            cellRenderer: expect.any(Function),
            cellRendererParams: {
              isSubFactorCell: true,
            },
            hide: true,
          }),
          columnDef("socialHumanCapital", "Premium Score 2", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            cellRenderer: expect.any(Function),
            cellRendererParams: {
              isSubFactorCell: true,
            },
            hide: true,
          }),
        ]);

        const agGridColumnDefs = generateAgGridColumnDefs(
          screenerColumnProps,
          esgTooltipInfo,
          EsgUserType.ESG_PREMIUM,
          TableViewType.ESG,
          true
        );

        expect(agGridColumnDefs).toStrictEqual(expected);
      });
    });

    describe("Set Column Type", () => {
      it("should set numeric column type", () => {
        const screenerColumnProps: (ColumnProps | ColumnGroup)[] = [
          {
            templateName: "Entity",
            openByDefault: true,
            columns: [
              {
                groupName: "Entity",
                headerName: "Score1",
                fieldName: "score_1",
                dataType: "number",
                formatter: "first_letter_capital",
                sortOrder: "atoz",
                tooltip: "score_1",
                isFilter: true,
                isDefault: true,
                isHyperlink: true,
                isGroup: true,
                isMedianCol: false,
                columnWidthType: ColumnWidthType.SUB_FACTOR,
                tabIds: [TableViewType.OVERVIEW],
              },
              {
                groupName: "Entity",
                headerName: "Score2",
                fieldName: ESGColumnFields.CTA_SCORE.fieldName,
                dataType: "alpha-numeric",
                formatter: "first_letter_capital",
                sortOrder: "atoz",
                tooltip: "score_2",
                isFilter: true,
                isDefault: true,
                isHyperlink: false,
                isGroup: true,
                isMedianCol: false,
                columnWidthType: ColumnWidthType.SUB_FACTOR,
                tabIds: [TableViewType.OVERVIEW],
              },
            ],
          },
        ];

        const esgTooltipInfo: AEMEsgTooltipInfo[] = [
          {
            score_1: { headerName: "Score1", tooltip: ["Score1"] },
            score_2: { headerName: "Score2", tooltip: ["Score2"] },
          },
        ];

        const expected = columnGroup(screenerColumnProps[0] as ColumnGroup, [
          firstColumnDef("score_1", "Score1", {
            type: AgGridColumnType.NUMERIC_COLUMN,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            hide: false,
          }),
          columnDef(ESGColumnFields.CTA_SCORE.fieldName, "Score2", {
            type: AgGridColumnType.RIGHT_ALIGNED,
            cellRenderer: expect.any(Function),
            cellRendererParams: expect.anything(),
            filter: ScreenerFilter,
            minWidth: SUB_FACTOR_COLUMN_WIDTH,
            hide: false,
          }),
        ]);

        const agGridColumnDefs = generateAgGridColumnDefs(
          screenerColumnProps,
          esgTooltipInfo,
          EsgUserType.ESG_PREMIUM,
          TableViewType.OVERVIEW
        );

        expect(agGridColumnDefs).toStrictEqual(expected);
      });
    });
  });

  describe("setSortOrder", () => {
    it("should apply a custom sortingOrder if it's LATEST_FIRST", () => {
      const colDef: AgGridColDef = {
        field: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
      };
      setSortOrder(colDef, ColumnSortOrder.LATEST_FIRST);

      expect(colDef.sortingOrder ? colDef.sortingOrder[0] : "").toStrictEqual(
        AgGridSortOrder.DESC
      );
    });
    it("should not have a sortingOrder if not LATEST_FIRST", () => {
      const colDef: AgGridColDef = {
        field: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
      };
      setSortOrder(colDef, ColumnSortOrder.ATOZ);

      expect(colDef.sortingOrder).toBeUndefined();
    });
  });

  describe("setFirstColumnProps", () => {
    it("should apply correct props to the first column", () => {
      const colDef: AgGridColDef = {
        field: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
      };
      setFirstColumnProps(colDef);

      expect(colDef.sort).toStrictEqual(AgGridSortOrder.ASC);
      expect(colDef.suppressColumnsToolPanel).toBeTruthy();
      expect(colDef.lockPinned).toBeTruthy();
      expect(colDef.pinned).toStrictEqual("left");
    });
  });

  describe("generateColumnGroupState", () => {
    it("should process column groups into columnGroupState", () => {
      const columnGroupState = generateColumnGroupState(
        screenerColumnGroupProps
      );

      expect(columnGroupState.length).toStrictEqual(2);
      expect(columnGroupState[0].open).toBeTruthy();
      expect(columnGroupState[1].open).toBeFalsy();
    });
  });

  describe("generateColumnStates", () => {
    it("should process column groups into columnGroupState", () => {
      const columnStates = generateColumnStates(screenerColumnGroupProps);

      expect(columnStates[TableViewType.OVERVIEW]?.length).toStrictEqual(2);
      expect(columnStates[TableViewType.ESG]?.length).toStrictEqual(2);
    });
  });

  describe("generateColumnState", () => {
    it("should process column groups into columnGroupState", () => {
      const columnGroupStateOverview = generateColumnState(
        screenerColumnGroupProps,
        TableViewType.OVERVIEW
      );
      const columnGroupStateEsg = generateColumnState(
        screenerColumnGroupProps,
        TableViewType.ESG
      );
      expect(columnGroupStateOverview.length).toStrictEqual(2);
      expect(columnGroupStateOverview[0].hide).toBeFalsy();
      expect(columnGroupStateOverview[1].hide).toBeFalsy();
      expect(columnGroupStateEsg.length).toStrictEqual(2);
      expect(columnGroupStateEsg[0].hide).toBeFalsy();
      expect(columnGroupStateEsg[1].hide).toBeTruthy();
    });
  });

  describe("flatten columns and groups", () => {
    const multiLevelProps: (ColumnProps | ColumnGroup)[] = [
      {
        templateName: "Entity",
        openByDefault: true,
        columns: [
          {
            groupName: "Entity",
            headerName: "Issuer Name",
            fieldName: "issuer_name",
            dataType: "text",
            tabIds: [],
          },
          {
            templateName: "Sub-Entity",
            openByDefault: false,
            columns: [
              {
                groupName: "Sub-Entity",
                headerName: "Premium Score 1",
                fieldName: "issuer_name",
                dataType: "text",
                tabIds: [],
              },
            ],
          },
        ],
      },
      {
        templateName: "Other",
        openByDefault: false,
        columns: [
          {
            groupName: "Other",
            headerName: "Premium Score 2",
            fieldName: ColumnFieldNames.SOCIAL_HUMAN_CAPITAL,
            dataType: "number",
            tabIds: [],
          },
        ],
      },
    ];
    it("flattenColumns", () => {
      const flatColumns = flattenColumns(multiLevelProps);

      expect(flatColumns.length).toStrictEqual(3);
      expect(flatColumns[0].headerName).toStrictEqual("Issuer Name");
      expect(flatColumns[1].headerName).toStrictEqual("Premium Score 1");
      expect(flatColumns[2].headerName).toStrictEqual("Premium Score 2");
    });

    it("flattenGroups", () => {
      const flatGroups = flattenGroups(multiLevelProps);

      expect(flatGroups.length).toStrictEqual(3);
      expect(flatGroups[0].templateName).toStrictEqual("Entity");
      expect(flatGroups[1].templateName).toStrictEqual("Sub-Entity");
      expect(flatGroups[2].templateName).toStrictEqual("Other");
    });
  });
});
