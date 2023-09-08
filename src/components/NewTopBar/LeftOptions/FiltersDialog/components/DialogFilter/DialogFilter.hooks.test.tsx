import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { act } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks";
import { useMarketSegmentTreeSelectEvents } from "./DialogFilter.hooks";

describe("Popup Filter Hooks", () => {
  const setDialogFilterModelMock = jest.fn();
  const init = () => {
    const { renderHook } = mockReduxStore({});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const { result } = renderHook(() => {
      const { sectorSelectAll, sectorTreeSelectOnChange } =
        useMarketSegmentTreeSelectEvents({
          dialogFilterModel: {},
          setDialogFilterModel: setDialogFilterModelMock,
          fieldName: ColumnFieldNames.ORG_COUNTRY,
          facets: ["A1", "A2", "A3"],
        });
      return { sectorSelectAll, sectorTreeSelectOnChange };
    });

    return { handlers: result };
  };

  it("should return correct types", () => {
    const { handlers } = init();
    const { sectorSelectAll, sectorTreeSelectOnChange } = handlers.current;

    expect(typeof sectorSelectAll).toBe("boolean");
    expect(typeof sectorTreeSelectOnChange).toBe("function");
    expect(sectorSelectAll).toBeFalsy();
  });

  describe("sectorTreeSelectOnChange", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should set new filter model new value", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, {
          id: "Auto_Parts",
          name: "Auto Parts",
        });
      });

      expect(
        JSON.stringify(setDialogFilterModelMock.mock.calls[0])
      ).toStrictEqual(
        JSON.stringify([
          {
            [ColumnFieldNames.ORG_COUNTRY]: {
              filterType: "set",
              values: ["Auto_Parts"],
            },
          },
        ])
      );

      expect(handlers.current.sectorSelectAll).toBe(false);
    });

    it("should return full array on selecting all", () => {
      const { handlers } = init();
      expect(handlers.current.sectorSelectAll).toBe(false);

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, null);
      });

      expect(
        JSON.stringify(setDialogFilterModelMock.mock.calls[0])
      ).toStrictEqual(
        JSON.stringify([
          {
            [ColumnFieldNames.ORG_COUNTRY]: {
              filterType: "set",
              values: ["A1", "A2", "A3"],
            },
          },
        ])
      );
    });

    it("should set remove filter value array on unselecting all", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(false, null);
      });

      expect(
        JSON.stringify(setDialogFilterModelMock.mock.calls[0])
      ).toStrictEqual(
        JSON.stringify([
          {
            [ColumnFieldNames.ORG_COUNTRY]: undefined,
          },
        ])
      );
    });
  });
});
