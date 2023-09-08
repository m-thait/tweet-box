/* eslint-disable no-restricted-imports */
import {
  topFilter,
  screener,
  entityDetails,
  analystInfo,
} from "../../locators/screener";

export const enableCreditAnalystColumn = () => {
  cy.get(topFilter.getEditColumnButton).click({ force: true });
  cy.get(screener.getEsgCreditAnalystColumn).click();
  cy.get(entityDetails.getCreditAnalyst).should("exist").and("be.visible");
};

export const analystInfoPopupValidation = (
  companyId: string,
  companyName: string,
  sector: string,
  ticker: string,
  founded: string,
  headquarter: string,
  website: string,
  description: string
) => {
  cy.get(analystInfo.getAnalystInfoPopup).should("exist").and("be.visible");
  cy.get(analystInfo.getAnalystInfoPopupDetails)
    .should("contain.text", "Contact Analyst")
    .and("be.visible");
  cy.get(analystInfo.getCompanyName(companyId))
    .should("exist")
    .and("be.visible")
    .and("have.text", companyName);
  cy.get(analystInfo.getCompanyPageLink).should("exist").and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpec).should("exist").and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpecKey("sector"))
    .should("exist")
    .and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpecValue("sector"))
    .should("exist")
    .and("be.visible")
    .and("have.text", sector);
  cy.get(analystInfo.getCompanyDetailsSpecKey("ticker"))
    .should("exist")
    .and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpecValue("ticker"))
    .should("exist")
    .and("be.visible")
    .and("have.text", ticker);
  cy.get(analystInfo.getCompanyDetailsSpecKey("founded"))
    .should("exist")
    .and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpecValue("founded"))
    .should("exist")
    .and("be.visible")
    .and("have.text", founded);
  cy.get(analystInfo.getCompanyDetailsSpecKey("headquarter"))
    .should("exist")
    .and("be.visible");
  cy.get(analystInfo.getCompanyDetailsSpecValue("headquarter"))
    .should("exist")
    .and("be.visible")
    .and("have.text", headquarter);
  cy.get(analystInfo.getCompanyDetailsWebsiteKey)
    .should("exist")
    .and("be.visible");
  cy.get(analystInfo.getCompanyDetailsWebsite)
    .should("exist")
    .and("be.visible")
    .and("have.text", website);
  cy.get(analystInfo.getCompanyDetailsDescription)
    .should("exist")
    .and("be.visible")
    .and("have.text", description);
  cy.get(analystInfo.getAnalystName).should("exist").and("be.visible");
  cy.get(analystInfo.getAnalystRole).should("exist").and("be.visible");
  cy.get(analystInfo.getAnalystPhoneNumber).should("exist").and("be.visible");
  cy.get(analystInfo.getAnalystEmail)
    .should("contain.text", "Email Analyst")
    .and("be.visible");
  cy.get(analystInfo.getAnalystInfoPopupCloseIcon).click();
  cy.get(analystInfo.getAnalystInfoPopup).should("not.exist");
};
