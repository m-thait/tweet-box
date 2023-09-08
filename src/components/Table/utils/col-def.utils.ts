/* eslint-disable complexity */
import {
  ColDef as AgGridColDef,
  ColGroupDef as AgGridColGroupDef,
  ColumnState,
  ICellRendererParams,
  ColumnGroupShowType,
} from "ag-grid-enterprise";
import { TooltipRendererParams } from "ag-grid-community";
import color from "@moodys/mdc-frontend.theming.colors";
import {
  formatAllCaps,
  formatTitleCase,
} from "@moodys/mdc-frontend.utils.string";
import {
  replaceSpaceWithDash,
  sortOrder,
  containsNumber,
} from "@moodys/mdc-table.utils.string";
import { roundValueFormatter } from "@moodys/mdc-table.value-formatters.round";
import {
  AgGridSortOrder,
  BLANK_SPACES,
  DESCRIPTIVE_BLANKS,
} from "@moodys/mdc-table.constants";
import { dateValueFormatter } from "@moodys/mdc-table.value-formatters.date";
import { DateFilter } from "@moodys/mdc-table.filters.date-filter";
import {
  removePendingOnRating,
  checkForPendingRatings,
} from "@moodys/mdc-table.utils.ratings";
import {
  ColumnDataType,
  ColumnFormatter,
  ColumnWidthType,
  ColumnFieldNames,
  FilterSortOrder,
  ESGColumnFields,
  SUB_FACTOR_SCORE_FIELDS,
  ColumnSortOrder,
  SortParams,
  ColumnProps,
  ColumnGroup,
} from "@moodys/mdc-table.schemas.screener";
import {
  AEMEsgTooltipInfo,
  AgGridColumnType,
  EsgUserType,
  TableViewType,
  TaxonomyType,
} from "@models/index";
import {
  DETAILS_COLUMN_WIDTH,
  PINNED_NAME_COLUMN_WIDTH,
  SCORE_FIELDS,
  SCORE_LABELS,
  SUB_FACTOR_COLUMN_WIDTH,
  TAXONOMY_FIELDS,
} from "@constants/index";
import {
  FirstColumnRenderer,
  GroupHeaderRenderer,
  MedianCellRenderer,
  AnalystCellRenderer,
} from "@components/Table/renderers";
import { ScoreCellRenderer } from "@components/Table/renderers/ScoreCell/ScoreCellRenderer";
import { getTaxonomy, store } from "@services/redux";
import { RatingActions } from "@components/Table/Table.constants";
import { ScreenerFilter } from "@components/Table/Filters/ScreenerFilter/ScreenerFilter";
import { getFilterSortOrder } from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.utils";
import { IssuerOutlookCellRenderer } from "../renderers/IssueOutlookCell/IssuerOutlookCellRenderer";
import { NestedGroupHeaderRenderer } from "../renderers/NestedGroupHeader/NestedGroupHeaderRenderer";
import { tooltipRenderer, generateSparklinePoints } from "./sparkline.utils";

export const generateAgGridColumnDefs = (
  schema: (ColumnProps | ColumnGroup)[],
  esgTooltip: AEMEsgTooltipInfo[],
  userType: EsgUserType,
  currentTableView: TableViewType,
  viewTabsEnabled?: boolean
) => {
  const columnDefs = schema.map((group, i) =>
    getGroupColumnDef(
      group,
      i === 0,
      esgTooltip?.[0],
      userType,
      currentTableView,
      viewTabsEnabled
    )
  );
  return columnDefs;
};

