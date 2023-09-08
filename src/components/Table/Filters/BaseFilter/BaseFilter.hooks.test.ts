import { act } from "@testing-library/react";
import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import { cisFilterModel } from "@components/Table/test/helper";
import { mockReduxStore } from "@services/redux/mocks";
import { useBaseFilterEvents } from "@components/Table/Filters/BaseFilter/BaseFilter.hooks";
import { LoadingStates } from "@constants/filter";

describe("BaseFilter hooks", () => {
  const { renderHook, store, RESET_ACTION } = mockReduxStore();
  const props = {
    filterChangedCallback: jest.fn(),
    colDef: {
      field: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
    },
    column: {
      getId: jest
        .fn()
        .mockReturnValue(ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName),
      getColId: jest
        .fn()
        .mockReturnValue(ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName),
    },
    doesRowPassOtherFilter: jest.fn().mockImplementation(() => {
      return true;
    }),
    api: {
      getFilterModel: jest.fn().mockReturnValue(cisFilterModel),
    },
  } as unknown as IFilterParams;

  const params = {
    data: {
      cisScore: "2",
    },
  } as unknown as IDoesFilterPassParams;

  const init = () => {
    const { result } = renderHook(() => {
      const { baseFilterSelectedIndices, ...handlers } = useBaseFilterEvents(
        props as unknown as IFilterParams
      );

      return { baseFilterSelectedIndices, ...handlers };
    });

    return result;
  };

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  describe("fetchFilterValues", () => {
    it("should set filterValues", async () => {
      const handlers = init();

      await act(async () => {
        await handlers.current.fetchFilterValues();
      });

      expect(handlers.current.filteredColumn).toStrictEqual(
        ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName
      );
      expect(handlers.current.baseFilterFilteredValues).toStrictEqual([]);
      expect(handlers.current.isBaseFilterLoading).toStrictEqual(
        LoadingStates.LOADED
      );
    });
  });
  describe("checkIfAllIndicesSelected", () => {
    it("should set select all to be true if all indices in column filter menu have been selected", () => {
      const handlers = init();
      const indices = ["0", "5"];

      act(() => {
        handlers.current.setBaseFilterSelectedIndices(indices);
      });
      const selectedIndices = handlers.current.baseFilterSelectedIndices;
      const target = ["0", "5"];
      act(() => {
        handlers.current.checkIfAllIndicesSelected(selectedIndices, target);
      });
      const selectAll = handlers.current.baseFilterSelectAll;
      expect(selectedIndices).toStrictEqual(["0", "5"]);
      expect(selectAll).toStrictEqual(true);
    });
    it("should set select all to be false if all indices in column filter menu have not been selected or a falsy value is passed in", () => {
      const handlers = init();
      const indices = ["0", null, "5"];

      act(() => {
        handlers.current.setBaseFilterSelectedIndices(indices);
      });
      const selectedIndices = handlers.current.baseFilterSelectedIndices;
      const target = ["0", null, "5"];
      act(() => {
        handlers.current.checkIfAllIndicesSelected(selectedIndices, target);
      });
      const selectAll = handlers.current.baseFilterSelectAll;
      expect(selectedIndices).toStrictEqual(["0", null, "5"]);
      expect(selectAll).toStrictEqual(false);
    });
  });
  describe("Score filter handlers", () => {
    it("should return score filters handlers", () => {
      const handlers = init();

      const {
        baseFilterClearSelectedFilter,
        baseFilterHandleChange,
        baseFilterHandleSelectAllChange,
        baseFilterSelectedIndices,
      } = handlers.current;

      expect(typeof baseFilterClearSelectedFilter).toBe("function");
      expect(typeof baseFilterHandleChange).toBe("function");
      expect(typeof baseFilterHandleSelectAllChange).toBe("function");
      expect(baseFilterSelectedIndices).toStrictEqual([]);
    });
  });
  describe("baseFilterClearSelectedFilter", () => {
    it("should clear the selected filter", () => {
      const handlers = init();

      act(() => {
        handlers.current.baseFilterClearSelectedFilter();
      });

      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual([]);
      expect(handlers.current.baseFilterSelectAll).toBe(false);
    });
  });
  describe("baseFilterHandleSelectAllChange", () => {
    it("should update selected indices when select all is checked", () => {
      const event = {
        currentTarget: {
          checked: true,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(ESGColumnFields.LT_RATING.fieldName);
        handlers.current.setBaseFilterFilteredValues(["1", "3", "6"]);
      });

      act(() => {
        handlers.current.baseFilterHandleSelectAllChange(event);
      });
      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual([
        "1",
        "3",
        "6",
      ]);
    });
    it("should clear filter when select all is unchecked", () => {
      const event = {
        currentTarget: {
          checked: false,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(
          ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName
        );
        handlers.current.setBaseFilterFilteredValues(["1", "3", "6"]);
      });

      act(() => {
        handlers.current.baseFilterHandleSelectAllChange(event);
      });

      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual([]);
      expect(handlers.current.baseFilterSelectAll).toStrictEqual(false);
    });
  });
  describe("baseFilterIsFilterActive", () => {
    it("should return true when selected indices is not null/undefined or empty array", () => {
      const handlers = init();
      act(() => {
        handlers.current.setBaseFilterSelectedIndices(["0", "1"]);
      });
      const result = handlers.current.baseFilterIsFilterActive();

      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual([
        "0",
        "1",
      ]);
      expect(result).toBe(true);
    });
    it("should return false when selectedIndices is null/undefined", () => {
      const handlers = init();
      act(() => {
        // @ts-expect-error Testing for null
        handlers.current.selectedIndices = null;
      });

      const result = handlers.current.baseFilterIsFilterActive();

      expect(result).toBe(false);
    });
    it("should return false when selectedIndices is empty array", () => {
      const handlers = init();
      act(() => {
        handlers.current.baseFilterSelectedIndices = [];
      });

      const result = handlers.current.baseFilterIsFilterActive();

      expect(result).toBe(false);
    });
  });
  describe("baseFilterDoesFilterPass", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it("should return true if the filtered value exists in the list of selected indices", () => {
      const handlers = init();
      const fieldName = props.colDef.field;
      const val = getValueByDotSyntax(params.data, fieldName ?? "");

      act(() => {
        handlers.current.setBaseFilterSelectedIndices(["2"]);
      });
      const selectedIndices = handlers.current.baseFilterSelectedIndices;

      const result = handlers.current.baseFilterDoesFilterPass(params);

      expect(val).toStrictEqual("2");
      expect(fieldName).toStrictEqual("cisScore");
      expect(selectedIndices).toStrictEqual(["2"]);

      expect(result).toBe(true);
    });
    it("should return false if the filtered value is not in the list of selected indices", () => {
      const handlers = init();
      const fieldName = props.colDef.field;
      const val = getValueByDotSyntax(params.data, fieldName ?? "");

      act(() => {
        handlers.current.setBaseFilterSelectedIndices(["3"]);
      });
      const selectedIndices = handlers.current.baseFilterSelectedIndices;

      const result = handlers.current.baseFilterDoesFilterPass(params);

      expect(val).toStrictEqual("2");
      expect(fieldName).toStrictEqual("cisScore");
      expect(selectedIndices).toStrictEqual(["3"]);

      expect(result).toBe(false);
    });
    it("should return null if selectedIndices are null or undefined", () => {
      const handlers = init();
      const fieldName = props.colDef.field;
      const val = getValueByDotSyntax(params.data, fieldName ?? "");

      act(() => {
        // @ts-expect-error Testing for null
        handlers.current.setBaseFilterSelectedIndices(null);
      });
      const selectedIndices = handlers.current.baseFilterSelectedIndices;
      const result = handlers.current.baseFilterDoesFilterPass(params);

      expect(val).toStrictEqual("2");
      expect(fieldName).toStrictEqual("cisScore");
      expect(selectedIndices).toBe(null);

      expect(result).toBe(false);
    });
  });
  describe("baseFilterHandleChange", () => {
    it("should set correct indices for all columns", () => {
      const handlers = init();

      act(() => {
        handlers.current.baseFilterHandleChange(true, "1");
      });

      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual(["1"]);
    });
    it("should set empty array if checked is false", () => {
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(ESGColumnFields.LT_RATING.fieldName);
      });
      handlers.current.baseFilterHandleChange(false, "1");
      expect(handlers.current.baseFilterSelectedIndices).toStrictEqual([]);
    });
  });
});
