/* eslint-disable no-restricted-imports */
import {
  agGridTable,
  dates,
  screener,
  summaryRatings,
} from "../../locators/screener";

import {
  lastMonthDate,
  lastQuarterDate,
  lastYearDate,
  last3YearsDate,
  last5YearsDate,
} from "../date-filter/dateFilter-constant";

import { validateRowValueWhenSelectedDateFilter } from "../date-filter/dateFilter";

describe(
  "Validate date filter functionalities",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });

    it(
      "Validate date filter content and functionality",
      { scrollBehavior: false },
      () => {
        cy.step("Enable lt rating date filter");
        cy.get(summaryRatings.getLtRatingActionDate).trigger("mouseover");
        cy.get(agGridTable.getVerticalIcon).click();
        cy.step("Date filter container exists after clicking on vertical icon");
        cy.get(dates.getDateFilterContainer).should("exist").and("be.visible");
        cy.step("Date range label exists");
        cy.get(dates.getDateRangeLabel).should("exist").and("be.visible");
        cy.step("Date range container exists");
        cy.get(dates.getDateRangeContainer).should("exist").and("be.visible");
        cy.get(screener.getAgGridTable).click("topLeft");
        cy.step(
          "Date filter container is no longer present after clicking outside the filter"
        );
        cy.get(dates.getDateFilterContainer).should("not.exist");

        cy.get(summaryRatings.getLtRatingActionDate).trigger("mouseover");
        cy.step("Validate user can filter by last month");
        cy.get(agGridTable.getVerticalIcon).click({ force: true });
        validateRowValueWhenSelectedDateFilter(
          dates.getFilterButtonLastMonth,
          summaryRatings.getLastLtRatingActionDateValue,
          lastMonthDate
        );
        cy.step("Validate user can filter by last quarter");
        validateRowValueWhenSelectedDateFilter(
          dates.getFilterButtonLastQuarter,
          summaryRatings.getLastLtRatingActionDateValue,
          lastQuarterDate
        );
        cy.step("Validate user can filter by last year");
        validateRowValueWhenSelectedDateFilter(
          dates.getFilterButtonLastYear,
          summaryRatings.getLastLtRatingActionDateValue,
          lastYearDate
        );
        cy.step("Validate user can filter by last 3 years");
        validateRowValueWhenSelectedDateFilter(
          dates.getFilterButtonLastThreeYears,
          summaryRatings.getLastLtRatingActionDateValue,
          last3YearsDate
        );
        cy.step("Validate user can filter by last 5 years");
        validateRowValueWhenSelectedDateFilter(
          dates.getFilterButtonLastFiveYears,
          summaryRatings.getLastLtRatingActionDateValue,
          last5YearsDate
        );
      }
    );
  }
);
