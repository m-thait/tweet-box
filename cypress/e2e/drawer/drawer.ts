/* eslint-disable no-restricted-imports */
import { drawer } from "../../locators/screener";
import interceptURLs from "../../fixtures/interceptURLs";

export const educationalDrawerValidation = (
  drawerIcon: string,
  drawerId: string,
  scoreType: string
) => {
  cy.get(drawerIcon).click({
    force: true,
  });
  cy.get(drawerId).should("exist").and("be.visible");
  cy.get(drawer.getDrawerHeader)
    .should("exist")
    .and("be.visible")
    .and("have.text", scoreType);
  cy.get(drawer.getDrawerBody).should("exist").and("be.visible");
  cy.get(drawer.getDrawerFooter).should("exist").and("be.visible");
  cy.get(drawer.getMethodolgyButton).should("exist").and("be.visible");
  cy.get(drawer.getAccordian(1)).scrollIntoView();
  cy.get(drawer.getAccordianDescription(1)).should("contain.text", "Positive");
  cy.get(drawer.getAccordianColor(1))
    .should("have.css", "background-color")
    .and("eq", "rgb(0, 113, 88)");
  cy.get(drawer.getAccordianButton(1)).click();
  cy.get(drawer.getAccordianContent(1)).should("exist").and("be.visible");
  cy.get(drawer.getAccordian(2)).scrollIntoView();
  cy.get(drawer.getAccordianDescription(2)).should(
    "contain.text",
    "Neutral-to-low"
  );
  cy.get(drawer.getAccordianColor(2))
    .should("have.css", "background-color")
    .and("eq", "rgb(0, 119, 167)");
  cy.get(drawer.getAccordianButton(2)).click();
  cy.get(drawer.getAccordianContent(2)).should("exist").and("be.visible");
  cy.get(drawer.getAccordian(3)).scrollIntoView();
  cy.get(drawer.getAccordianDescription(3)).should(
    "contain.text",
    "Moderately Negative"
  );
  cy.get(drawer.getAccordianColor(3))
    .should("have.css", "background-color")
    .and("eq", "rgb(190, 164, 27)");
  cy.get(drawer.getAccordianButton(3)).click();
  cy.get(drawer.getAccordian(4)).scrollIntoView();
  cy.get(drawer.getAccordianDescription(4)).should(
    "contain.text",
    "Highly Negative"
  );
  cy.get(drawer.getAccordianColor(4))
    .should("have.css", "background-color")
    .and("eq", "rgb(170, 62, 4)");
  cy.get(drawer.getAccordianButton(4)).click();
  cy.get(drawer.getAccordian(5)).scrollIntoView();
  cy.get(drawer.getAccordianDescription(5)).should(
    "contain.text",
    "Very Highly Negative"
  );
  cy.get(drawer.getAccordianColor(5))
    .should("have.css", "background-color")
    .and("eq", "rgb(140, 9, 35)");
  cy.get(drawer.getAccordianButton(5)).click();
  cy.get(drawer.getDrawerCloseButton).click();
  cy.get(drawerId).should("not.exist");
};

export const commentsDrawerValidation = (
  score: string,
  drawerScoreAnalystContent: string
) => {
  cy.get(score).eq(0).click({ force: true });
  cy.get(drawer.getCommentsDrawer).should("exist").and("be.visible");
  cy.get(drawer.getDrawerHeader).should("exist").and("be.visible");
  cy.get(drawer.getDrawerBody).should("exist").and("be.visible");
  cy.get(drawer.getDrawerFooter).should("exist").and("be.visible");
  cy.get(drawer.getMethodolgyButton).should("exist").and("be.visible");
  cy.get(drawer.getDrawerScoreName).should("exist").and("be.visible");
  cy.get(drawer.getDrawerScoreFormattedScore).should("exist").and("be.visible");
  cy.get(drawer.getDrawerScoreDescription).should("exist").and("be.visible");
  cy.get(drawer.getDrawerScoreDate).should("exist").and("be.visible");
  cy.get(drawer.getDrawerOverviewTitle)
    .should("exist")
    .and("be.visible")
    .and("have.text", "Overview");
  cy.get(drawer.getDrawerScoreOverviewContent)
    .should("exist")
    .and("be.visible");
  cy.get(drawer.getDrawerScoreAnalystTitle)
    .should("exist")
    .and("be.visible")
    .and("have.text", "Analyst Commentary");
  cy.get(drawer.getDrawerScoreAnalystContent)
    .should("exist")
    .and("be.visible")
    .and("have.text", drawerScoreAnalystContent);
  cy.get(drawer.getDrawerAttribution)
    .scrollIntoView()
    .should("exist")
    .and("be.visible");
  cy.get(drawer.getDrawerCloseButton).click();
  cy.get(drawer.getCommentsDrawer).should("not.exist");
};

export const methodologyButtonValidation = (locator: string) => {
  cy.intercept(interceptURLs.apiDocumentResponse).as("apiDocumentResponse");
  cy.intercept(interceptURLs.documentCallURL).as("documentCallURL");
  cy.get(locator).click();
  cy.get(drawer.getMethodolgyButton).click();
  //@ts-ignore
  cy.wait("@apiDocumentResponse").then(({ response: { body } }) => {
    const expectedURL =
      Cypress.config("baseUrl")?.replace("/screener", "") +
      "research-document" +
      body.signedUri;
    cy.wrap(expectedURL).as("expectedURL");
  });
  cy.wait("@documentCallURL").then(({ request, response }) => {
    const reqURL = request.url;
    const resStatus = response?.statusCode;
    cy.get("@expectedURL").then((expectedURL) => {
      expect(expectedURL).to.be.eq(reqURL);
      expect(resStatus).to.be.eq(200);
    });
  });
};
