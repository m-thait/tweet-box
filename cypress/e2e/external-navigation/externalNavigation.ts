/* eslint-disable no-restricted-imports */
import { topFilter, screener, entityDetails } from "../../locators/screener";

export const enableEsgCreditSectorColumn = () => {
  cy.get(topFilter.getEditColumnButton).click({ force: true });
  cy.get(screener.getEsgCreditScoreColumn).click();
  cy.get(entityDetails.getEsgCreditSector).should("exist").and("be.visible");
};
