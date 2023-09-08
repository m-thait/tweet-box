import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { ColGroupDef, ColDef, ColumnApi } from "ag-grid-community";
import {
  GenerateColumnComposition,
  ColumnCompositionMap,
  ColumnComposition,
  GeneratedColumnMap,
  MatchedColumn,
  bankingSectorsMap,
  usPublicFinanceSectorsMap,
  sovereignAndSupernationSectorsMaps,
  subSovereignSectorsMaps,
  TaxonomySectorLabels,
  subFactorFieldsMap,
  defaultSectorMap,
  corporatesSectorMap,
  MatchedSectorsSorts,
  ColGroupVisibilityState,
} from "@models/column-compositions.types";
import { SeoLabelMap, TaxonomyItem } from "@models/taxonomy.types";
import { EsgUserType } from "@models/api.types";
import { AgGridSortOrder } from "@models/table.types";
const getChildSectors = (sector: TaxonomyItem, sectors: string[] = []) => {
  return sector.Children?.reduce(
    (accumulator: string[], child: TaxonomyItem) => {
      accumulator.push(child.OwlID);
      if (child.Children) {
        const childItems = getChildSectors(child);
        accumulator = [...accumulator, ...childItems];
      }
      return accumulator;
    },
    sectors
  ) as string[];
};

export const getValuesFromTaxonomyLabelMap = (
  taxonomyData?: SeoLabelMap,
  filterValue?: TaxonomySectorLabels | string
): string[] => {
  if (taxonomyData && taxonomyData[filterValue as string]) {
    let values = [taxonomyData[filterValue as string].OwlID];
    const childItems = getChildSectors(taxonomyData[filterValue as string]);
    if (Array.isArray(childItems) && childItems.length > 0) {
      values = values.concat(childItems);
    }
    return [...new Set(values)];
  }
  return [];
};

export const buildColumnCompositionMaps = (taxonomyData: SeoLabelMap) => {
  const bankingSectors = getValuesFromTaxonomyLabelMap(
    taxonomyData,
    TaxonomySectorLabels.BANKING
  );
  const corporatesSectors = getValuesFromTaxonomyLabelMap(
    taxonomyData,
    TaxonomySectorLabels.CORPORATES
  );
  const usPublicFinanceSectors = getValuesFromTaxonomyLabelMap(
    taxonomyData,
    TaxonomySectorLabels.US_PUBLIC_FINANCE
  );
  const sovereignAndSupernationSectors = getValuesFromTaxonomyLabelMap(
    taxonomyData,
    TaxonomySectorLabels.SOVEREIGN_AND_SUPRANATIONAL
  );
  const subSovereignSectors = getValuesFromTaxonomyLabelMap(
    taxonomyData,
    TaxonomySectorLabels.SUB_SOVEREIGN
  );
  const ColumnCompositions: ColumnCompositionMap = {
    default: defaultSectorMap,
    ...bankingSectors.reduce((builtMap, key) => {
      return {
        ...builtMap,
        [key]: bankingSectorsMap,
      };
    }, {}),
    ...corporatesSectors.reduce((builtMap, key) => {
      return {
        ...builtMap,
        [key]: corporatesSectorMap,
      };
    }, {}),
    ...usPublicFinanceSectors.reduce((builtMap, key) => {
      return {
        ...builtMap,
        [key]: usPublicFinanceSectorsMap,
      };
    }, {}),
    ...sovereignAndSupernationSectors.reduce((builtMap, key) => {
      return {
        ...builtMap,
        [key]: sovereignAndSupernationSectorsMaps,
      };
    }, {}),
    ...subSovereignSectors.reduce((builtMap, key) => {
      return {
        ...builtMap,
        [key]: subSovereignSectorsMaps,
      };
    }, {}),
  };
  return ColumnCompositions;
};

export const subFactorScoreCheck = (
  column: ColumnFieldNames,
  userType: EsgUserType
) => {
  const isSubFactorField = subFactorFieldsMap[column];
  if (!isSubFactorField) {
    return true;
  }
  return userType !== EsgUserType.ESG_CORE;
};

export const showColumnInComposition = (
  column: ColumnFieldNames,
  columnComposition: ColumnComposition,
  matchedColumns: MatchedColumn,
  userType: EsgUserType
) => {
  if (subFactorScoreCheck(column as ColumnFieldNames, userType)) {
    columnComposition.shownColumns[column] = true;
    delete columnComposition.hiddenColumns[column];
    matchedColumns[column] = true;
  }
};

