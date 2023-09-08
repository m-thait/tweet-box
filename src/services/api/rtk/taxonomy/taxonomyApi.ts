import { createApi } from "@reduxjs/toolkit/query/react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { TaxonomyItem, TaxonomyQueryResponse } from "@models/taxonomy.types";
import { FacetsPayload, UrlPath } from "@constants/api";
import { baseTaxonomyApiQuery } from "../baseApiQuery";
import { getFacets } from "./facets.utils";
import {
  filterTreeSelectOptions,
  toTreeSelectOptions,
  sortTaxonomyChildren,
} from "./tree-select.utils";

export const filterTaxonomyResponse = ({
  queryResponse,
  subSectorFacets = [],
  countryFacets = [],
}: {
  queryResponse: TaxonomyQueryResponse;
  subSectorFacets: (string | null)[] | undefined;
  countryFacets: (string | null)[] | undefined;
}) => {
  const { marketSegment, region } = queryResponse;

  // filter sub-sector tree nodes
  const marketSegmentTree = toTreeSelectOptions(
    sortTaxonomyChildren(marketSegment.taxonomy as TaxonomyItem[])
  );
  const filteredMarketSegmentTree = filterTreeSelectOptions(
    marketSegmentTree,
    subSectorFacets
  );

  // filter country tree nodes
  const countryTree = toTreeSelectOptions(
    sortTaxonomyChildren(region.taxonomy as TaxonomyItem[])
  );
  const filteredCountryTree = filterTreeSelectOptions(
    countryTree,
    countryFacets
  );

  return {
    marketSegment: {
      ...marketSegment,
      taxonomy: filteredMarketSegmentTree,
    },
    region: {
      ...region,
      taxonomy: filteredCountryTree,
    },
  };
};

const transformTaxonomyResponse = (
  queryResponse: TaxonomyQueryResponse
): TaxonomyQueryResponse | undefined => {
  if (!isEmpty(queryResponse)) {
    // facets are queried first in 'Home.tsx' before fetching taxonomy information
    // so that the taxonomy data is filtered using column facets
    const { subSectorFacets, countryFacets } = getFacets();
    return filterTaxonomyResponse({
      queryResponse,
      subSectorFacets,
      countryFacets,
    });
  }
};

export const taxonomyApi = createApi({
  reducerPath: "taxonomy",
  baseQuery: baseTaxonomyApiQuery,
  endpoints: (builder) => ({
    fetchTaxonomyInfo: builder.query<TaxonomyQueryResponse | undefined, void>({
      query: () => ({
        url: UrlPath.TAXONOMY,
      }),
      transformResponse: transformTaxonomyResponse,
    }),
    fetchCountryFacets: builder.query<string[], void>({
      query: () => ({
        url: UrlPath.FACETS,
        method: "POST",
        body: FacetsPayload.country,
      }),
    }),
    fetchSubSectorFacets: builder.query<string[], void>({
      query: () => ({
        url: UrlPath.FACETS,
        method: "POST",
        body: FacetsPayload.subSector,
      }),
    }),
    fetchLTRatingFacets: builder.query<string[], void>({
      query: () => ({
        url: UrlPath.FACETS,
        method: "POST",
        body: FacetsPayload.ltRating,
      }),
    }),
  }),
});

export const {
  useFetchTaxonomyInfoQuery,
  useFetchCountryFacetsQuery,
  useFetchSubSectorFacetsQuery,
  useFetchLTRatingFacetsQuery,
} = taxonomyApi;
