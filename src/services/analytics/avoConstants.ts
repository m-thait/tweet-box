import {
  PageAttributes,
  PageInfo,
  ContentInfo,
  LinkType,
} from "@moodys/mdc-frontend.services.analytics";

export const DESTINATION_URL = "https://www.moodys.com/screener";
export const LANGUAGE = "en";
export const PAGE_TITLE = "Moody's - Screening and Benchmarking";
export const GLOBAL = "Global";
export const APP_NAME = "Screener";
export const AVO_ADDED = "added";
export const AVO_REMOVED = "removed";
export const AVO_OPENED = "opened";
export const AVO_CLOSED = "closed";
export const AVO_SUCCESS = "success";
export const AVO_FAILED = "fail";

export const PAGE_INFO_ATTRIBUTES: PageInfo = {
  destinationURL: DESTINATION_URL,
  language: LANGUAGE,
  pageTitle: PAGE_TITLE,
  version: GLOBAL,
  pageVersion: APP_NAME,
};

export const CONTENT_INFO_ATTRIBUTES: ContentInfo = {
  contentGroup: APP_NAME,
  contentSubGroup: "",
};

export const screenerPageAttributes: PageAttributes = {
  page: {
    pageInfo: PAGE_INFO_ATTRIBUTES,
    contentInfo: CONTENT_INFO_ATTRIBUTES,
  },
};

export const defaultEventDetails = {
  category: APP_NAME,
  type: LinkType.TEXT,
};

export enum AgGridFilterLocation {
  NO_UI = "Top toolbar key filter",
  COLUMN_MENU = "Column header filter",
  TOOLBAR = "Side bar filter",
}
