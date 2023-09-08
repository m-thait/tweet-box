import { createApi } from "@reduxjs/toolkit/query/react";
import { UrlPath } from "@constants/api";
import { baseApiQueryWithToken } from "../baseApiQuery";
import { transformUserInfoResponse } from "./userTypeApi.helpers";

export const userTypeApi = createApi({
  reducerPath: "userType",
  baseQuery: baseApiQueryWithToken,
  endpoints: (builder) => ({
    fetchUserType: builder.query({
      query: () => {
        return {
          url: UrlPath.USERINFO,
          method: "GET",
        };
      },
      transformResponse: transformUserInfoResponse,
    }),
  }),
});

export const { useFetchUserTypeQuery } = userTypeApi;
