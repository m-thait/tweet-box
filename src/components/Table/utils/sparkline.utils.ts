import { subYears } from "date-fns";
import { TooltipRendererParams } from "ag-grid-community";
import { dateValueFormatter } from "@moodys/mdc-table.value-formatters.date";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import {
  ltRatingSparklineDataPoint,
  SparklineData,
} from "@models/sparkline.types";

export const getSparklinePointData = (
  data: ltRatingSparklineDataPoint[],
  date: Date
) => {
  const result = data.find((datum) => {
    const thisDate = new Date(datum.date);
    return thisDate.getTime() === date.getTime();
  });
  return result || null;
};

// The design wanted the middle line to determine the width of the tooltip.
// Using caption tag for the class to force it to be limited by td width
export const tooltipRenderer = (
  params: TooltipRendererParams,
  fieldName: ColumnFieldNames
) => {
  const { xValue, context } = params;
  const sparkLineData = context.data[fieldName];
  const data = getSparklinePointData(
    (sparkLineData as SparklineData).data,
    xValue
  );

  // If the date doesn't match an entry the in list it's the added point at the end and gets no tooltip
  if (!data) {
    return "<div></div>";
  }

  const { rating, direction, class: ratingClass } = data;
  return `
    <div class='sparkline-tooltip'>
      <div class='sparkline-tooltip-date'>
        ${dateValueFormatter(xValue)}
      </div>
      <table>
        <tr>
          <td>
            <span class='sparkline-tooltip-rating'>${rating}
            </span>
            ${direction && "|"}
            <span>
              ${direction}
            </span>
          </td>
        </tr>
        <caption>
          <div class='sparkline-tooltip-class'>
            ${ratingClass}
          </div>
        </caption>
      </table>
    </div>`;
};

// Rank from the api has WR as 0, Aaa as 1, and C as 20. The WRs need to be nulls and
// the rest flipped so that the better ranks are higher up in line chart
export const convertRank = (rank: number) => {
  return rank === 0 ? null : 22 - rank;
};

export const generateSparklinePoints = ({
  newStart,
  data,
}: {
  newStart: boolean;
  data: ltRatingSparklineDataPoint[];
}) => {
  if (data.length === 0) {
    return [];
  }
  const points: { date: Date; rank: number | null }[] = [];

  // newStarts gets a 10 year old null value to ensure x-span is 10 years and there is a gap in front
  // Other entities will have data scaled to full width
  if (newStart) {
    points.push({
      date: subYears(new Date(), 10),
      rank: null,
    });
  }

  data.forEach((point, index) => {
    // add point with current date and previous rank to create step line chart effect
    if (index > 0) {
      const prevPoint = data[index - 1];
      const NewPrevPoint: { date: Date; rank: number | null } = {
        date: new Date(point.date),
        rank: convertRank(prevPoint.rank),
      };
      points.push(NewPrevPoint);
    }

    const currentPoint: { date: Date; rank: number | null } = {
      date: new Date(point.date),
      rank: convertRank(point.rank),
    };

    points.push(currentPoint);

    // add new point with current rank and today's date to bring line up to end of 10-year period
    if (index === data.length - 1) {
      points.push({
        date: new Date(),
        rank: currentPoint.rank,
      });
    }
  });
  return points;
};

// Multiple ranks can be assigned at the same time to show a rating range. That includes extra data and makes the sparkline
// messy. This filters out the lower end of the range to match what is seen on the entity page.
export const filterSparklineDataRanges = ({
  newStart,
  data,
}: {
  newStart: boolean;
  data: ltRatingSparklineDataPoint[];
}) => {
  const result = data.length > 0 ? [data[0]] : [];
  for (let i = 1; i < data.length; i++) {
    if (result[result.length - 1].date === data[i].date) {
      if (result[result.length - 1].rank > data[i].rank) {
        result[result.length - 1] = data[i];
      }
    } else {
      result.push(data[i]);
    }
  }
  return { newStart, data: result };
};
