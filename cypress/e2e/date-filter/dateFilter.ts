/* eslint-disable no-restricted-imports */
import { agGridTable } from "../../locators/screener";

export const validateRowValueWhenSelectedDateFilter = (
  locator: string,
  row: string,
  date: Date
) => {
  cy.get(locator).click({ force: true });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(3000);

  cy.get(agGridTable.getTableBody).then(($body) => {
    if ($body.find(row).length) {
      cy.get(row)
        .not(":first")
        .each(($el) => {
          const rowDate = new Date(Date.parse($el.text()));
          expect(rowDate).to.be.gte(date);
        });
    }
  });
};
