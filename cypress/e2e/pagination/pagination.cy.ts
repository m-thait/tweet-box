// eslint-disable-next-line no-restricted-imports
import {
  agGridTable,
  tableFooter,
  summaryRatings,
} from "../../locators/screener";
describe(
  "Validate pagination properties after refresh",
  { tags: ["@pr", "@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });

    it(
      "Validate that the page is the same after refresh and navigates back to the first page after applying filters or sorting",
      { scrollBehavior: false },
      () => {
        cy.step(
          "Navigating to the next page and asserting 101 row is present and 100 row is not"
        );
        cy.get(tableFooter.getNextPageIcon).click();
        cy.get(agGridTable.getRow(100)).should("exist").and("be.visible");
        cy.get(agGridTable.getRow(99)).should("not.exist");
        cy.reload();
        cy.step(
          "reloading the page and asserting 101 row is present and 100 row is not"
        );
        cy.get(agGridTable.getRow(100)).should("exist").and("be.visible");
        cy.step(
          "filter by LT Rating and assert that user is at the first page"
        );
        cy.get(summaryRatings.getLtRating).trigger("mouseover");
        cy.get(agGridTable.getVerticalIcon).click();
        cy.get(agGridTable.getFilteredItem(0)).click();
        cy.get(agGridTable.getRow(0)).should("exist").and("be.visible");
        cy.get(agGridTable.getRow(100)).should("not.exist");
        cy.get(agGridTable.getResetFilterButton).click();
        cy.step(
          "Navigating to the next page and asserting 101 row is present and 100 row is not"
        );
        cy.get(tableFooter.getNextPageIcon).click();
        cy.get(agGridTable.getRow(100)).should("exist").and("be.visible");
        cy.get(agGridTable.getRow(99)).should("not.exist");
        cy.step("sort by LT Rating and assert that user is at the first page");
        cy.get(summaryRatings.getLtRating).click();
        cy.get(agGridTable.getRow(0)).should("exist").and("be.visible");
        cy.get(agGridTable.getRow(100)).should("not.exist");
      }
    );

    it(
      "Validate that rows per page is the same after refresh",
      { scrollBehavior: false },
      () => {
        cy.step(
          "Selecting 1000 per page from dropdown and asserting table has 1000 rows"
        );
        cy.get(tableFooter.getRowsPerPageDropdownButton).click({ force: true });
        cy.get(tableFooter.getRowsPerPage(1000)).click();
        cy.get(tableFooter.getRowsPerPageDropdownButton)
          .should("be.visible")
          .and("have.text", "1000");
        cy.reload();
        cy.step("After reloading asserting table has 1000 rows");
        cy.get(tableFooter.getRowsPerPageDropdownButton)
          .should("be.visible")
          .and("have.text", "1000");
      }
    );
  }
);
