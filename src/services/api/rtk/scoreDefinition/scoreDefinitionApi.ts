import { createApi } from "@reduxjs/toolkit/query/react";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { Scorecard } from "@models/scorecard.types";
import { ScorecardDefintionResponse } from "@models/api.types";
import { UrlPath } from "@constants/api";
import { baseApiQuery } from "../baseApiQuery";

const transformDynamoQuery = (
  queryResponse: ScorecardDefintionResponse
): Scorecard[] => {
  if (!isEmpty(queryResponse)) {
    let scorecardData: Scorecard[] = [];
    if (queryResponse.Items && !isEmpty(queryResponse.Items)) {
      scorecardData = queryResponse.Items.map((scorecard) =>
        unmarshall(scorecard)
      ) as Scorecard[];
    }
    return scorecardData;
  }
  return [] as Scorecard[];
};

export const scoreDefinitionApi = createApi({
  reducerPath: "scoreDefinition",
  baseQuery: baseApiQuery,
  endpoints: (builder) => ({
    fetchScoreDefinition: builder.query<Scorecard[], void>({
      query: () => ({
        url: UrlPath.SCORE_DEFINITION,
      }),
      transformResponse: transformDynamoQuery,
    }),
  }),
});

export const { useFetchScoreDefinitionQuery } = scoreDefinitionApi;
