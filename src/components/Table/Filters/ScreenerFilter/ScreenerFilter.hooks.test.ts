import { act } from "@testing-library/react";
import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import {
  ESGColumnFields,
  ColumnFormatter,
} from "@moodys/mdc-table.schemas.screener";
import { getValueByDotSyntax } from "@moodys/mdc-table.utils.string";
import { mockReduxStore } from "@services/redux/mocks";
import { cisFilterModel } from "@components/Table/test/helper";
import { LoadingStates } from "@constants/filter";
import { AgGridFilterType } from "@root/src/models";
import { useScreenerFilterEvents } from "./ScreenerFilter.hooks";

describe("ScreenerFilter hooks", () => {
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
      const { selectedIndices, searchedValues, ...handlers } =
        useScreenerFilterEvents(props as unknown as IFilterParams);

      return { selectedIndices, searchedValues, ...handlers };
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
      expect(handlers.current.formatterVal).toStrictEqual(
        ColumnFormatter.ADD_PREFIX
      );
      expect(handlers.current.filterSortOrder).toStrictEqual("score_sort");
      expect(handlers.current.filteredValues).toStrictEqual([]);
      expect(handlers.current.isLoading).toStrictEqual(LoadingStates.LOADED);
    });
  });
  describe("checkIfAllIndicesSelected", () => {
    it("should check if all indices in column filter menu have been selected", () => {
      const handlers = init();
      const indices = ["0", null, "5"];

      act(() => {
        handlers.current.setSelectedIndices(indices);
      });
      const selectedIndices = handlers.current.selectedIndices;
      const target = ["0", null, "5"];
      act(() => {
        handlers.current.checkIfAllIndicesSelected(selectedIndices, target);
      });
      const selectAll = handlers.current.selectAll;
      expect(selectedIndices).toStrictEqual(["0", null, "5"]);
      expect(selectAll).toStrictEqual(true);
    });
  });
  describe("handleSearchTextChange", () => {
    it("should return proper search results", async () => {
      const handlers = init();

      act(() => {
        handlers.current.setFilteredValues([
          "India",
          "United States",
          "United Kingdom",
        ]);
        handlers.current.setSearchTerm("United");
      });

      act(() => {
        handlers.current.handleSearchTextChange("United");
      });

      expect(handlers.current.searchTerm).toStrictEqual("United");
      expect(handlers.current.searchedValues).toStrictEqual([
        "United States",
        "United Kingdom",
      ]);
    });
  });
  describe("setModelFn function", () => {
    it("should clear the score filter if model is null", () => {
      const handlers = init();

      act(() => {
        handlers.current.setModel(null);
      });

      expect(handlers.current.selectedIndices).toStrictEqual([]);
      expect(handlers.current.selectAll).toBe(false);
      expect(handlers.current.searchTerm).toBe("");
    });
    it("should set selectedFilterModel if model exist", () => {
      const handlers = init();
      const model = {
        values: ["0", "1", "2", "3"],
      };

      act(() => {
        handlers.current.setModel(model);
      });

      expect(handlers.current.selectedIndices).toStrictEqual([
        null,
        "1",
        "2",
        "3",
      ]);
    });
    it("should set selectedFilterModel as null for falsy values", () => {
      const handlers = init();
      const model = {
        values: ["0", null, undefined],
      };
      act(() => {
        handlers.current.setModel(model);
      });

      expect(handlers.current.selectedIndices).toStrictEqual([
        null,
        null,
        null,
      ]);
    });
  });
  describe("handleSearchClear", () => {
    it("should search", async () => {
      const handlers = init();

      act(() => {
        handlers.current.setSearchTerm("United");
      });

      act(() => {
        handlers.current.handleSearchTextChange("United");
      });

      act(() => {
        handlers.current.handleSearchClear();
      });

      expect(handlers.current.searchTerm).toStrictEqual("");
      expect(handlers.current.selectAll).toStrictEqual(false);
      expect(handlers.current.searchedValues).toStrictEqual([]);
    });
  });

  describe("Score filter handlers", () => {
    it("should return score filters handlers", () => {
      const handlers = init();

      const {
        clearSelectedFilter,
        handleChange,
        handleSelectAllChange,
        selectedIndices,
      } = handlers.current;

      expect(typeof clearSelectedFilter).toBe("function");
      expect(typeof handleChange).toBe("function");
      expect(typeof handleSelectAllChange).toBe("function");
      expect(selectedIndices).toStrictEqual([]);
    });
  });
  describe("clearSelectedFilter", () => {
    it("should clear the selected filter", () => {
      const handlers = init();

      act(() => {
        handlers.current.clearSelectedFilter();
      });

      expect(handlers.current.selectedIndices).toStrictEqual([]);
      expect(handlers.current.selectAll).toBe(false);
      expect(handlers.current.searchTerm).toStrictEqual("");
    });
  });
  describe("handleSelectAllChange", () => {
    it("should correct indices when select all is checked for a rating field", () => {
      const event = {
        currentTarget: {
          checked: true,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(ESGColumnFields.LT_RATING.fieldName);
        handlers.current.setFilteredValues(["1"]);
      });

      act(() => {
        handlers.current.handleSelectAllChange(event);
      });
      expect(handlers.current.selectedIndices).toStrictEqual(["1", "(P)1"]);
    });

    it("should correct indices when select all is checked for a non rating field", () => {
      const event = {
        currentTarget: {
          checked: true,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(
          ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName
        );
        handlers.current.setFilteredValues(["1"]);
      });

      act(() => {
        handlers.current.handleSelectAllChange(event);
      });

      expect(handlers.current.selectedIndices).toStrictEqual(["1"]);
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
        handlers.current.setFilteredValues(["1"]);
      });

      act(() => {
        handlers.current.handleSelectAllChange(event);
      });

      expect(handlers.current.selectedIndices).toStrictEqual([]);
      expect(handlers.current.selectAll).toStrictEqual(false);
      expect(handlers.current.searchTerm).toStrictEqual("");
    });
  });
  describe("isFilterActive", () => {
    it("should return true when selected indices is not null/undefined or empty array", () => {
      const handlers = init();
      act(() => {
        handlers.current.setSelectedIndices(["0", "1"]);
      });
      const result = handlers.current.isFilterActive();

      expect(handlers.current.selectedIndices).toStrictEqual(["0", "1"]);
      expect(result).toBe(true);
    });
    it("should return false when selectedIndices is null/undefined", () => {
      const handlers = init();
      act(() => {
        // @ts-expect-error Testing for null
        handlers.current.selectedIndices = null;
      });

      const result = handlers.current.isFilterActive();

      expect(result).toBe(false);
    });
    it("should return false when selectedIndices is empty array", () => {
      const handlers = init();
      act(() => {
        handlers.current.selectedIndices = [];
      });

      const result = handlers.current.isFilterActive();

      expect(result).toBe(false);
    });
  });
  describe("doesFilterPass", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it("should return true if the filtered value exists in the list of selected indices", () => {
      const handlers = init();
      const fieldName = props.colDef.field;
      const val = getValueByDotSyntax(params.data, fieldName ?? "");

      act(() => {
        handlers.current.setSelectedIndices(["2"]);
      });
      const selectedIndices = handlers.current.selectedIndices;

      const result = handlers.current.doesFilterPass(params);

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
        handlers.current.setSelectedIndices(["3"]);
      });
      const selectedIndices = handlers.current.selectedIndices;

      const result = handlers.current.doesFilterPass(params);

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
        handlers.current.setSelectedIndices(null);
      });
      const selectedIndices = handlers.current.selectedIndices;
      const result = handlers.current.doesFilterPass(params);

      expect(val).toStrictEqual("2");
      expect(fieldName).toStrictEqual("cisScore");
      expect(selectedIndices).toBe(null);

      expect(result).toBe(false);
    });
  });
  describe("getModel", () => {
    it("should return undefined when selectedIndices length is 0", () => {
      const handlers = init();

      act(() => {
        handlers.current.setSelectedIndices([]);
      });

      const result = handlers.current.getModel();
      expect(result).toBe(undefined);
    });
    it("should return selectedFilterModel state when selectedIndices length is not 0", () => {
      const handlers = init();

      act(() => {
        handlers.current.setSelectedIndices(["0", "1"]);
      });

      const result = handlers.current.getModel();
      expect(handlers.current.selectedIndices).toStrictEqual(["0", "1"]);
      expect(result?.values).toStrictEqual(handlers.current.selectedIndices);
      expect(result?.filterType).toStrictEqual(AgGridFilterType.SET);
    });
  });
  describe("handleChange", () => {
    it("should set correct indices for non rating-fields columns", () => {
      const handlers = init();

      act(() => {
        handlers.current.handleChange(true, "1");
      });

      expect(handlers.current.selectedIndices).toStrictEqual(["1"]);
    });
    it("should set correct indices for rating-fields columns", () => {
      const RatingFieldProps = {
        filterChangedCallback: jest.fn(),
        colDef: {
          field: ESGColumnFields.LT_RATING.fieldName,
        },
        column: {
          getId: jest.fn().mockReturnValue(ESGColumnFields.LT_RATING.fieldName),
        },
      } as unknown as IFilterParams;

      const initRatingFields = () => {
        const { result } = renderHook(() => {
          const { selectedIndices, ...handlers } = useScreenerFilterEvents(
            RatingFieldProps as unknown as IFilterParams
          );

          return { selectedIndices, ...handlers };
        });

        return result;
      };

      const handlers = initRatingFields();

      act(() => {
        handlers.current.setFilteredColumn(ESGColumnFields.LT_RATING.fieldName);
      });
      act(() => {
        handlers.current.handleChange(true, "1");
      });

      expect(handlers.current.selectedIndices).toStrictEqual(["1", "(P)1"]);
    });
    it("should set empty array if checked is false", () => {
      const handlers = init();

      act(() => {
        handlers.current.setFilteredColumn(ESGColumnFields.LT_RATING.fieldName);
      });
      handlers.current.handleChange(false, "1");
      expect(handlers.current.selectedIndices).toStrictEqual([]);
    });
  });
});
