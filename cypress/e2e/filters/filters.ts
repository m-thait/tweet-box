/* eslint-disable no-restricted-imports */
import { validateRowValues } from "../../utils/helper";
import {
  country,
  subSector,
  summaryRatings,
  topFilter,
} from "../../locators/screener";
import {
  financialInstitutions,
  investmentGrade,
  northAmerica,
} from "../top-filter/topFilter-constant";

export const appliedTopFilterAssertions = () => {
  cy.get(topFilter.getSectorLabelCancelIcon).should("exist").and("be.visible");
  cy.get(topFilter.getCountryLabelCancelIcon).should("exist").and("be.visible");
  cy.get(topFilter.getLtRatingLabelCancelIcon)
    .should("exist")
    .and("be.visible");
  validateRowValues(subSector.getSubsectorValue, financialInstitutions);
  validateRowValues(country.getCountryValue, northAmerica);
  validateRowValues(summaryRatings.getLtRatingValue, investmentGrade);
};
