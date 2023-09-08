/* eslint-disable complexity */
import { Box, Link, IconButton, Tooltip } from "@mui/material";
import { ICellRendererParams } from "ag-grid-enterprise";
import React, { useMemo, useCallback } from "react";
import { getColorBasedOnScore } from "@moodys/mdc-table.utils.score";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import color from "@moodys/mdc-frontend.theming.colors";
import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { BLANK_SPACES, UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAppDispatch, openDrawer } from "@services/redux";
import { LIST_MEDIAN_LABEL } from "@constants/table";
import { ANALYST_COMMENTS_DRAWER_TYPE } from "@constants/drawer";
import { doesScoreHaveComment } from "@components/InfoDrawer/DrawerBody/ScoreBody/ScoreBody.utils";
import { screenerScoreCommentOpened } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import styles from "./ScoreCellRenderer.module.scss";

type ICellRendererProps = Pick<
  ICellRendererParams,
  "value" | "valueFormatted" | "rowIndex" | "column" | "node"
>;

export interface ScoreCellRendererProps extends ICellRendererProps {
  isSubFactorCell: boolean;
}

export const ScoreCellRenderer = ({
  value,
  valueFormatted,
  rowIndex,
  node: { data },
  column,
  isSubFactorCell = false,
}: ScoreCellRendererProps) => {
  const isOOS = value === UNAUTHORIZED_BLANKS;
  const dispatch = useAppDispatch();
  const cellValue = isOOS ? value : valueFormatted ?? value;
  const field = column?.getColId();
  const isCtaScore = field === ESGColumnFields.CTA_SCORE.fieldName;
  const isMedianRow = data?.orgName === LIST_MEDIAN_LABEL;
  const hasScoreComment = doesScoreHaveComment(field as string, data);
  const scoreColor = !isSubFactorCell
    ? getColorBasedOnScore(Number(value), isCtaScore)
    : color.globalBlack;
  const testDataId = isSubFactorCell
    ? `sub-factor-score-cell-row-${rowIndex}`
    : `score-cell-row-${rowIndex}`;

  const handleClick = useCallback(() => {
    dispatch(
      openDrawer({
        isDrawerOpen: true,
        drawerType: ANALYST_COMMENTS_DRAWER_TYPE,
        nodeData: { ...data, field, value, valueFormatted },
      })
    );
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerScoreCommentOpened,
      eventDetails: {
        ...defaultEventDetails,
        name: field,
      },
    });
  }, [dispatch, data, value, field, valueFormatted]);

  const RenderCell = useCallback(() => {
    if (isMedianRow || cellValue === BLANK_SPACES || isOOS) {
      return (
        <span
          className="ag-cell-value"
          data-testid={isOOS ? `oos-${rowIndex}` : testDataId}
          {...(!isSubFactorCell &&
            !isOOS && {
              style: { color: scoreColor },
            })}
        >
          {cellValue}
        </span>
      );
    }

    if (isSubFactorCell && !hasScoreComment) {
      return (
        <span
          className="ag-cell-value"
          data-testid={testDataId}
          {...(isCtaScore && {
            style: {
              color: scoreColor,
            },
          })}
        >
          {cellValue}
        </span>
      );
    }

    return (
      <Link
        className={`ag-cell-value ${
          isSubFactorCell ? styles.subScore : styles.score
        }`}
        data-testid={testDataId}
        color={scoreColor}
        underline={"none"}
        onClick={() => handleClick()}
      >
        {isSubFactorCell && (
          <Tooltip
            title="Analyst Commentary"
            placement="top"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -8],
                  },
                },
              ],
            }}
          >
            <IconButton
              data-testid={`${testDataId}-icon`}
              className={styles.iconButton}
              disableRipple
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
        {cellValue}
      </Link>
    );
  }, [
    hasScoreComment,
    isSubFactorCell,
    cellValue,
    handleClick,
    isCtaScore,
    scoreColor,
    testDataId,
    isMedianRow,
    isOOS,
    rowIndex,
  ]);

  return useMemo(
    () => (
      <Box className={styles.scoreCellContainer}>
        <RenderCell />
      </Box>
    ),
    [RenderCell]
  );
};
