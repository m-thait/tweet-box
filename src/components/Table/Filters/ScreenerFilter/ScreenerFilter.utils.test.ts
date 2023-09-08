import {
  ColumnFormatter,
  ColumnGroup,
  ColumnProps,
  ESGColumnFields,
  FilterSortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES, UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import {
  addSortOrder,
  ctaFilterSort,
  getColumnFromSchema,
  getFilterSortOrder,
  getFormatterVal,
  mapFalsyValues,
  moveValueToBottomOfFilterMenuOptions,
  sortFilterASC,
  sortFilterOptions,
} from "@components/Table/Filters/ScreenerFilter/ScreenerFilter.utils";
import { outlookFilterOptionsOrder } from "@components/Table/Table.constants";

describe("Screener Filter utils", () => {
  describe("moveValueToBottomOfFilterMenuOptions", () => {
    it("should return the original array with the specified val moved to the end of the list", () => {
      const sampleInput = [
        "0",
        "1",
        UNAUTHORIZED_BLANKS,
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "--",
      ];

      moveValueToBottomOfFilterMenuOptions(sampleInput, UNAUTHORIZED_BLANKS);

      const valuesReordered = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "--",
        UNAUTHORIZED_BLANKS,
      ];

      expect(sampleInput).toStrictEqual(valuesReordered);
    });
  });
  describe("mapFalsyValues", () => {
    it.each([null, undefined, "0", ""])(
      "should return 'null' if %i is passed in",
      (inputVal) => {
        const result = mapFalsyValues(inputVal);
        expect(result).toStrictEqual(null);
      }
    );
    it("should return the value cast as a string if a falsy value is not passed in", () => {
      const inputVal = "Test String";

      const result = mapFalsyValues(inputVal);
      expect(result).toStrictEqual("Test String");
    });
  });
  describe("getColumnFromSchema", () => {
    it("should return the column obj from schema based on matching fieldName", () => {
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const mockColumn = {
        fieldName: fieldName,
        formatter: ColumnFormatter.TITLE_CASE,
      };
      const schema = [
        {
          templateName: "Test Group 1",
          openByDefault: false,
          columns: [
            {
              templateName: "Test Group 2",
              openByDefault: false,
              columns: [mockColumn],
            },
          ],
        },
      ] as unknown as (ColumnProps | ColumnGroup)[];

      const result = getColumnFromSchema(schema, fieldName);
      expect(result).toBeDefined();
      expect(result).toStrictEqual(mockColumn);
    });
  });
  describe("getFilterSortOrder", () => {
    it("should return the column filter sort order from the schema given a column name", () => {
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const result = getFilterSortOrder(fieldName);
      expect(result).toBeDefined();
      expect(result).toStrictEqual(FilterSortOrder.SCORE_FILTER_SORT);
    });
  });
  describe("getFormatterVal", () => {
    it("should return the column filter formatter from the schema given a column name", () => {
      const result = getFormatterVal(ESGColumnFields.ORG_COUNTRY.fieldName);
      expect(result).toStrictEqual(ColumnFormatter.TITLE_CASE);
    });
  });
  describe("ctaFilterSort", () => {
    it("should sort cta values appropriately", () => {
      const valArr = ["3", "10", "1", "0", "4", "7", "5", "5"];
      ctaFilterSort(valArr);
      const sortedValArr = ["0", "1", "3", "4", "5", "5", "7", "10"];
      expect(valArr).toBeDefined();
      expect(valArr).toStrictEqual(sortedValArr);
    });
  });
  describe("sortFilterASC", () => {
    it("should sort fields in A to Z order", () => {
      const valArr = [
        "Australia",
        "Turkey",
        "United States",
        "New Zealand",
        "Barbados",
        "Africa",
        "India",
        "China",
      ];
      sortFilterASC(valArr);
      const sortedValArr = [
        "Africa",
        "Australia",
        "Barbados",
        "China",
        "India",
        "New Zealand",
        "Turkey",
        "United States",
      ];
      expect(valArr).toBeDefined();
      expect(valArr).toStrictEqual(sortedValArr);
    });
  });
  describe("addSortOrder", () => {
    it("should sort values in an alphabetical order for a_to_z sort", () => {
      const sampleInput = [
        "Australia",
        "Turkey",
        "United States",
        "New Zealand",
        "Barbados",
        "Africa",
        "India",
        "China",
      ];
      const sortedInput = [
        "Africa",
        "Australia",
        "Barbados",
        "China",
        "India",
        "New Zealand",
        "Turkey",
        "United States",
      ];
      const result = addSortOrder(
        sampleInput,
        FilterSortOrder.ATOZ_FILTER_SORT
      );
      expect(result).toStrictEqual(sortedInput);
    });
    it("should sort values in the specified order for outlook filter sort", () => {
      const sampleInput = ["RUR", null, "NOO", "POS"];
      const sortedInput = [
        "Positive",
        "No Outlook",
        "Ratings Under Review",
        null,
      ];
      const result = addSortOrder(
        sampleInput,
        FilterSortOrder.OUTLOOK_FILTER_SORT
      );
      expect(result).toStrictEqual(sortedInput);
    });
    it("should sort values in the specified order for rating action filter sort", () => {
      const sampleInput = [
        "Confirmation",
        "Upgrade",
        BLANK_SPACES,
        "Reinstated",
      ];
      const sortedInput = [
        "Upgrade",
        "Confirmation",
        "Reinstated",
        BLANK_SPACES,
      ];
      const result = addSortOrder(
        sampleInput,
        FilterSortOrder.RATING_ACTION_FILTER_SORT
      );
      expect(result).toStrictEqual(sortedInput);
    });
    it("should sort values in the specified order for rating filter sort and remove pending ratings", () => {
      const sampleInput = ["(P)Ba2", "A2", "(P)Aa1", BLANK_SPACES, "Ba1"];
      const sortedInput = ["Ba1", "Aa1", "A2", "Ba2", null];
      const result = addSortOrder(
        sampleInput,
        FilterSortOrder.RATING_FILTER_SORT
      );
      expect(result).toStrictEqual(sortedInput);
    });
    it("should sort values in the specified order for score filter fields", () => {
      const sampleInput = ["5", "2", "4", BLANK_SPACES, "0"];
      const sortedInput = ["0", "2", "4", "5", BLANK_SPACES];
      const result = addSortOrder(
        sampleInput,
        FilterSortOrder.SCORE_FILTER_SORT
      );
      expect(result).toStrictEqual(sortedInput);
    });
    it("should sort values in the specified order for cta score field", () => {
      const sampleInput = ["9", "1", "2"];
      const result = addSortOrder(sampleInput, FilterSortOrder.CTA_FILTER_SORT);
      expect(result).toStrictEqual(["1", "2", "9"]);
    });
  });
  describe("sortFilterOptions", () => {
    it("should sort the input array based on the sort order specified", () => {
      const sampleInput = [
        "Ratings Under Review",
        BLANK_SPACES,
        "No Outlook",
        "Positive",
      ];
      const sortedInput = [
        "Positive",
        "No Outlook",
        "Ratings Under Review",
        BLANK_SPACES,
      ];
      const result = sortFilterOptions(sampleInput, outlookFilterOptionsOrder);
      expect(result).toStrictEqual(sortedInput);
    });
  });
});
