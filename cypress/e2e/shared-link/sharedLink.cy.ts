/* eslint-disable no-restricted-imports */
import { topFilter, screener } from "../../locators/screener";

describe("Validate shared link functionality", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
  });
  it(
    "Validate shared link behavior",
    { scrollBehavior: false, tags: ["@dev", "@stg", "@prd"] },
    () => {
      cy.step("Validate when top filter is enabled shared link can be copied");
      cy.get(topFilter.getSharedLinkedButton).should("be.disabled");
      cy.get(topFilter.getSectorFilter).click();
      cy.get(topFilter.getCheckbox("Corporates")).check({
        force: true,
      });
      cy.get(topFilter.getSharedLinkedButton).should("be.enabled");
      cy.get(topFilter.getSharedLinkedButton).click();
      cy.get(screener.getShareLinkSnackBar)
        .should("exist")
        .should("have.text", " Link Copied")
        .and("be.visible");

      cy.step("Validate share link snackbar close icon");
      cy.get(screener.getShareLinkSnackBarCloseIcon).click();
      cy.get(screener.getShareLinkSnackBar).should("not.exist");
    }
  );
});
