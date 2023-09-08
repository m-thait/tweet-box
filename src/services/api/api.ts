import { AgGridFilterModel, FilterParams } from "@moodys/mdc-table.table";
import { HttpSuccessStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import {
  ColumnFieldNames,
  EsgInfoView,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
import {
  ChartsResponse,
  MedianResponse,
  ExportResponse,
  OrgInfoOpenApi,
} from "@models/api.types";
import { ltRatingSparklineResponse } from "@models/sparkline.types";
import { axiosClient } from "@services/http";
import { ESG_VIEWS_API_GATEWAY, HOST_LINK } from "app/AppConfig";
import { MethodologyLink } from "@root/src/models";
import {
  methodologyHeaders,
  DEFAULT_COMMENT_COLUMNS,
  UrlPath,
} from "@constants/api";

export const fetchColumnFacets = async (
  column: string,
  _filters: Record<string, unknown>[]
): Promise<string[]> => {
  const facets = await axiosClient.post(UrlPath.FACETS, {
    filters: _filters,
    facet: column,
  });
  return facets?.data ?? [];
};

export const getMethodologyDocumentLink = async (
  type: string
): Promise<{ url: string }> => {
  const methodologyURL = `${ESG_VIEWS_API_GATEWAY}/methodology/${type}`;

  const result = await axiosClient.get<MethodologyLink>(methodologyURL, {
    headers: methodologyHeaders,
  });

  if (result.status !== HttpSuccessStatusCode.OK) {
    throw new Error(
      `HTTP error ${result.status} when retrieving methodology url: ${result.statusText}`
    );
  }

  const {
    data: { signedUri },
  } = result;

  return { url: `${HOST_LINK}/research-document${signedUri}` };
};

export const fetchListMedian = async (
  _filters: FilterParams[]
): Promise<MedianResponse> => {
  const response = await axiosClient.post(`/esg-list-median`, {
    filters: _filters ?? [],
  });
  return response?.data ?? [];
};

export const fetchEsgComments = async (
  orgId: string,
  columns: ColumnFieldNames[] = DEFAULT_COMMENT_COLUMNS
): Promise<EsgViewComment[]> => {
  const response = await axiosClient.post(UrlPath.COMMENTS, {
    orgIds: [orgId],
    columns: columns,
  });
  return response?.data ?? [];
};

export const fetchExportLink = async (
  filters: Record<string, unknown>[],
  columns: ColumnFieldNames[],
  timeStamp: string,
  exportTabName?: string
): Promise<ExportResponse> => {
  const response = await axiosClient.post(UrlPath.EXPORT, {
    filters,
    columnFields: columns,
    timeStamp,
    exportTabName,
  });
  return response?.data ?? undefined;
};

export const fetchLtRatingSparklines = async (
  orgIds: string[]
): Promise<ltRatingSparklineResponse> => {
  const response = await axiosClient.post(`/lt-rating-sparklines`, {
    orgIds,
  });
  return response?.data ?? [];
};

export const fetchCharts = async (
  filters: Record<string, unknown>[]
): Promise<ChartsResponse> => {
  const response = await axiosClient.post(UrlPath.CHARTS, {
    filters,
  });
  return response?.data ?? undefined;
};

export const fetchPeerOrgs = async (orgId: string): Promise<string[]> => {
  const { data } = await axiosClient.get(`${UrlPath.PEER_ORGS}/${orgId}`);
  return data?.peerOrgIds ?? [];
};

export const getShareLinkFilterModel = async (
  id: string
): Promise<AgGridFilterModel | undefined> => {
  const { data } = await axiosClient.get(`${UrlPath.SHARE_LINK}/${id}`);
  return data?.filterModel ?? undefined;
};

export const saveShareLinkFilterModel = async (
  filterModel: AgGridFilterModel
): Promise<string | undefined> => {
  const { data } = await axiosClient.post(UrlPath.SHARE_LINK, { filterModel });
  return data?.id ?? undefined;
};

export const fetchEsgInfo = async (
  _filters: FilterParams[],
  countOnly = false
): Promise<EsgInfoView> => {
  const response = await axiosClient.post(UrlPath.ESG_INFO, {
    filters: _filters ?? [],
    countOnly,
  });
  return response?.data ?? undefined;
};

export const fetchOrgInfo = async (orgId: string): Promise<OrgInfoOpenApi> => {
  const { data } = await axiosClient.get(`${UrlPath.ORG_INFO}/${orgId}`);
  return data ?? {};
};
