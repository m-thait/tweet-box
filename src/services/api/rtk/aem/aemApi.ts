import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { AEMDrawerInfo, AEMEsgTooltipInfo } from "@models/aem.types";
import { UrlPath } from "@constants/api";
import { baseAEMQuery } from "../baseApiQuery";

export const aemDrawerInfoApi = createApi({
  reducerPath: "aem",
  baseQuery: baseAEMQuery,
  endpoints: (builder) => ({
    fetchCISDrawerInfo: builder.query<AEMDrawerInfo[], void>({
      query: () => ({
        url: UrlPath.CIS_DRAWER_INFO,
      }),
    }),
    fetchIPSDrawerInfo: builder.query<AEMDrawerInfo[], void>({
      query: () => ({
        url: UrlPath.IPS_DRAWER_INFO,
      }),
    }),
    fetchEsgTooltipInfo: builder.query<AEMEsgTooltipInfo[], void>({
      query: () => ({
        url: UrlPath.ESG_TOOLTIP,
      }),
    }),
  }),
});

export const {
  useFetchCISDrawerInfoQuery,
  useFetchIPSDrawerInfoQuery,
  useFetchEsgTooltipInfoQuery,
} = aemDrawerInfoApi;
