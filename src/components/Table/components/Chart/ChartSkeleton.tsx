/* eslint-disable complexity */
import React from "react";
import { SkeletonGenerator } from "@moodys/mdc-frontend.helpers.skeleton-generator";
import { Container } from "@mui/material";
import { ChartType } from "@models/chart.types";
import styles from "./Chart.module.scss";

// Creating a series of columns for the charts skeleton. This is the code for a rectangle:
// r<width(%)/?height(px)>
// So "r2/100r2/0r2/100" would create two 2% wide, 100px tall rectangles with a 2% gap between them
// Reference: https://bit.cloud/moodys/mdc-frontend/helpers/skeleton-generator

const columnGroupGenerator = (
  width: number,
  height: number,
  gapWidth: number,
  count: number
) => {
  const column = `r${width}/${height}`;
  const gap = `r${gapWidth}/0`;
  const array = new Array(count).fill(column);
  return array.join(gap);
};

export const ChartSkeleton = ({ chartType }: { chartType: ChartType }) => {
  if (chartType === ChartType.LT_RATINGS) {
    return (
      <Container
        className={styles.skeletonContainer}
        data-testid="ratings-chart-skeleton"
      >
        <SkeletonGenerator
          path={
            `t82/0t18/20;g0/60;` +
            `r6/0${columnGroupGenerator(2, 95, 2, 22)};` +
            `g0/50;t66/20`
          }
        />
      </Container>
    );
  }
  if (chartType === ChartType.SCORES) {
    return (
      <Container
        className={styles.skeletonContainer}
        data-testid="scores-chart-skeleton"
      >
        <SkeletonGenerator
          path={
            `r0/100;r1/0` +
            `${columnGroupGenerator(4, 85, 1, 5)}r3/0` +
            `${columnGroupGenerator(4, 85, 1, 5)}r3/0` +
            `${columnGroupGenerator(4, 85, 1, 5)}r3/0` +
            `${columnGroupGenerator(4, 85, 1, 5)}`
          }
        />
      </Container>
    );
  }
  return null;
};
