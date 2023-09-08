import {
  ColumnFieldNames,
  ESGColumnFields,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
import { accordionItems } from "@constants/drawer";
import { ScoreDescription } from "@models/scorecard.types";

export const doesScoreHaveComment = (
  field: string,
  data: Record<string, unknown>
) => {
  const commentField = `${field}Comments`;
  return data[commentField] === 1;
};

export const getComment = (
  esgComments: EsgViewComment,
  field: ColumnFieldNames
): string => {
  if (esgComments[field as keyof EsgViewComment]) {
    return esgComments[field as keyof EsgViewComment] as string;
  }
  return "There are no comments for this organization.";
};

export const getScoreItem = (
  scoreData: accordionItems[],
  formattedScore: string
) => {
  let scoreInfo: ScoreDescription = {
    scoreDescription: "",
    scoreContent: "",
  };
  scoreData.map((item) => {
    const titles = item.titles;
    const index = titles.indexOf(formattedScore);
    if (index > -1) {
      scoreInfo = {
        scoreDescription: item.description as string,
        scoreContent: item.content as string,
      };
    }
  });
  return scoreInfo;
};

export const getScoreContent = (
  formattedScore?: string,
  field?: string,
  cisAccordionData?: accordionItems[],
  ipsAccordionData?: accordionItems[]
): ScoreDescription => {
  switch (field) {
    case ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName:
      return getScoreItem(
        cisAccordionData as accordionItems[],
        formattedScore as string
      );
    case ESGColumnFields.ENV_IPS_SCORE.fieldName:
    case ESGColumnFields.SOCIAL_IPS_SCORE.fieldName:
    case ESGColumnFields.GOV_IPS_SCORE.fieldName:
      return getScoreItem(
        ipsAccordionData as accordionItems[],
        formattedScore as string
      );
    default:
      return { scoreDescription: "", scoreContent: "" };
  }
};
