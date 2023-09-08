import { scoreLabels } from "@moodys/mdc-table.constants";
import { ScorecardDefinitionKey } from "@constants/drawer";
import { Definition, Scorecard } from "@models/scorecard.types";

export const concatenateDefinitions = (scorecardDefinitions: Definition[]) => {
  const definition = scorecardDefinitions.map((x) => x.definition).join("");

  const spacedCommas = definition.replace(/,(?=\S\w)/g, ", ");
  const spacedPeriods = spacedCommas.replace(/[.](?=\S\w)/g, ". ");
  return spacedPeriods;
};

export const getScoreDefinition = ({
  scorecards,
  score,
  definitionKey,
}: {
  scorecards: Scorecard[];
  score: number;
  definitionKey: ScorecardDefinitionKey;
}): string => {
  const correspondingScorecard = scorecards.find(
    (scorecard) => scorecard.identifier === score
  );
  if (!correspondingScorecard || !correspondingScorecard[definitionKey]) {
    return "";
  }
  return concatenateDefinitions(correspondingScorecard[definitionKey]);
};

export const formatCisAccordionData = (scorecardResponse: Scorecard[]) => [
  {
    titles: ["CIS-1"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 1,
      definitionKey: ScorecardDefinitionKey.CIS,
    }),
    score: 1,
    description: scoreLabels.POSITIVE,
  },
  {
    titles: ["CIS-2"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 2,
      definitionKey: ScorecardDefinitionKey.CIS,
    }),
    score: 2,
    description: scoreLabels.NEUTRAL_TO_LOW,
  },
  {
    titles: ["CIS-3"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 3,
      definitionKey: ScorecardDefinitionKey.CIS,
    }),
    score: 3,
    description: scoreLabels.MODERATELY_NEGATIVE,
  },
  {
    titles: ["CIS-4"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 4,
      definitionKey: ScorecardDefinitionKey.CIS,
    }),
    score: 4,
    description: scoreLabels.HIGHLY_NEGATIVE,
  },
  {
    titles: ["CIS-5"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 5,
      definitionKey: ScorecardDefinitionKey.CIS,
    }),
    score: 5,
    description: scoreLabels.VERY_HIGHLY_NEGATIVE,
  },
];

export const formatIpsAccordionData = (scorecardResponse: Scorecard[]) => [
  {
    titles: ["E-1", "S-1", "G-1"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 1,
      definitionKey: ScorecardDefinitionKey.IPS,
    }),
    score: 1,
    description: scoreLabels.POSITIVE,
  },
  {
    titles: ["E-2", "S-2", "G-2"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 2,
      definitionKey: ScorecardDefinitionKey.IPS,
    }),
    score: 2,
    description: scoreLabels.NEUTRAL_TO_LOW,
  },
  {
    titles: ["E-3", "S-3", "G-3"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 3,
      definitionKey: ScorecardDefinitionKey.IPS,
    }),
    score: 3,
    description: scoreLabels.MODERATELY_NEGATIVE,
  },
  {
    titles: ["E-4", "S-4", "G-4"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 4,
      definitionKey: ScorecardDefinitionKey.IPS,
    }),
    score: 4,
    description: scoreLabels.HIGHLY_NEGATIVE,
  },
  {
    titles: ["E-5", "S-5", "G-5"],
    content: getScoreDefinition({
      scorecards: scorecardResponse,
      score: 5,
      definitionKey: ScorecardDefinitionKey.IPS,
    }),
    score: 5,
    description: scoreLabels.VERY_HIGHLY_NEGATIVE,
  },
];
