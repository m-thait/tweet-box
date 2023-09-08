import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { getRefreshDateAndTime } from "@moodys/mdc-table.utils.date";
import { getColorBasedOnScore } from "@moodys/mdc-table.utils.score";
import {
  ColumnFieldNames,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
import {
  getDrawerNodeData,
  getIpsAccordionData,
  getCisAccordionData,
  useAppSelector,
} from "@services/redux";
import styles from "../DrawerBody.module.scss";
import { useGetEsgComments } from "./ScoreBody.hooks";
import { getComment, getScoreContent } from "./ScoreBody.utils";

export const ScoreBody = (): JSX.Element => {
  const { orgId, orgName, cisDate, field, value, valueFormatted } =
    useAppSelector(getDrawerNodeData);

  const cisAccordionData = useAppSelector(getCisAccordionData);
  const ipsAccordionData = useAppSelector(getIpsAccordionData);
  const fieldComment = `${field}Comments` as ColumnFieldNames;

  const { scoreDescription, scoreContent } = getScoreContent(
    valueFormatted,
    field,
    cisAccordionData,
    ipsAccordionData
  );

  const { esgComments, commentsLoaded, errorMessage } = useGetEsgComments(
    orgId,
    [fieldComment]
  );

  return (
    <Box data-testid="drawer-score-content">
      <Box className={styles.sectionContainer}>
        <Typography
          component="h3"
          className={styles.analystTitle}
          data-testid="drawer-score-name"
        >
          {orgName}
        </Typography>
      </Box>
      <Box className={styles.scoreBox}>
        <Box>
          <Typography
            component="span"
            className={styles.bigScore}
            color={getColorBasedOnScore(Number(value))}
            data-testid="drawer-score-formatted-score"
          >
            {valueFormatted}
          </Typography>
          <Typography
            className={styles.scoreDescription}
            data-testid="drawer-score-description"
          >
            {scoreDescription}
          </Typography>
          <Typography data-testid="drawer-score-date">
            {`Last Updated: ${getRefreshDateAndTime(new Date(cisDate))}`}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.sectionContainer}>
        <Typography component="h3" className={styles.sectionTitle}>
          Overview
        </Typography>
        <Typography
          component="p"
          className={styles.sectionContent}
          data-testid="drawer-score-overview-content"
        >
          {scoreContent}
        </Typography>
      </Box>
      {commentsLoaded ? (
        <Box className={styles.sectionContainer}>
          <Typography component="h3" className={styles.sectionTitle}>
            Analyst Commentary
          </Typography>
          <Typography
            component="p"
            className={styles.sectionContent}
            data-testid="drawer-score-analyst-content"
          >
            {!errorMessage && esgComments
              ? getComment(esgComments as EsgViewComment, fieldComment)
              : errorMessage}
          </Typography>
        </Box>
      ) : (
        <Box
          className={styles.sectionContainer}
          data-testid="drawer-score-loading"
        >
          <Typography component="h3" className={styles.sectionTitle}>
            <Skeleton variant="text" />
          </Typography>
          <Typography component="p" className={styles.sectionContent}>
            <Skeleton variant="rectangular" height={200} />
          </Typography>
        </Box>
      )}
    </Box>
  );
};
