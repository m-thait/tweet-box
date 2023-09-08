import { ColumnFieldNames, EsgInfo } from "@moodys/mdc-table.schemas.screener";
import { setItemInLocalStorage } from "@utils/test.helper.utils";
import * as api from "@services/api";
import {
  CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY,
  CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
  PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
} from "@constants/local-storage";
import { AgGridFilterType } from "@models/table.types";
import { checkOrgIdsFromStorage } from "./localStorage.utils";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
    fetchEsgInfo: jest.fn(),
  };
});

describe("checkOrgIdsFromStorage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return false if no orgIds in localStorage", async () => {
    const { isRedirect } = await checkOrgIdsFromStorage();
    expect(isRedirect).toStrictEqual(false);
  });

  describe("Navigate from Peer Comparison Widget", () => {
    it("should set empty if org ids are not in the local storage", async () => {
      const { isRedirect, redirectFilterModel } =
        await checkOrgIdsFromStorage();

      expect(isRedirect).toBe(false);
      expect(redirectFilterModel).toBeUndefined();
    });

    it("should get org ids from the local storage", async () => {
      const someOrg: EsgInfo = {
        orgId: "186200",
        orgName: "Colombia, Government of",
        marketSegment: "Sovereign_and_Supranational",
        subSector: "Sovereign_sov",
        country: "Colombia",
      };
      jest
        .spyOn(api, "fetchEsgInfo")
        .mockResolvedValue({ data: [someOrg], rowCount: 1 });
      const keyValue = ["123", "2222"];
      setItemInLocalStorage(PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY, keyValue);

      const { isRedirect, redirectFilterModel } =
        await checkOrgIdsFromStorage();

      expect(isRedirect).toBe(true);
      expect(redirectFilterModel).toStrictEqual({
        [ColumnFieldNames.ORG_ID]: {
          filterType: AgGridFilterType.SET,
          values: ["123", "2222"],
        },
      });
    });
  });

  describe("Navigate from CIS Distribution Widget", () => {
    it("should get filter model from the local storage", async () => {
      const keyValue = {
        anchorOrg: "1234",
        sector: "Pharmaceuticals",
        filters: { cis: ["CIS-3"] },
      };
      setItemInLocalStorage(CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY, keyValue);

      const { isRedirect, redirectFilterModel } =
        await checkOrgIdsFromStorage();
      expect(isRedirect).toBe(true);
      expect(redirectFilterModel).toStrictEqual({
        [ColumnFieldNames.CREDIT_IMPACT_SCORE]: {
          filterType: AgGridFilterType.SET,
          values: ["3"],
        },
        [ColumnFieldNames.ORG_ESG_SECTOR_MIS]: {
          filterType: AgGridFilterType.SET,
          values: ["Pharmaceuticals"],
        },
      });
    });
  });

  describe("Navigate from CV2 Issuer Page", () => {
    it("should fetch peer orgs and set filter model", async () => {
      jest
        .spyOn(api, "fetchPeerOrgs")
        .mockReturnValue(Promise.resolve(["123"]));
      const keyValue = ["7564"];
      setItemInLocalStorage(
        CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
        keyValue
      );

      const { isRedirect, redirectFilterModel } =
        await checkOrgIdsFromStorage();

      expect(isRedirect).toBe(true);
      expect(redirectFilterModel).toStrictEqual({
        [ColumnFieldNames.ORG_ID]: {
          filterType: AgGridFilterType.SET,
          values: ["7564", "123"],
        },
      });
    });
    it("should not fetch peer orgs if no anchor org exists", async () => {
      setItemInLocalStorage(CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY, []);

      const { isRedirect, redirectFilterModel } =
        await checkOrgIdsFromStorage();
      expect(isRedirect).toBe(false);
      expect(redirectFilterModel).toStrictEqual(undefined);
    });
  });
});
