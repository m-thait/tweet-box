import { useCallback, useEffect, useState } from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { TreeSelectOption } from "@models/tree-select.types";
import {
  getCountryFacets,
  getCountryFilterModel,
  getTaxonomy,
  saveCountryFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";
import { AgGridFilterType } from "@models/table.types";
import { useSyncFilterModels } from "../TopFilter.hooks";
import { getAgGridFilterModelValues } from "../TopFilter.utils";
import type { GridApi } from "ag-grid-enterprise";

const COUNTRY_FIELD = ColumnFieldNames.ORG_COUNTRY;

export const useRegionTreeSelectEvents = (gridApi: GridApi) => {
  const [countrySelected, setCountrySelected] = useState<TreeSelectOption[]>(
    []
  );
  const [countrySelectAll, setCountrySelectAll] = useState<boolean>(false);
  const { data: countryFacets } = useAppSelector(getCountryFacets);
  const { data: taxonomyInfo } = useAppSelector(getTaxonomy);
  const countryFilterModel = useAppSelector(getCountryFilterModel);
  const dispatch = useAppDispatch();
  useSyncFilterModels(
    COUNTRY_FIELD,
    countryFilterModel,
    saveCountryFilterModel
  );

  useEffect(() => {
    const countryMapping = taxonomyInfo?.region?.labelMap ?? {};
    let selected: TreeSelectOption[] = [];
    if (countryFilterModel) {
      selected = countryFilterModel.values.map((e) => ({
        id: e ?? null,
        name: e ? countryMapping?.[e] : null,
      }));
      setCountrySelectAll(
        countryFilterModel.values.length === countryFacets?.length
      );
    } else {
      setCountrySelectAll(false);
    }
    setCountrySelected(selected);
  }, [countryFacets, countryFilterModel, taxonomyInfo?.region?.labelMap]);

  const countryTreeSelectOnChange = useCallback(
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
            setCountrySelectAll(true);
            newFilterModel[COUNTRY_FIELD] = {
              filterType: AgGridFilterType.SET,
              values: countryFacets,
            };
          }
          // triggered when node is null (i.e.) selectAll is unchecked
          else {
            delete newFilterModel?.[COUNTRY_FIELD];
            setCountrySelectAll(false);
          }
        }
        // triggered when node has values (i.e.) an option other than
        // selectAll is checked or unchecked
        else {
          const values = getAgGridFilterModelValues(
            checked,
            node,
            countryFilterModel,
            COUNTRY_FIELD,
            countryFacets ?? []
          );
          setCountrySelectAll(false);
          newFilterModel[COUNTRY_FIELD] = {
            filterType: AgGridFilterType.SET,
            values,
          };
        }
        dispatch(saveCountryFilterModel(newFilterModel[COUNTRY_FIELD]));
        gridApi.setFilterModel(newFilterModel);
      }
    },
    [countryFacets, countryFilterModel, dispatch, gridApi]
  );

  return { countrySelected, countrySelectAll, countryTreeSelectOnChange };
};
