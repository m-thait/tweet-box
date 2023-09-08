import { GridApi } from "ag-grid-enterprise";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { act } from "@testing-library/react";
import {
  mockReduxStore,
  subSectorFacetsMockResponse,
} from "@services/redux/mocks";
import { saveSubSectorFilterModel } from "@services/redux";
import { useMarketSegmentTreeSelectEvents } from "./MarketSegment.hooks";

describe("MarketSegment Filter Hooks", () => {
  const mockGridApi = {
    getFilterModel: jest.fn(),
    setFilterModel: jest.fn(),
    paginationGoToFirstPage: jest.fn(),
  } as unknown as GridApi;

  const init = () => {
    const { renderHook, store } = mockReduxStore({});

    const { result } = renderHook(() => {
      const { sectorSelected, sectorSelectAll, ...handlers } =
        useMarketSegmentTreeSelectEvents(mockGridApi);
      return { sectorSelected, sectorSelectAll, ...handlers };
    });

    return { handlers: result, store };
  };

  it("should return correct types", () => {
    const { handlers } = init();
    const { sectorSelected, sectorSelectAll, sectorTreeSelectOnChange } =
      handlers.current;

    expect(typeof sectorSelected).toBe("object");
    expect(typeof sectorSelectAll).toBe("boolean");
    expect(typeof sectorTreeSelectOnChange).toBe("function");
    expect(sectorSelectAll).toBeFalsy();
    expect(sectorSelected).toStrictEqual([]);
  });

  describe("sectorTreeSelectOnChange", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should set new filter model with the industry field without children", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, {
          id: "Auto_Parts",
          name: "Auto Parts",
        });
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: ["Auto_Parts"],
        },
      });
    });

    it("should set new filter model with the industry field with children", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, {
          id: "Automotive",
          name: "Automotive",
          children: [
            { id: "Auto_Parts", name: "Auto Parts" },
            { id: "Multi-utility", name: "Multi Utility" },
          ],
        });
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: ["Auto_Parts", "Multi-utility", "Automotive"],
        },
      });
    });

    it("should set new filter model with the industry field including all facets", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(false, {
          id: "Automotive",
          name: "Automotive",
          children: [
            { id: "Auto_Parts", name: "Auto Parts" },
            { id: "Multi-utility", name: "Multi Utility" },
          ],
        });
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: subSectorFacetsMockResponse.filter(
            (i) =>
              !["Automotive", "Auto_Parts", "Multi-utility"].includes(i ?? "")
          ),
        },
      });
    });

    it("should update filter model of the industry field to add new items", () => {
      const { handlers, store } = init();

      act(() => {
        store.dispatch(
          saveSubSectorFilterModel({
            filterType: "set",
            values: ["Automotive", "Auto_Parts", "Multi-utility"],
          })
        );
      });

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, {
          id: "Satellite_Services",
          name: "Satellite Services",
          children: [{ id: "Towers", name: "Towers" }],
        });
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: [
            "Automotive",
            "Auto_Parts",
            "Multi-utility",
            "Towers",
            "Satellite_Services",
          ],
        },
      });
    });

    it("should update filter model of the industry field to remove items", () => {
      const { handlers, store } = init();

      act(() => {
        store.dispatch(
          saveSubSectorFilterModel({
            filterType: "set",
            values: [
              "Automotive",
              "Auto_Parts",
              "Multi-utility",
              "Towers",
              "Satellite_Services",
            ],
          })
        );
      });

      act(() => {
        handlers.current.sectorTreeSelectOnChange(false, {
          id: "Automotive",
          name: "Automotive",
        });
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: [
            "Auto_Parts",
            "Multi-utility",
            "Towers",
            "Satellite_Services",
          ],
        },
      });
    });

    it("should delete industry field in the filter model if node is null", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(true, null);
      });

      expect(handlers.current.sectorSelectAll).toBe(true);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_INDUSTRY]: {
          filterType: "set",
          values: subSectorFacetsMockResponse,
        },
      });
    });

    it("should set industry field in the filter model with empty values", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(false, null);
      });

      expect(handlers.current.sectorSelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({});
    });

    it("should reset page", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.sectorTreeSelectOnChange(false, null);
      });

      expect(mockGridApi.paginationGoToFirstPage).toHaveBeenCalled();
    });
  });
});
