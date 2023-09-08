import { subYears } from "date-fns";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { TooltipRendererParams } from "ag-grid-community";
import { ltRatingSparklineDataPoint } from "@models/sparkline.types";
import {
  convertRank,
  generateSparklinePoints,
  getSparklinePointData,
  tooltipRenderer,
  filterSparklineDataRanges,
} from "./sparkline.utils";

describe("Sparkline Utils", () => {
  it("getSparklinePointData", () => {
    const dateSuccess = subYears(new Date(), 6);
    const dateFail = subYears(new Date(), 4);
    const data: ltRatingSparklineDataPoint[] = [
      {
        date: subYears(new Date(), 10).toISOString(),
        rating: "(P)Baa3",
        rank: 10,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
      {
        date: subYears(new Date(), 8).toISOString(),
        rating: "Baa3",
        rank: 10,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
      {
        date: dateSuccess.toISOString(),
        rating: "Baa2",
        rank: 9,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
    ];

    const result1 = getSparklinePointData(data, dateSuccess);
    const result2 = getSparklinePointData(data, dateFail);
    expect(result1?.rank).toStrictEqual(9);
    expect(result2).toBeNull();
  });

  it("tooltipRenderer", () => {
    const date = subYears(new Date(), 6);
    const data: ltRatingSparklineDataPoint[] = [
      {
        date: date.toISOString(),
        rating: "(P)Baa3",
        rank: 10,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
      {
        date: subYears(new Date(), 5).toISOString(),
        rating: "Baa3",
        rank: 10,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
      {
        date: subYears(new Date(), 4).toISOString(),
        rating: "Baa2",
        rank: 9,
        direction: "Upgrade",
        class: "Senior Secured Bank Credit Facility - Fgn Curr",
      },
    ];
    const view = tooltipRenderer(
      {
        xValue: date,
        context: { data: { [ColumnFieldNames.LT_RATING_SPARKLINE]: { data } } },
      } as TooltipRendererParams,
      ColumnFieldNames.LT_RATING_SPARKLINE
    );

    expect(view).toContain("(P)Baa3");
    expect(view).toContain("Senior Secured Bank Credit Facility - Fgn Curr");
  });

  it("generateSparklinePoints with newStart", () => {
    const date = new Date().toDateString();
    const data = generateSparklinePoints({
      newStart: true,
      data: [
        {
          date: date,
          rating: "(P)Baa3",
          rank: 10,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "Baa3",
          rank: 10,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "Baa2",
          rank: 9,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "WR",
          rank: 0,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
      ],
    });
    expect(data.length).toStrictEqual(9);
    expect(data[0].rank).toBeNull();
    expect(data[1].rank).toStrictEqual(12);
    expect(data[5].rank).toStrictEqual(13);
  });

  it("generateSparklinePoints without newStart", () => {
    const date = new Date().toDateString();
    const data = generateSparklinePoints({
      newStart: false,
      data: [
        {
          date: date,
          rating: "(P)Baa3",
          rank: 10,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "Baa3",
          rank: 10,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "Baa2",
          rank: 9,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: date,
          rating: "WR",
          rank: 0,
          direction: "Upgrade",
          class: "Senior Secured Bank Credit Facility - Fgn Curr",
        },
      ],
    });
    expect(data.length).toStrictEqual(8);
  });

  it("convertRank", () => {
    const wrNull = convertRank(0);
    const AaaRank = convertRank(1);
    const cRank = convertRank(21);
    expect(wrNull).toBeNull();
    expect(AaaRank).toStrictEqual(21);
    expect(cRank).toStrictEqual(1);
  });

  it("filterSparklineDataRanges", () => {
    const sparkline = {
      newStart: true,
      data: [
        {
          date: "2018-04-20T14:24:26.000Z",
          rank: 15,
          rating: "B2",
          direction: "New",
          class: "BACKED Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: "2018-04-20T14:24:26.000Z",
          rank: 18,
          rating: "Caa2",
          direction: "New",
          class: "BACKED Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: "2019-12-03T15:56:12.000Z",
          rank: 18,
          rating: "Caa2",
          direction: "Affirmation",
          class: "BACKED Senior Secured Bank Credit Facility - Fgn Curr",
        },
        {
          date: "2019-12-03T15:56:12.000Z",
          rank: 15,
          rating: "B2",
          direction: "Affirmation",
          class: "BACKED Senior Secured Bank Credit Facility - Fgn Curr",
        },
      ],
    };

    const filtered = filterSparklineDataRanges(sparkline);

    expect(filtered.data.length).toStrictEqual(2);
    expect(filtered.data[0].rank).toStrictEqual(15);
    expect(filtered.data[1].rank).toStrictEqual(15);
  });

  it("filterSparklineDataRanges with empty data", () => {
    const sparkline = {
      newStart: true,
      data: [],
    };

    const filtered = filterSparklineDataRanges(sparkline);
    expect(filtered.data.length).toStrictEqual(0);
  });
});
