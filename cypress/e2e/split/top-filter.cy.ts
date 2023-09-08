/* eslint-disable no-restricted-imports */
import {
  topFilterDefaultBehavior,
  topFilterBehaviorAfterApplyingMultipleFilters,
} from "./top-filter";

describe("New top filter modal functionalities", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
  });
  it("Validate the new top filter modal", () => {
    cy.step("Validate new top filter exist and it's default behavior");
    topFilterDefaultBehavior();
    cy.step(
      "Validate new top filter's behavior after filters has been applied"
    );
    topFilterBehaviorAfterApplyingMultipleFilters();
  });
});
