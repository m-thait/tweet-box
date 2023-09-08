import { useEffect, useState } from "react";
import { ColGroupDef } from "ag-grid-enterprise";
import { ESGSchema } from "@moodys/mdc-table.schemas.screener";
import { useTreatments } from "@moodys/mdc-frontend.services.split";
import {
  generateAgGridColumnDefs,
  generateColumnGroupState,
  generateColumnStates,
} from "@components/Table/utils";
import {
  getTableView,
  getUserType,
  saveColumnMapping,
  useAppDispatch,
  useAppSelector,
  saveColumnGroupStates,
  saveColumnStates,
  getColumnState,
  getColumnGroupState,
  getToolTips,
} from "@services/redux";
import { ESG_VIEWS_TABS_FLAG } from "@services/splitIO/splitIO.flags";
import { EsgUserType } from "@models/api.types";
import { generateColumnMapping } from "./utils/schema.utils";

export const useGetColumnDefs = () => {
  const [columnDefs, setColumnDefs] = useState<ColGroupDef[]>([]);
  const dispatch = useAppDispatch();
  const esgTooltipInfo = useAppSelector(getToolTips);
  const userType = useAppSelector(getUserType);
  const splitTreatment = useTreatments([ESG_VIEWS_TABS_FLAG]);
  const viewTabs = splitTreatment[ESG_VIEWS_TABS_FLAG];
  const viewTabsFeatureEnabled = viewTabs?.treatment === "on";
  const currentTableView = useAppSelector(getTableView);
  const columnState = useAppSelector(getColumnState);
  const columnGroupState = useAppSelector(getColumnGroupState);
  const emptyColumnState =
    (Object.values(columnState).includes(null) ||
      Object.values(columnGroupState).includes(null)) &&
    viewTabsFeatureEnabled;
  // eslint-disable-next-line complexity
  useEffect(() => {
    /*
    Only set columns definition when the user type is set, that way we preserve the right width and functionality of the columns.
    */
    if (userType !== EsgUserType.ESG_NONE) {
      const defaultColumnDefs = generateAgGridColumnDefs(
        ESGSchema,
        esgTooltipInfo?.data ?? [],
        userType,
        currentTableView,
        viewTabsFeatureEnabled
      );
      setColumnDefs(defaultColumnDefs);
      if (emptyColumnState) {
        const newColumnGroupState = generateColumnGroupState(ESGSchema);
        const newColumnStates = generateColumnStates(ESGSchema);
        dispatch(saveColumnGroupStates(newColumnGroupState));
        dispatch(saveColumnStates(newColumnStates));
      }
    }
    const mapping = generateColumnMapping(ESGSchema);
    dispatch(saveColumnMapping(mapping));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esgTooltipInfo]);

  return { columnDefs };
};
