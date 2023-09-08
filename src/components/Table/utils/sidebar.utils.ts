import { TABLE_SIDE_PANEL_WIDTH } from "@constants/table";

export const sidebar = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "",
      labelKey: "columns",
      iconKey: "columnsMenu",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressValues: true,
        suppressPivots: true,
        suppressPivotMode: true,
        suppressRowGroups: true,
      },
      minWidth: TABLE_SIDE_PANEL_WIDTH,
      width: TABLE_SIDE_PANEL_WIDTH,
    },
    {
      id: "filters",
      labelDefault: "",
      labelKey: "filters",
      iconKey: "filterMenu",
      toolPanel: "agFiltersToolPanel",
      minWidth: TABLE_SIDE_PANEL_WIDTH,
      width: TABLE_SIDE_PANEL_WIDTH,
    },
  ],
  defaultToolPanel: "",
};
