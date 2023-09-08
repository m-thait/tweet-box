import { outlookColumnDefinitions, scoreChartTypes } from "@constants/charts";
import {
  processRatings,
  processScores,
  countRatings,
  countScores,
  ratingsTooltipFormatter,
} from "./Chart.helper";

const ratingsData = {
  A1: {
    DEV: "1",
    NEG: "68",
    NOO: "8",
    POS: "33",
    RUR: "1",
    RWR: "2",
    STA: "380",
    null: "1",
  },
  A2: {
    NEG: "51",
    NOO: "15",
    POS: "28",
    RUR: "10",
    RWR: "1",
    STA: "482",
    null: "1",
  },
  WR: { NEG: "12", POS: "28", RWR: "100" },
};

const pRatingsData = {
  "(P)A2": {
    NEG: "1",
    NOO: "1",
    POS: "1",
    RUR: "1",
    RWR: "1",
    STA: "1",
  },
};

const scoresData = {
  "CIS-1": "18",
  "CIS-2": "55",
  "CIS-3": "20",
  "CIS-4": "5",
  "CIS-5": "1",
  "E-1": "100",
};

const ratingPoints = [
  {
    total: 100,
    series: {
      name: "positive",
    },
    percentage: 12.1,
    color: "#ff0000",
    y: 20,
  },
  {
    total: 100,
    series: {
      name: "negative",
    },
    percentage: 24.6,
    color: "#00ff00",
    y: 40,
  },
];

describe("Chart.helper", () => {
  describe("countRatings", () => {
    it("should return correct count", () => {
      const count = countRatings(ratingsData);
      expect(count).toStrictEqual(1077);
    });
    it("should return zero if null", () => {
      const count = countRatings(null);
      expect(count).toStrictEqual(0);
    });
    it("should return zero if empty object", () => {
      const count = countRatings({});
      expect(count).toStrictEqual(0);
    });
  });
  describe("countScores", () => {
    it("should return correct count", () => {
      const count = countScores(scoresData);
      expect(count).toStrictEqual(99);
    });
    it("should return zero if null", () => {
      const count = countScores(null);
      expect(count).toStrictEqual(0);
    });
    it("should return zero if empty object", () => {
      const count = countScores({});
      expect(count).toStrictEqual(0);
    });
  });
  describe("processRatings", () => {
    it("should return correct count", () => {
      const result = processRatings(ratingsData);
      expect(result.length).toStrictEqual(outlookColumnDefinitions.length);
      expect(result[0]["data"][4]).toStrictEqual(
        parseInt(ratingsData["A1"]["POS"])
      );
      expect(result[0]["data"][5]).toStrictEqual(
        parseInt(ratingsData["A2"]["POS"])
      );
    });
    it("should return correct count with (P) values", () => {
      const result = processRatings({ ...ratingsData, ...pRatingsData });
      expect(result.length).toStrictEqual(outlookColumnDefinitions.length);
      expect(result[0]["data"][5]).toStrictEqual(
        parseInt(ratingsData["A2"]["POS"]) +
          parseInt(pRatingsData["(P)A2"]["POS"])
      );
    });
    it("should return no results if null", () => {
      const result = processRatings(null);
      expect(result.length).toStrictEqual(1);
      expect(result[0].name).toStrictEqual("No results");
    });
    it("should return no results if empty object", () => {
      const result = processRatings({});
      expect(result.length).toStrictEqual(1);
      expect(result[0].name).toStrictEqual("No results");
    });
  });
  describe("processScores", () => {
    it("should correctly get percentages", () => {
      const result = processScores(scoresData);
      expect(Object.keys(result).length).toStrictEqual(scoreChartTypes.length);
      expect(result["CIS"][0]).toStrictEqual(1);
      expect(result["CIS"][4]).toStrictEqual(18);
    });
    it("should correctly get scores with missing data (0 columns)", () => {
      const result = processScores(scoresData);
      expect(Object.keys(result).length).toStrictEqual(scoreChartTypes.length);
      expect(result["E"][0]).toStrictEqual(0);
      expect(result["E"][4]).toStrictEqual(100);
    });
  });
  describe("ratingsTooltipFormatter", () => {
    it("should correctly generate tooltip formatter", () => {
      const result = ratingsTooltipFormatter({
        ratingName: "Aaa",
        points: ratingPoints,
      });
      expect(result).toContain("Aaa");
      expect(result).not.toContain("12.1");
      expect(result).toContain("40");
      expect(result).not.toContain("24");
      expect(result).toContain("25");
      expect(result).toContain("100");
      expect(result).toContain("positive");
      expect(result).toContain("negative");
    });
  });
});
