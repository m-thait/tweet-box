// eslint-disable-next-line no-restricted-imports
import {
  entityDetails,
  summaryRatings,
  banksSummaryRatings,
  publicFinanceSummaryRatings,
  outlook,
  creditImpactScore,
  environmentIssuerProfileScore,
  socialIssuerProfileScore,
  governanceIssuerProfileScore,
  carbonTransitionAssessment,
} from "../../locators/screener";

export const agGridHeaderDefault = () => {
  cy.get(entityDetails.getEntityDetails).should("exist").and("be.visible");
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSector).should("not.exist");
  cy.get(entityDetails.getSubSector).should("exist").and("be.visible");
  cy.get(entityDetails.getCountry).should("exist").and("be.visible");
  cy.get(entityDetails.getCreditAnalyst).should("not.exist");
  cy.get(entityDetails.getOrgID).should("not.exist");
  cy.get(entityDetails.getLei).should("not.exist");

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

  cy.get(banksSummaryRatings.getBanksSummaryRatings)
    .should("exist")
    .and("be.visible");
  cy.get(banksSummaryRatings.getLtBankSummaryAction).should("not.exist");
  cy.get(banksSummaryRatings.getLtBankSummaryActionDate).should("not.exist");
  cy.get(banksSummaryRatings.getLtBankSummaryActionClass).should("not.exist");

  cy.get(publicFinanceSummaryRatings.getPublicFinanceSummaryRatings).should(
    "not.exist"
  );
  cy.get(publicFinanceSummaryRatings.getLtIssuerRating).should("not.exist");
  cy.get(publicFinanceSummaryRatings.getLtIssuerRatingActionDate).should(
    "not.exist"
  );
  cy.get(publicFinanceSummaryRatings.getSeniormostTaxBacked).should(
    "not.exist"
  );
  cy.get(publicFinanceSummaryRatings.getSeniormostTaxBackedActionDate).should(
    "not.exist"
  );
  cy.get(publicFinanceSummaryRatings.getSeniormostRevenueBacked).should(
    "not.exist"
  );
  cy.get(
    publicFinanceSummaryRatings.getSeniormostRevenueBackedActionDate
  ).should("not.exist");

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
  cy.get(carbonTransitionAssessment.getCtaDate).should("not.exist");
};

