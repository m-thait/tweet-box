import React, { useEffect, useState } from "react";
import { Table } from "@components/Table";
import { useAuthStatus } from "@hooks/authStatus.hooks";
import {
  useFetchTaxonomyInfoQuery,
  useFetchCountryFacetsQuery,
  useFetchSubSectorFacetsQuery,
  useFetchCISDrawerInfoQuery,
  useFetchIPSDrawerInfoQuery,
  useFetchScoreDefinitionQuery,
  useFetchLTRatingFacetsQuery,
  useFetchUserTypeQuery,
  useFetchEsgTooltipInfoQuery,
} from "@services/api";
import { Loader } from "@components/SkeletonLoader";
import { useAppDispatch, saveTableView } from "@services/redux";
import { useGetTableView } from "@components/NewTopBar/LeftOptions/ViewTabs/ViewTabs.hooks";

export const Home = ({ view }: { view: string }) => {
  const [isFacetsReady, setIsFacetsReady] = useState(false);
  const { isAuthenticationComplete } = useAuthStatus();
  const { tableView } = useGetTableView();
  const dispatch = useAppDispatch();

  // fetch drawer info from AEM
  useFetchCISDrawerInfoQuery(undefined, { skip: !isAuthenticationComplete });
  useFetchIPSDrawerInfoQuery(undefined, { skip: !isAuthenticationComplete });
  useFetchScoreDefinitionQuery(undefined, { skip: !isAuthenticationComplete });

  // fetch column facets
  const { isSuccess: isCountryFacetsFetchComplete } =
    useFetchCountryFacetsQuery(undefined, { skip: !isAuthenticationComplete });
  const { isSuccess: isSubSectorFacetsFetchComplete } =
    useFetchSubSectorFacetsQuery(undefined, {
      skip: !isAuthenticationComplete,
    });
  const { isSuccess: isLTRatingFacetsFetchComplete } =
    useFetchLTRatingFacetsQuery(undefined, { skip: !isAuthenticationComplete });

  // fetch tool tips
  const { isSuccess: isTooltipFetchComplete } = useFetchEsgTooltipInfoQuery();

  // fetch taxonomy information
  // skip fetching taxonomy until facets calls are successful
  const { isSuccess: isTaxonomyInfoFetchComplete } = useFetchTaxonomyInfoQuery(
    undefined,
    { skip: !isFacetsReady }
  );

  // fetch user type
  const { isSuccess, isUninitialized } = useFetchUserTypeQuery(undefined, {
    skip: process.env?.BYPASS_OKTA === "true" || !isAuthenticationComplete,
  });
  const isUserTypeFetchComplete = isSuccess || isUninitialized;

  useEffect(() => {
    // wait for facets calls to succeed before fetching taxonomy information
    if (
      isCountryFacetsFetchComplete &&
      isSubSectorFacetsFetchComplete &&
      isLTRatingFacetsFetchComplete &&
      isUserTypeFetchComplete &&
      isTooltipFetchComplete
    ) {
      setIsFacetsReady(true);
    }
  }, [
    isCountryFacetsFetchComplete,
    isSubSectorFacetsFetchComplete,
    isLTRatingFacetsFetchComplete,
    isUserTypeFetchComplete,
    isTooltipFetchComplete,
  ]);

  useEffect(() => {
    if (view !== tableView) {
      dispatch(saveTableView(view));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return isFacetsReady && isTaxonomyInfoFetchComplete ? <Table /> : <Loader />;
};
