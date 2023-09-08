import React from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { TreeSelect } from "@components/Table/components/TreeSelect";
import { TreeSelectOption } from "@models/tree-select.types";
import { getTaxonomy, useAppSelector } from "@services/redux";
import { useMarketSegmentTreeSelectEvents } from "./MarketSegment.hooks";
import type { GridApi } from "ag-grid-enterprise";

interface MarketSegmentTreeSelectProps {
  gridApi: GridApi;
}

export const MarketSegmentTreeSelect = ({
  gridApi,
}: MarketSegmentTreeSelectProps) => {
  const { sectorTreeSelectOnChange, sectorSelected, sectorSelectAll } =
    useMarketSegmentTreeSelectEvents(gridApi);

  const { data: taxonomyInfo } = useAppSelector(getTaxonomy);
  const options = taxonomyInfo?.marketSegment?.taxonomy as TreeSelectOption[];

  if (isEmpty(options)) {
    return null;
  }

  return (
    <TreeSelect
      label="Sector"
      options={options}
      data-testid={`${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select`}
      onChange={sectorTreeSelectOnChange}
      selected={sectorSelected}
      selectAll={sectorSelectAll}
    />
  );
};
