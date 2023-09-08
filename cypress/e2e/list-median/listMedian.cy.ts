/* eslint-disable no-restricted-imports */
import { listMedian, summaryRatings } from "../../locators/screener";
import { listMedianInformationText } from "../list-median/listMedian-constant";

describe(
  "Validate list median row and information pop up",
  { tags: ["@pr"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });
    it(
      "Validate list median functionalities",
      { scrollBehavior: false },
      () => {
        cy.step("list median row is the first row in the table");
        cy.get(listMedian.getListMedianRow).should("exist").and("be.visible");
        cy.step("list median pop link opens at click");
        cy.get(listMedian.getListMedianPopUpLink).click({ force: true });
        cy.get(listMedian.getListMedianText)
          .should("exist")
          .and("contain.text", listMedianInformationText);
        cy.step("information list median pop up can be closed");
        cy.get(listMedian.getListMedianPopUpCloseIcon)
          .should("exist")
          .and("be.visible")
          .click();
        cy.get(listMedian.getListMedianText).should("not.exist");
        cy.step("for description columns list median value should '--'");
        cy.get(summaryRatings.getLtRatingValue).eq(0).should("have.text", "--");
      }
    );
  }
);
