/* eslint-disable no-restricted-imports */
import {
  createCustomView,
  customOverviewTabView,
  defaultEsgTabView,
  defaultOverviewTabView,
  validateTabsList,
} from "./tabs";

describe("Validate tabs functionalites", { tags: ["@ignore"] }, () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
    cy.viewport(6000, 1240);
  });

  it("Validate tabs scenarios", { scrollBehavior: false }, () => {
    cy.step("Validate tab list");
    validateTabsList();

    cy.step("Validate default view of overview tab");
    defaultOverviewTabView();

    cy.step("Create custom view in overview tab");
    createCustomView();

    cy.step("Validate default view of esg tab");
    defaultEsgTabView();

    cy.step("Validate url of esg tab");
    cy.url().should("include", "/esg");

    cy.step("Validate url of esg tab after reload");
    cy.reload();
    cy.url().should("include", "/esg");

    cy.step("Validate custom overview tab view after switching tabs");
    customOverviewTabView();
  });
});
