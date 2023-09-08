import { useState, useEffect, useRef } from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import {
  getSubSectorTaxonomy,
  useAppSelector,
  getSubSectorTaxonomySeoMap,
  getRegionTaxonomySeoMap,
} from "@services/redux";
import { getValuesFromTaxonomyLabelMap } from "@utils/column-compositions.utils";
import { TreeSelectOption } from "@models/tree-select.types";
import { AgGridFilterModel, AgGridFilterType } from "@models/table.types";
import { SeoLabelMap } from "@models/taxonomy.types";
import { PresetFilterHookResponse } from "@models/preset-filter.types";
import { useQueryParam } from "./useQueryParam";

export const useQueryParameterFilterModel = (): PresetFilterHookResponse => {
  const isSuccess = useRef(false);
  const sector = useQueryParam("sector");
  const country = useQueryParam("country");
  const region = useQueryParam("region");
  const sectorTaxonomyData = useAppSelector(
    getSubSectorTaxonomySeoMap
  ) as SeoLabelMap;
  const regionTaxonomyData = useAppSelector(
    getRegionTaxonomySeoMap
  ) as SeoLabelMap;
  const [queryParamFilterModel, setQueryParamFilterModel] = useState<
    undefined | AgGridFilterModel
  >(undefined);
  const sectorTaxonomy = useAppSelector(
    getSubSectorTaxonomy
  ) as TreeSelectOption[];

  useEffect(() => {
    if (!isSuccess.current) {
      isSuccess.current = true;
      const filterModel: AgGridFilterModel = {};
      const taxonomyFilterValues = getValuesFromTaxonomyLabelMap(
        sectorTaxonomyData,
        sector as string
      );
      if (taxonomyFilterValues.length > 0) {
        filterModel[ColumnFieldNames.ORG_INDUSTRY] = {
          filterType: AgGridFilterType.SET,
          values: taxonomyFilterValues,
        };
      }

      const countryTaxonomyFilterValues = getValuesFromTaxonomyLabelMap(
        regionTaxonomyData,
        country as string
      );
      const regionTaxonomyFilterValues = getValuesFromTaxonomyLabelMap(
        regionTaxonomyData,
        region as string
      );
      const values = [
        ...new Set(
          countryTaxonomyFilterValues.concat(regionTaxonomyFilterValues)
        ),
      ];
      if (values.length > 0) {
        filterModel[ColumnFieldNames.ORG_COUNTRY] = {
          filterType: AgGridFilterType.SET,
          values: values,
        };
      }
      setQueryParamFilterModel(filterModel);
    }
  }, [
    sectorTaxonomy,
    sectorTaxonomyData,
    sector,
    country,
    region,
    regionTaxonomyData,
  ]);
  return {
    isSuccess: (isSuccess.current &&
      queryParamFilterModel !== undefined) as boolean,
    filterModel: isEmpty(queryParamFilterModel)
      ? undefined
      : queryParamFilterModel,
  };
};