// eslint-disable-next-line complexity
export const generateColumnComposition = (
  params: GenerateColumnComposition
): GeneratedColumnMap => {
  const {
    columnCompositionMap,
    columnComposition,
    filterModel,
    columnApi,
    userType,
  } = params;
  let unmatchedSector = false;
  const matchedSectorsMap: MatchedSectorsSorts = {};
  const matchedColumns: MatchedColumn = {};
  const { values = [] } = filterModel[ColumnFieldNames.ORG_INDUSTRY] ?? {
    values: [] as string[],
  };
  for (const sector of values as string[]) {
    const sectorComposition = columnCompositionMap[sector];

    // If we have a composition for this sector,
    // we need to update our current composition
    // to account for this map so we are modifying
    // which columns to hide and show based on
    // the sectors composition.
    if (sectorComposition) {
      matchedSectorsMap[sectorComposition.label] = sectorComposition.sort;
      columnComposition.sort = sectorComposition.sort;
      for (const column in sectorComposition.hiddenColumns) {
        if (!matchedColumns[column]) {
          columnComposition.hiddenColumns[column] = false;
          delete columnComposition.shownColumns[column];
          matchedColumns[column] = false;
        }
      }
      for (const column in sectorComposition.shownColumns) {
        // only turn on the column if its not a subfactor score,
        // or it is a subfactor score and userType is not CORE.
        showColumnInComposition(
          column as ColumnFieldNames,
          columnComposition,
          matchedColumns,
          userType
        );
      }
    } else {
      unmatchedSector = true;
    }
  }

  let multipleSectorCompositionsSortsSelected = false;
  Object.values(matchedSectorsMap).reduce((result, value) => {
    if (result.keyword !== value.keyword) {
      multipleSectorCompositionsSortsSelected = true;
    }
    result = value;
    return result;
  }, Object.values(matchedSectorsMap)[0]);
  if (multipleSectorCompositionsSortsSelected || unmatchedSector) {
    columnComposition.sort = columnCompositionMap.default.sort;
  }

  const multipleSectorCompositionsSelected =
    Object.keys(matchedSectorsMap).length > 1;

  if (
    unmatchedSector ||
    multipleSectorCompositionsSelected ||
    (values as string[]).length === 0
  ) {
    // We do not update hidden columns at this point as they have been
    // turned off by a previous sector in filter. Only need to turn on
    // columns to ensure default values intended to be shown, are shown.
    // Also ensure any specifically filtered columns will show.
    for (const column in columnCompositionMap.default.shownColumns) {
      showColumnInComposition(
        column as ColumnFieldNames,
        columnComposition,
        matchedColumns,
        userType
      );
    }
    for (const column in Object.keys(filterModel)) {
      showColumnInComposition(
        column as ColumnFieldNames,
        columnComposition,
        matchedColumns,
        userType
      );
    }
  }

  columnApi.applyColumnState({
    state: [
      {
        colId: columnComposition.sort.keyword,
        sort: columnComposition.sort.order as AgGridSortOrder,
      },
    ],
    defaultState: { sort: null },
  });

  const hideKeys = Object.keys(columnComposition.hiddenColumns);
  const showKeys = Object.keys(columnComposition.shownColumns);
  columnApi.setColumnsVisible(hideKeys, false);
  columnApi.setColumnsVisible(showKeys, true);

  return { columnComposition, matchedColumns };
};

export const processColumnGroupChild = (
  def: ColDef | ColGroupDef,
  column: string,
  visibility: boolean,
  nestedSectors: ColGroupVisibilityState[]
): boolean => {
  let columnCheck = false;
  if ((def as ColGroupDef)?.groupId) {
    const group = def as ColGroupDef;
    nestedSectors.push({
      groupId: group.groupId as string,
      open: visibility,
    });
    const defs: ColDef[] | ColGroupDef[] = group?.children?.filter(
      (def: ColDef | ColGroupDef) => {
        return processColumnGroupChild(def, column, visibility, nestedSectors);
      }
    );

    columnCheck = defs.length > 0;
  } else {
    columnCheck = (def as ColDef).field === column;
  }
  return columnCheck;
};

export const configureColumnGroupsForComposition = (
  columnDefintions: ColGroupDef[],
  matchedColumns: MatchedColumn,
  columnApi: ColumnApi
) => {
  Object.entries(matchedColumns).forEach((entry) => {
    const [column, visibility] = entry;
    const nestedSectors: ColGroupVisibilityState[] = [];
    const sectorGroup = (columnDefintions as ColGroupDef[])
      .filter((group: ColGroupDef) => {
        const defs = group?.children?.filter((def: ColDef | ColGroupDef) => {
          return processColumnGroupChild(
            def,
            column,
            visibility,
            nestedSectors
          );
        });
        return defs.length > 0;
      })
      .map((colDef: ColGroupDef) => {
        return {
          groupId: colDef.groupId as string,
          open: visibility,
        };
      });
    columnApi.setColumnGroupState(sectorGroup.concat(nestedSectors));
  });
};
