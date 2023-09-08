import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterType } from "@models/table.types";

export const initialTableReduxState = {
  table: {
    columnMapping: {
      [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]: "Credit Impact Score",
      [ESGColumnFields.ORG_COUNTRY.fieldName]: "Country",
      [ESGColumnFields.ORG_INDUSTRY.fieldName]: "Sector",
      [ESGColumnFields.LT_RATING.fieldName]: "LT Rating",
    },
    columnState: [],
    filterModel: {
      previous: {},
      current: {
        [ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName]: {
          values: [null, "1", "2", "3", "4", "5"],
          filterType: AgGridFilterType.SET,
        },
        [ESGColumnFields.ORG_COUNTRY.fieldName]: {
          values: ["Angola", "Australia"],
          filterType: AgGridFilterType.SET,
        },
        [ESGColumnFields.ORG_INDUSTRY.fieldName]: {
          values: ["Electric_Networks", "Life_and_Health"],
          filterType: AgGridFilterType.SET,
        },
      },
    },
    subSectorFilterModel: {
      values: ["Electric_Networks", "Life_and_Health"],
      filterType: AgGridFilterType.SET,
    },
    countryFilterModel: {
      values: ["Angola", "Australia"],
      filterType: AgGridFilterType.SET,
    },
    ltRatingFilterModel: {
      values: ["Ba1", "(P)Ba1"],
      filterType: AgGridFilterType.SET,
    },
  },
};
