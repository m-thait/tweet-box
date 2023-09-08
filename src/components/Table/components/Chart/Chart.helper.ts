import color from "@moodys/mdc-frontend.theming.colors";
import {
  outlookColumnDefinitions,
  outlookSymbols,
  ratingOptionsOrder,
  scoreChartTypes,
} from "@constants/charts";

type RatingChartData = {
  name: string;
  type: string;
  data: number[];
  color: string;
};

// processRatings takes data that has all of the outlooks grouped by rating and converts it to data that
// HighCharts can take in as series data. Each outlook has an array of values for all of the ratings as
// well as the name and color
//
// (P) ratting counts are combined with regular rating counts
//
// ex. input
// const ratings = {
//   A1: {
//     DEV: "1",
//     NEG: "68",
//     NOO: "8",
//     POS: "33",
//     RUR: "1",
//     RWR: "2",
//     STA: "380",
//   },
//   A2: {
//     NEG: "51",
//     NOO: "15",
//     POS: "28",
//     RUR: "10",
//     RWR: "1",
//     STA: "482",
//   },
// };
//
// ex. output
// [
//   {
//     name: "Positive",
//     type: "column",
//     data: [2, 1, 16, 32, 33, 31, 28, 31, 39, 35, 45, 36, 54, 51, 37, 49, 9, 4, 1, 0],
//     color: "#008668",
//   }
// ]

const emptyRatingData = () => {
  return Array(ratingOptionsOrder.length).fill(0);
};

const noResultsRow: RatingChartData = {
  name: "No results",
  type: "column",
  data: emptyRatingData(),
  color: "#BABCBD",
};

export const processRatings = (
  ratings: Record<string, Record<string, string>> | null
) => {
  if (!ratings) {
    return [noResultsRow];
  }
  const results = outlookColumnDefinitions.reduce(
    (acc: RatingChartData[], outlookOption) => {
      let hasData = false;
      const data = ratingOptionsOrder.map((ratingOption) => {
        let result = 0;
        if (
          ratings[ratingOption] &&
          ratings[ratingOption][outlookOption.symbol]
        ) {
          hasData = true;
          result = parseInt(ratings[ratingOption][outlookOption.symbol]);
        }
        if (
          ratings[`(P)${ratingOption}`] &&
          ratings[`(P)${ratingOption}`][outlookOption.symbol]
        ) {
          hasData = true;
          result += parseInt(
            ratings[`(P)${ratingOption}`][outlookOption.symbol]
          );
        }
        return result;
      });
      if (hasData) {
        acc.push({
          name: outlookOption.name,
          type: "column",
          data,
          color: outlookOption.color,
        });
      }
      return acc;
    },
    []
  );
  if (results.length === 0) {
    return [noResultsRow];
  }
  // Highcharts is not picking up chart type correctly and expecting a different object type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results as any[];
};

// countRatings goes through all of the ratings (except "WR") and adds up all counts of rating/outlook combinations

export const countRatings = (
  ratings: Record<string, Record<string, string>> | null
) => {
  if (!ratings) {
    return 0;
  }
  return Object.keys(ratings).reduce((acc, ratingKey) => {
    if (ratingKey === "WR") {
      return acc;
    }
    return (
      Object.keys(ratings[ratingKey]).reduce((acc2, outlookKey) => {
        if (outlookSymbols.includes(outlookKey)) {
          return parseInt(ratings[ratingKey][outlookKey]) + acc2;
        }
        return acc2;
      }, 0) + acc
    );
  }, 0);
};

// processScores converts data object of counts for each score type/value
// Each score is put in reverse order (5 to 1) and converted to percentage of total

// input
// {
//   "CIS-1": "18",
//   "CIS-2": "55",
//   "CIS-3": "20",
//   "CIS-4": "5",
//   "CIS-5": "1",
// };

// output
// {
//   CIS: [ 1, 5.1, 20.2, 55.6, 18.2 ],
//   E: [ 0, 0, 0, 0, 0 ],
//   S: [ 0, 0, 0, 0, 0 ],
//   G: [ 0, 0, 0, 0, 0 ]
// }

export const processScores = (
  scores: Record<string, string> | null
): { [key: string]: number[] } => {
  const newScores = scores ?? {};
  return scoreChartTypes.reduce(
    (acc: Record<string, number[]>, type: string) => {
      const values = [5, 4, 3, 2, 1];
      const newValues = values.map((col) => {
        return parseInt(newScores[`${type}-${col}`] ?? "0");
      });
      acc[type] = newValues;
      return acc;
    },
    {}
  );
};

export const countScores = (scores: Record<string, string> | null) => {
  if (!scores) {
    return 0;
  }
  return Object.keys(scores).reduce((acc, key) => {
    return key.includes("CIS") ? acc + parseInt(scores[key]) : acc;
  }, 0);
};

export type highchartsPoint = {
  total: number;
  series: {
    name: string;
  };
  percentage: number;
  color: string;
  y: number;
};

// https://api.highcharts.com/highcharts/tooltip.formatter
export const ratingsTooltipFormatter = ({
  ratingName,
  points,
}: {
  ratingName: string | number | undefined;
  points: highchartsPoint[] | undefined;
}) => {
  const tooltipHeader =
    `<table><tr><th colspan="2" style="font-size:14px">${ratingName}<br /></th>` +
    `<th colspan="2"><span style="font-weight:400">Total: ${
      points && points[0] ? points[0].total : 0
    }</span></th></tr>` +
    `<tr><td colspan="2"><span style="font-size:10px;color:${color.globalGray600}">Outlook</span></td></tr>`;
  const tooltipRows = points?.reduce((acc: string, point: highchartsPoint) => {
    return (
      acc +
      `<tr><td><div style="background-color:${point.color};height:10px;width:10px"></div></td>` +
      `<td>${point.series.name}</td>` +
      `<td style="text-align: right">${point.y}</td>` +
      `<td style="text-align: right">(${Math.round(
        point.percentage
      )}%)</td></tr>`
    );
  }, "");
  const tooltipFooter = "</table";
  return tooltipHeader + tooltipRows + tooltipFooter;
};
