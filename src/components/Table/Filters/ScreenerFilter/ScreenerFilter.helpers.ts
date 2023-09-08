import color from "@moodys/mdc-frontend.theming.colors";
import { roundToNearestWhole } from "@moodys/mdc-frontend.utils.number";
import {
  formatTitleCase,
  formatAllCaps,
} from "@moodys/mdc-frontend.utils.string";
import { getColorBasedOnScore } from "@moodys/mdc-table.utils.score";
import { extractNumberFromString } from "@moodys/mdc-table.utils.number";
import {
  ColumnFormatter,
  FilterSortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import {
  addColorToRatingAction,
  getLabelBasedOnField,
} from "@components/Table/utils";
import { NO_DATA } from "@constants/table";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { formatBlanksForFilters } from "@components/Table/Filters/BaseFilter/BaseFilter.utils";
// eslint-disable-next-line complexity
export const setColorForFields = (
  filter: BaseFilterOption,
  filterSortOrder: FilterSortOrder | string
): string => {
  const scoreWithoutPrefix = extractNumberFromString(String(filter.value));
  switch (filterSortOrder) {
    case FilterSortOrder.SCORE_FILTER_SORT:
      return getColorBasedOnScore(scoreWithoutPrefix);
    case FilterSortOrder.CTA_FILTER_SORT:
      return getColorBasedOnScore(scoreWithoutPrefix, true);
    case FilterSortOrder.RATING_ACTION_FILTER_SORT:
      return addColorToRatingAction(filter.value);
    default:
      return color.globalBlack;
  }
};

/* eslint-disable complexity */
export const setFormatters = (obj: BaseFilterOption, formatterVal: string) => {
  const valIsNull = obj.value === null;

  switch (formatterVal) {
    case ColumnFormatter.TITLE_CASE:
      obj.label = formatBlanksForFilters(formatTitleCase(obj.value) ?? "");
      break;
    case ColumnFormatter.ROUND_NUMBER:
      obj.label = formatBlanksForFilters(
        roundToNearestWhole({ num: obj.value })
      );
      break;
    case ColumnFormatter.ALL_LETTER_CAPITAL:
      obj.label = formatBlanksForFilters(formatAllCaps(obj.value) ?? "");
      break;
    case ColumnFormatter.ADD_PREFIX:
      obj.score = obj.value ? parseInt(obj.value) : undefined;
      obj.label =
        obj.value && !valIsNull
          ? `${getLabelBasedOnField(obj.fieldName ?? "")}${obj.value}`
          : BLANK_SPACES;
      break;
    default:
      obj.label = obj.value && !valIsNull ? obj.value : NO_DATA;
      break;
  }
};

export const createBaseFilterObj = (
  filter: (string | null | undefined)[],
  field: string,
  formatterVal?: string
): BaseFilterOption[] => {
  const result: BaseFilterOption[] = [];
  (filter ?? []).map((value) => {
    const obj: BaseFilterOption = {};
    obj.value = value === null || value ? value : undefined;
    obj.fieldName = field;

    setFormatters(obj, formatterVal ?? "");
    result.push(obj);
  });
  return result;
};
