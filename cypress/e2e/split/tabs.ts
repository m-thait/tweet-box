// eslint-disable-next-line no-restricted-imports
import {
  entityDetails,
  summaryRatings,
  outlook,
  creditImpactScore,
  environmentIssuerProfileScore,
  socialIssuerProfileScore,
  governanceIssuerProfileScore,
  carbonTransitionAssessment,
  screener,
  topFilter,
} from "../../locators/screener";

import { TableViewType } from "../../../src/models";

export const validateTabsList = () => {
  cy.get(topFilter.getTabs).should("exist").and("have.length", "2");
  cy.get(topFilter.getTabs)
    .eq(0)
    .should(
      "have.text",
      TableViewType.OVERVIEW.charAt(0).toUpperCase() +
        TableViewType.OVERVIEW.slice(1)
    );
  cy.get(topFilter.getTabs)
    .eq(1)
    .should("have.text", TableViewType.ESG.toUpperCase());
};

export const defaultOverviewTabView = () => {
  cy.get(screener.getAllColumns).should("be.visible").and("have.length", 11);

  cy.get(entityDetails.getEntityDetails).should("exist").and("be.visible");
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSubSector).should("exist").and("be.visible");
  cy.get(entityDetails.getCountry).should("exist").and("be.visible");
  cy.get(entityDetails.getLei).should("exist").and("be.visible");

  cy.get(summaryRatings.getSummaryRatings).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRating).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRatingDescription)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLastLtRatingAction)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLtRatingActionDate)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLtRatingHistory).should("exist").and("be.visible");

  cy.get(outlook.getOutlook).should("exist").and("be.visible");
  cy.get(outlook.getIssuerOutlook).should("exist").and("be.visible");

  cy.get(creditImpactScore.getCreditImpactScore)
    .should("exist")
    .and("be.visible");
  cy.get(creditImpactScore.getCIS).should("exist").and("be.visible");
};

export const defaultEsgTabView = () => {
  cy.get(topFilter.getESGTab).click();
  cy.get(screener.getAllColumns).should("be.visible").and("have.length", 41);

  cy.get(entityDetails.getEntityDetails).should("exist").and("be.visible");
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSubSector).should("exist").and("be.visible");
  cy.get(entityDetails.getCountry).should("exist").and("be.visible");
  cy.get(entityDetails.getLei).should("exist").and("be.visible");

  cy.get(summaryRatings.getSummaryRatings).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRating).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRatingDescription)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLastLtRatingAction)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLtRatingActionDate)
    .should("exist")
    .and("be.visible");

  cy.get(outlook.getOutlook).should("exist").and("be.visible");
  cy.get(outlook.getIssuerOutlook).should("exist").and("be.visible");

  cy.get(creditImpactScore.getCreditImpactScore)
    .should("exist")
    .and("be.visible");
  cy.get(creditImpactScore.getCIS).should("exist").and("be.visible");
  cy.get(creditImpactScore.getCisAndIpsDate).should("exist").and("be.visible");

  cy.get(environmentIssuerProfileScore.getEnvironmentIssuerProfileScore)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getIpsE)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getPhysicalClimateRisks)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getCarbonTransition)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getWaterManagement)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getNaturalCapital)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getWasteAndPollution)
    .should("exist")
    .and("be.visible");

  cy.get(socialIssuerProfileScore.getSocialIssuerProfileScore)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getIpsS).should("exist").and("be.visible");
  cy.get(socialIssuerProfileScore.getCustomerRelations)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getHumanCapital)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getDemographicAndSocietalTrends)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getHealthAndSafetlyPrivate)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getResponsibleProduction)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getDemographics)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getLaborAndIncome)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getEducation)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getHousing).should("exist").and("be.visible");
  cy.get(socialIssuerProfileScore.getHealthAndSafety)
    .should("exist")
    .and("be.visible");
  cy.get(socialIssuerProfileScore.getAccessToBasicServices)
    .should("exist")
    .and("be.visible");

  cy.get(governanceIssuerProfileScore.getGovernanceIssuerProfileScore)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getIpsG)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getFinancialStrategyAndRisk)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getManagementCredibilityAndTrackRecord)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getBoardStructureAndPolicies)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getOrganizationalStructure)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getComplianceAndReporting)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getInstitutionalStructure)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getPolicyCredibilityAndEffectiveness)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getBudgetManagement)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getTransparencyAndDisclosure)
    .should("exist")
    .and("be.visible");

  cy.get(carbonTransitionAssessment.getCarbonTransitionAssessment)
    .should("exist")
    .and("be.visible");
  cy.get(carbonTransitionAssessment.getCTA).should("exist").and("be.visible");
  cy.get(carbonTransitionAssessment.getCtaDate)
    .should("exist")
    .and("be.visible");
};

export const createCustomView = () => {
  cy.get(topFilter.getEditColumnButton).click({ force: true });
  cy.get(screener.getEsgCreditAnalystColumn).click();
  cy.get(screener.getEsgCreditScoreColumn).click();
  cy.get(screener.getLeiColumn).click();
};

export const customOverviewTabView = () => {
  cy.get(topFilter.getOverviewTab).click();
  cy.get(screener.getAllColumns).should("be.visible").and("have.length", 12);

  cy.get(entityDetails.getEntityDetails).should("exist").and("be.visible");
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSubSector).should("exist").and("be.visible");
  cy.get(entityDetails.getCountry).should("exist").and("be.visible");
  cy.get(entityDetails.getCreditAnalyst).should("exist").and("be.visible");
  cy.get(entityDetails.getEsgCreditSector).should("exist").and("be.visible");

  cy.get(summaryRatings.getSummaryRatings).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRating).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRatingDescription)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLastLtRatingAction)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLtRatingActionDate)
    .should("exist")
    .and("be.visible");
  cy.get(summaryRatings.getLtRatingHistory).should("exist").and("be.visible");

  cy.get(outlook.getOutlook).should("exist").and("be.visible");
  cy.get(outlook.getIssuerOutlook).should("exist").and("be.visible");

  cy.get(creditImpactScore.getCreditImpactScore)
    .should("exist")
    .and("be.visible");
  cy.get(creditImpactScore.getCIS).should("exist").and("be.visible");
};
