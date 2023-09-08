import { useCallback, useEffect, useState } from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import {
  getSubSectorFacets,
  getSubSectorFilterModel,
  getTaxonomy,
  saveSubSectorFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";
import { TreeSelectOption } from "@models/tree-select.types";
import { AgGridFilterType } from "@models/table.types";
import { getAgGridFilterModelValues } from "../TopFilter.utils";
import { useSyncFilterModels } from "../TopFilter.hooks";
import type { GridApi } from "ag-grid-enterprise";

const SECTOR_FIELD = ColumnFieldNames.ORG_INDUSTRY;

export const useMarketSegmentTreeSelectEvents = (gridApi: GridApi) => {
  const [sectorSelected, setSectorSelected] = useState<TreeSelectOption[]>([]);
  const [sectorSelectAll, setSectorSelectAll] = useState<boolean>(false);
  const { data: sectorFacets } = useAppSelector(getSubSectorFacets);
  const { data: taxonomyInfo } = useAppSelector(getTaxonomy);
  const subSectorFilterModel = useAppSelector(getSubSectorFilterModel);
  const dispatch = useAppDispatch();
  useSyncFilterModels(
    SECTOR_FIELD,
    subSectorFilterModel,
    saveSubSectorFilterModel
  );

  useEffect(() => {
    const sectorMapping = taxonomyInfo?.marketSegment?.labelMap ?? {};

    let selected: TreeSelectOption[] = [];
    if (subSectorFilterModel) {
      selected = subSectorFilterModel.values.map((e) => ({
        id: e ?? null,
        name: e ? sectorMapping?.[e] : null,
      }));
      setSectorSelectAll(
        subSectorFilterModel.values.length === sectorFacets?.length
      );
    } else {
      setSectorSelectAll(false);
    }
    setSectorSelected(selected);
  }, [
    subSectorFilterModel,
    sectorFacets,
    taxonomyInfo?.marketSegment?.labelMap,
  ]);

  const sectorTreeSelectOnChange = useCallback(
    // eslint-disable-next-line complexity
    (checked: boolean, node: TreeSelectOption | null) => {
      if (
        gridApi.getFilterModel &&
        gridApi.setFilterModel &&
        gridApi.paginationGoToFirstPage
      ) {
        gridApi.paginationGoToFirstPage();
        const currentFilterModel = gridApi.getFilterModel();

        const newFilterModel = { ...currentFilterModel };
        if (!node) {
          // triggered when node is null (i.e.) selectAll is checked
          if (checked) {
            setSectorSelectAll(true);
            newFilterModel[SECTOR_FIELD] = {
              filterType: AgGridFilterType.SET,
              values: sectorFacets,
            };
          }
          // triggered when node is null (i.e.) selectAll is unchecked
          else {
            delete newFilterModel?.[SECTOR_FIELD];
            setSectorSelectAll(false);
          }
        }
        // triggered when node has values (i.e.) an option other than
        // selectAll is checked or unchecked
        else {
          const values = getAgGridFilterModelValues(
            checked,
            node,
            subSectorFilterModel,
            SECTOR_FIELD,
            sectorFacets ?? []
          );
          setSectorSelectAll(false);
          newFilterModel[SECTOR_FIELD] = {
            filterType: AgGridFilterType.SET,
            values,
          };
        }

        dispatch(saveSubSectorFilterModel(newFilterModel[SECTOR_FIELD]));
        gridApi.setFilterModel(newFilterModel);
      }
    },
    [dispatch, gridApi, sectorFacets, subSectorFilterModel]
  );

  return {
    sectorSelected,
    sectorSelectAll,
    sectorTreeSelectOnChange,
  };
};
