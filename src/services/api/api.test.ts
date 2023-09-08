import { FilterParams } from "@moodys/mdc-table.table";
import * as HttpClient from "@services/http";
import {
  fetchCharts,
  fetchColumnFacets,
  fetchListMedian,
  fetchPeerOrgs,
  fetchLtRatingSparklines,
  saveShareLinkFilterModel,
  getShareLinkFilterModel,
  fetchEsgInfo,
  fetchOrgInfo,
} from "./api";

jest.mock("@services/http");
jest.mock("@moodys/mdc-frontend.services.logger");

describe("api", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("fetchColumnFacets", () => {
    const column = "country";
    const filters: Record<string, unknown>[] = [];

    it("should return an array of facets", async () => {
      const mockFacets = {
        data: ["CIS-1", "CIS-2", "CIS-3", "CIS-4", "CIS-5", "NA"],
      };
      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue(mockFacets);
      const result = await fetchColumnFacets(column, filters);

      await expect(result).toStrictEqual(mockFacets.data);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/esg-facets",
        {
          filters,
          facet: column,
        }
      );
    });
  });

  describe("fetchListMedian", () => {
    const filters: FilterParams[] = [
      {
        name: "country",
        type: "text",
        values: ["ARMENIA"],
      },
    ];

    it("should return an array of list medians", async () => {
      const mockListMedians = {
        data: {
          listMedians: [
            {
              credit_impact_score: 2,
              org_name: "List Median",
            },
          ],
        },
      };
      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue(
        mockListMedians
      );
      const result = await fetchListMedian(filters);

      await expect(result).toStrictEqual(mockListMedians.data);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/esg-list-median",
        {
          filters,
        }
      );
    });
  });

  describe("fetchPeerOrgs", (): void => {
    it("should return an array of peer orgs", async (): Promise<void> => {
      const mockPeerOrgs = ["org1", "org2"];
      const mockResponse = {
        data: {
          peerOrgIds: ["org1", "org2"],
        },
      };
      (HttpClient.axiosClient.get as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      const result = await fetchPeerOrgs("orgId");

      await expect(result).toStrictEqual(mockPeerOrgs);
      await expect(HttpClient.axiosClient.get).toHaveBeenCalledWith(
        "/esg-peer-orgs/orgId"
      );
    });

    it("should return an empty array if peer orgs are missing", async (): Promise<void> => {
      const mockResponse = {
        data: {
          peerOrgIds: undefined,
        },
      };
      (HttpClient.axiosClient.get as jest.Mock).mockResolvedValue(mockResponse);
      const result = await fetchPeerOrgs("orgId2");

      await expect(result).toStrictEqual([]);
      await expect(HttpClient.axiosClient.get).toHaveBeenCalledWith(
        "/esg-peer-orgs/orgId2"
      );
    });
  });

  describe("fetchCharts", (): void => {
    it("should return a charts object", async (): Promise<void> => {
      const filters: Record<string, unknown>[] = [];
      const mockChartsResponse = {
        data: {
          ratings: { A1: { ASC: 1 } },
          scores: {
            "CIS-1": "5",
          },
        },
      };
      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValueOnce(
        mockChartsResponse
      );
      const result = await fetchCharts([]);

      await expect(result).toStrictEqual(mockChartsResponse.data);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/esg-charts",
        { filters }
      );
    });
  });

  describe("fetchLtRatingSparklines", (): void => {
    it("should return a sparklines object", async (): Promise<void> => {
      const mockSparklinesResponse = {
        data: { "2300": { newStart: false, data: [] } },
      };
      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValueOnce(
        mockSparklinesResponse
      );
      const result = await fetchLtRatingSparklines(["2300"]);

      await expect(result).toStrictEqual(mockSparklinesResponse.data);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/lt-rating-sparklines",
        { orgIds: ["2300"] }
      );
    });
  });

  describe("saveShareLinkFilterModel", (): void => {
    it("should return an id", async (): Promise<void> => {
      const mockFilterModel = {
        orgId: {
          filterType: "set",
          values: ["1111", "2222"],
        },
      };
      const mockSaveFilterModelResponse = {
        data: { id: "813086b3-3081-4859-9321-2a4996142b6f" },
      };
      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValueOnce(
        mockSaveFilterModelResponse
      );
      const result = await saveShareLinkFilterModel(mockFilterModel);

      await expect(result).toStrictEqual(mockSaveFilterModelResponse.data.id);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/share-link",
        { filterModel: mockFilterModel }
      );
    });
  });

  describe("getShareLinkFilterModel", (): void => {
    it("should return a saved filterModel", async (): Promise<void> => {
      const mockFilterModel = {
        orgId: {
          filterType: "set",
          values: ["1111", "2222"],
        },
      };
      const mockFetchFilterModelResponse = {
        data: {
          filterModel: mockFilterModel,
        },
      };
      (HttpClient.axiosClient.get as jest.Mock).mockResolvedValueOnce(
        mockFetchFilterModelResponse
      );
      const result = await getShareLinkFilterModel(
        "813086b3-3081-4859-9321-2a4996142b6f"
      );

      await expect(result).toStrictEqual(
        mockFetchFilterModelResponse.data.filterModel
      );
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/share-link",
        { filterModel: mockFilterModel }
      );
    });
  });

  describe("fetchEsgInfo", () => {
    const filters: FilterParams[] = [
      {
        name: "orgId",
        type: "text",
        values: ["186200"],
      },
    ];

    it("should return an array of list org", async () => {
      const mockResponse = {
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
      };

      (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue(
        mockResponse
      );
      const result = await fetchEsgInfo(filters);

      await expect(result).toStrictEqual(mockResponse.data);
      await expect(HttpClient.axiosClient.post).toHaveBeenCalledWith(
        "/esg-info",
        {
          filters,
          countOnly: false,
        }
      );
    });
  });

  describe("fetchOrgInfo", (): void => {
    it("should return an array of analysts", async (): Promise<void> => {
      const mockAnalystsResponse = {
        data: {
          analysts: [
            {
              role: "Lead Analyst",
              name: "William V. Fahy",
              phone: "212-553-1687",
              email: "William.Fahy@moodys.com",
            },
          ],
        },
      };
      (HttpClient.axiosClient.get as jest.Mock).mockResolvedValueOnce(
        mockAnalystsResponse
      );

      const result = await fetchOrgInfo("someOrgId");

      await expect(result.analysts.length).toStrictEqual(1);
      await expect(HttpClient.axiosClient.get).toHaveBeenCalledWith(
        "/org-info/someOrgId"
      );
    });
  });
});
