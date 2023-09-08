import color from "@moodys/mdc-frontend.theming.colors";
import {
  ESGColumnFields,
  ColumnFormatter,
  FilterSortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter";
import { NO_DATA } from "@constants/table";
import {
  createBaseFilterObj,
  setColorForFields,
  setFormatters,
} from "./ScreenerFilter.helpers";

const scoreFilter: BaseFilterOption = {
  score: 5,
  value: "5",
  label: "CIS-5",
  fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
};
const ctaFilter: BaseFilterOption = {
  score: 7,
  value: "7",
  label: "CT-7",
  fieldName: ESGColumnFields.CTA_SCORE.fieldName,
};
const ratingActionFilter: BaseFilterOption = {
  value: "Possible Upgrade",
  fieldName: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
};
const countryFilter: BaseFilterOption = {
  value: "United_States",
  label: "",
  fieldName: ESGColumnFields.ORG_COUNTRY.fieldName,
};
const waterManagementFilter: BaseFilterOption = {
  value: "0.6",
  label: "",
  fieldName: ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
};
const orgLEIFilter: BaseFilterOption = {
  value: "01J4SO3XTwZf4Pp38209",
  label: "",
  fieldName: ESGColumnFields.ORG_LEI.fieldName,
};
const ltRatingFilter: BaseFilterOption = {
  value: "Aa1",
  label: "",
  fieldName: ESGColumnFields.LT_RATING.fieldName,
};
describe("Screener Filter helper functions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("setColorForFields", () => {
    it("should return correct color based on score filter sort order", () => {
      const filterSortOrder: FilterSortOrder | string =
        FilterSortOrder.SCORE_FILTER_SORT;
      const fieldColor = setColorForFields(scoreFilter, filterSortOrder);
      const result = color.globalRed700;
      expect(fieldColor).toStrictEqual(result);
    });
    it("should return correct color based on cta filter sort order", () => {
      const filterSortOrder: FilterSortOrder | string =
        FilterSortOrder.CTA_FILTER_SORT;
      const fieldColor = setColorForFields(ctaFilter, filterSortOrder);
      const result = color.globalOrange700;
      expect(fieldColor).toStrictEqual(result);
    });
    it("should return correct color based on rating action filter sort order", () => {
      const filterSortOrder: FilterSortOrder | string =
        FilterSortOrder.RATING_ACTION_FILTER_SORT;
      const fieldColor = setColorForFields(ratingActionFilter, filterSortOrder);
      const result = color.globalGreen500;
      expect(fieldColor).toStrictEqual(result);
    });
    it("should return color #191919 (global black) if filter sort order is not set", () => {
      const filterSortOrder: FilterSortOrder | string = "";
      const fieldColor = setColorForFields(scoreFilter, filterSortOrder);
      const result = color.globalBlack;
      expect(fieldColor).toStrictEqual(result);
    });
  });
  describe("setFormatters", () => {
    it("should add title case formatting if column formatter is title_case", () => {
      const obj: BaseFilterOption = countryFilter;
      const formatterVal = ColumnFormatter.TITLE_CASE;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      const label = "United States";
      expect(label).toStrictEqual(result);
    });
    it("should return descriptive blanks if the filter value is invalid and the column formatter is title_case", () => {
      const obj: BaseFilterOption = countryFilter;
      obj.value = "";
      const formatterVal = ColumnFormatter.TITLE_CASE;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      expect(NO_DATA).toStrictEqual(result);
    });
    it("should round the filter value to the nearest whole if column formatter is round_number", () => {
      const obj: BaseFilterOption = waterManagementFilter;
      const formatterVal = ColumnFormatter.ROUND_NUMBER;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      const label = "1";
      expect(label).toStrictEqual(result);
    });
    it("should return descriptive blanks if the filter value is invalid and the column formatter is round_number", () => {
      const obj: BaseFilterOption = waterManagementFilter;
      obj.value = "0.2";
      const formatterVal = ColumnFormatter.ROUND_NUMBER;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      expect(NO_DATA).toStrictEqual(result);
    });
    it("should capitalize all letters of the filter value if column formatter is all_letter_capital", () => {
      const obj: BaseFilterOption = orgLEIFilter;
      const formatterVal = ColumnFormatter.ALL_LETTER_CAPITAL;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      const label = "01J4SO3XTWZF4PP38209";
      expect(label).toStrictEqual(result);
    });
    it("should return descriptive blanks if the filter value is invalid and the column formatter is all_letter_capital", () => {
      const obj: BaseFilterOption = orgLEIFilter;
      obj.value = "";
      const formatterVal = ColumnFormatter.ALL_LETTER_CAPITAL;
      setFormatters(obj, formatterVal);
      const result = obj.label;
      expect(NO_DATA).toStrictEqual(result);
    });
    it("should capitalize all letters of the filter value if column formatter is add_prefix", () => {
      const obj: BaseFilterOption = scoreFilter;
      obj.label = "";
      obj.score = undefined;
      const formatterVal = ColumnFormatter.ADD_PREFIX;
      setFormatters(obj, formatterVal);
      const formattedLabel = obj.label;
      const formattedScore = obj.score;

      const score = 5;
      const label = "CIS-5";
      expect(formattedLabel).toBeDefined();
      expect(formattedLabel).toStrictEqual(label);
      expect(formattedScore).toStrictEqual(score);
    });
    it("should return descriptive blanks if the filter value is invalid and the column formatter is add_prefix", () => {
      const obj: BaseFilterOption = scoreFilter;
      obj.value = undefined;
      obj.label = "";
      obj.score = undefined;
      const formatterVal = ColumnFormatter.ADD_PREFIX;
      setFormatters(obj, formatterVal);
      const formattedLabel = obj.label;
      const formattedScore = obj.score;

      expect(formattedLabel).toBeDefined();
      expect(formattedLabel).toStrictEqual(BLANK_SPACES);
      expect(formattedScore).not.toBeDefined();
    });
    it("should simply return the filter value if value is not null and column formatter is not specified", () => {
      const obj: BaseFilterOption = ltRatingFilter;
      const formatterVal = "";
      setFormatters(obj, formatterVal);
      const formattedLabel = obj.label;

      const label = "Aa1";
      expect(formattedLabel).toBeDefined();
      expect(formattedLabel).toStrictEqual(label);
    });
    it("should return descriptive blanks if the filter value is null and column formatter is not specified", () => {
      const obj: BaseFilterOption = ltRatingFilter;
      obj.value = null;
      const formatterVal = "";
      setFormatters(obj, formatterVal);
      const formattedLabel = obj.label;

      expect(formattedLabel).toBeDefined();
      expect(formattedLabel).toStrictEqual(NO_DATA);
    });
  });
  describe("createBaseFilterObj", () => {
    it("should take in a filter and return a base filter object with associated formatted values, labels, and score (if applicable)", () => {
      const filterValues = ["1", "2", "3", "4", "5"];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const formatterVal = ColumnFormatter.ADD_PREFIX;

      const result = createBaseFilterObj(filterValues, fieldName, formatterVal);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          score: 1,
          value: "1",
          label: "CIS-1",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: 2,
          value: "2",
          label: "CIS-2",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: 3,
          value: "3",
          label: "CIS-3",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: 4,
          value: "4",
          label: "CIS-4",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: 5,
          value: "5",
          label: "CIS-5",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
      ];
      expect(result).toBeDefined();
      expect(result).toStrictEqual(cisScoreFilter);
    });
    it("should take in a filter and if filter values are null then will return a base filter object with associated formatted values, labels, and score (if applicable)", () => {
      const filterValues = [null, null];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const formatterVal = ColumnFormatter.ADD_PREFIX;

      const result = createBaseFilterObj(filterValues, fieldName, formatterVal);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          score: undefined,
          value: null,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: undefined,
          value: null,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
      ];
      expect(result).toBeDefined();
      expect(result).toStrictEqual(cisScoreFilter);
    });
    it("should take in a filter and if filter values are undefined then will return a base filter object with associated formatted values, labels, and score (if applicable)", () => {
      const filterValues = [undefined, undefined];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const formatterVal = ColumnFormatter.ADD_PREFIX;

      const result = createBaseFilterObj(filterValues, fieldName, formatterVal);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          score: undefined,
          value: undefined,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          score: undefined,
          value: undefined,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
      ];
      expect(result).toBeDefined();
      expect(result).toStrictEqual(cisScoreFilter);
    });
  });
});
