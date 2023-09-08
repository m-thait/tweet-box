import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { extractNumberFromString } from "@moodys/mdc-table.utils.number";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import {
  CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY,
  CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
  PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
} from "@constants/local-storage";
import {
  AgGridFilterModel,
  AgGridFilterType,
  CISDistributionLocalStorage,
  RedirectFrom,
} from "@models/index";
import {
  fetchPeerOrgsFilterModel,
  getEsgSubSector,
} from "@components/Table/utils";

const getESGSectorMISFilterModel = (parsed: CISDistributionLocalStorage) => {
  let filterModel: AgGridFilterModel = {};

  if (parsed?.filters?.cis) {
    filterModel = {
      [ColumnFieldNames.CREDIT_IMPACT_SCORE]: {
        filterType: AgGridFilterType.SET,
        values: parsed.filters.cis.map(
          (score) => `${extractNumberFromString(score)}`
        ),
      },
    };
  }

  if (parsed?.sector) {
    filterModel = {
      ...filterModel,
      [ColumnFieldNames.ORG_ESG_SECTOR_MIS]: {
        filterType: AgGridFilterType.SET,
        values: [parsed.sector],
      },
    };
  }
  return filterModel;
};

export const getOrgIdsFilterModel = (orgIds: string[]) => {
  return {
    [ColumnFieldNames.ORG_ID]: {
      filterType: AgGridFilterType.SET,
      values: orgIds,
    },
  };
};

const redirectFromPeerComparisonWidget = async (
  peerOrgsFromLocalStorage: string
) => {
  localStorage.removeItem(PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY);
  const parsedOrgIds: string[] = JSON.parse(peerOrgsFromLocalStorage);
  let redirectFilterModel: AgGridFilterModel =
    getOrgIdsFilterModel(parsedOrgIds);
  if (parsedOrgIds.length <= 1) {
    const anchorOrg = parsedOrgIds[0];
    const subSector = await getEsgSubSector(anchorOrg);
    if (subSector) {
      redirectFilterModel = {
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: AgGridFilterType.SET,
          values: [subSector],
        },
      };
    }
  }
  return {
    isRedirect: true,
    redirectFrom: RedirectFrom.PEER_COMPARISON,
    redirectFilterModel,
  };
};

const redirectFromCISDistributionWidget = (cisOrgsFromLocalStorage: string) => {
  localStorage.removeItem(CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY);
  const parsed: CISDistributionLocalStorage = JSON.parse(
    cisOrgsFromLocalStorage
  );
  const redirectFilterModel: AgGridFilterModel =
    getESGSectorMISFilterModel(parsed);
  return {
    isRedirect: true,
    redirectFrom: RedirectFrom.CIS_DISTRIBUTION,
    redirectFilterModel,
  };
};

const redirectFromCV2IssuerPage = async (
  peerOrgsCv2FromLocalStorage: string
) => {
  localStorage.removeItem(CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY);

  const parsedOrgIds: string[] = JSON.parse(peerOrgsCv2FromLocalStorage);
  if (!isEmpty(parsedOrgIds[0])) {
    const anchorOrg = parsedOrgIds[0];
    const redirectFilterModel = await fetchPeerOrgsFilterModel(anchorOrg);
    return {
      isRedirect: true,
      redirectFrom: RedirectFrom.CV2_ISSUER_PAGE,
      redirectFilterModel,
    };
  }
  return {
    isRedirect: false,
  };
};

export const checkOrgIdsFromStorage = async (): Promise<{
  isRedirect: boolean;
  redirectFilterModel?: AgGridFilterModel;
}> => {
  // Redirected from Peer Comparison Widget
  const peerOrgsFromLocalStorage = localStorage?.getItem(
    PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY
  );
  if (peerOrgsFromLocalStorage) {
    return redirectFromPeerComparisonWidget(peerOrgsFromLocalStorage);
  }

  // Redirected from CIS Distribution Widget
  const cisOrgsFromLocalStorage = localStorage?.getItem(
    CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY
  );
  if (cisOrgsFromLocalStorage) {
    return redirectFromCISDistributionWidget(cisOrgsFromLocalStorage);
  }

  // Redirected from CV2 Issuer Page
  const peerOrgsCv2FromLocalStorage = localStorage?.getItem(
    CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY
  );
  if (peerOrgsCv2FromLocalStorage) {
    return redirectFromCV2IssuerPage(peerOrgsCv2FromLocalStorage);
  }

  return {
    isRedirect: false,
  };
};
