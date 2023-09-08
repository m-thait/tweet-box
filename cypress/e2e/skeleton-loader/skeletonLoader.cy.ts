/* eslint-disable no-restricted-imports */
import interceptURLs from "../../fixtures/interceptURLs";
import { screener } from "../../locators/screener";
describe(
  "Validate Skeleton loader functionality",
  { tags: ["@pr", "@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.visit("/");
    });

    it(
      "Validate skeleton loader is present while user wait for the page to load",
      { scrollBehavior: false },
      () => {
        let endDelay: (value?: unknown) => void;
        const delay = new Promise((resolve) => {
          endDelay = resolve;
        });
        cy.intercept(interceptURLs.esgInfo, async (request) => {
          await delay;
          request.reply();
        });
        cy.get(screener.getSkeletonLoader)
          .should("exist")
          .then(() => endDelay());
      }
    );
  }
);
