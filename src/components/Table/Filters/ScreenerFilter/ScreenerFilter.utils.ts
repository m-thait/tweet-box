import {
  ColumnFormatter,
  FilterSortOrder,
  ESGSchema,
  IssuerOutlook,
  ColumnGroup,
  ColumnProps,
} from "@moodys/mdc-table.schemas.screener";
import { removePendingRatingsFromArray } from "@moodys/mdc-table.utils.ratings";
import { BLANK_SPACES, UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import {
  lastRatingActionFilterOptionsOrder,
  outlookFilterOptionsOrder,
  scoreOptionsOrder,
} from "@components/Table/Table.constants";
import {
  creditRatingFilterAndSortOrder,
  sortNumericFilterOptions,
} from "@components/Table/utils";

export const sortFilterOptions = (
  values: (string | null)[],
  sortOrder: string[]
) => {
  values.sort((a, b) => {
    let aIndex = sortOrder.indexOf(a ? String(a).toLowerCase() : BLANK_SPACES);
    let bIndex = sortOrder.indexOf(b ? String(b).toLowerCase() : BLANK_SPACES);
    /*This will add any unspecified filter value at the end of the filter options*/
    if (aIndex < 0) {
      aIndex = sortOrder.length;
    }
    if (bIndex < 0) {
      bIndex = sortOrder.length;
    }
    return aIndex - bIndex;
  });
  return values;
};

/* eslint-disable complexity */
export const addSortOrder = (
  values: (string | null)[],
  filterSortOrder: FilterSortOrder | string
) => {
  switch (filterSortOrder) {
    case FilterSortOrder.ATOZ_FILTER_SORT:
      sortFilterASC(values);
      break;
    case FilterSortOrder.OUTLOOK_FILTER_SORT:
      values = values.reduce((updatedValues, outlook) => {
        const value = outlook ? IssuerOutlook[outlook.toUpperCase()] : outlook;
        if (updatedValues.indexOf(value) === -1) {
          updatedValues.push(value);
        }
        return updatedValues;
      }, [] as (string | null)[]);
      sortFilterOptions(values, outlookFilterOptionsOrder);
      break;
    case FilterSortOrder.RATING_ACTION_FILTER_SORT:
      sortFilterOptions(values, lastRatingActionFilterOptionsOrder);
      break;
    case FilterSortOrder.RATING_FILTER_SORT:
      values.sort(creditRatingFilterAndSortOrder);
      values = removePendingRatingsFromArray(values as string[]);
      break;
    case FilterSortOrder.SCORE_FILTER_SORT:
    case FilterSortOrder.SUBFACTOR_SCORE_FILTER_SORT:
      values = sortFilterOptions(values, scoreOptionsOrder);
      break;
    case FilterSortOrder.CTA_FILTER_SORT:
      ctaFilterSort(values);
      break;
    default:
      break;
  }

  [UNAUTHORIZED_BLANKS, null, ""].some((bottomFilterValue) => {
    values.includes(bottomFilterValue) &&
      moveValueToBottomOfFilterMenuOptions(values, bottomFilterValue);
  });

  return values;
};

export const sortFilterASC = (values: (string | null)[]): void => {
  values.sort((a, b) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    return a.localeCompare(b);
  });
};

export const getColumnFromSchema = (
  schema: (ColumnProps | ColumnGroup)[],
  colId: string
): ColumnProps | null => {
  for (let index = 0; index < schema.length; index++) {
    const element = schema[index];
    if ("fieldName" in element) {
      if (element.fieldName === colId) {
        return element;
      }
    } else {
      if (element.columns) {
        const found = getColumnFromSchema(element.columns, colId);
        if (found) {
          return found;
        }
      }
    }
  }

  return null;
};

export const ctaFilterSort = (values: (string | null)[]) => {
  values.sort((a, b) => sortNumericFilterOptions(a, b));
};

export const getFormatterVal = (colId: string): ColumnFormatter | string => {
  const formatter =
    getColumnFromSchema(ESGSchema, colId)?.formatter ?? ColumnFormatter.NONE;
  return formatter;
};

export const getFilterSortOrder = (colId: string): FilterSortOrder | string => {
  const filterSortOrder =
    getColumnFromSchema(ESGSchema, colId)?.filterSortOrder ??
    FilterSortOrder.NONE;
  return filterSortOrder;
};

export const mapFalsyValues = (val: string | null | undefined) => {
  return !val || val === "0" || val === "" || val === "null"
    ? null
    : String(val);
};

export const moveValueToBottomOfFilterMenuOptions = (
  values: (string | null)[],
  val: string | null
) => {
  values.push(values.splice(values.indexOf(val), 1)[0]);
};
