/* eslint-disable no-restricted-imports */
import {
  agGridTable,
  creditImpactScore,
  dates,
  outlook,
  screener,
  summaryRatings,
  topFilter,
} from "../../locators/screener";
import { last5YearsDate } from "../date-filter/dateFilter-constant";
import {
  validateRowValues,
  validateRowValueDates,
  enableColumnFilterAndSelect,
  enableDateFilterAndSelect,
} from "../../utils/helper";
import { appliedTopFilterAssertions } from "./filters";

describe("Validate custom filter scenarios", { tags: ["@ignore"] }, () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
    cy.viewport(3200, 1240);
  });

  it("Verify user can apply column filters", { scrollBehavior: false }, () => {
    cy.step("Verify user can apply all top filters");
    cy.get(topFilter.getSectorFilter).click();
    cy.get(topFilter.getCheckbox("Financial_Institutions")).check({
      force: true,
    });
    cy.get(topFilter.getCountryFilter).click();
    cy.get(topFilter.getCheckbox("North_America_reg")).check({
      force: true,
    });
    cy.get(topFilter.getLTRatingFilter).click();
    cy.get(topFilter.getCheckbox("investment_grade")).check({
      force: true,
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    appliedTopFilterAssertions();

    cy.step(
      "Verify user can apply LT Rating Description filter with top filters"
    );
    enableColumnFilterAndSelect(
      summaryRatings.getLtRatingDescription,
      "BACKED Senior Unsecured - Dom Curr"
    );
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Description")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingDescriptionValue, [
      "BACKED Senior Unsecured - Dom Curr",
    ]);
    appliedTopFilterAssertions();
    cy.get(topFilter.getRemoveFilterAppliedButton).click();
    cy.get(screener.getAgGridTable).click("topLeft", { force: true });

    cy.step(
      "Verify user can apply Last LT Rating Action filter with top filters"
    );
    enableColumnFilterAndSelect(
      summaryRatings.getLastLtRatingAction,
      "Affirmation"
    );
    cy.get(topFilter.getTopFilterApplied)
      .contains("Last LT Rating Action")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLastLtRatingActionValue, [
      "Affirmation",
    ]);
    appliedTopFilterAssertions();
    cy.get(agGridTable.getResetFilterButton).click();
    cy.get(screener.getAgGridTable).click("topLeft", { force: true });

    cy.step(
      "Verify user can apply Last LT Rating Action Date filter with top filters"
    );
    enableDateFilterAndSelect(
      summaryRatings.getLtRatingActionDate,
      dates.getFilterButtonLastFiveYears
    );
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Action Date")
      .should("exist")
      .and("be.visible");
    validateRowValueDates(
      summaryRatings.getLastLtRatingActionDateValue,
      last5YearsDate
    );
    appliedTopFilterAssertions();
    cy.get(topFilter.getRemoveFilterAppliedButton).click();
    cy.get(screener.getAgGridTable).click("topLeft", { force: true });

    cy.step("Verify user can apply Issuer Outlook filter with top filters");
    enableColumnFilterAndSelect(outlook.getIssuerOutlook, "Stable");
    cy.get(topFilter.getTopFilterApplied)
      .contains("Outlook")
      .should("exist")
      .and("be.visible");
    validateRowValues(outlook.getIssuerOutlookValue, ["Stable"]);
    appliedTopFilterAssertions();
    cy.get(topFilter.getRemoveFilterAppliedButton).click();
    cy.get(screener.getAgGridTable).click("topLeft", { force: true });

    cy.step("Verify user can apply CIS filter with top filters");
    enableColumnFilterAndSelect(creditImpactScore.getCIS, "--(No data)");
    cy.get(topFilter.getTopFilterApplied)
      .contains("CIS")
      .should("exist")
      .and("be.visible");
    validateRowValues(creditImpactScore.getCISValue, ["--"]);
    appliedTopFilterAssertions();
    cy.get(topFilter.getResetButton).click({ force: true });

    cy.step(
      "Verify user can apply column filters rating and rating description"
    );
    enableColumnFilterAndSelect(summaryRatings.getLtRating, "B2");
    enableColumnFilterAndSelect(
      summaryRatings.getLtRatingDescription,
      "LT Corporate Family Ratings"
    );
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Description")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)B2", "B2"]);
    validateRowValues(summaryRatings.getLtRatingDescriptionValue, [
      "LT Corporate Family Ratings",
    ]);
    cy.get(agGridTable.getResetFilterButton).click();

    cy.step("Verify user can apply column filters rating and rating action");
    enableColumnFilterAndSelect(
      summaryRatings.getLastLtRatingAction,
      "Affirmation"
    );
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Action")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)B2", "B2"]);
    validateRowValues(summaryRatings.getLastLtRatingActionValue, [
      "Affirmation",
    ]);
    cy.get(agGridTable.getResetFilterButton).click();

    cy.step("Verify user can apply column filters rating and date");
    enableDateFilterAndSelect(
      summaryRatings.getLtRatingActionDate,
      dates.getFilterButtonLastFiveYears
    );
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Action Date")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)B2", "B2"]);
    validateRowValueDates(
      summaryRatings.getLastLtRatingActionDateValue,
      last5YearsDate
    );
    cy.get(dates.getResetButton).click();

    cy.step("Verify user can apply column filters rating and issuer outlook");
    enableColumnFilterAndSelect(outlook.getIssuerOutlook, "Stable");
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("Outlook")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)B2", "B2"]);
    validateRowValues(outlook.getIssuerOutlookValue, ["Stable"]);
    cy.get(agGridTable.getResetFilterButton).click();

    cy.step("Verify user can apply column filters rating and score");
    enableColumnFilterAndSelect(creditImpactScore.getCIS, "--(No data)");
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("CIS")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)B2", "B2"]);
    validateRowValues(creditImpactScore.getCISValue, ["--"]);
    cy.get(topFilter.getResetButton).click({ force: true });

    cy.step("Verify user can apply column filters rating action and date");
    enableColumnFilterAndSelect(
      summaryRatings.getLastLtRatingAction,
      "Upgrade"
    );
    enableDateFilterAndSelect(
      summaryRatings.getLtRatingActionDate,
      dates.getFilterButtonLastFiveYears
    );
    cy.get(topFilter.getTopFilterApplied)
      .contains("Last LT Rating Action")
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Action Date")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLastLtRatingActionValue, ["Upgrade"]);
    validateRowValueDates(
      summaryRatings.getLastLtRatingActionDateValue,
      last5YearsDate
    );
    cy.get(topFilter.getResetButton).click({ force: true });

    cy.step(
      "Verify user can apply column filters rating, rating description, rating action, date, issuer outlook and score"
    );
    enableColumnFilterAndSelect(summaryRatings.getLtRating, "WR");
    enableColumnFilterAndSelect(
      summaryRatings.getLtRatingDescription,
      "LT Corporate Family Ratings"
    );
    enableColumnFilterAndSelect(
      summaryRatings.getLastLtRatingAction,
      "Withdrawn"
    );
    enableDateFilterAndSelect(
      summaryRatings.getLtRatingActionDate,
      dates.getFilterButtonLastFiveYears
    );
    enableColumnFilterAndSelect(outlook.getIssuerOutlook, "Ratings Withdrawn");
    enableColumnFilterAndSelect(creditImpactScore.getCIS, "--(No data)");
    cy.get(topFilter.getLtRatingLabelCancelIcon)
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Description")
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("Last LT Rating Action")
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("LT Rating Action Date")
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("Outlook")
      .should("exist")
      .and("be.visible");
    cy.get(topFilter.getTopFilterApplied)
      .contains("CIS")
      .should("exist")
      .and("be.visible");
    validateRowValues(summaryRatings.getLtRatingValue, ["(P)WR", "WR"]);
    validateRowValues(summaryRatings.getLtRatingDescriptionValue, [
      "LT Corporate Family Ratings",
    ]);
    validateRowValues(summaryRatings.getLastLtRatingActionValue, ["Withdrawn"]);
    validateRowValueDates(
      summaryRatings.getLastLtRatingActionDateValue,
      last5YearsDate
    );
    validateRowValues(outlook.getIssuerOutlookValue, ["Ratings Withdrawn"]);
    validateRowValues(creditImpactScore.getCISValue, ["--"]);
  });
});
