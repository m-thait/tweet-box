// eslint-disable-next-line no-restricted-imports
import { tableFooter } from "../../locators/screener";

export const rowsPerPage = (
  rowsPerPage: string,
  rowValue: string,
  firstRowNextPage: string
) => {
  cy.get(tableFooter.getRowsPerPageDropdownButton).click();
  cy.get(rowsPerPage).click();
  cy.get(tableFooter.getRowsPerPageDropdownButton).should(
    "include.text",
    rowValue
  );
  cy.get(firstRowNextPage).should("not.exist");
};
export const switchingPages = (
  pageIcon: string,
  firstRowOfTheCurrentPage: string,
  lastRowOfThePreviousPage: string
) => {
  cy.get(pageIcon).click();
  cy.get(firstRowOfTheCurrentPage).should("exist").and("be.visible");
  cy.get(lastRowOfThePreviousPage).should("not.exist");
};
