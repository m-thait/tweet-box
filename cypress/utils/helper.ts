/* eslint-disable no-restricted-imports */
/* eslint-disable cypress/no-unnecessary-waiting */
import { agGridTable, newTag } from "../locators/screener";
import { NEW_POPOVER_CORE_CONTENT } from "../../src/constants/popover";

export const validateRowValues = (row: string, values: string[]) => {
  cy.get(row)
    .not(":first")
    .each(($el) => {
      expect($el.text()).to.be.oneOf(values);
    });
};

export const validateRowValueDates = (row: string, date: Date) => {
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

export const enableColumnFilter = (column: string) => {
  cy.get(column).trigger("mouseover", { force: true });
  cy.get(agGridTable.getVerticalIcon).click({ force: true });
  cy.wait(1000);
};

export const enableColumnFilterAndSelect = (
  column: string,
  listItemCheckbox: string
) => {
  cy.get(column).trigger("mouseover", { force: true });
  cy.get(agGridTable.getVerticalIcon).click({ force: true });
  cy.wait(1000);

  cy.get(agGridTable.getFilterList)
    .contains(listItemCheckbox)
    .click({ force: true });
  cy.wait(3000);
};

export const enableDateFilterAndSelect = (column: string, listItem: string) => {
  cy.get(column).trigger("mouseover", { force: true });
  cy.get(agGridTable.getVerticalIcon).click({ force: true });
  cy.get(listItem).click({ force: true });
  cy.wait(3000);
};

export const newTagAssertion = (text: string) => {
  cy.get(newTag.getNewButton).should("exist").and("be.visible");
  cy.get(newTag.getNewButton).click();
  cy.get(newTag.getNewPopoverContent).should("exist").and("be.visible");
  cy.get(newTag.getNewPopoverLink).should("exist").and("be.visible");
  cy.get(newTag.getNewButtonCloseIcon).click();
  cy.get(newTag.getNewPopoverContent).should("not.exist");
  cy.get(newTag.getNewPopoverLink).should("not.exist");
  cy.get(newTag.getNewButton).click();
  cy.get(newTag.getNewPopoverParagraphOne).should(
    "have.text",
    NEW_POPOVER_CORE_CONTENT
  );
  cy.get(newTag.getNewPopoverParagraphTwo).should("have.text", text);
  cy.get(newTag.getNewPopoverLink).invoke("removeAttr", "target").click();
  cy.url().should("include", "Pages/contactus.aspx");
};
