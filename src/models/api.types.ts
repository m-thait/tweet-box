import { HttpStatusCodesTypes } from "@moodys/mdc-toolbox.api.status-codes";
import {
  EsgListMedian,
  ColumnFieldNames,
} from "@moodys/mdc-table.schemas.screener";
import { ChartType } from "./chart.types";

export enum APIStatus {
  API_CALL_SUCCESS = "SUCCESS",
  API_CALL_LOADING = "LOADING",
  API_CALL_FAILED = "FAILED",
}

export interface APIState<T = unknown> {
  data?: T;
  APIStatus?: APIStatus;
  APIStatusCode: keyof HttpStatusCodesTypes;
}

export enum EsgUserType {
  ESG_CORE = "ESG_CORE",
  ESG_PREMIUM = "ESG_PREMIUM",
  ESG_NONE = "ESG_NONE",
}

export interface UserInfoResponse {
  userInfo: UserInfo;
}

export interface UserInfo {
  userId: string;
  userType: EsgUserType;
}

export interface ESGViewsResponse {
  userType: EsgUserType;
  esgView: Record<string, unknown>[];
  lockedOrgIds?: number[];
}

export type MedianResponse = {
  listMedians: EsgListMedian[];
};

export type ChartsResponse = Record<
  ChartType,
  Record<string, Record<string, string>>
>;

export type ScoreDefinition = Record<string, unknown>;

export interface ScorecardDefintionResponse {
  Count: number;
  Items: ScoreDefinition[];
  ScannedCount: number;
}

export type ExportResponse = {
  result: string;
};

export type EsgInfoOpenApi = {
  [key in ColumnFieldNames]?: string | number | boolean | null;
};

export type ltRatingSparklineDataPoint = {
  date: string;
  rank: number;
  rating: string;
  direction: string;
  class: string;
};

export type ltRatingSparklineResponse = {
  [orgId: string]: {
    newStart: boolean;
    data: ltRatingSparklineDataPoint[];
  };
};

export type OrgInfoOpenApi = {
  analysts: AnalystInfoOpenApi[];
  overview?: string | null;
  sector?: string | null;
  ticker?: string | null;
  founded?: string | null;
  headquarter?: string | null;
  fullTimeEmployees?: number | null;
  website?: string | null;
};

export type AnalystInfoOpenApi = {
  role: string;
  name: string;
  phone?: string;
  email: string;
};
