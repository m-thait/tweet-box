import React from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { TreeSelect } from "@components/NewTopBar/LeftOptions/FiltersDialog/components/TreeSelect";
import { TreeSelectOption } from "@models/tree-select.types";
import { useMarketSegmentTreeSelectEvents } from "./DialogFilter.hooks";

interface MarketSegmentTreeSelectProps {
  title: string;
  dialogFilterModel: AgGridFilterModel;
  setDialogFilterModel: (filterModel: AgGridFilterModel) => void;
  fieldName: ColumnFieldNames;
  options: TreeSelectOption[];
  facets: (string | null)[];
}

// eslint-disable-next-line complexity
export const DialogFilter = ({
  title,
  dialogFilterModel,
  setDialogFilterModel,
  fieldName,
  options,
  facets,
}: MarketSegmentTreeSelectProps) => {
  const noDataOption: TreeSelectOption = { id: "null", name: "-- (No data)" };
  const updatedOptions =
    options && facets.includes(null) ? options.concat([noDataOption]) : options;
  const updatedFacets = facets.map((facet) =>
    facet === null ? "null" : facet
  );
  const { sectorTreeSelectOnChange, sectorSelectAll } =
    useMarketSegmentTreeSelectEvents({
      dialogFilterModel,
      setDialogFilterModel,
      fieldName,
      facets: updatedFacets,
    });
  if (isEmpty(options)) {
    return null;
  }
  const selectedIds =
    dialogFilterModel[fieldName] &&
    Array.isArray(dialogFilterModel[fieldName].values)
      ? (dialogFilterModel[fieldName].values as string[])
      : [];

  const selected = selectedIds.map((id: string) => {
    return { id: id, name: id };
  });

  const initialExpandedFields: Record<string, string[]> = {
    [ColumnFieldNames.LT_RATING]: ["investment_grade", "speculative_grade"],
  };

  return (
    <TreeSelect
      label={title}
      options={updatedOptions}
      data-testid={`${fieldName}-tree-select`}
      onChange={sectorTreeSelectOnChange}
      selected={selected}
      selectAll={sectorSelectAll}
      initialExpandedFields={initialExpandedFields[fieldName] ?? null}
    />
  );
};
