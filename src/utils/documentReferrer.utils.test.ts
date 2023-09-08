import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import * as api from "@services/api";
import {
  getDocumentReferrer,
  isPeerOrgReferrerLink,
  getOrgIdFromReferrerLink,
  getPeerOrgFilterModel,
  isSectorViewReferrerLink,
  getMossIdsFromReferrerLink,
  getSectorViewsFilterModel,
} from "./documentReferrer.utils";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
    fetchEsgInfo: jest.fn(),
  };
});

describe("documentReferrer.utils.ts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const init = (referrerLink?: string) => {
    jest
      .spyOn(document, "referrer", "get")
      .mockImplementation(() => referrerLink as string);
  };

  const validPeerReferrerLinkOneResult =
    "https://www.moodys.com/credit-ratings/Colombia-Government-of-credit-rating-186200/summary";
  const validPeerReferrerLink =
    "https://www.moodys.com/credit-ratings/Nissan-Motor-Co-Ltd-credit-rating-550425/summary";
  const validSectorReferrerLink =
    "https://www.moodys.com/researchandratings/market-segment/corporates/auto-supplier/005000004002/042073";
  const singleMossIdValidSectorReferrerLink =
    "https://www.moodys.com/researchandratings/market-segment/corporates/auto-supplier/005000004002";
  const invalidReferrerLink = "";

  describe("getDocumentReferrer", () => {
    it("returns referrer link when present", async () => {
      init(validPeerReferrerLink);
      const link = getDocumentReferrer();
      expect(link).toBeDefined();
    });
    it("returns undefined when not present", async () => {
      init(invalidReferrerLink);
      const link = getDocumentReferrer();
      expect(link).toBeUndefined();
    });
  });

  describe("isPeerOrgReferrerLink", () => {
    it("can detect if URL is a peer org referrer link", async () => {
      init(validPeerReferrerLink);
      const link = getDocumentReferrer();
      const isPeerOrgLink = isPeerOrgReferrerLink(link as string);
      expect(isPeerOrgLink).toBe(true);
    });
    it("can detect if URL is not a peer org referrer link", async () => {
      init(validSectorReferrerLink);
      const link = getDocumentReferrer();
      const isPeerOrgLink = isPeerOrgReferrerLink(link as string);
      expect(isPeerOrgLink).toBe(false);
    });
  });

  describe("getOrgIdFromReferrerLink", () => {
    it("can grab the org id from peer org referral link", async () => {
      init(validPeerReferrerLink);
      const orgId = getOrgIdFromReferrerLink();
      expect(orgId).toBe("550425");
    });
  });

  describe("getPeerOrgFilterModel", () => {
    it("can grab the org id from peer org referral link", async () => {
      jest
        .spyOn(api, "fetchPeerOrgs")
        .mockReturnValue(Promise.resolve(["123"]));
      init(validPeerReferrerLink);
      const peerOrgs = (await getPeerOrgFilterModel()) as AgGridFilterModel;
      expect(peerOrgs[ColumnFieldNames.ORG_ID].values).toStrictEqual([
        "550425",
        "123",
      ]);
    });
    it("if peer orgs from org id just one, then find subsector orgs related", async () => {
      init(validPeerReferrerLinkOneResult);
      jest.spyOn(api, "fetchPeerOrgs").mockReturnValue(Promise.resolve([]));
      jest.spyOn(api, "fetchEsgInfo").mockReturnValue(
        Promise.resolve({
          rowCount: 1,
          userType: "ESG_PREMIUM",
          data: [
            {
              orgId: "186200",
              orgName: "Colombia, Government of",
              marketSegment: "Sovereign_and_Supranational",
              subSector: "Sovereign_sov",
              country: "Colombia",
            },
          ],
          hasUnauthorizedData: false,
        })
      );

      const peerOrgs = (await getPeerOrgFilterModel()) as AgGridFilterModel;

      expect(peerOrgs[ColumnFieldNames.ORG_INDUSTRY].values).toStrictEqual([
        "Sovereign_sov",
      ]);
      expect(peerOrgs[ColumnFieldNames.ORG_ID]).toBeUndefined();
    });
  });

  describe("isSectorViewReferrerLink", () => {
    it("can detect if URL is a sector view referrer link", async () => {
      init(validSectorReferrerLink);
      const link = getDocumentReferrer();
      const isSectorViewReferrer = isSectorViewReferrerLink(link as string);
      expect(isSectorViewReferrer).toBe(true);
    });
    it("can detect if URL is not a peer org referrer link", async () => {
      init(validPeerReferrerLink);
      const link = getDocumentReferrer();
      const isSectorViewReferrer = isSectorViewReferrerLink(link as string);
      expect(isSectorViewReferrer).toBe(false);
    });
  });

  describe("getMossIdsFromReferrerLink", () => {
    it("can grab the moss ids from sector view referral link", async () => {
      init(validSectorReferrerLink);
      const mossIds = getMossIdsFromReferrerLink() as string[];
      expect(mossIds[0]).toBe("005000004002");
      expect(mossIds[1]).toBe("042073");
    });

    it("can grab the moss idsfrom sector view referral link that only contains 1 moss id", async () => {
      init(singleMossIdValidSectorReferrerLink);
      const mossIds = getMossIdsFromReferrerLink() as string[];
      expect(mossIds[0]).toBe("005000004002");
      expect(mossIds.length).toBe(1);
    });
  });

  describe("getSectorViewsFilterModel", () => {
    it("can grab the sector/region owl ids from sector view referral link", async () => {
      init(validSectorReferrerLink);
      const taxonomyData = {
        marketSegment: {
          labelMap: {
            Auto_Supplier: "Auto Supplier",
          },
          seoLabelMap: {
            ["auto-supplier"]: {
              OwlID: "Auto_Supplier",
              Name: "Auto Supplier",
              Path: [],
              EnglishLabel: "Auto Supplier",
              SeoLabel: "auto-supplier",
              Parent: null,
              Children: null,
            },
          },
          mossIdMap: {
            "005000004002": "Auto_Supplier",
          },
          taxonomy: [],
        },
        region: {
          labelMap: {
            Canada: "Canada",
          },
          seoLabelMap: {
            canada: {
              OwlID: "Canada",
              Name: "Canada",
              Path: [],
              EnglishLabel: "Canada",
              SeoLabel: "canada",
              Parent: null,
              Children: null,
            },
          },
          mossIdMap: {
            "042073": "Canada",
          },
          taxonomy: [],
        },
      };
      const sectorViewFilterModel = (await getSectorViewsFilterModel(
        taxonomyData
      )) as AgGridFilterModel;
      expect(
        sectorViewFilterModel[ColumnFieldNames.ORG_INDUSTRY].values
      ).toStrictEqual(["Auto_Supplier"]);
      expect(
        sectorViewFilterModel[ColumnFieldNames.ORG_COUNTRY].values
      ).toStrictEqual(["Canada"]);
    });
  });
});
