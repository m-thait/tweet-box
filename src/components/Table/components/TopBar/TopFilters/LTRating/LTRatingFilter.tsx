import React from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { RATING_TREE } from "@constants/rating";
import { INVESTMENT_GRADE, SPECULATIVE_GRADE } from "@constants/table";
import { TreeSelect } from "@components/Table/components/TreeSelect";
import { useLTRatingTreeSelectEvents } from "@components/Table/components/TopBar/TopFilters/LTRating/LTRating.hooks";
import { getLTRatingFacets, useAppSelector } from "@services/redux";
import { filterTreeSelectOptions } from "@services/api/rtk/taxonomy/tree-select.utils";
import { TreeSelectOption } from "@root/src/models";
import type { GridApi } from "ag-grid-enterprise";

interface LTRatingTreeSelectProps {
  gridApi: GridApi;
}

export const LTRatingTreeSelect = ({ gridApi }: LTRatingTreeSelectProps) => {
  const { ltRatingTreeSelectOnChange, ltRatingSelected, ltRatingSelectAll } =
    useLTRatingTreeSelectEvents(gridApi);
  const { data: ltRatingFacets } = useAppSelector(getLTRatingFacets);

  let options = [] as TreeSelectOption[];
  if (ltRatingFacets) {
    options = filterTreeSelectOptions(RATING_TREE, ltRatingFacets);
  }

  if (isEmpty(options)) {
    return null;
  }

  return (
    <TreeSelect
      label="LT Rating"
      options={options}
      data-testid={`${ColumnFieldNames.LT_RATING}-tree-select`}
      onChange={ltRatingTreeSelectOnChange}
      selected={ltRatingSelected}
      selectAll={ltRatingSelectAll}
      showSearch={false}
      initialExpandedFields={[INVESTMENT_GRADE, SPECULATIVE_GRADE]}
    />
  );
};
