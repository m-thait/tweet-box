import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { NO_DATA } from "@constants/table";
import { formatBlanksForFilters } from "@components/Table/Filters/BaseFilter/BaseFilter.utils";

describe("formatBlanksForFilters", () => {
  it("should return the original value if non falsy value passed in as input", () => {
    const inputVal = "5";
    const result = formatBlanksForFilters(inputVal);
    expect(result).toStrictEqual("5");
  });
  it.each([BLANK_SPACES, "NULL", null, "", "0"])(
    "should return descriptive blanks if %i is passed in",
    (inputVal) => {
      const result = formatBlanksForFilters(inputVal);
      expect(result).toStrictEqual(NO_DATA);
    }
  );
});
