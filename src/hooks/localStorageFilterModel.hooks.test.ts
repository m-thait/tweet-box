import { cleanup, act } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { setItemInLocalStorage } from "@utils/test.helper.utils";
import { PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY } from "@constants/local-storage";
import { AgGridFilterType } from "@models/table.types";
import { mockReduxStore } from "@services/redux/mocks";
import { useLocalStorageFilterModel } from "./localStorageFilterModel.hooks";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
  };
});

describe("useLocalStorageFilterModel", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = () => {
    const { renderHook } = mockReduxStore();
    const { result, rerender } = renderHook(() => useLocalStorageFilterModel());
    return { result, rerender };
  };

  describe("hook properly returns values from localStorage.utls functions", () => {
    it("should return undefined filter model if no orgIds in localStorage", async () => {
      const { result, rerender } = init();

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toBe(undefined);
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
});
