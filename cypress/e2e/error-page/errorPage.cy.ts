/* eslint-disable no-restricted-imports */
import interceptURLs from "../../../cypress/fixtures/interceptURLs";
import { screener } from "../../locators/screener";

describe(
  "Validate Error page",
  { tags: ["@pr", "@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.visit("/", { failOnStatusCode: false });
    });
    it(
      "Error page is visible when esg-info call fails",
      { scrollBehavior: false },
      () => {
        cy.step("error page is visible");
        cy.intercept(interceptURLs.esgInfo, { forceNetworkError: true }).as(
          "esg-info"
        );
        cy.wait("@esg-info");
        cy.get(screener.getErrorPage).should("exist").and("be.visible");
      }
    );
    it("Validate 404 error page message", { scrollBehavior: false }, () => {
      cy.step("error page is visible");
      cy.intercept(interceptURLs.esgInfo, { statusCode: 404 }).as("esg-info");
      cy.wait("@esg-info");
      cy.get(screener.getErrorMessage)
        .should("exist")
        .and("contain.text", "The page you’re looking for cannot be found.");
    });
    it("Validate 500 error page message", { scrollBehavior: false }, () => {
      cy.step("error page is visible");
      cy.intercept(interceptURLs.esgInfo, { statusCode: 500 }).as("esg-info");
      cy.wait("@esg-info");
      cy.get(screener.getErrorMessage)
        .should("exist")
        .and("contain.text", "Something went wrong.");
    });
  }
);