const getGroupColumnDef = (
  colGroup: ColumnProps | ColumnGroup,
  isFirstGroup: boolean,
  esgTooltip: AEMEsgTooltipInfo,
  userType: EsgUserType,
  currentTableView: TableViewType,
  viewTabsEnabled?: boolean
) => {
  const {
    templateName,
    columns,
    openByDefault,
    isNestedGroup,
    showInGroupWhen,
  } = colGroup as ColumnGroup;

  const groupColumnDef: AgGridColGroupDef = {
    headerName: templateName,
    groupId: replaceSpaceWithDash(templateName),
    openByDefault,
    marryChildren: true,
    headerGroupComponent: isNestedGroup
      ? NestedGroupHeaderRenderer()
      : GroupHeaderRenderer(isFirstGroup),
    columnGroupShow: (showInGroupWhen as ColumnGroupShowType) ?? undefined,
    children: columns.reduce((colDefs, column, i) => {
      switch (userType) {
        case EsgUserType.ESG_PREMIUM:
          if ("columns" in column) {
            colDefs.push(
              getGroupColumnDef(
                column,
                isFirstGroup,
                esgTooltip,
                userType,
                currentTableView,
                viewTabsEnabled
              )
            );
          } else {
            colDefs.push(
              getColumnDef(
                column,
                i === 0,
                i === 0 && isFirstGroup,
                esgTooltip,
                currentTableView,
                viewTabsEnabled
              )
            );
          }

          return colDefs;
        case EsgUserType.ESG_CORE:
          if ("columns" in column) {
            colDefs.push(
              getGroupColumnDef(
                column,
                isFirstGroup,
                esgTooltip,
                userType,
                currentTableView,
                viewTabsEnabled
              )
            );
          } else {
            if (
              !SUB_FACTOR_SCORE_FIELDS.includes(
                column.fieldName as ColumnFieldNames
              )
            ) {
              colDefs.push(
                getColumnDef(
                  column,
                  i === 0,
                  i === 0 && isFirstGroup,
                  esgTooltip,
                  currentTableView,
                  viewTabsEnabled
                )
              );
            }
          }
          return colDefs;
        default:
          return colDefs;
      }
    }, [] as AgGridColDef[]),
  };

  return groupColumnDef;
};

const getColumnDef = (
  colProps: ColumnProps,
  showOnClose = false,
  isFirstColumn: boolean,
  esgTooltip: AEMEsgTooltipInfo,
  currentTableView: TableViewType,
  viewTabsEnabled?: boolean
) => {
  const {
    headerName,
    fieldName,
    dataType,
    isDefault,
    tooltip: tooltipKeyMap,
    formatter,
    columnWidthType,
    sortOrder: columnSortOrder,
    sortable = true,
    isFilter,
    tabIds,
    showInGroupWhen,
  } = colProps;

  const columnDef: AgGridColDef = {
    headerName,
    field: fieldName,
    valueFormatter: undefined,
    sortable,
    suppressFiltersToolPanel: !isFilter,
    suppressMenu: !isFilter,
    hide: viewTabsEnabled ? !tabIds.includes(currentTableView) : !isDefault,
    columnGroupShow: (showInGroupWhen as ColumnGroupShowType) ?? undefined,
    filterParams: {
      buttons: ["reset"],
      refreshValuesOnOpen: true,
      defaultToNothingSelected: true,
    },
  };

  const filterSortOrder: FilterSortOrder | string =
    getFilterSortOrder(fieldName);

  setColumnType(
    columnDef,
    dataType as ColumnDataType,
    fieldName as ColumnFieldNames
  );
  setColumnWidth(columnDef, columnWidthType);
  setColumnGroupShow(columnDef, showOnClose);
  setTooltip(columnDef, tooltipKeyMap, esgTooltip);
  setFormatter(
    columnDef,
    formatter as ColumnFormatter,
    fieldName as ColumnFieldNames
  );
  setTaxonomyFormatter(columnDef);
  isFirstColumn && setFirstColumnProps(columnDef);
  setCustomCellRenderers(columnDef, fieldName as ColumnFieldNames);
  setCustomFilter(columnDef, dataType as ColumnDataType);
  setRatingActionColors(columnDef, filterSortOrder);
  setSortOrder(columnDef, columnSortOrder as ColumnSortOrder);
  setSparklineColumn(columnDef);
  return columnDef;
};

const setSparklineColumn = (columnDef: AgGridColDef) => {
  const isSparkline = columnDef.field === ColumnFieldNames.LT_RATING_SPARKLINE;
  const isBankSparkline =
    columnDef.field === ColumnFieldNames.LT_BANK_RATING_SPARKLINE;
  if (isSparkline || isBankSparkline) {
    columnDef.cellRenderer = "agSparklineCellRenderer";
    columnDef.cellRendererParams = {
      sparklineOptions: {
        type: "line",
        xKey: "date",
        yKey: "rank",
        zKey: "rating",
        line: {
          stroke: color.globalBlue600,
          strokeWidth: 1.3,
        },
        axis: {
          stroke: color.globalWhite,
          type: "time",
        },
        padding: {
          top: 8,
          bottom: 8,
          left: 18,
          right: 18,
        },
        crosshairs: {
          xLine: {
            enabled: false, // enabled by default
          },
          yLine: {
            enabled: true,
            stroke: `${color.globalBlue700}1E`,
          },
        },
        highlightStyle: {
          size: 6,
          fill: color.globalBlue600,
          stroke: color.globalBlue600,
        },
        tooltip: {
          renderer: (params: TooltipRendererParams) =>
            tooltipRenderer(params, columnDef.field as ColumnFieldNames),
        },
      },
    };
    columnDef.valueGetter = (params) => {
      if (!params.data) {
        return null;
      }
      const sparklineData = params.data[columnDef.field as string];
      if (sparklineData) {
        return generateSparklinePoints(sparklineData);
      }
      return null;
    };
  }
};

