import { act } from "@testing-library/react";
import { GridApi } from "ag-grid-enterprise";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import {
  getCountryFilterModel,
  getLTRatingFilterModel,
  getSubSectorFilterModel,
} from "@services/redux";
import { mockReduxStore } from "@services/redux/mocks";
import { initialTableReduxState } from "../top-filter-test.helper";
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

  const init = () => {
    const { renderHook, store } = mockReduxStore({
      updatedInitialState: initialTableReduxState,
    });

    const { result } = renderHook(() => {
      const handlers = useLeftOptionsEvents({
        gridApi: mockGridApi,
      });
      return handlers;
    });

    return { handlers: result, store };
  };

  it("should return top bar event handlers", () => {
    const { handlers } = init();
    const { handleClearAllClick, appliedFilters } = handlers.current;
    expect(typeof handleClearAllClick).toBe("function");
    expect(appliedFilters).toStrictEqual({
      "Credit Impact Score": ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      Country: ESGColumnFields.ORG_COUNTRY.fieldName,
      Sector: ESGColumnFields.ORG_INDUSTRY.fieldName,
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
});
