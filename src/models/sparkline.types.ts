import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";

export type ltRatingSparklineDataPoint = {
  date: string;
  rank: number;
  rating: string;
  direction: string;
  class: string;
};

export enum SparklineType {
  REGULAR = "regular",
  BANK = "bank",
}

export type ltRatingSparklineResponse = {
  [orgId: string]: {
    newStart: boolean;
    data: ltRatingSparklineDataPoint[];
    type: SparklineType;
  };
};

export interface SparklineData {
  data: ltRatingSparklineDataPoint[];
}

export interface SparklineColumnData {
  [ColumnFieldNames.LT_RATING_SPARKLINE]?: SparklineData | undefined;
  [ColumnFieldNames.LT_BANK_RATING_SPARKLINE]?: SparklineData | undefined;
}

export const SparklineTypeToColumnFieldMap = {
  [SparklineType.REGULAR]: ColumnFieldNames.LT_RATING_SPARKLINE,
  [SparklineType.BANK]: ColumnFieldNames.LT_BANK_RATING_SPARKLINE,
};