export const setSortColumnProps = (
  columnDef: AgGridColDef,
  columnDefGroup: ColumnGroup,
  presetFilterSortModel: SortParams
) => {
  if (columnDef.field === presetFilterSortModel.keyword) {
    columnDef.sort = presetFilterSortModel.order;
    columnDefGroup.openByDefault = true;
  }
};

export const setFirstColumnProps = (columnDef: AgGridColDef) => {
  columnDef.cellRenderer = FirstColumnRenderer;
  columnDef.pinned = "left";
  columnDef.lockPinned = true;
  columnDef.suppressColumnsToolPanel = true;
  columnDef.sort = AgGridSortOrder.ASC;
};

export const setColumnWidth = (
  columnDef: AgGridColDef,
  columnWidthType?: ColumnWidthType
) => {
  switch (columnWidthType) {
    case ColumnWidthType.NAME:
      columnDef.minWidth = PINNED_NAME_COLUMN_WIDTH;
      break;
    case ColumnWidthType.DETAILS_COLUMN:
      columnDef.minWidth = DETAILS_COLUMN_WIDTH;
      break;
    case ColumnWidthType.SUB_FACTOR:
      columnDef.minWidth = SUB_FACTOR_COLUMN_WIDTH;
      break;
    default:
      columnDef.minWidth = DETAILS_COLUMN_WIDTH;
  }
};

export const sortNumericFilterOptions = (
  a: string | null,
  b: string | null
) => {
  if (containsNumber(a ?? "") && containsNumber(b ?? "")) {
    return parseInt(a ?? "") - parseInt(b ?? "");
  }
  return 1;
};

export const creditRatingFilterAndSortOrder = (
  a: string | null,
  b: string | null
) => {
  if (!a) {
    return 1;
  }

  if (!b) {
    return -1;
  }

  const aValue = removePendingOnRating(a);
  const bValue = removePendingOnRating(b);

  if (aValue === bValue) {
    if (checkForPendingRatings(a) && checkForPendingRatings(b)) {
      return 0;
    } else if (checkForPendingRatings(a)) {
      return 1;
    } else if (checkForPendingRatings(b)) {
      return -1;
    }
  } else if (aValue?.[0] === bValue?.[0]) {
    if (
      aValue &&
      bValue &&
      containsNumber(<string>aValue) &&
      containsNumber(<string>bValue) &&
      aValue.length === bValue.length
    ) {
      {
        return sortOrder(<string>aValue, <string>bValue);
      }
    }
    return sortOrder(<string>aValue, <string>bValue, true);
  } else {
    return sortOrder(<string>aValue, <string>bValue);
  }
  return 0;
};

export const getLabelBasedOnField = (field: string) => {
  const mapFieldToLabel = {
    [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]: SCORE_LABELS.CIS,
    [ESGColumnFields.ENV_IPS_SCORE.fieldName]: SCORE_LABELS.ENV_IPS,
    [ESGColumnFields.SOCIAL_IPS_SCORE.fieldName]: SCORE_LABELS.SOCIAL_IPS,
    [ESGColumnFields.GOV_IPS_SCORE.fieldName]: SCORE_LABELS.GOV_IPS,
    [ESGColumnFields.CTA_SCORE.fieldName]: SCORE_LABELS.CTA,
  };
  const label = mapFieldToLabel[field];
  return label ?? "";
};

