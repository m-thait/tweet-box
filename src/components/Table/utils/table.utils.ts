import { logger } from "@moodys/mdc-frontend.services.logger";
import {
  FilterParams,
  getValuesFromFilterModel,
} from "@moodys/mdc-table.table";
import {
  ColumnFieldNames,
  IssuerOutlook,
} from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterType } from "@models/table.types";
import { AgGridFilterModel } from "@models/index";
import { fetchColumnFacets, fetchEsgInfo, fetchPeerOrgs } from "@services/api";
import { getOrgIdsFilterModel } from "@utils/localStorage.utils";

export const fetchFacetValues = async (
  colId: string,
  filterModel: AgGridFilterModel
) => {
  try {
    const filterArray = getValuesFromFilterModel(filterModel, colId);
    const facets = await fetchColumnFacets(colId, filterArray);
    return facets;
  } catch (error) {
    logger.error({ error: error, message: "fetchFacetValues" });
    return [];
  }
};

export const getEsgSubSector = async (anchorOrgId: string): Promise<string> => {
  const filterParam: FilterParams = {
    name: ColumnFieldNames.ORG_ID,
    type: AgGridFilterType.TEXT,
    values: [anchorOrgId],
  };
  const esgInfoRes = await fetchEsgInfo([filterParam]);
  const subSector = esgInfoRes?.data[0].subSector ?? null;
  return subSector;
};

export const fetchPeerOrgsFilterModel = async (
  anchorOrgId: string
): Promise<AgGridFilterModel> => {
  const peerOrgs = await fetchPeerOrgs(anchorOrgId);
  peerOrgs.unshift(anchorOrgId);
  let peerOrgFilterModel: AgGridFilterModel = getOrgIdsFilterModel(peerOrgs);
  const filterModelOrgIdValues = peerOrgFilterModel[ColumnFieldNames.ORG_ID]
    .values as string[];
  if (filterModelOrgIdValues.length === 1) {
    const subSector = await getEsgSubSector(anchorOrgId);
    if (subSector) {
      peerOrgFilterModel = {
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: AgGridFilterType.SET,
          values: [subSector],
        },
      };
    }
  }
  return peerOrgFilterModel;
};

export const mapIssuerOutlookValues = (values: string[]) => {
  return values.reduce((mappedValues: (string | null)[], value: string) => {
    const matchingKeysToValue = Object.keys(IssuerOutlook).reduce(
      (keys, key) => {
        if (IssuerOutlook[key] === value) {
          const formattedValue = key.replace("(M)", "(m)");
          if (!keys.includes(formattedValue)) keys.push(formattedValue);
        } else {
          if (!keys.includes(value)) keys.push(value);
        }
        return keys;
      },
      [] as string[]
    );
    mappedValues = [...mappedValues, ...matchingKeysToValue];
    return mappedValues;
  }, []);
};
