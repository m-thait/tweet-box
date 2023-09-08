import { Box } from "@mui/system";
import React from "react";
import { extractNumberFromString } from "@moodys/mdc-table.utils.number";
import {
  ColumnFieldNames,
  ESGColumnFields,
} from "@moodys/mdc-table.schemas.screener";
import { getScoreFilterSuffix } from "@moodys/mdc-table.utils.score";
import { UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import styles from "@components/Table/Filters/BaseFilter/BaseFilter.module.scss";
import { SCORE_FIELDS } from "@constants/schema";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter/BaseFilter.types";

// eslint-disable-next-line complexity
export const Label = (filter: BaseFilterOption, lockedOrgIds: number[]) => {
  return lockedOrgIds?.length > 0 && filter.value === UNAUTHORIZED_BLANKS ? (
    <span
      className={styles.container}
      data-testid="label-locked-org-ids-container"
    >
      —<sup>1</sup>{" "}
      <span
        className={styles.scoreFilterLabel}
        data-testid="label-locked-org-ids-oos-label"
      >
        (Out of Subscription)
      </span>
    </span>
  ) : (
    <>
      {filter.label}
      {SCORE_FIELDS.includes(filter.fieldName as ColumnFieldNames) ? (
        <Box
          component="span"
          className={styles.scoreFilterLabel}
          data-testid="label-score-suffix"
        >
          {getScoreFilterSuffix(
            extractNumberFromString(String(filter.value)),
            filter.fieldName === ESGColumnFields.CTA_SCORE.fieldName
          )}
        </Box>
      ) : null}
    </>
  );
};
