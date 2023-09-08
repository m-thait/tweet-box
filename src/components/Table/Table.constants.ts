import { format } from "date-fns";
import { BLANK_SPACES, UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";

export const commonFilterOptions = {
  buttons: ["reset"],
  suppressMiniFilter: true,
  defaultToNothingSelected: true,
};

export const outlookFilterOptionsOrder = [
  "positive",
  "stable",
  "negative",
  "developing",
  "no outlook",
  "ratings under review",
  "ratings withdrawn",
  BLANK_SPACES,
];

export const lastRatingActionFilterOptionsOrder = [
  "new",
  "upgrade",
  "upgraded",
  "downgrade",
  "downgraded",
  "affirmation",
  "confirmation",
  "confirmed",
  "rating affirmation",
  "on watch - possible upgrade",
  "on watch - possible downgrade",
  "on watch - uncertain",
  "reinstated",
  "changed to definitive from prospective",
  "change in scale",
  "withdrawn",
  BLANK_SPACES,
];

export const ratingOptionsOrder = [
  "aaa",
  "aa",
  "aa1",
  "aa2",
  "aa3",
  "a",
  "a1",
  "a2",
  "a3",
  "baa",
  "baa1",
  "baa2",
  "baa3",
  "ba",
  "ba1",
  "ba2",
  "ba3",
  "b",
  "b1",
  "b2",
  "b3",
  "caa",
  "caa1",
  "caa2",
  "caa3",
  "ca",
  "c",
  "wr",
  BLANK_SPACES,
];

export const scoreOptionsOrder = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  BLANK_SPACES,
  UNAUTHORIZED_BLANKS,
];

export enum RatingActions {
  UPGRADE = "upgrade",
  UPGRADED = "upgraded",
  POSSIBLE_UPGRADE = "possible upgrade",
  DOWNGRADE = "downgrade",
  DOWNGRADED = "downgraded",
  POSSIBLE_DOWNGRADE = "possible downgrade",
}

export const excelExportParams = {
  fileName: `Moodys_Screener_${format(new Date(), "MMddyyyy")}`,
  sheetName: "ESG View",
};

export const LIST_MEDIAN_NAME = { orgName: "List Median" };
