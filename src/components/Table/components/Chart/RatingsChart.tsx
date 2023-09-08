import React from "react";
import { Chart } from "@moodys/mdc-frontend.widgets.chart";
import {
  Container,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import color from "@moodys/mdc-frontend.theming.colors";
import font from "@moodys/mdc-frontend.theming.fonts";
import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { ratingOptionsOrder, RatingsPopoverText } from "@constants/charts";
import { RatingChartType } from "@models/chart.types";
import { saveActiveRatingChartType, useAppDispatch } from "@services/redux";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { screenerChartviewDropdown } from "@services/analytics/Avo";
import styles from "./Chart.module.scss";
import {
  processRatings,
  countRatings,
  highchartsPoint,
  ratingsTooltipFormatter,
} from "./Chart.helper";
import { ChartStat } from "./ChartStat";

export const ratingChartNames = {
  [RatingChartType.LT_RATINGS]: "LT Rating Distribution",
  [RatingChartType.BANK_LT_RATINGS]: "Bank LT Rating Distribution",
};

export const RatingsChart = ({
  data,
  type: ratingChartType,
}: {
  data: Record<string, Record<string, Record<string, string>>>;
  type: RatingChartType;
}) => {
  const dispatch = useAppDispatch();

  const processedLtRatingData = processRatings(data.ratings);
  const processedBankLtRatingData = processRatings(data.bankRatings);
  const chartData =
    ratingChartType === RatingChartType.LT_RATINGS
      ? processedLtRatingData
      : processedBankLtRatingData;
  const totalLtRatings = countRatings(data.ratings);
  const totalBankLtRatings = countRatings(data.bankRatings);
  const totalCount =
    ratingChartType === RatingChartType.LT_RATINGS
      ? totalLtRatings
      : totalBankLtRatings;

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(saveActiveRatingChartType(event.target.value));
    const eventDepth = ratingChartNames[event.target.value as RatingChartType];
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerChartviewDropdown,
      eventDetails: {
        ...defaultEventDetails,
        depth: eventDepth,
      },
    });
  };
  return (
    <Container
      className={styles.ratingChartContainer}
      data-testid="ratings-chart"
    >
      <Container className={styles.ratingsStats}>
        <FormControl className={styles.ratingsSelect}>
          <Select
            labelId="ratings-chart-select-label"
            id="ratings-chart-select"
            value={ratingChartType}
            onChange={handleChange}
            renderValue={() => {
              return ratingChartNames[ratingChartType];
            }}
            MenuProps={{
              className: styles.ratingsChartMenu,
              disableScrollLock: true,
            }}
            data-testid="ratings-chart-select"
          >
            <MenuItem value={RatingChartType.LT_RATINGS}>
              {ratingChartNames[RatingChartType.LT_RATINGS]}
            </MenuItem>
            <MenuItem value={RatingChartType.BANK_LT_RATINGS}>
              {ratingChartNames[RatingChartType.BANK_LT_RATINGS]}
            </MenuItem>
          </Select>
        </FormControl>
        <ChartStat
          text={`Entities with ${
            ratingChartType === RatingChartType.LT_RATINGS ? "" : "Bank "
          }LT Rating`}
          number={totalCount}
          popover={RatingsPopoverText}
        />
      </Container>
      <Container className={styles.ratingChart}>
        <Chart
          title=""
          displayAttribution={false}
          exportEnabled={false}
          data={chartData}
          optionsOverrides={{
            chart: {
              style: {
                fontFamily: font.fontFamily,
                color: color.globalGray600,
              },
              backgroundColor: "rgba(0,0,0,0)",
              type: "column",
              height: 222,
              borderWidth: 0,
              events: {
                render: function () {
                  const { group, title } = this.legend;
                  if (window.innerWidth > 850) {
                    title.translate(-100, 23);
                    group.translate(96, 160);
                  } else {
                    title.translate(6, 4);
                  }
                },
              },
            },
            plotOptions: {
              series: {
                stacking: "normal",
              },
            },
            tooltip: {
              backgroundColor: color.globalWhite,
              borderWidth: 0,
              useHTML: true,
              formatter: function () {
                return ratingsTooltipFormatter({
                  ratingName: this.x,
                  points: this.points as highchartsPoint[],
                });
              },
              shared: true,
            },
            xAxis: {
              categories: ratingOptionsOrder,
            },
            yAxis: {
              allowDecimals: false,
              title: {
                text: "",
              },
            },
            legend: {
              align: "left",
              itemDistance: 12,
              symbolRadius: 0,
              title: {
                text: "Credit Outlook:",
              },
            },
          }}
        />
      </Container>
    </Container>
  );
};