export const agGridHeaderCollapsed = () => {
  cy.get(entityDetails.getEntityDetailsCollapsedArrow).click();
  cy.get(summaryRatings.getCreditRatingCollapsedArrow).click();
  cy.get(creditImpactScore.getCisCollapsedArrow).click();
  cy.get(environmentIssuerProfileScore.getEnvCollapsedArrow).click();
  cy.get(socialIssuerProfileScore.getSocialCollapsedArrow).click();
  cy.get(governanceIssuerProfileScore.getGovCollapsedArrow).click();

  // entity details
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSector).should("not.exist");
  cy.get(entityDetails.getSubSector).should("not.exist");
  cy.get(entityDetails.getCountry).should("not.exist");
  cy.get(entityDetails.getCreditAnalyst).should("not.exist");
  cy.get(entityDetails.getOrgID).should("not.exist");
  cy.get(entityDetails.getLei).should("not.exist");

  // summary ratings
  cy.get(summaryRatings.getLtRating).should("exist").and("be.visible");
  cy.get(summaryRatings.getLtRatingDescription).should("not.exist");
  cy.get(summaryRatings.getLastLtRatingAction).should("not.exist");
  cy.get(summaryRatings.getLtRatingActionDate).should("not.exist");

  // bank summary ratings
  cy.get(banksSummaryRatings.getBanksSummaryRatings)
    .should("exist")
    .and("be.visible");
  cy.get(banksSummaryRatings.getLtBankSummaryAction).should("not.exist");
  cy.get(banksSummaryRatings.getLtBankSummaryActionDate).should("not.exist");
  cy.get(banksSummaryRatings.getLtBankSummaryActionClass).should("not.exist");

  // outlook
  cy.get(outlook.getIssuerOutlook).should("exist").and("be.visible");

  // cis score
  cy.get(creditImpactScore.getCIS).should("exist").and("be.visible");
  cy.get(creditImpactScore.getCisAndIpsDate).should("not.exist");

  // env score
  cy.get(environmentIssuerProfileScore.getIpsE)
    .should("exist")
    .and("be.visible");
  cy.get(environmentIssuerProfileScore.getPhysicalClimateRisks).should(
    "not.exist"
  );
  cy.get(environmentIssuerProfileScore.getCarbonTransition).should("not.exist");
  cy.get(environmentIssuerProfileScore.getWaterManagement).should("not.exist");
  cy.get(environmentIssuerProfileScore.getNaturalCapital).should("not.exist");
  cy.get(environmentIssuerProfileScore.getWasteAndPollution).should(
    "not.exist"
  );

  // social
  cy.get(socialIssuerProfileScore.getIpsS).should("exist").and("be.visible");
  cy.get(socialIssuerProfileScore.getCustomerRelations).should("not.exist");
  cy.get(socialIssuerProfileScore.getHumanCapital).should("not.exist");
  cy.get(socialIssuerProfileScore.getDemographicAndSocietalTrends).should(
    "not.exist"
  );
  cy.get(socialIssuerProfileScore.getHealthAndSafetlyPrivate).should(
    "not.exist"
  );
  cy.get(socialIssuerProfileScore.getResponsibleProduction).should("not.exist");
  cy.get(socialIssuerProfileScore.getDemographics).should("not.exist");
  cy.get(socialIssuerProfileScore.getLaborAndIncome).should("not.exist");
  cy.get(socialIssuerProfileScore.getEducation).should("not.exist");
  cy.get(socialIssuerProfileScore.getHousing).should("not.exist");
  cy.get(socialIssuerProfileScore.getHealthAndSafety).should("not.exist");
  cy.get(socialIssuerProfileScore.getAccessToBasicServices).should("not.exist");

  // gov
  cy.get(governanceIssuerProfileScore.getIpsG)
    .should("exist")
    .and("be.visible");
  cy.get(governanceIssuerProfileScore.getFinancialStrategyAndRisk).should(
    "not.exist"
  );
  cy.get(
    governanceIssuerProfileScore.getManagementCredibilityAndTrackRecord
  ).should("not.exist");
  cy.get(governanceIssuerProfileScore.getBoardStructureAndPolicies).should(
    "not.exist"
  );
  cy.get(governanceIssuerProfileScore.getOrganizationalStructure).should(
    "not.exist"
  );
  cy.get(governanceIssuerProfileScore.getComplianceAndReporting).should(
    "not.exist"
  );
  cy.get(governanceIssuerProfileScore.getInstitutionalStructure).should(
    "not.exist"
  );
  cy.get(
    governanceIssuerProfileScore.getPolicyCredibilityAndEffectiveness
  ).should("not.exist");
  cy.get(governanceIssuerProfileScore.getBudgetManagement).should("not.exist");
  cy.get(governanceIssuerProfileScore.getTransparencyAndDisclosure).should(
    "not.exist"
  );

  // cta
  cy.get(carbonTransitionAssessment.getCTA).should("exist").and("be.visible");
  cy.get(carbonTransitionAssessment.getCtaDate).should("not.exist");
};

export const agGridHeaderExpended = () => {
  cy.get(entityDetails.getEntityDetailsExpandArrow).click();
  cy.get(summaryRatings.getCreditRatingExpandArrow).click();
  cy.get(creditImpactScore.getCisExpandArrow).click();
  cy.get(environmentIssuerProfileScore.getEnvExpandArrow).click();
  cy.get(socialIssuerProfileScore.getSocialExpandArrow).click();
  cy.get(governanceIssuerProfileScore.getGovExpandArrow).click();
  cy.get(banksSummaryRatings.getBankSummaryRatingExpandArrow).click();
  cy.get(banksSummaryRatings.getLtBankSummaryRatingCollapsedArrow).click();

  // entity details
  cy.get(entityDetails.getOrgName).should("exist").and("be.visible");
  cy.get(entityDetails.getSubSector).should("exist").and("be.visible");
  cy.get(entityDetails.getCountry).should("exist").and("be.visible");

  // summary ratings
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

  // outlook
  cy.get(outlook.getIssuerOutlook).should("exist").and("be.visible");

  // bank summary
  cy.get(banksSummaryRatings.getBanksSummaryRatings)
    .should("exist")
    .and("be.visible");
  cy.get(banksSummaryRatings.getLtBankSummaryAction)
    .should("exist")
    .and("be.visible");
  cy.get(banksSummaryRatings.getLtBankSummaryActionDate)
    .should("exist")
    .and("be.visible");
  cy.get(banksSummaryRatings.getLtBankSummaryActionClass)
    .should("exist")
    .and("be.visible");

  //cis
  cy.get(creditImpactScore.getCIS).should("exist").and("be.visible");
  cy.get(creditImpactScore.getCisAndIpsDate).should("exist").and("be.visible");

  // env
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

  // social
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

  // gov
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

  // cta
  cy.get(carbonTransitionAssessment.getCTA).should("exist").and("be.visible");
};
