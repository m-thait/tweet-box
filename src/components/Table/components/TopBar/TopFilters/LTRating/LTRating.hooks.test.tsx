import { act } from "@testing-library/react";
import { GridApi } from "ag-grid-enterprise";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks";
import { initialTableReduxState } from "@components/Table/components/TopBar/top-filter-test.helper";
import { useLTRatingTreeSelectEvents } from "./LTRating.hooks";

describe("ltRatingTreeSelectOnChange", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockGridApi = {
    setFilterModel: jest.fn(),
    getFilterModel: jest.fn(),
    paginationGoToFirstPage: jest.fn(),
  } as unknown as GridApi;

  const init = () => {
    const { renderHook, store } = mockReduxStore({
      updatedInitialState: initialTableReduxState,
    });

    const { result } = renderHook(() => {
      const { ltRatingSelected, ltRatingSelectAll, ...handlers } =
        useLTRatingTreeSelectEvents(mockGridApi);
      return { ltRatingSelected, ltRatingSelectAll, ...handlers };
    });

    return { handlers: result, store };
  };

  it("should set new filter model with the ltRating field without children", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(true, {
        id: "Aaa",
        name: "Aaa",
      });
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: ["Aaa", "(P)Aaa"],
      },
    });
  });

  it("should set new filter model with the ltRating field with children", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(true, {
        id: "Aa",
        name: "Aa",
        children: [
          { id: "Aa1", name: "Aa1" },
          { id: "Aa2", name: "Aa2" },
          { id: "Aa3", name: "Aa3" },
        ],
      });
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: [
          "Aa1",
          "Aa2",
          "Aa3",
          "(P)Aa1",
          "(P)Aa2",
          "(P)Aa3",
          "Aa",
          "(P)Aa",
        ],
      },
    });
  });

  it("should set new filter model with the ltRating field including all facets", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(false, {
        id: "Aa",
        name: "Aa",
        children: [
          { id: "Aa1", name: "Aa1" },
          { id: "Aa2", name: "Aa2" },
          { id: "Aa3", name: "Aa3" },
        ],
      });
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: [
          "Aaa",
          "A1",
          "A2",
          "A3",
          "Baa1",
          "Baa2",
          "Baa3",
          "Ba1",
          "Ba2",
          "Ba3",
          "B1",
          "B2",
          "B3",
          "Caa1",
          "Caa2",
          "Caa3",
          "Ca",
          "C",
          "WR",
          null,
        ],
      },
    });
  });

  it("should update filter model of the ltRating field to add new items", () => {
    const { handlers } = init();

    mockGridApi.getFilterModel = jest.fn().mockReturnValueOnce({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: ["Aa", "Aa1", "Aa2", "Aa3"],
      },
    });

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(true, {
        id: "A",
        name: "A",
        children: [
          { id: "A1", name: "A1" },
          { id: "A2", name: "A2" },
          { id: "A3", name: "A3" },
        ],
      });
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: [
          "Aa",
          "Aa1",
          "Aa2",
          "Aa3",
          "A1",
          "A2",
          "A3",
          "(P)A1",
          "(P)A2",
          "(P)A3",
          "A",
          "(P)A",
        ],
      },
    });
  });

  it("should update filter model of the ltRating field to remove items", () => {
    const { handlers } = init();

    mockGridApi.getFilterModel = jest.fn().mockReturnValueOnce({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: ["Aa", "Aa1", "Aa2", "Aa3"],
      },
    });

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(false, {
        id: "Aa1",
        name: "Aa1",
      });
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: ["Aa", "Aa2", "Aa3"],
      },
    });
  });

  it("should delete ltRating field in the filter model if node is null", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(true, null);
    });

    expect(handlers.current.ltRatingSelectAll).toBe(true);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({
      [ESGColumnFields.LT_RATING.fieldName]: {
        filterType: "set",
        values: [
          "Aaa",
          "Aa1",
          "Aa2",
          "Aa3",
          "A1",
          "A2",
          "A3",
          "Baa1",
          "Baa2",
          "Baa3",
          "Ba1",
          "Ba2",
          "Ba3",
          "B1",
          "B2",
          "B3",
          "Caa1",
          "Caa2",
          "Caa3",
          "Ca",
          "C",
          "WR",
          null,
          "(P)Aaa",
          "(P)Aa1",
          "(P)Aa2",
          "(P)Aa3",
          "(P)A1",
          "(P)A2",
          "(P)A3",
          "(P)Baa1",
          "(P)Baa2",
          "(P)Baa3",
          "(P)Ba1",
          "(P)Ba2",
          "(P)Ba3",
          "(P)B1",
          "(P)B2",
          "(P)B3",
          "(P)Caa1",
          "(P)Caa2",
          "(P)Caa3",
          "(P)Ca",
          "(P)C",
          "(P)WR",
        ],
      },
    });
  });

  it("should set ltRating field in the filter model with empty values", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(false, null);
    });

    expect(handlers.current.ltRatingSelectAll).toBe(false);
    expect(mockGridApi.setFilterModel).toHaveBeenCalledWith({});
  });

  it("should reset page", () => {
    const { handlers } = init();

    act(() => {
      handlers.current.ltRatingTreeSelectOnChange(false, null);
    });

    expect(mockGridApi.paginationGoToFirstPage).toHaveBeenCalled();
  });
});
