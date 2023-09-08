import React from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { TreeSelect } from "@components/Table/components/TreeSelect";
import { TreeSelectOption } from "@models/tree-select.types";
import { getTaxonomy, useAppSelector } from "@services/redux";
import { useRegionTreeSelectEvents } from "./RegionFilter.hooks";
import type { GridApi } from "ag-grid-enterprise";

interface RegionTreeSelectProps {
  gridApi: GridApi;
}

export const RegionTreeSelect = ({ gridApi }: RegionTreeSelectProps) => {
  const { countryTreeSelectOnChange, countrySelected, countrySelectAll } =
    useRegionTreeSelectEvents(gridApi);

  const { data: taxonomyInfo } = useAppSelector(getTaxonomy);
  const options = taxonomyInfo?.region?.taxonomy as TreeSelectOption[];

  if (isEmpty(options)) {
    return null;
  }

  return (
    <TreeSelect
      label="Country"
      options={options}
      data-testid={`${ColumnFieldNames.ORG_COUNTRY}-tree-select`}
      onChange={countryTreeSelectOnChange}
      selected={countrySelected}
      selectAll={countrySelectAll}
    />
  );
};
