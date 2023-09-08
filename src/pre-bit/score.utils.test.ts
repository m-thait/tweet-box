import { stripPrefixFromScore } from "./score.utils";

describe("Score Utils", () => {
  describe("stripPrefixFromScore", () => {
    it("should strip any non-numeric characters from a given string", () => {
      const val = "CIS-1";
      const strippedVal = stripPrefixFromScore(val);
      expect(strippedVal).toStrictEqual("1");
    });
    it("should not change single digit strings", () => {
      const val = "1";
      const strippedVal = stripPrefixFromScore(val);
      expect(strippedVal).toStrictEqual(val);
    });
  });
});
