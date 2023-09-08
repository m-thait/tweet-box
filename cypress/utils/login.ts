import { login } from "../locators/screener";
import interceptURLs from "../fixtures/interceptURLs";
export const getLogin = (username: string, password: string) => {
  cy.intercept(interceptURLs.apiLogin).as("login");
  cy.intercept(interceptURLs.apiAuthorize).as("authorize");
  cy.intercept(interceptURLs.session).as("session");
  cy.intercept(interceptURLs.identity).as("identity");
  Cypress.on("uncaught:exception", () => {
    return false;
  });
  if (Cypress.config("baseUrl")?.includes("localhost")) {
    cy.log("no need of authVisit");
  } else {
    cy.visit("/", { failOnStatusCode: false });
    cy.wait("@session");
    cy.get(login.userInput)
      .should("be.enabled")
      .type(username, { force: true, delay: 100 });
    cy.get(login.continueButton).should("be.enabled").click({ force: true });
    cy.wait("@identity");
    cy.get(login.passwordInput)
      .should("be.enabled")
      .type(password, { force: true, delay: 100 });
    cy.get(login.submittButon).should("be.enabled").click({ force: true });
    cy.wait("@login");
    cy.wait("@authorize").then(() => {
      cy.wait("@session").then(() => {
        cy.window()
          .its("localStorage.okta-token-storage")
          .should("contain", "accessToken");
      });
    });
  }
};
