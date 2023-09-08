export interface AEMDrawerInfo {
  body: string;
  title: string;
}

export interface Tooltip {
  headerName: string;
  tooltip: string | string[];
}

export interface AEMEsgTooltipInfo {
  [key: string]: Tooltip;
}
