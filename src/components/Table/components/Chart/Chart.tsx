/* eslint-disable complexity */
import React from "react";
import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import {
  getChartData,
  getActiveChartType,
  getActiveRatingChartType,
  useAppSelector,
} from "@services/redux";
import { ChartType } from "@models/chart.types";
import { ChartsResponse } from "@models/api.types";
import { RatingsChart } from "./RatingsChart";
import { ScoresCharts } from "./ScoresCharts";
import { ChartSkeleton } from "./ChartSkeleton";
import { useChartEvents } from "./Chart.hooks";

export const Chart = () => {
  const chartType = useAppSelector(getActiveChartType);
  const ratingChartType = useAppSelector(getActiveRatingChartType);
  const chartData = useAppSelector(getChartData);
  const isLoading = !chartData;
  highchartsAccessibility(Highcharts);
  useChartEvents();

  return (
    <>
      {chartType === ChartType.LT_RATINGS && chartData && (
        <RatingsChart
          data={chartData as ChartsResponse}
          type={ratingChartType}
        />
      )}
      {chartType === ChartType.SCORES && chartData && chartData.scores && (
        <ScoresCharts data={chartData.scores as Record<string, string>} />
      )}
      {isLoading && <ChartSkeleton chartType={chartType} />}
    </>
  );
};
