import { act } from "@testing-library/react";
import { GridApi } from "ag-grid-enterprise";
import { MutableRefObject } from "react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { AgGridSidePanel, AgGridFilterType } from "@models/table.types";
import {
  getCountryFilterModel,
  getLTRatingFilterModel,
  getSubSectorFilterModel,
  setSidePanel,
} from "@services/redux";
import { mockReduxStore } from "@services/redux/mocks";
import { initialTableReduxState } from "./top-filter-test.helper";
import { useLeftOptionsEvents } from "./LeftOptions.hooks";

describe("LeftOptions top bar hooks test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGridApi = {
    openToolPanel: jest.fn(),
    closeToolPanel: jest.fn(),
    setFilterModel: jest.fn(),
    getFilterModel: jest.fn(),
  } as unknown as GridApi;

  const mockChipsContainer = {
    current: {
      clientWidth: 100,
      scrollLeft: 500,
      children: [{ clientWidth: 200 }],
    },
  } as unknown as MutableRefObject<HTMLDivElement>;

  const init = () => {
    const { renderHook, store } = mockReduxStore({
      updatedInitialState: initialTableReduxState,
    });

    const { result } = renderHook(() => {
      const { isOverflowing, ...handlers } = useLeftOptionsEvents({
        gridApi: mockGridApi,
        chipsContainer: mockChipsContainer,
      });
      return { isOverflowing, ...handlers };
    });

    return { handlers: result, store };
  };

  it("should return top bar event handlers", () => {
    const { handlers } = init();
    const {
      handleMoreFiltersClick,
      handleClearAllClick,
      handleDelete,
      onLeftClick,
      onRightClick,
      appliedFilters,
      isOverflowing,
      treeFilters,
    } = handlers.current;

    expect(typeof handleMoreFiltersClick).toBe("function");
    expect(typeof handleClearAllClick).toBe("function");
    expect(typeof handleDelete).toBe("function");
    expect(typeof onLeftClick).toBe("function");
    expect(typeof onRightClick).toBe("function");
    expect(appliedFilters).toStrictEqual({
      "Credit Impact Score": ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      Country: ESGColumnFields.ORG_COUNTRY.fieldName,
      Sector: ESGColumnFields.ORG_INDUSTRY.fieldName,
    });
    expect(isOverflowing).toBe(true);
    expect(treeFilters).toStrictEqual(["Country", "Sector", "LT Rating"]);
  });

  describe("handleMoreFiltersClick", () => {
    it("should open filters side panel on more filters click", () => {
      const { handlers } = init();

      handlers.current.handleMoreFiltersClick();
      expect(mockGridApi.openToolPanel).toHaveBeenCalledWith(
        AgGridSidePanel.FILTERS
      );
    });

    it("should close filters side panel on more filters click second click", () => {
      const { handlers, store } = init();

      act(() => {
        store.dispatch(
          setSidePanel({
            source: AgGridSidePanel.FILTERS,
            isToolPanelShowing: true,
          })
        );
      });

      handlers.current.handleMoreFiltersClick();
      expect(mockGridApi.closeToolPanel).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleClearAllClick", () => {
    it("should clear all filters on reset click", () => {
      const { handlers, store } = init();

      act(() => {
        handlers.current.handleClearAllClick();
      });
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith([]);

      const state = store.getState();
      const subSectorFilterModel = getSubSectorFilterModel(state);
      expect(subSectorFilterModel).toStrictEqual(null);
      const countryFilterModel = getCountryFilterModel(state);
      expect(countryFilterModel).toStrictEqual(null);
      const ltRatingFilterModel = getLTRatingFilterModel(state);
      expect(ltRatingFilterModel).toStrictEqual(null);
    });
  });

  describe("handleDelete", () => {
    it("should remove filter on close icon click on filter chips", () => {
      const cisFilter = {
        [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]: {
          values: [null, "1", "2", "3", "4", "5"],
          filterType: AgGridFilterType.SET,
        },
      };
      const marketSegmentFilter = {
        [ESGColumnFields.ORG_MARKET_SEGMENT.fieldName]: {
          values: [
            null,
            "Aerospace_Defense",
            "Airline_trans",
            "Alcoholic_Beverage",
          ],
        },
      };

      jest.spyOn(mockGridApi, "getFilterModel").mockReturnValue({
        ...cisFilter,
        ...marketSegmentFilter,
      });
      const { handlers } = init();

      act(() => {
        handlers.current.handleDelete("Credit Impact Score")();
      });

      expect(handlers.current.appliedFilters).toStrictEqual({
        Country: ESGColumnFields.ORG_COUNTRY.fieldName,
        Sector: ESGColumnFields.ORG_INDUSTRY.fieldName,
      });
      expect(mockGridApi.setFilterModel).toHaveBeenCalledWith(
        marketSegmentFilter
      );
    });
  });

  describe("onLeftClick", () => {
    it("should scroll left on left click", () => {
      const { handlers } = init();

      handlers.current.onLeftClick();
      expect(mockChipsContainer.current.scrollLeft).toBe(400);
    });

    it("should scroll left on left click by 150 if clientWidth is not available", () => {
      const { handlers } = init();
      mockChipsContainer.current = { scrollLeft: 200 } as HTMLDivElement;

      handlers.current.onLeftClick();
      expect(mockChipsContainer.current.scrollLeft).toBe(50);
    });
  });

  describe("onRightClick", () => {
    it("should scroll right on right click", () => {
      mockChipsContainer.current = {
        scrollLeft: 500,
        clientWidth: 100,
      } as HTMLDivElement;

      const { handlers } = init();

      handlers.current.onRightClick();
      expect(mockChipsContainer.current.scrollLeft).toBe(600);
    });

    it("should scroll left on right click by 150 if clientWidth is not available", () => {
      const { handlers } = init();
      mockChipsContainer.current = { scrollLeft: 200 } as HTMLDivElement;

      handlers.current.onRightClick();
      expect(mockChipsContainer.current.scrollLeft).toBe(350);
    });
  });
});
