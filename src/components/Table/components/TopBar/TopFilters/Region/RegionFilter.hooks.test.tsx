import { GridApi } from "ag-grid-enterprise";
import { act } from "react-dom/test-utils";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import {
  countryFacetsMockResponse,
  mockReduxStore,
} from "@services/redux/mocks";
import { saveCountryFilterModel } from "@services/redux";
import { useRegionTreeSelectEvents } from "./RegionFilter.hooks";

describe("Region Filter Hooks", () => {
  const mockGridApi = {
    getFilterModel: jest.fn(),
    setFilterModel: jest.fn(),
    paginationGoToFirstPage: jest.fn(),
  } as unknown as GridApi;

  const init = () => {
    const { renderHook, store } = mockReduxStore({});

    const { result } = renderHook(() => {
      const { countrySelected, countrySelectAll, ...handlers } =
        useRegionTreeSelectEvents(mockGridApi);
      return { countrySelected, countrySelectAll, ...handlers };
    });

    return { handlers: result, store };
  };

  it("should return correct types", () => {
    const { handlers } = init();
    const { countrySelected, countrySelectAll, countryTreeSelectOnChange } =
      handlers.current;

    expect(typeof countrySelected).toBe("object");
    expect(typeof countrySelectAll).toBe("boolean");
    expect(typeof countryTreeSelectOnChange).toBe("function");
    expect(countrySelectAll).toBeFalsy();
    expect(countrySelected).toStrictEqual([]);
  });

  describe("countryTreeSelectOnChange", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should set new filter model with the country field without children", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(true, {
          id: "Sri_Lanka",
          name: "Sri_Lanka",
        });
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: ["Sri_Lanka"],
        },
      });
    });

    it("should set new filter model with the country field with children", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(true, {
          id: "Asia",
          name: "Asia",
          children: [
            { id: "Sri_Lanka", name: "Sri_Lanka" },
            { id: "India", name: "India" },
          ],
        });
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: ["Sri_Lanka", "India", "Asia"],
        },
      });
    });

    it("should set new filter model with the country field including all facets", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(false, {
          id: "Asia",
          name: "Asia",
          children: [
            { id: "Sri_Lanka", name: "Sri_Lanka" },
            { id: "India", name: "India" },
          ],
        });
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: countryFacetsMockResponse.filter(
            (i) => !["Asia", "Sri_Lanka", "India"].includes(i ?? "")
          ),
        },
      });
    });

    it("should update filter model of the country field to add new items", () => {
      const { handlers, store } = init();

      act(() => {
        store.dispatch(
          saveCountryFilterModel({
            filterType: "set",
            values: ["Sri_Lanka", "India", "Asia"],
          })
        );
      });

      act(() => {
        handlers.current.countryTreeSelectOnChange(true, {
          id: "Europe",
          name: "Europe",
          children: [{ id: "Germany", name: "Germany" }],
        });
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: ["Sri_Lanka", "India", "Asia", "Germany", "Europe"],
        },
      });
    });

    it("should update filter model of the country field to remove items", () => {
      const { handlers, store } = init();

      act(() => {
        store.dispatch(
          saveCountryFilterModel({
            filterType: "set",
            values: ["Sri_Lanka", "India", "Asia", "Germany", "Europe"],
          })
        );
      });

      act(() => {
        handlers.current.countryTreeSelectOnChange(false, {
          id: "Sri_Lanka",
          name: "Sri_Lanka",
        });
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: ["India", "Asia", "Germany", "Europe"],
        },
      });
    });

    it("should set country field in the filter model if node is null and checked", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(true, null);
      });

      expect(handlers.current.countrySelectAll).toBe(true);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
        [ColumnFieldNames.ORG_COUNTRY]: {
          filterType: "set",
          values: countryFacetsMockResponse,
        },
      });
    });

    it("should set country field in the filter model with empty values", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(false, null);
      });

      expect(handlers.current.countrySelectAll).toBe(false);
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({});
    });

    it("should reset page", () => {
      const { handlers } = init();

      act(() => {
        handlers.current.countryTreeSelectOnChange(false, null);
      });

      expect(mockGridApi.paginationGoToFirstPage).toHaveBeenCalled();
    });
  });
});
