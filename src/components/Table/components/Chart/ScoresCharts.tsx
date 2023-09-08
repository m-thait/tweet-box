import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Chart } from "@moodys/mdc-frontend.widgets.chart";
import { charts } from "highcharts";
import { valueWithCommas } from "@moodys/mdc-table.utils.string";
import font from "@moodys/mdc-frontend.theming.fonts";
import color from "@moodys/mdc-frontend.theming.colors";
import {
  scoreChartDefinitions,
  scoreLegendValues,
  ScoresPopoverText,
} from "@constants/charts";
import styles from "./Chart.module.scss";
import { processScores, countScores } from "./Chart.helper";
import { ChartStat } from "./ChartStat";

export const ScoresCharts = ({ data }: { data: Record<string, string> }) => {
  const processedData = processScores(data);
  const total = countScores(data);
  useEffect(() => {
    const handleResize = () => {
      charts?.forEach((chart) => {
        chart?.setSize((window.innerWidth - 160) / 4, null, false); // 160 is sum of gaps and padding values
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      className={styles.scoreChartsContainer}
      data-testid="scores-charts"
    >
      <div>
        <Container className={styles.scoreChartsHeader}>
          <Container>
            <Typography variant="h5">CIS and IPS Distribution</Typography>
          </Container>
          <ChartStat
            text={"Entities with ESG Scores"}
            number={total}
            popover={ScoresPopoverText}
          />
        </Container>
        <Container className={styles.scoreChartsRow}>
          {scoreChartDefinitions.map((group) => (
            <ScoresChart
              key={group.title}
              values={processedData[group.prefix]}
              prefix={group.prefix}
              title={group.title}
            />
          ))}
        </Container>
      </div>
      <ScoreLegend />
    </Container>
  );
};

export const ScoresChart = ({
  values,
  prefix,
  title,
}: {
  values: number[];
  prefix: string;
  title: string;
}) => (
  <Container className={styles.scoreChartContainer}>
    <Box>
      <Typography variant="button">{title}</Typography>
    </Box>
    <Chart
      displayAttribution={false}
      exportEnabled={false}
      data={[
        {
          data: values,
          dataLabels: {
            enabled: true,
            formatter: function () {
              const total = this.series.data.reduce((acc, item) => {
                return item.y ? acc + item.y : acc;
              }, 0);
              const percent: number = this.y ? (100 * this.y) / total : 0;
              return Math.round(percent) + "%";
            },
          },
          maxPointWidth: 100,
          pointPadding: -0.2,
          type: "column",
          showInLegend: false,
        },
      ]}
      optionsOverrides={{
        colors: scoreLegendValues.map((item) => item.color),
        chart: {
          style: {
            fontFamily: font.fontFamily,
          },
          type: "column",
          height: 130,
          borderWidth: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        xAxis: {
          categories: scoreLegendValues.map(
            (value) => `${prefix}-${value.number}`
          ),
        },
        yAxis: {
          visible: false,
        },
        plotOptions: {
          column: {
            colorByPoint: true,
            dataLabels: {
              crop: false,
              overflow: "allow",
            },
          },
        },
        tooltip: {
          backgroundColor: color.globalWhite,
          useHTML: true,
          formatter: function () {
            return `${this.x}: ${valueWithCommas(this.y ?? 0)}`;
          },
        },
      }}
    />
  </Container>
);

const ScoreLegend = () => (
  <Container className={styles.scoreLegend}>
    <Typography variant="caption" className={styles.scoreLegendText}>
      Scoring and Definitions:
    </Typography>
    <Container>
      {scoreLegendValues.map((item) => (
        <ScoreLegendItem key={item.color} item={item} />
      ))}
    </Container>
  </Container>
);

const ScoreLegendItem = ({
  item,
}: {
  item: { color: string; number: string; text: string };
}) => (
  <Container className={styles.scoreLegendItem}>
    <Box
      style={{
        backgroundColor: item.color,
      }}
      className={styles.scoreLegendItemSquare}
    />
    <Typography variant="caption" className={styles.scoreLegendText}>
      {item.number} - {item.text}
    </Typography>
  </Container>
);
