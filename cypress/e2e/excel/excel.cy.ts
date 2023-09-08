/* eslint-disable no-restricted-imports */
import { tableFooter, topFilter } from "../../locators/screener";

describe(
  "Validate export functionalities",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });

    it(
      "Verify export xls button functionalities",
      { scrollBehavior: false },
      () => {
        cy.step(
          "Verify export xls button is disabled when rowcount is greater than 5000"
        );
        cy.get(tableFooter.getRowCount)
          .then(($span) => {
            const value = $span.text();
            return parseInt(value.replace(/,/g, ""));
          })
          .should("be.gt", 5000);
        cy.get(topFilter.getExportXlsButton).should("be.disabled");

        cy.step(
          "Verify export xls button is enabled when rowcount is less than or equal to 5000"
        );
        cy.get(topFilter.getSectorFilter).click();
        cy.get(topFilter.getCheckbox("Corporates")).check({ force: true });
        cy.get(topFilter.getCountryFilter).click();
        cy.get(topFilter.getCheckbox("Asia_Pacific")).check({
          force: true,
        });
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000);
        cy.get(tableFooter.getRowCount)
          .then(($span) => {
            const value = $span.text();
            return parseInt(value.replace(/,/g, ""));
          })
          .should("be.lte", 5000);
        cy.get(topFilter.getExportXlsButton).should("be.enabled");

        cy.step("Verify excel file is downloaded");
        cy.get(topFilter.getExportXlsButton).click();
        cy.verifyDownload(".xlsx", { contains: true });
      }
    );
  }
);
