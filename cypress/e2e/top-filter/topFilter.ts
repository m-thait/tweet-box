/* eslint-disable no-restricted-imports */
/* eslint-disable cypress/no-unnecessary-waiting */
import { topFilter } from "../../locators/screener";

export const ltRatingDropDownAssertion = () => {
  cy.get(topFilter.getLTRatingSelectDropdownList)
    .first()
    .should("have.text", "Select All")
    .next()
    .should("contain.text", "Investment Grade")
    .next()
    .should("contain.text", "Speculative Grade")
    .next()
    .should("have.text", "WR")
    .next()
    .should("have.text", "-- (No data)");
};

export const investmentGradeListAssertion = () => {
  cy.get(topFilter.getInvestmentGradeList)
    .first()
    .should("have.text", "Aaa")
    .next()
    .should("have.text", "Aa")
    .next()
    .should("have.text", "A")
    .next()
    .should("have.text", "Baa");
};

export const speculativeGradeListAssertion = () => {
  cy.get(topFilter.getSpeculativeGradeList)
    .first()
    .should("have.text", "Ba")
    .next()
    .should("have.text", "B")
    .next()
    .should("have.text", "Caa")
    .next()
    .should("have.text", "Ca")
    .next()
    .should("have.text", "C");
};

export const sectorListAssertion = () => {
  cy.get(topFilter.getSectorDropdownList)
    .first()
    .should("have.text", "Select All")
    .next()
    .should("have.text", "Corporates")
    .next()
    .should("have.text", "Financial Institutions")
    .next()
    .should("have.text", "Infrastructure & Project Finance")
    .next()
    .should("have.text", "Insurance")
    .next()
    .should("have.text", "Funds & Asset Management")
    .next()
    .should("have.text", "Sovereign & Supranational")
    .next()
    .should("have.text", "Structured Finance")
    .next()
    .should("have.text", "Sub-Sovereign")
    .next()
    .should("have.text", "U.S. Public Finance")
    .next()
    .should("have.text", "-- (No data)");
};

export const countryListAssertion = () => {
  cy.get(topFilter.getCountryDropdownList)
    .first()
    .should("have.text", "Select All")
    .next()
    .should("have.text", "Asia Pacific")
    .next()
    .should("have.text", "Europe, Middle East & Africa")
    .next()
    .should("have.text", "Latin America & Caribbean")
    .next()
    .should("have.text", "North America")
    .next()
    .should("have.text", "-- (No data)");
};

export const defaultLtRatingAssertion = () => {
  cy.get(topFilter.getCheckbox("select-all"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("investment_grade"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("speculative_grade"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("WR"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("blanks"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
};

export const checkedLtRatingAssertion = () => {
  cy.get(topFilter.getCheckbox("select-all")).should("be.checked");
  cy.get(topFilter.getCheckbox("investment_grade")).should("be.checked");
  cy.get(topFilter.getCheckbox("speculative_grade")).should("be.checked");
  cy.get(topFilter.getCheckbox("WR")).should("be.checked");
  cy.get(topFilter.getCheckbox("blanks")).should("be.checked");
};

export const checkedInvestmentGradeAssertion = () => {
  cy.get(topFilter.getCheckbox("investment_grade")).should("be.checked");
  cy.get(topFilter.getCheckbox("Aaa")).should("be.checked");
  cy.get(topFilter.getCheckbox("Aa")).should("be.checked");
  cy.get(topFilter.getCheckbox("A")).should("be.checked");
  cy.get(topFilter.getCheckbox("Baa")).should("be.checked");
};

export const defaultInvestmentGradeAssertion = () => {
  cy.get(topFilter.getCheckbox("investment_grade"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("Aaa"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("Aa"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("A"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
  cy.get(topFilter.getCheckbox("Baa"))
    .should("not.be.checked")
    .and("have.attr", "data-indeterminate", "false");
};

export const validateRowValueWhenCheckedTopFilter = (
  locator: string,
  row: string,
  values: string[]
) => {
  cy.get(locator).check({ force: true });
  cy.wait(3000);
  cy.get(row)
    .not(":first")
    .each(($el) => {
      expect($el.text()).to.be.oneOf(values);
    });
};

export const validateRowValueWhenUncheckedTopFilter = (
  locator: string,
  row: string,
  values: string[]
) => {
  cy.get(locator).uncheck({ force: true });
  cy.wait(3000);
  cy.get(row)
    .not(":first")
    .each(($el) => {
      expect($el.text()).to.be.oneOf(values);
    });
};
