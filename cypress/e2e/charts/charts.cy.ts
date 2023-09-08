/* eslint-disable no-restricted-imports */
import {
  validateCISChartWithSelectedScore,
  validateChartTabs,
  validateChartViewButton,
  validateCreditRatingCharts,
  validateESGCharts,
  validateEmptyCISChart,
  validateEmptyCreditRatingChart,
} from "./charts";

describe(
  "Validate chart functionalities",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
      cy.viewport(3000, 1240);
    });

    it(
      "Validate Credit Rating Charts and ESG Charts functionalities",
      { scrollBehavior: false },
      () => {
        cy.step("Validate chart view Button");
        validateChartViewButton();

        cy.step("Validate chart tabs");
        validateChartTabs();

        cy.step("Validate credit rating charts");
        validateCreditRatingCharts();

        cy.step("Validate empty credit rating chart after selecting no data");
        validateEmptyCreditRatingChart("-- (No data)");

        cy.step("Validate empty credit rating chart after selecting WR");
        validateEmptyCreditRatingChart("WR");

        cy.step("Validate ESG charts");
        validateESGCharts();

        cy.step("Validate empty CIS chart after selecting no data");
        validateEmptyCISChart();

        cy.step("Validate CIS chart after selecting a score");
        validateCISChartWithSelectedScore();
      }
    );
  }
);
