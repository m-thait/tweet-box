/* eslint-disable no-restricted-imports */
import { enableColumnFilter } from "../../utils/helper";
import {
  agGridTable,
  entityDetails,
  tableFooter,
  topFilter,
} from "../../locators/screener";

describe(
  "Validate name filter functionalities",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });

    it(
      "Validate user is able to search and filter entities",
      { scrollBehavior: false },
      () => {
        cy.step("Validate user is able to search and filter by name");
        enableColumnFilter(entityDetails.getOrgName);
        cy.get(agGridTable.getSearchField).type("Tesla").type("{enter}");
        cy.get(entityDetails.getNameFilterList)
          .contains("Tesla, Inc")
          .click({ force: true });
        cy.get(agGridTable.getSearchField).clear();
        cy.get(agGridTable.getSearchField)
          .type("General Motors Company")
          .type("{enter}");
        cy.get(entityDetails.getNameFilterList)
          .contains("General Motors Company")
          .click({ force: true });
        cy.get(agGridTable.getRow(0))
          .should("be.visible")
          .and("contain.text", "General Motors Company");
        cy.get(agGridTable.getRow(1))
          .should("be.visible")
          .and("contain.text", "Tesla, Inc");
        cy.get(topFilter.getTopFilterApplied)
          .contains("Name")
          .should("exist")
          .and("be.visible");
        cy.get(agGridTable.getOrgs).should("have.length", 2);
        cy.get(tableFooter.getRowCount)
          .should("be.visible")
          .and("have.text", "2 TOTAL");
        cy.get(topFilter.getResetButton).click({ force: true });

        cy.step("Validate entity close icon");
        cy.get(agGridTable.getRow(0)).should("exist").and("be.visible");
        cy.get(agGridTable.getRow(0)).trigger("mouseover");
        cy.get(agGridTable.getRowCloseIcon(0)).click();
        cy.get(topFilter.getTopFilterApplied)
          .contains("Name")
          .should("exist")
          .and("be.visible");
        cy.get(agGridTable.getRow(0)).should("not.exist");
      }
    );
  }
);
