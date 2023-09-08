import fetchMock from "jest-fetch-mock";
import { initRTK } from "@services/api/rtk/rtk-test-helper";
import { AEMEsgTooltipInfo } from "@models/aem.types";
import { UrlGateway, UrlPath } from "@constants/api";
import { aemDrawerInfoApi } from "./aemApi";

jest.spyOn(console, "error").mockImplementation(() => undefined);

describe("aemAPI", () => {
  const fetchCISDrawerInfoAction =
    aemDrawerInfoApi.endpoints.fetchCISDrawerInfo.initiate(undefined);
  const fetchIPSDrawerInfoAction =
    aemDrawerInfoApi.endpoints.fetchIPSDrawerInfo.initiate(undefined);
  const fetchESGTooltipInfoAction =
    aemDrawerInfoApi.endpoints.fetchEsgTooltipInfo.initiate(undefined);

  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  const drawerInfoQueryResponse = [
    {
      body: "<p>The Moody's Investors Service (MIS)</p>\n",
      title: "<p>Overview</p>\n",
    },
  ];

  describe("fetchCISDrawerInfo", () => {
    it("should initiate request with correct url and headers", async () => {
      await initRTK(fetchCISDrawerInfoAction, {});

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const { method, url } = fetchMock.mock.calls[0][0] as Request;

      expect(method).toBe("GET");
      expect(url).toBe(`${UrlGateway.ESG_AEM}/${UrlPath.CIS_DRAWER_INFO}`);
    });

    it("should mark status fullfilled on successful response", async () => {
      const action = await initRTK(
        fetchCISDrawerInfoAction,
        drawerInfoQueryResponse
      );
      const { status, data, isSuccess } = action;
      expect(status).toBe("fulfilled");
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual(drawerInfoQueryResponse);
    });

    it("should mark status rejected on failed response", async () => {
      const action = await initRTK(fetchCISDrawerInfoAction);
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });

  describe("fetchIPSDrawerInfo", () => {
    it("should initiate request with correct url and headers", async () => {
      await initRTK(fetchIPSDrawerInfoAction, {});

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const { method, url } = fetchMock.mock.calls[0][0] as Request;

      expect(method).toBe("GET");
      expect(url).toBe(`${UrlGateway.ESG_AEM}/${UrlPath.IPS_DRAWER_INFO}`);
    });

    it("should mark status fullfilled on successful response", async () => {
      const action = await initRTK(
        fetchIPSDrawerInfoAction,
        drawerInfoQueryResponse
      );
      const { status, data, isSuccess } = action;
      expect(status).toBe("fulfilled");
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual(drawerInfoQueryResponse);
    });

    it("should mark status rejected on failed response", async () => {
      const action = await initRTK(fetchIPSDrawerInfoAction);
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });

  describe("fetchEsgTooltipInfo", () => {
    const ESGTooltipInfoResponse: AEMEsgTooltipInfo[] = [
      {
        issuer_name: {
          headerName: "Issuer Name",
          tooltip: ["Issuer Name Tooltip"],
        },
      },
    ];

    it("should initiate request with correct url and headers", async () => {
      await initRTK(fetchESGTooltipInfoAction, {});

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const { method, url } = fetchMock.mock.calls[0][0] as Request;

      expect(method).toBe("GET");
      expect(url).toBe(`${UrlGateway.ESG_AEM}/${UrlPath.ESG_TOOLTIP}`);
    });

    it("should mark status fullfilled on successful response", async () => {
      const action = await initRTK(
        fetchESGTooltipInfoAction,
        ESGTooltipInfoResponse
      );
      const { status, data, isSuccess } = action;
      expect(status).toBe("fulfilled");
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual(ESGTooltipInfoResponse);
    });

    it("should mark status rejected on failed response", async () => {
      const action = await initRTK(fetchESGTooltipInfoAction);
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });
});
