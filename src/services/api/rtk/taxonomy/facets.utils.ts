import { getCountryFacets, getSubSectorFacets, store } from "@services/redux";

export const getFacets = () => {
  const state = store.getState();
  const { data: subSectorFacets } = getSubSectorFacets(state);
  const { data: countryFacets } = getCountryFacets(state);
  return { subSectorFacets, countryFacets };
};
