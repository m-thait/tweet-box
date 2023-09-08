import { cleanup, act } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { mockReduxStore, mockTaxonomyStoreState } from "@services/redux/mocks";
import { setItemInLocalStorage } from "@utils/test.helper.utils";
import { PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY } from "@constants/local-storage";
import * as api from "@services/api";
import { AgGridFilterModel, AgGridFilterType } from "@models/table.types";
import { usePresetFilterModel } from "./presetFilter.hooks";

const validPeerReferrerLink =
  "https://www.moodys.com/credit-ratings/Nissan-Motor-Co-Ltd-credit-rating-550425/summary";
const invalidReferrerLink = "https://google.com";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
    getShareLinkFilterModel: jest.fn(),
  };
});

describe("usePresetFilterModel", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = (query?: Record<string, string>, referrerLink?: string) => {
    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((name: string) => (query ? query[name] : null));

    jest
      .spyOn(document, "referrer", "get")
      .mockImplementation(() => referrerLink as string);

    const { renderHook } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.goodResponse,
      loadSuccessfulTaxonomyCalls: true,
    });
    const { result, rerender } = renderHook(() => usePresetFilterModel());
    return { result, rerender };
  };

  describe("Query Param Filter Model", () => {
    it("should not set a filter model if no query paramter is provided", async () => {
      const { result, rerender } = init();

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should not set a filter model if bad query paramter is provided", async () => {
      const { result, rerender } = init({
        sector: "BadSector",
      });

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should set Corporates filter model if Corporates query paramter is provided", async () => {
      const { result, rerender } = init({
        sector: "corporates",
      });

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(presetFilterModel?.subSector.values.length).toBe(186);
    });
  });

  describe("Referrer Link Filter Model - Company Pages/Peer Orgs", () => {
    it("should return an undefined filter model if no referrer is provided.", async () => {
      const { result, rerender } = init(undefined, "");

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      const { filterModel: presetFilterModel } = result.current;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should return an undefined filter model if bad referrer is provided.", async () => {
      const { result, rerender } = init(undefined, invalidReferrerLink);

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      const { filterModel: presetFilterModel } = result.current;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should return a peer org filter model if valid referrer is provided.", async () => {
      jest
        .spyOn(api, "fetchPeerOrgs")
        .mockReturnValue(Promise.resolve(["123"]));
      const { result, rerender } = init(undefined, validPeerReferrerLink);

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(
        (result.current.filterModel as AgGridFilterModel)[
          ColumnFieldNames.ORG_ID
        ].values
      ).toStrictEqual(["550425", "123"]);
    });
  });

  describe("Local Storage Filter Model", () => {
    it("should return undefined filter model if no orgIds in localStorage", async () => {
      const { result, rerender } = init();

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should get org ids from the local storage", async () => {
      const keyValue = ["1111", "2222"];
      setItemInLocalStorage(PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY, keyValue);

      const { result, rerender } = init();

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toStrictEqual({
        [ColumnFieldNames.ORG_ID]: {
          filterType: AgGridFilterType.SET,
          values: ["1111", "2222"],
        },
      });
    });
  });

  describe("Share Link Filter Model", () => {
    it("should return undefined filter model if share-link is provided.", async () => {
      const { result, rerender } = init();

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(isEmpty(presetFilterModel)).toBe(true);
    });

    it("should valid filter model when valid share-link id is provided", async () => {
      const mockShareLinkFilterModel = {
        subSector: {
          filterType: AgGridFilterType.SET,
          values: [
            "Sovereign_and_Supranational",
            "Sovereign_sov",
            "Supranational_Sovereigns",
            "Central_Government_Agency",
          ],
        },
      };
      jest
        .spyOn(api, "getShareLinkFilterModel")
        .mockReturnValue(Promise.resolve(mockShareLinkFilterModel));
      const { result, rerender } = init({
        ["share-link"]: "s2zk1sSx59CcRSYnemPhA",
      });

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toStrictEqual(mockShareLinkFilterModel);
    });
  });

  describe("Preset Filter Model Priorities", () => {
    it("if both query param and valid referrer link is present, query param filter model should be used.", async () => {
      jest
        .spyOn(api, "fetchPeerOrgs")
        .mockReturnValue(Promise.resolve(["123"]));
      const { result, rerender } = init(
        {
          sector: "corporates",
        },
        validPeerReferrerLink
      );

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(presetFilterModel?.subSector.values.length).toBe(186);
    });
  });
});