export const setFormatter = (
  columnDef: AgGridColDef,
  formatter: ColumnFormatter,
  fieldName: ColumnFieldNames
) => {
  if (TAXONOMY_FIELDS.includes(columnDef.field as ColumnFieldNames)) {
    return;
  }
  switch (formatter) {
    case ColumnFormatter.TITLE_CASE:
      columnDef.valueFormatter = ({ value }) => {
        return formatTitleCase(value, BLANK_SPACES) as string;
      };
      columnDef.filterParams.valueFormatter = ({
        value,
      }: {
        value: string;
      }) => {
        return formatTitleCase(value, BLANK_SPACES);
      };
      break;
    case ColumnFormatter.ALL_LETTER_CAPITAL:
      columnDef.valueFormatter = ({ value }) => {
        return formatAllCaps(value, BLANK_SPACES) as string;
      };
      columnDef.filterParams.valueFormatter = ({
        value,
      }: {
        value: string;
      }) => {
        return formatAllCaps(value, BLANK_SPACES);
      };
      break;
    case ColumnFormatter.SHORT_DATE:
      columnDef.valueFormatter = ({ value }) => {
        return dateValueFormatter(value);
      };
      columnDef.filterParams.valueFormatter = ({
        value,
      }: {
        value: string;
      }) => {
        return dateValueFormatter(value);
      };
      break;
    case ColumnFormatter.ROUND_NUMBER:
      columnDef.valueFormatter = ({ value }) => roundValueFormatter(value);
      columnDef.filterParams.valueFormatter = ({ value }: { value: string }) =>
        roundValueFormatter(value);
      break;
    case ColumnFormatter.ADD_PREFIX:
      columnDef.valueFormatter = ({ value }) => {
        const isInvalidScore = value === BLANK_SPACES || !value;
        return !isInvalidScore
          ? `${getLabelBasedOnField(fieldName)}${value}`
          : BLANK_SPACES;
      };
      break;
    default:
      columnDef.valueFormatter = ({ value }) => {
        return value ? value : BLANK_SPACES;
      };
      columnDef.filterParams.valueFormatter = ({
        value,
      }: {
        value: string;
      }) => {
        return value ? value : DESCRIPTIVE_BLANKS;
      };
      break;
  }
};

export const setTaxonomyFormatter = (columnDef: AgGridColDef) => {
  const state = store.getState();
  const { data: taxonomyInfo } = getTaxonomy(state);
  const countryLabelMapping = taxonomyInfo?.[TaxonomyType.REGION]?.labelMap;
  const industryLabelMapping =
    taxonomyInfo?.[TaxonomyType.MARKET_SEGMENT]?.labelMap;

  const formatCountry = ({ value }: { value: string }): string =>
    value
      ? countryLabelMapping?.[value] ??
        (formatTitleCase(value, BLANK_SPACES) as string)
      : BLANK_SPACES;
  const formatIndustry = ({ value }: { value: string }): string =>
    value
      ? industryLabelMapping?.[value] ??
        (formatTitleCase(value, BLANK_SPACES) as string)
      : BLANK_SPACES;

  switch (columnDef.field) {
    case ColumnFieldNames.ORG_COUNTRY:
      if (countryLabelMapping) {
        columnDef.valueFormatter = formatCountry;
        columnDef.filterParams.valueFormatter = formatCountry;
      }
      break;
    case ColumnFieldNames.ORG_INDUSTRY:
    case ColumnFieldNames.ORG_MARKET_SEGMENT:
      if (industryLabelMapping) {
        columnDef.valueFormatter = formatIndustry;
        columnDef.filterParams.valueFormatter = formatIndustry;
      }
      break;
  }
};

const setColumnType = (
  columnDef: AgGridColDef,
  dataType: ColumnDataType,
  fieldName: ColumnFieldNames
) => {
  if (dataType === ColumnDataType.NUMBER) {
    columnDef.type = AgGridColumnType.NUMERIC_COLUMN;
  }
  if (dataType === ColumnDataType.DATE) {
    columnDef.type = AgGridColumnType.RIGHT_ALIGNED;
  }
  if (SCORE_FIELDS.includes(fieldName)) {
    columnDef.type = AgGridColumnType.RIGHT_ALIGNED;
  }
};

const setColumnGroupShow = (columnDef: AgGridColDef, showOnClose?: boolean) => {
  if (!showOnClose) {
    columnDef.columnGroupShow = "open";
  }
};

export const setTooltip = (
  columnDef: AgGridColDef,
  tooltipKeyMap: string | undefined,
  esgTooltip: AEMEsgTooltipInfo
) => {
  if (tooltipKeyMap) {
    const tooltipObj = esgTooltip?.[tooltipKeyMap];
    if (tooltipObj?.tooltip?.length > 0) {
      columnDef.headerTooltip = tooltipObj.tooltip as string;
    }
  }
};

const setCustomFilter = (columnDef: AgGridColDef, dataType: ColumnDataType) => {
  if (dataType === ColumnDataType.DATE) {
    columnDef.filter = DateFilter;
  } else {
    columnDef.filter = ScreenerFilter;
  }
};

