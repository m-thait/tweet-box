import { getValuesFromFilterModel } from "@moodys/mdc-table.table";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { fetchColumnFacets } from "@services/api";
import * as api from "@services/api";
import {
  fetchFacetValues,
  fetchPeerOrgsFilterModel,
  getEsgSubSector,
  mapIssuerOutlookValues,
} from "./table.utils";

jest.mock("@moodys/mdc-table.table");
jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
    fetchOwlIds: jest.fn(),
    fetchEsgInfo: jest.fn(),
    fetchColumnFacets: jest.fn(),
  };
});

describe("Table Utils Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should return facets list", async () => {
    (getValuesFromFilterModel as jest.Mock).mockImplementation(() => []);
    (fetchColumnFacets as jest.Mock).mockResolvedValue(["someFacetValue"]);

    const result = await fetchFacetValues("someColId", {});

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0]).toBe("someFacetValue");
  });

  describe("mapIssuerOutlookValues", () => {
    it("should map outlook values to filter values", () => {
      const startingValues = ["Stable"];
      const mappedValues = mapIssuerOutlookValues(startingValues);
      expect(mappedValues[1]).toBe("STA");
      expect(mappedValues[2]).toBe("STA(m)");
    });
  });

  describe("getEsgSubSector", () => {
    it("should return subSector when esgInfoRes.data[0].subSector is defined", async () => {
      const anchorOrgId = "186200";
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

      const subSector = await getEsgSubSector(anchorOrgId);

      expect(subSector).toBe("Sovereign_sov");
    });
  });

  describe("fetchPeerOrgsFilterModel", () => {
    it("should return the correct filter model", async () => {
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
      const anchorOrgId = "186200";

      const peerOrgs = await fetchPeerOrgsFilterModel(anchorOrgId);

      expect(peerOrgs[ColumnFieldNames.ORG_INDUSTRY].values).toStrictEqual([
        "Sovereign_sov",
      ]);
      expect(peerOrgs[ColumnFieldNames.ORG_ID]).toBeUndefined();
    });
  });
});
