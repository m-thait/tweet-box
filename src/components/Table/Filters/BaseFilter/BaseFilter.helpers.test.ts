import color from "@moodys/mdc-frontend.theming.colors";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter";
import { createBaseFilterObj, setColorForFields } from "./BaseFilter.helpers";

describe("Base Filter helper functions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("setColorForFields", () => {
    it("should return color #191919 (global black)", () => {
      const fieldColor = setColorForFields();
      const result = color.globalBlack;
      expect(fieldColor).toStrictEqual(result);
    });
  });
  describe("createBaseFilterObj", () => {
    it("should take in filter values and return a base filter object with associated values and labels", () => {
      const filterValues = ["1", "2", "3", "4", "5"];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;

      const result = createBaseFilterObj(filterValues, fieldName);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          value: "1",
          label: "1",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          value: "2",
          label: "2",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          value: "3",
          label: "3",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          value: "4",
          label: "4",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          value: "5",
          label: "5",
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
      ];
      expect(result).toBeDefined();
      expect(result).toStrictEqual(cisScoreFilter);
    });
    it("should take in filter values and if filter values are null then will return a base filter object with associated values and labels", () => {
      const filterValues = [null, null];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;

      const result = createBaseFilterObj(filterValues, fieldName);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          value: null,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
          value: null,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
      ];
      expect(result).toBeDefined();
      expect(result).toStrictEqual(cisScoreFilter);
    });
    it("should take in filter values and if filter values are undefined then will return a base filter object with associated values and labels", () => {
      const filterValues = [undefined, undefined];
      const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;

      const result = createBaseFilterObj(filterValues, fieldName);

      const cisScoreFilter: BaseFilterOption[] = [
        {
          value: undefined,
          label: BLANK_SPACES,
          fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
        },
        {
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
