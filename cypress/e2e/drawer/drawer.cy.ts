/* eslint-disable no-restricted-imports */
import {
  creditImpactScore,
  environmentIssuerProfileScore,
  socialIssuerProfileScore,
  governanceIssuerProfileScore,
  drawer,
} from "../../locators/screener";
import {
  educationalDrawerValidation,
  commentsDrawerValidation,
  methodologyButtonValidation,
} from "../drawer/drawer";
import singleOrgInfo from "../../fixtures/single-org-info";
import esgComments from "../../fixtures/esg-comments";
import { ScoreTypes } from "./drawer-constant";

describe("Validate drawer functionality", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit(singleOrgInfo);
    cy.visitScreener();
    cy.viewport(7000, 1240);
  });
  it(
    "Validate educational drawer functionality",
    { tags: ["@pr", "@dev", "@stg", "@prd"] },
    () => {
      educationalDrawerValidation(
        creditImpactScore.getDrawerButtonForCis,
        drawer.getCisDrawer,
        ScoreTypes.CREDIT_IMPACT_SCORE
      );
      educationalDrawerValidation(
        environmentIssuerProfileScore.getDrawerButtonForEnvironment,
        drawer.getEnvIpsDrawer,
        ScoreTypes.ISSUER_PROFILE_SCORE
      );
      educationalDrawerValidation(
        socialIssuerProfileScore.getDrawerButtonForSocial,
        drawer.getSocialIpsDrawer,
        ScoreTypes.ISSUER_PROFILE_SCORE
      );
      educationalDrawerValidation(
        governanceIssuerProfileScore.getDrawerButtonForGovernance,
        drawer.getGovIpsDrawer,
        ScoreTypes.ISSUER_PROFILE_SCORE
      );
    }
  );
  it(
    "Validate comment drawer functionality",
    { scrollBehavior: false, tags: "@pr" },
    () => {
      cy.interceptCommentsDrawer();
      commentsDrawerValidation(
        creditImpactScore.getCreditImpactScoreCellValues,
        esgComments[0].cisScoreComments
      );
      commentsDrawerValidation(
        environmentIssuerProfileScore.getEnvironmentIssuerProfileScoreCellValues,
        esgComments[0].environmentalExposureComments
      );
      commentsDrawerValidation(
        socialIssuerProfileScore.getSocialIssuerProfileScoreCellValues,
        esgComments[0].socialExposureComments
      );
      commentsDrawerValidation(
        governanceIssuerProfileScore.getGovernanceIssuerProfileScoreCellValues,
        esgComments[0].govExposureComments
      );
    }
  );
  it(
    "Validate methodology button functionality",
    { scrollBehavior: false, tags: ["@dev", "@stg", "@prd"] },
    () => {
      methodologyButtonValidation(creditImpactScore.getDrawerButtonForCis);
    }
  );
});
