import { ScorecardDefinitionKey } from "@constants/drawer";
import { scoreDefinitionMockResponse } from "@services/redux/mocks";
import { Definition } from "@models/scorecard.types";
import {
  concatenateDefinitions,
  formatCisAccordionData,
  formatIpsAccordionData,
  getScoreDefinition,
} from "./drawer.utils";

describe("formatCisAccordionData", () => {
  it("returns the CIS accordion data with definitions", () => {
    const result = formatCisAccordionData(scoreDefinitionMockResponse);

    expect(result[0].content).toStrictEqual(
      scoreDefinitionMockResponse[0].cis_definition[0].definition
    );
  });
  describe("concatenateDefinitions", () => {
    it("should find and add spaces after periods and commas in content", () => {
      const scorecardWithNoSpacesAfterPunctuation = [
        {
          line_id: 1,
          definition:
            "Issuers or transactions with a Positive E or S issuer profile score typically have exposures to E or S issues that position them strongly,and the exposures carry potential credit benefits.",
        },
        {
          line_id: 2,
          definition:
            "For G,issuers or transactions typically have exposure to G considerations that,in the context of their sector,positions them strongly,with material credit benefits.",
        },
      ];
      const expectedContent =
        "Issuers or transactions with a Positive E or S issuer profile score typically have exposures " +
        "to E or S issues that position them strongly, and the exposures carry potential credit benefits. " +
        "For G, issuers or transactions typically have exposure to G considerations that, " +
        "in the context of their sector, positions them strongly, with material credit benefits.";
      const result = concatenateDefinitions(
        scorecardWithNoSpacesAfterPunctuation
      );
      expect(result).toStrictEqual(expectedContent);
    });

    it("should return an empty string when definition is undefined or null", () => {
      const scorecardWithUndefinedAndNullDefinitions: Definition[] = [
        {
          line_id: 1,
          // @ts-expect-error Testing for undefined
          definition: undefined,
        },
        {
          line_id: 2,
          definition: null,
        },
      ];
      const expectedContent = "";
      const result = concatenateDefinitions(
        scorecardWithUndefinedAndNullDefinitions
      );
      expect(result).toStrictEqual(expectedContent);
    });
  });
  describe("getScoreDefinition", () => {
    it.each([1, 2, 3, 4, 5])(
      "should return the appropriate cis score definition for a score for %i",
      (cisScore) => {
        const result = getScoreDefinition({
          scorecards: scoreDefinitionMockResponse,
          score: cisScore,
          definitionKey: ScorecardDefinitionKey.CIS,
        });
        expect(result).toStrictEqual(
          scoreDefinitionMockResponse[cisScore - 1].cis_definition[0].definition
        );
      }
    );

    it.each([1, 2, 3, 4, 5])(
      "should return the appropriate ips score definition for a score for %i",
      (ipsScore) => {
        const result = getScoreDefinition({
          scorecards: scoreDefinitionMockResponse,
          score: ipsScore,
          definitionKey: ScorecardDefinitionKey.IPS,
        });
        const expected = concatenateDefinitions(
          scoreDefinitionMockResponse[ipsScore - 1].ips_definition
        );
        expect(result).toStrictEqual(expected);
      }
    );
    it.each([0, 6])(
      "should return an empty string for a score for %i",
      (ipsScore) => {
        const result = getScoreDefinition({
          scorecards: scoreDefinitionMockResponse,
          score: ipsScore,
          definitionKey: ScorecardDefinitionKey.IPS,
        });
        expect(result).toStrictEqual("");
      }
    );
  });
});

describe("formatIpsAccordionData", () => {
  it.each([0, 1, 2, 3, 4])(
    "returns the IPS accordion data with definitions for %i",
    (ipsScore) => {
      const result = formatIpsAccordionData(scoreDefinitionMockResponse);

      expect(result[ipsScore].content).toStrictEqual(
        concatenateDefinitions(
          scoreDefinitionMockResponse[ipsScore].ips_definition
        )
      );
    }
  );
});
