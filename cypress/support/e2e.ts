import "./assertions";
import "./commands";
import "cypress-mochawesome-reporter/register";
import "cypress-localstorage-commands";
import "cypress-plugin-steps";
import addContext from "mochawesome/addContext";
import registerCypressGrep from "@cypress/grep";
registerCypressGrep();

Cypress.on("test:after:run", (test) => {
  addContext({ test }, "retryNum: " + test.currentRetry);
});
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Loading script failed")) {
    return false;
  }
});
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Loading chunk 10 failed")) {
    return false;
  }
});
