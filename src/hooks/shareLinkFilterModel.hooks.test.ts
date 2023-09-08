import { cleanup, act } from "@testing-library/react";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { mockReduxStore } from "@services/redux/mocks";
import * as api from "@services/api";
import { AgGridFilterType } from "@models/table.types";
import { useShareLinkFilterModel } from "./shareLinkFilterModel.hooks";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    getShareLinkFilterModel: jest.fn(),
  };
});

describe("useShareLinkFilterModel", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = (query?: Record<string, string>) => {
    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((name: string) => (query ? query[name] : null));

    const { renderHook } = mockReduxStore();
    const { result, rerender } = renderHook(() => useShareLinkFilterModel());
    return { result, rerender };
  };

  describe("Share Link Filter Models", () => {
    it("should return an undefined filter model if no share-link query param is provided.", async () => {
      const { result } = init();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toBe(undefined);
    });

    it("should return an undefined filter model if bad share link id is provided.", async () => {
      const { result, rerender } = init({
        ["share-link"]: "badId",
      });

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toBe(undefined);
    });

    it("should return a peer org filter model if valid referrer is provided.", async () => {
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
      expect(result.current.filterModel as AgGridFilterModel).toStrictEqual(
        mockShareLinkFilterModel
      );
    });
  });
});
