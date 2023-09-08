import { nanoid } from "nanoid";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { baseQuery } from "@moodys/mdc-frontend.utils.rtk.axios-base-query";
import { RequestHeaders, UrlGateway, UrlPath } from "@constants/api";

export const baseApiQuery = fetchBaseQuery({
  baseUrl: UrlGateway.BASE_API,
});

export const baseApiQueryWithToken = baseQuery({
  baseURL: UrlGateway.BASE_API,
});

export const baseSharedApiQuery = fetchBaseQuery({
  baseUrl: UrlGateway.SHARED_API,
});

export const baseAEMQuery = fetchBaseQuery({
  baseUrl: UrlGateway.ESG_AEM,
});

export const rawTaxonomyApiQuery = fetchBaseQuery({
  baseUrl: UrlGateway.TAXONOMY,
  prepareHeaders: (headers) => {
    headers.set(RequestHeaders.X_CORRELATION_ID, nanoid());
    return headers;
  },
});

export const baseTaxonomyApiQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const path = typeof args === "string" ? args : args.url;
  if (path === UrlPath.FACETS) {
    return baseApiQuery(args, api, extraOptions);
  }
  return rawTaxonomyApiQuery(args, api, extraOptions);
};
