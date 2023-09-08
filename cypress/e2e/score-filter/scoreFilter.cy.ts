/* eslint-disable no-restricted-imports */
import { enableColumnFilterAndSelect } from "../../utils/helper";
import {
  agGridTable,
  creditImpactScore,
  environmentIssuerProfileScore,
  governanceIssuerProfileScore,
  socialIssuerProfileScore,
} from "../../locators/screener";
import {
  CTAFilterValidation,
  scoreFilterValidation,
} from "../score-filter/scoreFilter";

describe("Validate score filter functionalities", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit();
    cy.visitScreener();
    cy.viewport(4800, 1240);
  });

  it(
    "Validate score filter list items",
    { scrollBehavior: false, tags: ["@pr"] },
    () => {
      cy.step("Validate CIS list items");
      scoreFilterValidation(creditImpactScore.getCIS, [
        "CIS-1(Positive)",
        "CIS-2(Neutral-to-low)",
        "CIS-3(Moderately Negative)",
        "CIS-4(Highly Negative)",
        "CIS-5(Very Highly Negative)",
        "--(No data)",
      ]);
      cy.step("Validate Environmental IPS filter list items");
      scoreFilterValidation(environmentIssuerProfileScore.getIpsE, [
        "E-1(Positive)",
        "E-2(Neutral-to-low)",
        "E-3(Moderately Negative)",
        "E-4(Highly Negative)",
        "E-5(Very Highly Negative)",
        "--(No data)",
      ]);
      cy.step("Validate Social IPS filter list items");
      scoreFilterValidation(socialIssuerProfileScore.getIpsS, [
        "S-1(Positive)",
        "S-2(Neutral-to-low)",
        "S-3(Moderately Negative)",
        "S-4(Highly Negative)",
        "S-5(Very Highly Negative)",
        "--(No data)",
      ]);
      cy.step("Validate Governance IPS filter list items");
      scoreFilterValidation(governanceIssuerProfileScore.getIpsG, [
        "G-1(Positive)",
        "G-2(Neutral-to-low)",
        "G-3(Moderately Negative)",
        "G-4(Highly Negative)",
        "G-5(Very Highly Negative)",
        "--(No data)",
      ]);
      cy.step("Validate CTA filter list items");
      CTAFilterValidation();
    }
  );

  it(
    "Validate score column in table grid after applying score filter",
    { scrollBehavior: false, tags: ["@dev", "@stg", "@prd"] },
    () => {
      cy.step("Validate CIS column in table grid after applying filter");
      enableColumnFilterAndSelect(creditImpactScore.getCIS, "CIS-2");
      cy.get(creditImpactScore.getCreditImpactScoreCellValues)
        .not(":first")
        .each(($el) => {
          cy.wrap($el)
            .should("have.text", "CIS-2")
            .should("have.css", "color")
            .and("eq", "rgb(0, 80, 112)");
        });
      cy.get(agGridTable.getResetFilterButton).click();

      cy.step(
        "Validate Environmental IPS column in table grid after applying filter"
      );
      enableColumnFilterAndSelect(environmentIssuerProfileScore.getIpsE, "E-3");
      cy.get(
        environmentIssuerProfileScore.getEnvironmentIssuerProfileScoreCellValues
      )
        .not(":first")
        .each(($el) => {
          cy.wrap($el)
            .should("have.text", "E-3")
            .should("have.css", "color")
            .and("eq", "rgb(127, 109, 18)");
        });
    }
  );
});
