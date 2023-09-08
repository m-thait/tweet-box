import { cleanup, act } from "@testing-library/react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { mockReduxStore } from "@services/redux/mocks";
import * as api from "@services/api";
import { useReferrerLinkFilterModel } from "./referrerLinkFilterModel.hooks";

const validPeerReferrerLink =
  "https://www.moodys.com/credit-ratings/Nissan-Motor-Co-Ltd-credit-rating-550425/summary";
const invalidReferrerLink = "https://google.com";

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    fetchPeerOrgs: jest.fn(),
  };
});

describe("useReferrerLinkFilterModel", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = (referrerLink?: string) => {
    jest
      .spyOn(document, "referrer", "get")
      .mockImplementation(() => referrerLink as string);

    const { renderHook } = mockReduxStore();
    const { result, rerender } = renderHook(() => useReferrerLinkFilterModel());
    return { result, rerender };
  };

  describe("Peer Org/Company Page Referrer Links", () => {
    it("should return an undefined filter model if no referrer is provided.", async () => {
      const { result, rerender } = init("");

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      const { filterModel: presetFilterModel } = result.current;
      expect(presetFilterModel).toBe(undefined);
    });

    it("should return an undefined filter model if bad referrer is provided.", async () => {
      const { result, rerender } = init(invalidReferrerLink);

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
      jest
        .spyOn(api, "fetchPeerOrgs")
        .mockReturnValue(Promise.resolve(["123"]));
      const { result, rerender } = init(validPeerReferrerLink);

      expect(result.current.isSuccess).toBe(false);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      rerender();
      expect(result.current.isSuccess).toBe(true);
      expect(
        (result.current.filterModel as AgGridFilterModel)[
          ColumnFieldNames.ORG_ID
        ].values
      ).toStrictEqual(["550425", "123"]);
    });
  });
});
