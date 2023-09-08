/* eslint-disable no-restricted-imports */
import interceptURLs from "../../fixtures/interceptURLs";
import orgInfo104225 from "../../fixtures/org-info-104225";
import orgInfo104155 from "../../fixtures/org-info-104155";
import {
  agGridTable,
  analystInfo,
  entityDetails,
} from "../../locators/screener";
import orgInfoOrgs from "../../fixtures/orgInfoOrgs";
import {
  analystInfoPopupValidation,
  enableCreditAnalystColumn,
} from "./orgInfo";

describe("Validate analyst info pop-up functionality", () => {
  beforeEach(() => {
    cy.authVisit();
    cy.preVisit(orgInfoOrgs);
    cy.visitScreener();
  });
  it(
    "Validate analyst info pop-up",
    { scrollBehavior: false, tags: "@pr" },
    () => {
      cy.step("Enable credit analyst column in table");
      enableCreditAnalystColumn();

      cy.step("Verify analyst info pop-up with one row");
      cy.get(agGridTable.getRow(0))
        .should("have.text", "Best Buy Co., Inc.")
        .and("be.visible");
      cy.intercept(interceptURLs.orgInfo, orgInfo104225);
      cy.get(entityDetails.getCreditAnalystCellLink(0)).click();
      cy.get(analystInfo.getAnalystBox).should("have.length", 3);
      cy.get(analystInfo.getAnalystInfoPopupTitle)
        .should("have.text", "Company Details - Best Buy Co., Inc.")
        .and("be.visible");
      analystInfoPopupValidation(
        "104225",
        "Best Buy Co., Inc.",
        orgInfo104225.sector,
        orgInfo104225.ticker,
        orgInfo104225.founded,
        orgInfo104225.headquarter,
        orgInfo104225.website,
        orgInfo104225.overview
      );

      cy.step("Verify analyst info pop-up with two rows");
      cy.get(agGridTable.getRow(1))
        .should("have.text", "W. R. Berkley Corporation")
        .and("be.visible");
      cy.intercept(interceptURLs.orgInfo, orgInfo104155);
      cy.get(entityDetails.getCreditAnalystCellLink(1)).click();
      cy.get(analystInfo.getAnalystBox).should("have.length", 4);
      cy.get(analystInfo.getAnalystInfoPopupTitle)
        .should("have.text", "Company Details - W. R. Berkley Corporation")
        .and("be.visible");
      analystInfoPopupValidation(
        "104155",
        "W. R. Berkley Corporation",
        orgInfo104155.sector,
        orgInfo104155.ticker,
        orgInfo104155.founded,
        orgInfo104155.headquarter,
        orgInfo104155.website,
        orgInfo104155.overview
      );

      cy.step(
        "Verify that there is no analyst info pop-up link for entity in U.S. Public Finance"
      );
      cy.get(agGridTable.getRow(2))
        .should("have.text", "Bell Community Redevelopment Agency, CA")
        .and("be.visible");
      cy.get(entityDetails.getCreditAnalystCellLink(2)).should("not.exist");
    }
  );
});
