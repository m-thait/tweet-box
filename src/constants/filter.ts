import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";

export enum LoadingStates {
  LOADING = "loading",
  LOADED = "loaded",
}
export const InfiniteScrollFields: string[] = [
  ESGColumnFields.ORG_ISSUER_NAME.fieldName,
  ESGColumnFields.ORG_ID.fieldName,
];