// eslint-disable-next-line complexity
export const setCustomCellRenderers = (
  columnDef: AgGridColDef,
  fieldName: ColumnFieldNames
) => {
  switch (fieldName) {
    case ESGColumnFields.ORG_ISSUER_NAME.fieldName:
      columnDef.cellRendererSelector = (params: ICellRendererParams) => {
        if (params.node.rowPinned) {
          return {
            component: MedianCellRenderer,
          };
        }
      };
      break;
    case ESGColumnFields.LT_RATING_ISSUER_OUTLOOK.fieldName:
      columnDef.cellRenderer = IssuerOutlookCellRenderer;
      break;
    case ESGColumnFields.ORG_ANALYST_NAME.fieldName:
      columnDef.cellRenderer = AnalystCellRenderer;
      break;
    default:
      break;
  }
  if (SCORE_FIELDS.includes(fieldName)) {
    columnDef.cellRenderer = ScoreCellRenderer;
  }

  if (SUB_FACTOR_SCORE_FIELDS.includes(fieldName)) {
    columnDef.cellRenderer = ScoreCellRenderer;
    columnDef.cellRendererParams = {
      isSubFactorCell: true,
    };
  }
};

// eslint-disable-next-line complexity
export const addColorToRatingAction = (value: string | null | undefined) => {
  const lowerCasedVal = value?.toLowerCase();
  switch (lowerCasedVal) {
    case RatingActions.UPGRADE:
    case RatingActions.UPGRADED:
    case RatingActions.POSSIBLE_UPGRADE:
      return color.globalGreen500;
    case RatingActions.DOWNGRADE:
    case RatingActions.DOWNGRADED:
    case RatingActions.POSSIBLE_DOWNGRADE:
      return color.globalRed500;
    default:
      return null;
  }
};

export const setRatingActionColors = (
  columnDef: AgGridColDef,
  filterSortOrder: FilterSortOrder | string
) => {
  switch (filterSortOrder) {
    case FilterSortOrder.RATING_ACTION_FILTER_SORT:
      columnDef.cellStyle = (params) => {
        return { color: `${addColorToRatingAction(params.value)}` };
      };
      break;
  }
};

export const setSortOrder = (
  columnDef: AgGridColDef,
  columnSortOrder: ColumnSortOrder
) => {
  if (columnSortOrder === ColumnSortOrder.LATEST_FIRST) {
    columnDef.sortingOrder = [AgGridSortOrder.DESC, AgGridSortOrder.ASC, null];
  }
};

export const generateColumnGroupState = (
  colGroups: (ColumnProps | ColumnGroup)[]
) => {
  const flatGroups = flattenGroups(colGroups);
  return flatGroups.map((group) => {
    const groupId = replaceSpaceWithDash(group.templateName);
    return { groupId, open: group.openByDefault };
  });
};

export const generateColumnStates = (
  colGroups: (ColumnProps | ColumnGroup)[]
) => {
  const result: Record<TableViewType, ColumnState[] | null> = {
    [TableViewType.OVERVIEW]: null,
    [TableViewType.ESG]: null,
  };
  Object.values(TableViewType).forEach((type) => {
    result[type] = generateColumnState(colGroups, type);
  });
  return result;
};

export const generateColumnState = (
  colGroups: (ColumnProps | ColumnGroup)[],
  tableView: TableViewType
): ColumnState[] => {
  const columns = flattenColumns(colGroups);

  return columns.map((column, idx) => {
    if (idx === 0) {
      return {
        colId: column.fieldName,
        width: PINNED_NAME_COLUMN_WIDTH,
        hide: !column.tabIds.includes(tableView),
        pinned: "left",
        sort: "asc",
      };
    }
    return {
      colId: column.fieldName,
      width: DETAILS_COLUMN_WIDTH,
      hide: !column.tabIds.includes(tableView),
      pinned: null,
      sort: null,
    };
  });
};

export const flattenColumns = (
  colGroups: (ColumnProps | ColumnGroup)[]
): ColumnProps[] => {
  const colGroupsArray = Array.from(colGroups);
  let result: ColumnProps[] = [];
  colGroupsArray.forEach((groupOrColumn) => {
    if ("columns" in groupOrColumn) {
      result = result.concat(flattenColumns(groupOrColumn.columns));
    } else {
      result.push(groupOrColumn);
    }
  });

  return result;
};

export const flattenGroups = (
  colGroups: (ColumnProps | ColumnGroup)[]
): ColumnGroup[] => {
  const colGroupsArray = Array.from(colGroups);
  let result: ColumnGroup[] = [];
  colGroupsArray.forEach((groupOrColumn) => {
    if ("columns" in groupOrColumn) {
      result.push(groupOrColumn);
      result = result.concat(flattenGroups(groupOrColumn.columns));
    }
  });

  return result;
};
