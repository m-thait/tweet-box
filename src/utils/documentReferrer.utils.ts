import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterType } from "@models/table.types";
import { SeoLabelMap, TaxonomyData } from "@models/taxonomy.types";
import { fetchPeerOrgsFilterModel } from "@components/Table/utils";
import { getValuesFromTaxonomyLabelMap } from "./column-compositions.utils";

export const getDocumentReferrer = (): string | undefined => {
  const { referrer } = document;
  if (document.referrer !== "") {
    return referrer;
  }
  return undefined;
};

export const isPeerOrgReferrerLink = (referrerLink?: string): boolean => {
  const creditRatingCheck = referrerLink
    ? referrerLink.indexOf("moodys.com/credit-ratings/") >= 0
    : false;
  return creditRatingCheck;
};

export const getOrgIdFromReferrerLink = (): string | undefined => {
  const referrerLink = getDocumentReferrer();
  const isPeerOrgLink = isPeerOrgReferrerLink(referrerLink as string);
  if (isPeerOrgLink) {
    const orgId = (referrerLink as string)
      .split("/credit-ratings/")[1]
      .split("/")[0]
      .split("-")
      .pop();
    return orgId;
  }
  return undefined;
};

export const isSectorViewReferrerLink = (referrerLink?: string): boolean => {
  const researchAndRatingsCheck = referrerLink
    ? referrerLink.indexOf("moodys.com/researchandratings/") >= 0
    : false;
  return researchAndRatingsCheck;
};

export const getMossIdsFromReferrerLink = (): string[] | undefined => {
  const referrerLink = getDocumentReferrer();
  const isSectorViewLink = isSectorViewReferrerLink(referrerLink as string);
  if (isSectorViewLink) {
    const mossIds = (referrerLink as string).split("/").slice(-2);
    return mossIds.filter((mossId: string) => /\d/.test(mossId));
  }
  return undefined;
};

export const getPeerOrgFilterModel = async (): Promise<
  AgGridFilterModel | undefined
> => {
  const anchorOrgId = getOrgIdFromReferrerLink();
  if (anchorOrgId) {
    const peerOrgFilterModel = await fetchPeerOrgsFilterModel(anchorOrgId);
    return peerOrgFilterModel;
  }
  return undefined;
};

const getSectorViewFilterValues = (seoLabelMap: SeoLabelMap, value: string) => {
  const [matchedEntry] = Object.entries(seoLabelMap).filter((entry) => {
    return entry[1].OwlID === value;
  });
  const values = getValuesFromTaxonomyLabelMap(seoLabelMap, matchedEntry[0]);
  return values;
};

export const getSectorViewsFilterModel = async (taxonomyData: TaxonomyData) => {
  const mossIds = getMossIdsFromReferrerLink();
  if (mossIds) {
    const owlIds = mossIds.reduce((returnValue: string[], mossId: string) => {
      const sectorOwlId = (
        taxonomyData.marketSegment?.mossIdMap as Record<string, string>
      )[mossId];
      if (sectorOwlId) {
        returnValue.push(sectorOwlId);
      }
      const regionOwlId = (
        taxonomyData.region?.mossIdMap as Record<string, string>
      )[mossId];
      if (regionOwlId) {
        returnValue.push(regionOwlId);
      }
      return returnValue;
    }, []);

    let marketSegmentFilters: string[] = [];
    let countryFilters: string[] = [];
    Object.values(owlIds as string[]).forEach((value: string) => {
      const isSector = taxonomyData.marketSegment.labelMap[value];
      const isRegionOrCountry = taxonomyData.region.labelMap[value];
      if (isSector && taxonomyData?.marketSegment?.seoLabelMap) {
        marketSegmentFilters = getSectorViewFilterValues(
          taxonomyData?.marketSegment?.seoLabelMap,
          value
        );
      } else if (isRegionOrCountry && taxonomyData.region.seoLabelMap) {
        countryFilters = getSectorViewFilterValues(
          taxonomyData?.region?.seoLabelMap,
          value
        );
      }
    });
    const filterModel: AgGridFilterModel = {};
    if (marketSegmentFilters.length > 0) {
      filterModel[ColumnFieldNames.ORG_INDUSTRY] = {
        filterType: AgGridFilterType.SET,
        values: marketSegmentFilters,
      };
    }
    if (countryFilters.length > 0) {
      filterModel[ColumnFieldNames.ORG_COUNTRY] = {
        filterType: AgGridFilterType.SET,
        values: countryFilters,
      };
    }

    return filterModel;
  }
  return undefined;
};
