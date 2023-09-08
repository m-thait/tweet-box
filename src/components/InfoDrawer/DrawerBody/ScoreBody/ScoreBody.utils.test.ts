import {
  ColumnFieldNames,
  ESGColumnFields,
} from "@moodys/mdc-table.schemas.screener";
import {
  mockCisAccordionDataStoreState,
  mockIpsAccordionDataStoreState,
  commentsData,
} from "@services/redux/mocks";
import {
  doesScoreHaveComment,
  getComment,
  getScoreContent,
  getScoreItem,
} from "./ScoreBody.utils";

const cisAccordionData = mockCisAccordionDataStoreState;
const ipsAccordionData = mockIpsAccordionDataStoreState;

describe("ScoreBody.utils", () => {
  describe("getComment", () => {
    const [esgComments] = commentsData;
    it("should get esgScoresCisAnalystComments", () => {
      const field = ColumnFieldNames.CREDIT_IMPACT_SCORE_COMMENTS;
      const result = getComment(esgComments, field);
      expect(result).toStrictEqual(esgComments.cisScoreComments);
    });
    it("should get esgScoresIpsAnalystComments", () => {
      const field = ColumnFieldNames.ENV_IPS_SCORE_COMMENTS;
      const result = getComment(esgComments, field);
      expect(result).toStrictEqual(esgComments.environmentalExposureComments);
    });
    it("should get esgScoresSocialAnalystComments", () => {
      const field = ColumnFieldNames.SOCIAL_IPS_SCORE_COMMENTS;
      const result = getComment(esgComments, field);
      expect(result).toStrictEqual(esgComments.socialExposureComments);
    });
    it("should get esgScoresGovAnalystComments", () => {
      const field = ColumnFieldNames.GOV_IPS_SCORE_COMMENTS;
      const result = getComment(esgComments, field);
      expect(result).toStrictEqual(esgComments.govExposureComments);
    });
    it("should return no comments message", () => {
      const field = "random";
      const result = getComment(esgComments, field as ColumnFieldNames);
      expect(result).toStrictEqual(
        "There are no comments for this organization."
      );
    });
  });
  describe("doesScoreHaveComment", () => {
    it("should check if scores have comments", () => {
      const field = doesScoreHaveComment("field", { fieldComments: 1 });
      const field2 = doesScoreHaveComment("field", { false: 1 });
      const field3 = doesScoreHaveComment("field", { fieldComments: 0 });
      expect(field).toBeTruthy();
      expect(field2).toBeFalsy();
      expect(field3).toBeFalsy();
    });
  });
  describe("getScoreItem", () => {
    const mockScoreData = [
      {
        titles: ["CIS-1"],
        content: `TEST content`,
        score: 1,
        description: "TEST description",
      },
    ];
    it("should find score data", () => {
      const formattedScore = "CIS-1";
      const result = getScoreItem(mockScoreData, formattedScore);
      expect(result).toStrictEqual({
        scoreDescription: "TEST description",
        scoreContent: `TEST content`,
      });
    });
    it("should return empty strings as data since score doesn't match", () => {
      const formattedScore = "CIS--";
      const result = getScoreItem(mockScoreData, formattedScore);
      expect(result).toStrictEqual({
        scoreDescription: "",
        scoreContent: "",
      });
    });
  });
  describe("getScoreContent", () => {
    it("should get CIS score info", () => {
      const formattedScore = "CIS-2";
      const field = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
      const result = getScoreContent(
        formattedScore,
        field,
        cisAccordionData,
        ipsAccordionData
      );
      expect(result).toStrictEqual({
        scoreContent: cisAccordionData[1].content,
        scoreDescription: cisAccordionData[1].description,
      });
    });
    it("should get ENV IPS score info", () => {
      const formattedScore = "E-1";
      const field = ESGColumnFields.ENV_IPS_SCORE.fieldName;
      const result = getScoreContent(
        formattedScore,
        field,
        cisAccordionData,
        ipsAccordionData
      );
      expect(result).toStrictEqual({
        scoreContent: ipsAccordionData[0].content,
        scoreDescription: ipsAccordionData[0].description,
      });
    });
    it("should get SOCIAL IPS score info", () => {
      const formattedScore = "S-1";
      const field = ESGColumnFields.SOCIAL_IPS_SCORE.fieldName;
      const result = getScoreContent(
        formattedScore,
        field,
        cisAccordionData,
        ipsAccordionData
      );
      expect(result).toStrictEqual({
        scoreContent: ipsAccordionData[0].content,
        scoreDescription: ipsAccordionData[0].description,
      });
    });
    it("should get GOV IPS score info", () => {
      const formattedScore = "G-1";
      const field = ESGColumnFields.GOV_IPS_SCORE.fieldName;
      const result = getScoreContent(
        formattedScore,
        field,
        cisAccordionData,
        ipsAccordionData
      );
      expect(result).toStrictEqual({
        scoreContent: ipsAccordionData[0].content,
        scoreDescription: ipsAccordionData[0].description,
      });
    });
    it("should get empty strings as  description and content", () => {
      const result = getScoreContent(undefined, undefined);
      expect(result).toStrictEqual({
        scoreContent: "",
        scoreDescription: "",
      });
    });
  });
});
