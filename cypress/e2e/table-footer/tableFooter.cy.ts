// eslint-disable-next-line no-restricted-imports
import { tableFooter, agGridTable } from "../../locators/screener";
import { rowsPerPage, switchingPages } from "./tableFooterAssertion";
describe("Validate table footer functionalities", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
  });

  it(
    "Validate table footer exist, row count exist, rows per page dropdown exist and has a default value of 100",
    { scrollBehavior: false, tags: ["@pr, @dev", "@stg", "@prd"] },
    () => {
      cy.step("table footer exist");
      cy.get(tableFooter.getTableFooter).should("exist").and("be.visible");
      cy.step("row count exist");
      cy.get(tableFooter.getRowCount).should("exist").and("be.visible");
      cy.step("rows per page dropdown exist and has a default value of 100");
      cy.get(tableFooter.getRowsPerPageDropdownButton).should(
        "include.text",
        "100"
      );
      cy.get(agGridTable.getRow(0)).should("exist").and("be.visible");
      cy.get(agGridTable.getRow(100)).should("not.exist");
    }
  );

  it(
    "Validate rows per page dropdown can select 100, 200, 500, 1000 rows per page",
    { scrollBehavior: false, tags: ["@pr, @dev", "@stg", "@prd"] },
    () => {
      rowsPerPage(
        tableFooter.getRowsPerPage(200),
        "200",
        agGridTable.getRow(200)
      );
      rowsPerPage(
        tableFooter.getRowsPerPage(500),
        "500",
        agGridTable.getRow(500)
      );
      rowsPerPage(
        tableFooter.getRowsPerPage(1000),
        "1000",
        agGridTable.getRow(1000)
      );
      rowsPerPage(
        tableFooter.getRowsPerPage(100),
        "100",
        agGridTable.getRow(100)
      );
    }
  );

  it(
    "Validate user can go to the different page using respective arrows and arrows are enabled and disabled as per acceptance criteria",
    { scrollBehavior: false, tags: ["@pr, @dev", "@prd"] },
    () => {
      cy.step("Navigating to the second page and asserting row presence");
      switchingPages(
        tableFooter.getNextPageIcon,
        agGridTable.getRow(100),
        agGridTable.getRow(99)
      );
      cy.step("All icons are enabled in second page");
      cy.get(tableFooter.getFirstPageIcon).should("not.be.disabled");
      cy.get(tableFooter.getPreviousPageIcon).should("not.be.disabled");
      cy.get(tableFooter.getNextPageIcon).should("not.be.disabled");
      cy.get(tableFooter.getLastPageIcon).should("not.be.disabled");
      cy.step("Navigating to the First page");
      switchingPages(
        tableFooter.getPreviousPageIcon,
        agGridTable.getRow(0),
        agGridTable.getRow(100)
      );
      cy.step("'Next' and 'Last Page Icon' are enabled on the first page");
      cy.get(tableFooter.getNextPageIcon).should("not.be.disabled");
      cy.get(tableFooter.getLastPageIcon).should("not.be.disabled");
      cy.step("Navigate to the last page and do the assertion dynamically");
      cy.get(tableFooter.getRowCount).then(($span) => {
        const value = $span.text();
        const num = parseInt(value.replace(/,/g, ""));
        const rowValue = num - (num % 100);
        switchingPages(
          tableFooter.getLastPageIcon,
          agGridTable.getRow(rowValue),
          agGridTable.getRow(rowValue - 1)
        );
      });
      cy.step("'Previous' and 'First Page Icon' are enabled on the last page");
      cy.get(tableFooter.getFirstPageIcon).should("not.be.disabled");
      cy.get(tableFooter.getPreviousPageIcon).should("not.be.disabled");
      cy.step("'Next' and 'Last Page Icon' are enabled on the first page");
      cy.get(tableFooter.getNextPageIcon).should("not.be.enabled");
      cy.get(tableFooter.getLastPageIcon).should("not.be.enabled");
      cy.step("Navigate to the first page");
      switchingPages(
        tableFooter.getFirstPageIcon,
        agGridTable.getRow(0),
        agGridTable.getRow(100)
      );
      cy.step(
        "'Previous' and 'First Page Icon' are disabled on the first page"
      );
      cy.get(tableFooter.getFirstPageIcon).should("not.be.enabled");
      cy.get(tableFooter.getPreviousPageIcon).should("not.be.enabled");
    }
  );
});
